#!/usr/bin/env python3
"""Generate i'rab (grammatical analysis) data for Arabic poems.

Uses rule-based Arabic morphological analysis on fully diacritized text
to determine grammatical roles, case markings, and parts of speech.

Usage:
  python generate-irab.py                    # Process all poets
  python generate-irab.py imru-al-qays       # Process specific poet
  python generate-irab.py antara labid        # Process multiple poets
"""

import argparse
import glob as globmod
import json
import re
import sys
import os

# ─── Unicode Constants ───
FATHA = '\u064E'
DAMMA = '\u064F'
KASRA = '\u0650'
SUKUN = '\u0652'
SHADDA = '\u0651'
TAN_FATHA = '\u064B'
TAN_DAMMA = '\u064C'
TAN_KASRA = '\u064D'
SUPERSCRIPT_ALEF = '\u0670'
HAMZA_ABOVE = '\u0654'
HAMZA_BELOW = '\u0655'
MADDAH = '\u0653'

DIACRITICS = {FATHA, DAMMA, KASRA, SUKUN, SHADDA, TAN_FATHA, TAN_DAMMA, TAN_KASRA,
              SUPERSCRIPT_ALEF, HAMZA_ABOVE, HAMZA_BELOW, MADDAH}

ALEF_VARIANTS = 'اأإآٱ'

def strip_diacritics(word):
    return ''.join(c for c in word if c not in DIACRITICS)

def normalize_alef(text):
    """Normalize all alef variants to plain alef for matching."""
    result = []
    for c in text:
        if c in 'أإآٱ':
            result.append('ا')
        else:
            result.append(c)
    return ''.join(result)

def bare_normalized(word):
    """Strip diacritics and normalize alef for dictionary lookups."""
    return normalize_alef(strip_diacritics(word))

def get_last_diacritic(word):
    """Get the last case/mood-indicating diacritic on a word."""
    # Look for the last significant diacritic
    for i in range(len(word) - 1, -1, -1):
        if word[i] in (TAN_FATHA, TAN_DAMMA, TAN_KASRA):
            return word[i]
        if word[i] in (FATHA, DAMMA, KASRA, SUKUN):
            # Skip if it's shadda's companion
            if i > 0 and word[i-1] == SHADDA:
                continue
            return word[i]
    return None

def get_final_case_diacritic(word):
    """Get the diacritic on the last consonant (i'rab sign)."""
    bare = strip_diacritics(word)
    if not bare:
        return None

    # Handle words ending in ة (ta marbuta) - look at diacritic on ة
    # Handle words ending in ا/ى (alif/alif maqsura) - case is estimated
    # Handle regular endings

    last_char = bare[-1]

    # Find position of last consonant in original word
    pos = len(word) - 1
    while pos >= 0 and word[pos] in DIACRITICS:
        pos -= 1

    if pos < 0:
        return None

    # Check diacritics after this consonant
    for i in range(pos + 1, len(word)):
        if word[i] in (TAN_FATHA, TAN_DAMMA, TAN_KASRA):
            return word[i]
        if word[i] in (FATHA, DAMMA, KASRA, SUKUN):
            return word[i]

    # Also check diacritic on the consonant itself (when it's before last)
    # For words like الأَيَّامَ, the fatha on م is the case sign
    return None

def detect_case(word):
    """Detect the grammatical case/mood from diacritics.
    Returns: (case_en, case_ar) or None."""
    bare = strip_diacritics(word)
    if not bare:
        return None

    # Special handling: tanwin fatha + alif (e.g. نَفْسًا)
    # The alif is just a seat, the real case is on the preceding letter
    if bare.endswith('ا') and TAN_FATHA in word:
        return ("Accusative (tanwin)", "منصوب بالفتحة")

    # Check for tanwin anywhere (strong indicator)
    if TAN_DAMMA in word:
        return ("Nominative (tanwin)", "مرفوع بالضمة")
    if TAN_KASRA in word:
        return ("Genitive (tanwin)", "مجرور بالكسرة")
    if TAN_FATHA in word:
        return ("Accusative (tanwin)", "منصوب بالفتحة")

    # Walk from end to find last consonant and its diacritic
    i = len(word) - 1

    # Skip trailing diacritics to find last letter
    while i >= 0 and word[i] in DIACRITICS:
        i -= 1

    if i < 0:
        return None

    last_letter = word[i]

    # Check diacritics after last letter
    trailing = word[i+1:] if i+1 < len(word) else ''

    # For words ending in ة, look at diacritic on ة
    if last_letter == 'ة':
        if DAMMA in trailing:
            return ("Nominative (damma)", "مرفوع بالضمة")
        if FATHA in trailing:
            return ("Accusative (fatha)", "منصوب بالفتحة")
        if KASRA in trailing:
            return ("Genitive (kasra)", "مجرور بالكسرة")

    # For words ending in ا/ى (not tanwin) - case is estimated (مقدر)
    if last_letter in 'اىآ':
        return ("Estimated (on alif)", "مقدّر على الألف")

    # Check the diacritic on the last letter
    if DAMMA in trailing:
        return ("Nominative (damma)", "مرفوع بالضمة")
    if FATHA in trailing:
        return ("Accusative (fatha)", "منصوب بالفتحة")
    if KASRA in trailing:
        return ("Genitive (kasra)", "مجرور بالكسرة")
    if SUKUN in trailing:
        return ("Built on sukun", "مبني على السكون")

    # Check diacritic on the letter before last (for shadda cases)
    if i > 0:
        prev_trail = ''
        j = i - 1
        while j >= 0 and word[j] in DIACRITICS:
            prev_trail = word[j] + prev_trail
            j -= 1

    return ("Indeclinable", "مبني")


# ─── Particle Detection ───
STANDALONE_PARTICLES = {
    'فِي': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'مِنْ': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'مِنَ': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'عَلَى': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'إِلَى': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'عَنْ': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'عَنِ': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'حَتَّى': ('Preposition', 'حرف جر', 'Particle', 'حرف', 'particle'),
    'عِنْدَ': ('Adverb (place)', 'ظرف مكان', 'Noun', 'اسم', 'modifier'),
    'بَيْنَ': ('Adverb (place)', 'ظرف مكان', 'Noun', 'اسم', 'modifier'),
    'بَعْدَ': ('Adverb (time)', 'ظرف زمان', 'Noun', 'اسم', 'modifier'),
    'قَبْلَ': ('Adverb (time)', 'ظرف زمان', 'Noun', 'اسم', 'modifier'),
    'فَوْقَ': ('Adverb (place)', 'ظرف مكان', 'Noun', 'اسم', 'modifier'),
    'مَعَ': ('Adverb (place)', 'ظرف مكان', 'Noun', 'اسم', 'modifier'),
}

# Stripped + normalized versions for matching
STANDALONE_PARTICLES_STRIPPED = {}
for k, v in STANDALONE_PARTICLES.items():
    STANDALONE_PARTICLES_STRIPPED[bare_normalized(k)] = v

NEGATION_WORDS = {'لَا', 'مَا', 'لَمْ', 'لَنْ', 'لَيْسَ', 'إِنْ'}
NEGATION_STRIPPED = {bare_normalized(w) for w in NEGATION_WORDS}

CONJUNCTION_PREFIXES = ['وَ', 'فَ']
PREPOSITION_PREFIXES = ['بِ', 'لِ', 'كَ']
ARTICLE = 'ال'

INNA_SISTERS = {'إِنَّ', 'أَنَّ', 'لَكِنَّ', 'كَأَنَّ', 'لَعَلَّ', 'لَيْتَ'}
INNA_STRIPPED = {bare_normalized(w) for w in INNA_SISTERS}

KANA_SISTERS = {'كَانَ', 'لَيْسَ', 'أَصْبَحَ', 'أَمْسَى', 'أَضْحَى', 'ظَلَّ', 'بَاتَ', 'صَارَ', 'مَازَالَ'}
KANA_STRIPPED = {bare_normalized(w) for w in KANA_SISTERS}

CONDITIONAL_WORDS = {'إِذَا', 'إِنْ', 'لَوْ', 'مَنْ', 'مَا', 'مَهْمَا', 'أَيْنَمَا', 'حَيْثُمَا'}

RELATIVE_PRONOUNS = {'مَا', 'مَنْ', 'الَّذِي', 'الَّتِي', 'الَّذِينَ', 'اللَّاتِي', 'اللَّوَاتِي'}
RELATIVE_STRIPPED = {bare_normalized(w) for w in RELATIVE_PRONOUNS}

DEMONSTRATIVES = {'هَذَا', 'هَذِهِ', 'ذَلِكَ', 'تِلْكَ', 'هَؤُلَاءِ', 'ذَا', 'ذِي'}
DEMONSTRATIVE_STRIPPED = {bare_normalized(w) for w in DEMONSTRATIVES}

PRONOUNS = {'أَنَا', 'أَنْتَ', 'أَنْتِ', 'هُوَ', 'هِيَ', 'نَحْنُ', 'أَنْتُمْ', 'هُمْ', 'هُنَّ'}
PRONOUN_STRIPPED = {bare_normalized(w) for w in PRONOUNS}

EMPHATIC_PARTICLES = {'قَدْ', 'إِنَّ', 'أَنَّ', 'لَ'}
EXCEPTIVE = {'إِلَّا', 'غَيْرَ', 'سِوَى'}
EXCEPTIVE_STRIPPED = {bare_normalized(w) for w in EXCEPTIVE}


def has_definite_article(word, bare=None):
    """Check if word has the definite article ال (possibly after conjunction prefix)."""
    if bare is None:
        bare = strip_diacritics(word)
    # Direct ال
    if bare.startswith('ال'):
        return True
    # After conjunction: وال، فال
    if len(bare) > 3 and bare[0] in 'وف' and bare[1:3] == 'ال':
        return True
    return False


def has_tanwin(word):
    """Check if word has tanwin (indefinite noun marker)."""
    return any(c in word for c in (TAN_FATHA, TAN_DAMMA, TAN_KASRA))


def has_ta_marbuta(word):
    """Check if word ends in ta marbuta (ة) - strong noun indicator."""
    bare = strip_diacritics(word)
    return bare.endswith('ة') if bare else False


def is_definitely_noun(word, bare=None):
    """Check if word is definitely a noun based on strong morphological markers."""
    if bare is None:
        bare = strip_diacritics(word)
    # Definite article → noun
    if has_definite_article(word, bare):
        return True
    # Tanwin → noun
    if has_tanwin(word):
        return True
    # Ta marbuta → noun (with rare exceptions)
    if has_ta_marbuta(word):
        return True
    return False


# Common nouns that start with present-tense prefix letters but are NOT verbs
COMMON_NOUNS = {
    # Starting with ي
    'يوم', 'يد', 'ير', 'ياس', 'يمين', 'يسر', 'يسار', 'يقين', 'يتيم',
    # Starting with ت
    'تحت', 'ترك', 'تراب', 'تجار', 'تمام', 'تمر', 'توب', 'توبة',
    # Starting with ن
    'نفس', 'ناس', 'نار', 'نسب', 'نور', 'نهر', 'نجم', 'نعم', 'نعمة',
    'ندم', 'ندامة', 'نسيب', 'نفع', 'ناصر', 'نصر', 'نصيب', 'نبل',
    # Starting with أ
    'احد', 'امر', 'ارض', 'اهل', 'ابد', 'اب', 'ام', 'اخ', 'ابن',
    'انس', 'امل', 'ادب', 'انف', 'اسد', 'اثر', 'اجل', 'اذن',
    'اسم', 'اصل', 'اكل', 'امان', 'الم', 'اول', 'امة', 'انسان',
}

# Common imperative verbs in poetry
IMPERATIVE_VERBS = {
    'دع': ('Verb (imperative)', 'فعل أمر', 'Built on deletion', 'مبني على حذف حرف العلة'),
    'قل': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'كن': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'خل': ('Verb (imperative)', 'فعل أمر', 'Built on deletion', 'مبني على حذف حرف العلة'),
    'صن': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'زد': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'عد': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'سر': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'رد': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'هب': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'قف': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
    'طب': ('Verb (imperative)', 'فعل أمر', 'Built on sukun', 'مبني على السكون'),
}

# Imperative with initial alif (اُفْعُلْ / اِفْعِلْ)
IMPERATIVE_WITH_ALIF = {
    'اصبر', 'اترك', 'اعلم', 'اذكر', 'انظر', 'اسمع', 'اطلب', 'اقرأ',
    'اسكت', 'اجلس', 'ادخل', 'اخرج', 'ارجع', 'اغفر', 'احفظ',
}


def is_present_verb(word, bare=None):
    """Check if word is a present tense verb with stricter criteria."""
    if bare is None:
        bare = strip_diacritics(word)
    if len(bare) < 3:
        return False

    # Definitely a noun? Then not a verb.
    if is_definitely_noun(word, bare):
        return False

    # Check for present tense prefix
    if bare[0] not in 'يتنأ':
        return False

    # Check against common nouns
    if bare in COMMON_NOUNS:
        return False

    # Additional heuristic: check the diacritization pattern
    # Present verbs typically have: prefix + sukun/fatha + root
    # e.g. يَفْعَلُ - ya then fatha, then sukun on first radical
    # Look for at least one sukun in positions 2-4 (typical of present tense)
    # This helps distinguish يَكْتُبُ (verb) from يَقِين (noun)

    # Check if the word has verb-like diacritics after the prefix
    # Find position of second consonant
    cons_count = 0
    for i, c in enumerate(word):
        if c not in DIACRITICS:
            cons_count += 1
            if cons_count == 2:
                # Check for sukun or specific diacritics on second consonant
                # that are typical of verb patterns
                if i + 1 < len(word) and word[i + 1] == SUKUN:
                    return True  # يَفْعَلُ pattern
                if i + 1 < len(word) and word[i + 1] in (FATHA, DAMMA, KASRA):
                    return True  # various verb patterns
                break

    # If bare length is 4+ and starts with present prefix, likely a verb
    if len(bare) >= 4 and bare[0] in 'يتن':
        return True

    # أ prefix needs more care (could be أفعل التفضيل)
    if bare[0] == 'أ' and len(bare) >= 4:
        return True

    return False


def is_verb_form(word):
    """Check if word looks like a verb based on morphological patterns."""
    bare = strip_diacritics(word)
    if len(bare) < 2:
        return False

    # Definitely a noun? Then not a verb.
    if is_definitely_noun(word, bare):
        return False

    # Present tense check (stricter)
    if is_present_verb(word, bare):
        return True

    # Past tense patterns - harder to detect definitively
    if len(bare) >= 3:
        # Check for verb endings: -وا، -تم، -نا
        if bare.endswith('وا') or bare.endswith('تم') or bare.endswith('نا'):
            return True
        # Check for feminine past: -تْ
        if len(word) > 2 and bare[-1] == 'ت':
            pos = word.rfind('ت')
            if pos >= 0 and pos + 1 < len(word) and word[pos+1] == SUKUN:
                return True

    return False


def has_prefix(word, prefix):
    """Check if word starts with a prefix (accounting for diacritics)."""
    bare = strip_diacritics(word)
    bare_prefix = strip_diacritics(prefix)
    return bare.startswith(bare_prefix)


def strip_prefix(word, prefix):
    """Strip a prefix from a word."""
    bare = strip_diacritics(word)
    bare_prefix = strip_diacritics(prefix)
    if bare.startswith(bare_prefix):
        # Find where the prefix ends in the original word
        count = 0
        i = 0
        while i < len(word) and count < len(bare_prefix):
            if word[i] not in DIACRITICS:
                count += 1
            i += 1
        # Skip trailing diacritics of the prefix
        while i < len(word) and word[i] in DIACRITICS:
            i += 1
        return word[i:]
    return word


def analyze_word(word, position, words, prev_analysis, sentence_state):
    """Analyze a single word's grammatical function.

    Returns dict with: role, roleAr, case, caseAr, pos, posAr, category, notes
    """
    bare = strip_diacritics(word)
    case_info = detect_case(word)

    # Normalized version for dictionary lookups
    norm = bare_normalized(word)

    result = {
        'word': word,
        'role': '',
        'roleAr': '',
        'case': case_info[0] if case_info else 'Indeclinable',
        'caseAr': case_info[1] if case_info else 'مبني',
        'pos': 'Noun',
        'posAr': 'اسم',
        'category': 'nominal',
    }

    # ─── Handle prefix conjunctions ───
    has_conj = False
    inner = word
    inner_bare = bare
    if bare.startswith('و') and len(bare) > 1:
        has_conj = True
        inner_bare = bare
    elif bare.startswith('ف') and len(bare) > 1:
        has_conj = True
        inner_bare = bare

    # ─── Check standalone particles ───
    if norm in STANDALONE_PARTICLES_STRIPPED:
        info = STANDALONE_PARTICLES_STRIPPED[norm]
        result['role'] = info[0]
        result['roleAr'] = info[1]
        result['pos'] = info[2]
        result['posAr'] = info[3]
        result['category'] = info[4]
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # Check for common preposition+noun combinations (ب/ل/ك prefix)
    for prep in ('بال', 'لل', 'كال', 'بل', 'ل'):
        if bare.startswith(prep) and len(bare) > len(prep) + 1:
            result['role'] = 'Object of preposition'
            result['roleAr'] = 'اسم مجرور'
            result['case'] = 'Genitive (kasra)'
            result['caseAr'] = 'مجرور بالكسرة'
            result['category'] = 'modifier'
            return result

    # ب prefix (attached preposition)
    if bare.startswith('ب') and len(bare) > 2 and not bare.startswith('بن') and not bare.startswith('بع') and not bare.startswith('بل'):
        if bare[1] in ALEF_VARIANTS or bare[1:3] in ('ال',):
            result['role'] = 'Object of preposition'
            result['roleAr'] = 'اسم مجرور'
            result['case'] = 'Genitive (kasra)'
            result['caseAr'] = 'مجرور بالكسرة'
            result['category'] = 'modifier'
            return result

    # لِ prefix (attached preposition) - check for kasra on lam
    if word.startswith('لِ') and len(bare) > 2:
        result['role'] = 'Object of preposition'
        result['roleAr'] = 'اسم مجرور'
        result['case'] = 'Genitive (kasra)'
        result['caseAr'] = 'مجرور بالكسرة'
        result['category'] = 'modifier'
        return result

    # ─── Known particles and function words ───

    # Negation
    if norm in ('لا', 'ما', 'لم', 'لن') or (norm.startswith('و') and norm[1:] in ('لا', 'ما')) or (norm.startswith('ف') and norm[1:] in ('لا', 'ما', 'لم', 'لن')):
        neg_part = norm
        if norm.startswith(('و', 'ف')) and len(norm) > 2:
            neg_part = norm[1:]

        if neg_part == 'لم' or neg_part == 'لن':
            result['role'] = 'Jussive particle' if neg_part == 'لم' else 'Subjunctive particle'
            result['roleAr'] = 'حرف جزم ونفي' if neg_part == 'لم' else 'حرف نفي ونصب'
        elif neg_part == 'لا':
            # Check if followed by a verb (prohibitive) or noun
            if position + 1 < len(words):
                next_bare = strip_diacritics(words[position + 1])
                if next_bare[0] in 'يتنأ' and len(next_bare) >= 3:
                    result['role'] = 'Prohibitive particle'
                    result['roleAr'] = 'لا الناهية'
                else:
                    result['role'] = 'Negation'
                    result['roleAr'] = 'حرف نفي'
            else:
                result['role'] = 'Negation'
                result['roleAr'] = 'حرف نفي'
        else:  # ما
            result['role'] = 'Negation'
            result['roleAr'] = 'حرف نفي'

        result['pos'] = 'Particle'
        result['posAr'] = 'حرف'
        result['category'] = 'particle'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # Inna sisters
    if norm in INNA_STRIPPED or (norm.startswith(('و', 'ف')) and norm[1:] in INNA_STRIPPED):
        inner = norm[1:] if norm.startswith(('و', 'ف')) and norm[1:] in INNA_STRIPPED else norm
        names = {
            'ان': 'إنَّ', 'لكن': 'لكنَّ', 'كان': None, 'لعل': 'لعلَّ', 'ليت': 'ليتَ', 'كأن': 'كأنَّ',
        }
        result['role'] = 'Emphatic particle'
        result['roleAr'] = 'حرف توكيد ونصب'
        result['pos'] = 'Particle'
        result['posAr'] = 'حرف'
        result['category'] = 'particle'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # Kana sisters
    if norm in KANA_STRIPPED or (norm.startswith(('و', 'ف')) and norm[1:] in KANA_STRIPPED):
        result['role'] = 'Defective verb'
        result['roleAr'] = 'فعل ناقص'
        result['pos'] = 'Verb'
        result['posAr'] = 'فعل'
        result['category'] = 'verbal'
        result['case'] = 'Built on fatha'
        result['caseAr'] = 'مبني على الفتح'
        return result

    # ليس (also kana sister)
    if norm == 'ليس' or norm in ('وليس', 'فليس'):
        result['role'] = 'Defective verb'
        result['roleAr'] = 'فعل ناقص'
        result['pos'] = 'Verb'
        result['posAr'] = 'فعل'
        result['category'] = 'verbal'
        result['case'] = 'Built on fatha'
        result['caseAr'] = 'مبني على الفتح'
        return result

    # Conditional words
    if norm in ('اذا', 'ان', 'لو', 'اذ', 'حين', 'لما') or (norm.startswith(('و', 'ف')) and norm[1:] in ('اذا', 'ان', 'لو', 'اذ', 'حين', 'لما')):
        result['role'] = 'Conditional particle'
        result['roleAr'] = 'أداة شرط'
        result['pos'] = 'Particle'
        result['posAr'] = 'حرف'
        result['category'] = 'particle'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # Exceptive
    if norm in EXCEPTIVE_STRIPPED or (norm.startswith(('و', 'ف')) and norm[1:] in EXCEPTIVE_STRIPPED):
        result['role'] = 'Exceptive particle'
        result['roleAr'] = 'أداة استثناء'
        result['pos'] = 'Particle'
        result['posAr'] = 'حرف'
        result['category'] = 'particle'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # قد
    if norm in ('قد', 'وقد', 'فقد'):
        result['role'] = 'Emphasis particle'
        result['roleAr'] = 'حرف تحقيق'
        result['pos'] = 'Particle'
        result['posAr'] = 'حرف'
        result['category'] = 'particle'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # أن (subjunctive)
    if norm in ('ان',) and word in ('أَنْ', 'أَن'):
        result['role'] = 'Subjunctive particle'
        result['roleAr'] = 'حرف نصب'
        result['pos'] = 'Particle'
        result['posAr'] = 'حرف'
        result['category'] = 'particle'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # كما، كمثل
    if bare in ('كما', 'كمثل'):
        result['role'] = 'Object of preposition'
        result['roleAr'] = 'اسم مجرور'
        result['pos'] = 'Noun'
        result['posAr'] = 'اسم'
        result['category'] = 'modifier'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # ─── Demonstratives ───
    if norm in DEMONSTRATIVE_STRIPPED:
        result['role'] = 'Demonstrative'
        result['roleAr'] = 'اسم إشارة'
        result['pos'] = 'Noun'
        result['posAr'] = 'اسم'
        result['category'] = 'nominal'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        return result

    # ─── Pronouns ───
    if norm in PRONOUN_STRIPPED or (norm.startswith(('و', 'ف')) and norm[1:] in PRONOUN_STRIPPED):
        result['pos'] = 'Pronoun'
        result['posAr'] = 'ضمير'
        result['category'] = 'nominal'
        result['case'] = 'Indeclinable'
        result['caseAr'] = 'مبني'
        # Role depends on position
        if sentence_state.get('after_inna'):
            result['role'] = 'Subject of inna'
            result['roleAr'] = 'اسم إنّ'
        elif sentence_state.get('need_subject'):
            result['role'] = 'Subject'
            result['roleAr'] = 'مبتدأ'
        else:
            result['role'] = 'Subject'
            result['roleAr'] = 'مبتدأ'
        return result

    # ─── Check imperative verbs (before present tense, since some overlap) ───
    # Check known imperatives (stripped)
    stripped_for_imp = norm
    if norm.startswith(('و', 'ف')) and len(norm) > 2:
        stripped_for_imp = norm[1:]
    if stripped_for_imp in IMPERATIVE_VERBS:
        info = IMPERATIVE_VERBS[stripped_for_imp]
        result['role'] = info[0]
        result['roleAr'] = info[1]
        result['case'] = info[2]
        result['caseAr'] = info[3]
        result['pos'] = 'Verb'
        result['posAr'] = 'فعل'
        result['category'] = 'verbal'
        return result

    # Check imperative with initial alif (اُفْعُلْ / اِفْعِلْ)
    if stripped_for_imp in IMPERATIVE_WITH_ALIF or normalize_alef(stripped_for_imp) in IMPERATIVE_WITH_ALIF:
        result['role'] = 'Verb (imperative)'
        result['roleAr'] = 'فعل أمر'
        result['case'] = 'Built on sukun'
        result['caseAr'] = 'مبني على السكون'
        result['pos'] = 'Verb'
        result['posAr'] = 'فعل'
        result['category'] = 'verbal'
        return result

    # ─── Detect verbs ───
    # Present tense (using improved detection)
    if is_present_verb(word, bare):
        result['pos'] = 'Verb'
        result['posAr'] = 'فعل'
        result['category'] = 'verbal'

        # Determine mood
        if sentence_state.get('after_jussive') or sentence_state.get('prohibition'):
            result['role'] = 'Verb (present, jussive)'
            result['roleAr'] = 'فعل مضارع مجزوم'
            if case_info and 'sukun' in case_info[0].lower():
                result['case'] = 'Jussive (sukun)'
                result['caseAr'] = 'مجزوم بالسكون'
            elif bare[-1] in 'اوي':
                result['case'] = 'Jussive (weak letter deletion)'
                result['caseAr'] = 'مجزوم بحذف حرف العلة'
            else:
                result['case'] = 'Jussive (sukun)'
                result['caseAr'] = 'مجزوم بالسكون'
        elif sentence_state.get('after_subjunctive'):
            result['role'] = 'Verb (present, subjunctive)'
            result['roleAr'] = 'فعل مضارع منصوب'
            result['case'] = 'Subjunctive (fatha)'
            result['caseAr'] = 'منصوب بالفتحة'
        else:
            result['role'] = 'Verb (present)'
            result['roleAr'] = 'فعل مضارع مرفوع'
            result['case'] = 'Indicative (damma)'
            result['caseAr'] = 'مرفوع بالضمة'

        return result

    # ─── Classify remaining as nouns ───
    result['pos'] = 'Noun'
    result['posAr'] = 'اسم'

    # Determine role based on context (most specific/immediate context first)
    if sentence_state.get('after_preposition'):
        result['role'] = 'Object of preposition'
        result['roleAr'] = 'اسم مجرور'
        result['category'] = 'modifier'
        result['case'] = 'Genitive (kasra)'
        result['caseAr'] = 'مجرور بالكسرة'
    elif sentence_state.get('after_verb') and not sentence_state.get('has_subject'):
        # First noun after verb is usually the subject
        result['role'] = 'Subject'
        result['roleAr'] = 'فاعل'
        result['category'] = 'nominal'
        if case_info:
            result['case'] = case_info[0]
            result['caseAr'] = case_info[1]
        else:
            result['case'] = 'Nominative (damma)'
            result['caseAr'] = 'مرفوع بالضمة'
    elif sentence_state.get('after_verb') and sentence_state.get('has_subject'):
        # Noun after verb with subject already found
        if case_info and 'Accusative' in case_info[0]:
            result['role'] = 'Direct object'
            result['roleAr'] = 'مفعول به'
            result['category'] = 'nominal'
        else:
            result['role'] = 'Direct object'
            result['roleAr'] = 'مفعول به'
            result['category'] = 'nominal'
    elif sentence_state.get('after_inna'):
        result['role'] = 'Subject of inna'
        result['roleAr'] = 'اسم إنّ'
        result['category'] = 'nominal'
        result['case'] = 'Accusative (fatha)'
        result['caseAr'] = 'منصوب بالفتحة'
    elif sentence_state.get('after_inna_subject'):
        result['role'] = 'Predicate of inna'
        result['roleAr'] = 'خبر إنّ'
        result['category'] = 'nominal'
        result['case'] = 'Nominative (damma)'
        result['caseAr'] = 'مرفوع بالضمة'
    elif sentence_state.get('after_kana'):
        result['role'] = 'Subject of kana'
        result['roleAr'] = 'اسم كان'
        result['category'] = 'nominal'
        result['case'] = 'Nominative (damma)'
        result['caseAr'] = 'مرفوع بالضمة'
    elif sentence_state.get('after_kana_subject'):
        result['role'] = 'Predicate of kana'
        result['roleAr'] = 'خبر كان'
        result['category'] = 'nominal'
        result['case'] = 'Accusative (fatha)'
        result['caseAr'] = 'منصوب بالفتحة'
    elif sentence_state.get('after_laysa'):
        result['role'] = 'Subject of laysa'
        result['roleAr'] = 'اسم ليس'
        result['category'] = 'nominal'
        result['case'] = 'Nominative (damma)'
        result['caseAr'] = 'مرفوع بالضمة'
    elif prev_analysis and prev_analysis.get('pos') == 'Noun' and not prev_analysis.get('role', '').startswith('Object'):
        # Noun after noun: could be mudaf ilayh, na't, or khabar
        if case_info and 'Genitive' in case_info[0]:
            result['role'] = 'Possessive (mudaf ilayh)'
            result['roleAr'] = 'مضاف إليه'
            result['category'] = 'modifier'
        elif case_info and 'Nominative' in case_info[0]:
            result['role'] = 'Predicate'
            result['roleAr'] = 'خبر'
            result['category'] = 'nominal'
        elif case_info and 'Accusative' in case_info[0]:
            result['role'] = 'Circumstantial (hal)'
            result['roleAr'] = 'حال'
            result['category'] = 'modifier'
        else:
            result['role'] = 'Possessive (mudaf ilayh)'
            result['roleAr'] = 'مضاف إليه'
            result['category'] = 'modifier'
    else:
        # Default: use case to guess
        if case_info:
            if 'Nominative' in case_info[0]:
                result['role'] = 'Subject'
                result['roleAr'] = 'مبتدأ'
                result['category'] = 'nominal'
            elif 'Accusative' in case_info[0]:
                result['role'] = 'Direct object'
                result['roleAr'] = 'مفعول به'
                result['category'] = 'nominal'
            elif 'Genitive' in case_info[0]:
                result['role'] = 'Possessive (mudaf ilayh)'
                result['roleAr'] = 'مضاف إليه'
                result['category'] = 'modifier'
            else:
                result['role'] = 'Subject'
                result['roleAr'] = 'مبتدأ'
                result['category'] = 'nominal'
        else:
            result['role'] = 'Subject'
            result['roleAr'] = 'مبتدأ'
            result['category'] = 'nominal'

    # Use detected case if available and not already set by role
    if case_info and result['case'] in ('Indeclinable', ''):
        result['case'] = case_info[0]
        result['caseAr'] = case_info[1]

    return result


def detect_past_verb(word, bare):
    """Check if a word is a past tense verb. More conservative than before."""
    if len(bare) < 3:
        return False

    # Definitely a noun? Then NOT a verb.
    if is_definitely_noun(word, bare):
        return False

    # Words ending in ة are nouns
    if bare.endswith('ة'):
        return False

    # Verb conjugation endings (strong indicators)
    if bare.endswith('وا') and len(bare) >= 4:
        return True
    if bare.endswith('تم') and len(bare) >= 4:
        return True

    # -نا ending: could be verb or pronoun suffix
    if bare.endswith('نا') and len(bare) >= 4:
        return True

    # -تْ (feminine past): check for sukun on ت
    if bare.endswith('ت') and len(bare) >= 3:
        pos = word.rfind('ت')
        if pos >= 0 and pos + 1 < len(word) and word[pos+1] == SUKUN:
            return True

    # 3-letter فَعَلَ pattern: check for fatha-sukun or fatha-fatha on first two radicals
    # This is more conservative than just "ends in fatha"
    if len(bare) == 3:
        # Look for the classic CaCaCa diacritization
        # Find first consonant and its diacritic
        cons = []
        for i, c in enumerate(word):
            if c not in DIACRITICS:
                diac = word[i+1] if i+1 < len(word) and word[i+1] in DIACRITICS else None
                cons.append((c, diac))

        if len(cons) >= 3:
            # فَعَلَ: first two consonants have fatha, third has fatha
            if cons[0][1] == FATHA and cons[2][1] == FATHA:
                return True
            # فَعِلَ: first has fatha, second has kasra, third has fatha
            if cons[0][1] == FATHA and cons[1][1] == KASRA and cons[2][1] == FATHA:
                return True
            # فَعُلَ
            if cons[0][1] == FATHA and cons[1][1] == DAMMA and cons[2][1] == FATHA:
                return True

    # 4+ letter verb patterns with characteristic diacritization
    if len(bare) >= 4:
        cons = []
        for i, c in enumerate(word):
            if c not in DIACRITICS:
                diac = word[i+1] if i+1 < len(word) and word[i+1] in DIACRITICS else None
                cons.append((c, diac))

        if len(cons) >= 4:
            # أَفْعَلَ (form IV)
            if cons[0][0] in ALEF_VARIANTS and cons[0][1] == FATHA and cons[1][1] == SUKUN:
                return True
            # فَعَّلَ (form II) - shadda on second radical
            if cons[0][1] == FATHA:
                # Check for shadda
                for i, c in enumerate(word):
                    if c == SHADDA:
                        return True
            # اِنْفَعَلَ (form VII)
            if cons[0][0] in ALEF_VARIANTS and len(bare) >= 5 and bare[1] == 'ن':
                return True
            # اِفْتَعَلَ (form VIII)
            if cons[0][0] in ALEF_VARIANTS and len(bare) >= 5 and len(cons) >= 5 and cons[2][0] == 'ت':
                return True
            # اِسْتَفْعَلَ (form X)
            if bare.startswith(('است',)) and len(bare) >= 6:
                return True

    return False


def analyze_hemistich(text, is_sadr=True):
    """Analyze all words in a hemistich and return i'rab annotations."""
    words = text.strip().split()
    if not words:
        return []

    results = []
    sentence_state = {
        'after_verb': False,
        'after_preposition': False,
        'after_inna': False,
        'after_inna_subject': False,
        'after_kana': False,
        'after_kana_subject': False,
        'after_laysa': False,
        'after_jussive': False,
        'after_subjunctive': False,
        'has_subject': False,
        'need_subject': True,
        'prohibition': False,
    }

    prev_analysis = None

    for i, word in enumerate(words):
        bare = strip_diacritics(word)

        # Skip punctuation
        if bare in ('،', ',', '.', '؟', '!', ':'):
            results.append({
                'word': word,
                'role': 'Punctuation',
                'roleAr': 'علامة ترقيم',
                'case': 'N/A',
                'caseAr': 'لا محل',
                'pos': 'Punctuation',
                'posAr': 'علامة',
                'category': 'particle',
            })
            continue

        # Check for known imperative verbs early (before past verb check)
        imp_bare = normalize_alef(bare)
        if imp_bare.startswith(('و', 'ف')) and len(imp_bare) > 2:
            imp_bare = imp_bare[1:]
        if imp_bare in IMPERATIVE_VERBS:
            info = IMPERATIVE_VERBS[imp_bare]
            analysis = {
                'word': word,
                'role': info[0],
                'roleAr': info[1],
                'case': info[2],
                'caseAr': info[3],
                'pos': 'Verb',
                'posAr': 'فعل',
                'category': 'verbal',
            }
            sentence_state['after_verb'] = True
            sentence_state['has_subject'] = True  # Imperative has implicit subject
            results.append(analysis)
            prev_analysis = analysis
            continue

        # Detect if word is a past verb
        is_past = detect_past_verb(word, bare)

        # Override analysis for known verb forms
        norm_w = bare_normalized(word)
        if is_past and norm_w not in KANA_STRIPPED and norm_w not in INNA_STRIPPED and norm_w not in STANDALONE_PARTICLES_STRIPPED:
            # Check it's not a noun that looks like a verb
            common_nouns_past = {'حب', 'رب', 'عيب', 'حق', 'خير', 'شر', 'ابد', 'فضل', 'اصل', 'امل',
                                 'قلب', 'عقل', 'علم', 'حلم', 'صبر', 'شكر', 'حمد', 'فرح', 'غضب', 'حزن'}
            if bare not in common_nouns_past:
                analysis = {
                    'word': word,
                    'role': 'Verb (past)',
                    'roleAr': 'فعل ماضٍ',
                    'case': 'Built on fatha',
                    'caseAr': 'مبني على الفتح',
                    'pos': 'Verb',
                    'posAr': 'فعل',
                    'category': 'verbal',
                }

                # Check if attached conjunction
                if bare.startswith(('و', 'ف')) and len(bare) > 2:
                    rest = normalize_alef(bare[1:])
                    if is_past and rest not in STANDALONE_PARTICLES_STRIPPED:
                        pass  # Keep as verb

                # Check for passive (فُعِلَ pattern)
                if len(word) >= 4 and DAMMA in word[:3] and KASRA in word[2:5]:
                    analysis['role'] = 'Verb (past, passive)'
                    analysis['roleAr'] = 'فعل ماضٍ مبني للمجهول'

                # Update sentence state
                sentence_state['after_verb'] = True
                sentence_state['has_subject'] = False
                sentence_state['after_preposition'] = False
                sentence_state['after_inna'] = False
                sentence_state['after_kana'] = False
                sentence_state['after_laysa'] = False

                results.append(analysis)
                prev_analysis = analysis
                continue

        # Run main analysis
        analysis = analyze_word(word, i, words, prev_analysis, sentence_state)

        # ─── Update sentence state based on this word's analysis ───
        role = analysis.get('role', '')

        if 'Verb' in role and 'past' in role.lower():
            sentence_state['after_verb'] = True
            sentence_state['has_subject'] = False
        elif 'Verb' in role and 'present' in role.lower():
            sentence_state['after_verb'] = True
            sentence_state['has_subject'] = False
        elif 'Verb' in role and 'imperative' in role.lower():
            sentence_state['after_verb'] = True
            sentence_state['has_subject'] = True  # Subject is implicit (أنت)
        elif 'Defective verb' in role:
            if 'ليس' in bare or bare in ('وليس', 'فليس'):
                sentence_state['after_laysa'] = True
            else:
                sentence_state['after_kana'] = True
            sentence_state['after_verb'] = False
        elif 'Emphatic' in role or 'inna' in role.lower():
            sentence_state['after_inna'] = True
            sentence_state['after_verb'] = False
        elif 'Preposition' in role:
            sentence_state['after_preposition'] = True
        elif 'Jussive' in role or 'Prohibitive' in role:
            sentence_state['after_jussive'] = True
            sentence_state['prohibition'] = 'Prohibitive' in role
        elif 'Subjunctive particle' in role:
            sentence_state['after_subjunctive'] = True
        elif 'Conditional' in role:
            sentence_state['after_verb'] = False
        elif 'Subject' in role:
            sentence_state['has_subject'] = True
            if sentence_state.get('after_inna'):
                sentence_state['after_inna'] = False
                sentence_state['after_inna_subject'] = True
            elif sentence_state.get('after_kana'):
                sentence_state['after_kana'] = False
                sentence_state['after_kana_subject'] = True
            elif sentence_state.get('after_laysa'):
                sentence_state['after_laysa'] = False
            sentence_state['after_preposition'] = False
        elif 'Object of preposition' in role or 'مجرور' in analysis.get('roleAr', ''):
            sentence_state['after_preposition'] = False
        elif role in ('Direct object', 'Circumstantial (hal)', 'Specificative (tamyiz)'):
            pass  # Don't change major state

        # If noun after verb, first one is subject
        if analysis.get('pos') == 'Noun' and sentence_state.get('after_verb') and not sentence_state.get('has_subject'):
            if analysis['role'] not in ('Object of preposition', 'Possessive (mudaf ilayh)'):
                sentence_state['has_subject'] = True

        results.append(analysis)
        prev_analysis = analysis

    return results


def process_poems(poems):
    """Process all poems and generate i'rab data."""
    all_irab = []

    for poem in poems:
        poem_irab = {
            'poemId': poem['id'],
            'verses': [],
        }

        for verse in poem['verses']:
            verse_irab = {
                'sadr': analyze_hemistich(verse['sadr'], is_sadr=True),
            }

            if verse.get('ajuz'):
                verse_irab['ajuz'] = analyze_hemistich(verse['ajuz'], is_sadr=False)

            poem_irab['verses'].append(verse_irab)

        all_irab.append(poem_irab)

    return all_irab


def process_poet(poet_id, project_root):
    """Process a single poet's poems and generate i'rab data.

    Returns (total_words, mismatches) tuple.
    """
    poems_file = os.path.join(project_root, 'public', 'data', 'poems', f'{poet_id}.json')
    output_dir = os.path.join(project_root, 'public', 'data', 'irab')
    output_file = os.path.join(output_dir, f'{poet_id}.json')

    if not os.path.exists(poems_file):
        print(f"ERROR: {poems_file} not found, skipping {poet_id}")
        return (0, 0)

    with open(poems_file, 'r', encoding='utf-8') as f:
        poems = json.load(f)

    num_poems = len(poems)
    num_verses = sum(len(p['verses']) for p in poems)
    print(f"\n{'='*60}")
    print(f"Processing {poet_id}: {num_poems} poems, {num_verses} verses")
    print(f"{'='*60}")

    # Generate i'rab data
    all_irab = process_poems(poems)

    # Verify word counts match and collect category stats
    total_words = 0
    mismatches = 0
    categories = {}
    for pi, poem in enumerate(poems):
        irab = all_irab[pi]
        for vi, verse in enumerate(poem['verses']):
            sadr_words = verse['sadr'].strip().split()
            irab_sadr = irab['verses'][vi]['sadr']
            if len(sadr_words) != len(irab_sadr):
                print(f"  MISMATCH {poem['id']} v{vi} sadr: {len(sadr_words)} words vs {len(irab_sadr)} annotations")
                mismatches += 1
            total_words += len(sadr_words)
            for ann in irab_sadr:
                cat = ann.get('category', 'unknown')
                categories[cat] = categories.get(cat, 0) + 1

            if verse.get('ajuz'):
                ajuz_words = verse['ajuz'].strip().split()
                irab_ajuz = irab['verses'][vi].get('ajuz', [])
                if len(ajuz_words) != len(irab_ajuz):
                    print(f"  MISMATCH {poem['id']} v{vi} ajuz: {len(ajuz_words)} words vs {len(irab_ajuz)} annotations")
                    mismatches += 1
                total_words += len(ajuz_words)
                for ann in irab_ajuz:
                    cat = ann.get('category', 'unknown')
                    categories[cat] = categories.get(cat, 0) + 1

    print(f"  Words annotated: {total_words}")
    print(f"  Categories: {', '.join(f'{k}={v}' for k, v in sorted(categories.items()))}")
    if mismatches:
        print(f"  WARNING: {mismatches} word count mismatches!")
    else:
        print(f"  All word counts match!")

    # Write output
    os.makedirs(output_dir, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_irab, f, ensure_ascii=False, separators=(',', ':'))

    file_size = os.path.getsize(output_file)
    print(f"  Output: {output_file} ({file_size:,} bytes)")

    return (total_words, mismatches)


def discover_poets(project_root):
    """Auto-discover poet IDs from poems directory."""
    poems_dir = os.path.join(project_root, 'public', 'data', 'poems')
    poet_files = globmod.glob(os.path.join(poems_dir, '*.json'))
    poets = []
    for f in sorted(poet_files):
        name = os.path.basename(f).replace('.json', '')
        if name.startswith('_'):
            continue  # Skip _index.json etc.
        poets.append(name)
    return poets


def main():
    parser = argparse.ArgumentParser(
        description='Generate i\'rab (grammatical analysis) data for Arabic poems.'
    )
    parser.add_argument(
        'poets', nargs='*',
        help='Poet IDs to process (e.g., imru-al-qays tarafa). If omitted, processes all poets.'
    )
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    if args.poets:
        poet_ids = args.poets
    else:
        poet_ids = discover_poets(project_root)
        print(f"Auto-discovered {len(poet_ids)} poets: {', '.join(poet_ids)}")

    grand_total_words = 0
    grand_total_mismatches = 0

    for poet_id in poet_ids:
        words, mismatches = process_poet(poet_id, project_root)
        grand_total_words += words
        grand_total_mismatches += mismatches

    print(f"\n{'='*60}")
    print(f"TOTAL: {len(poet_ids)} poets, {grand_total_words} words annotated")
    if grand_total_mismatches:
        print(f"WARNING: {grand_total_mismatches} total mismatches!")
    else:
        print("All word counts match across all poets!")


if __name__ == '__main__':
    main()
