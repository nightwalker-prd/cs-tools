#!/usr/bin/env python3
"""Generate dictionary entries for Arabic poems by cross-referencing multiple sources.

Reads all poets' poems, finds every word not already in dictionary.json,
and generates definitions from Hans Wehr, hardcoded common words, proper nouns,
and morphological expansion.

Usage:
  python generate-vocab.py                    # Process all 4 pre-Islamic poets
  python generate-vocab.py imru-al-qays       # Process specific poet
  python generate-vocab.py antara labid        # Process multiple poets
"""

import argparse
import json
import os
import re
import sys

# ─── Paths ───
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DIWAN_DIR = os.path.dirname(SCRIPT_DIR)
POEMS_DIR = os.path.join(DIWAN_DIR, 'public', 'data', 'poems')
DICT_PATH = os.path.join(DIWAN_DIR, 'public', 'data', 'dictionary.json')
HW_DIR = os.path.join(os.path.dirname(DIWAN_DIR), 'hans-wehr', 'public', 'data', 'hans-wehr')

DEFAULT_POETS = ['imru-al-qays', 'tarafa', 'labid', 'antara']

# ─── Unicode / Arabic text utilities ───
DIACRITICS_RE = re.compile(r'[\u064B-\u065F\u0670]')
# Match Arabic letters only — exclude Arabic punctuation (،؛؟) and other non-letter chars
ARABIC_WORD_RE = re.compile(r'[\u0621-\u064A\u0671-\u06D3\u0750-\u077F\u08A0-\u08FF\u064B-\u065F\u0670]+')

# Mirror vocab-matcher.ts exactly
PREFIXES = ['وال', 'فال', 'بال', 'لال', 'كال', 'ال', 'و', 'ف', 'ب', 'ل', 'ك']
SUFFIXES = ['هما', 'كما', 'هم', 'هن', 'كم', 'نا', 'ها', 'كا', 'ه', 'ك', 'ي', 'كن']

# ─── Extended morphological affixes ───
# Verb present-tense prefixes (1st/2nd/3rd person)
VERB_PREFIXES = ['ا', 'ي', 'ت', 'ن']

# Extended suffixes for verb conjugations, plurals, dual, feminine
MORPH_SUFFIXES = [
    # Pronoun object suffixes on verbs (ordered longest first)
    'تموها', 'تموهم', 'وهما', 'تهما', 'ناهم', 'ناها',
    'تني', 'وني', 'تها', 'وها', 'تهم', 'وهم', 'ناه', 'ناك',
    'ني', 'ه', 'ها', 'هم', 'هن', 'كم',
    # Verb conjugation suffixes (past tense + present tense)
    'وا', 'تم', 'تن', 'تما', 'نا',
    'ت', 'ا', 'ن',
    # Present tense mood endings
    'ون', 'ين', 'ان',
    # Plural/dual noun suffixes
    'ات', 'ية', 'يا',
    # Ta marbuta
    'ة',
]

# Combined object+verb suffixes (verb suffix + pronoun)
VERB_OBJ_SUFFIXES = [
    # Past tense ت + pronoun
    'تموه', 'تموها', 'تموهم',
    'تني', 'تنا', 'تها', 'تهم', 'تهن', 'تكم', 'ته', 'تي', 'تك',
    # Past tense وا + pronoun
    'وني', 'ونا', 'وها', 'وهم', 'وهن', 'وه',
    # Past tense نا + pronoun
    'ناه', 'ناها', 'ناهم', 'ناني',
    # Present tense ن + pronoun
    'نني', 'ننا', 'نها', 'نهم', 'نه',
    # Present tense ا/ي + pronoun (for taa' marbuta nouns)
    'اني', 'انا', 'اها', 'اهم', 'اه',
    'يني', 'يها', 'يهم', 'يه',
]


def strip_diacritics(word):
    return DIACRITICS_RE.sub('', word)


def normalize_arabic(text):
    """Mirror TS normalizeArabic exactly: normalize alef, taa marbuta, alif maqsura, hamza carriers."""
    for c in 'أإآٱ':
        text = text.replace(c, 'ا')
    text = text.replace('ة', 'ه')
    text = text.replace('ى', 'ي')
    text = text.replace('ؤ', 'و')
    text = text.replace('ئ', 'ي')
    return text


# Keep old name for backward compat within script
normalize_alef = normalize_arabic


def bare(word):
    """Strip diacritics and normalize — mirrors TS normalizeArabic + removeDiacritics."""
    return normalize_arabic(strip_diacritics(word))


def generate_variants(word):
    """Mirror vocab-matcher.ts generateVariants() — produce all lookup forms for a word."""
    stripped = strip_diacritics(word)
    normalized = normalize_alef(stripped)
    variants = [stripped, normalized]

    # Poetic trailing alef
    if stripped.endswith('ا') and len(stripped) >= 4:
        variants.append(stripped[:-1])
    if normalized.endswith('ا') and len(normalized) >= 4:
        variants.append(normalized[:-1])

    for prefix in PREFIXES:
        if stripped.startswith(prefix) and len(stripped) - len(prefix) >= 3:
            after = stripped[len(prefix):]
            variants.append(after)
            variants.append(normalize_alef(after))
        if normalized.startswith(prefix) and len(normalized) - len(prefix) >= 3:
            variants.append(normalized[len(prefix):])

    for suffix in SUFFIXES:
        if stripped.endswith(suffix) and len(stripped) - len(suffix) >= 3:
            variants.append(stripped[:-len(suffix)])
        if normalized.endswith(suffix) and len(normalized) - len(suffix) >= 3:
            variants.append(normalized[:-len(suffix)])

    # Combined: prefix + suffix
    for prefix in PREFIXES:
        if not stripped.startswith(prefix):
            continue
        after_prefix = stripped[len(prefix):]
        if len(after_prefix) < 3:
            continue
        for suffix in SUFFIXES:
            if after_prefix.endswith(suffix) and len(after_prefix) - len(suffix) >= 3:
                variants.append(after_prefix[:-len(suffix)])
        # Poetic alef after prefix
        if after_prefix.endswith('ا') and len(after_prefix) >= 4:
            variants.append(after_prefix[:-1])
        after_prefix_norm = normalize_alef(after_prefix)
        for suffix in SUFFIXES:
            if after_prefix_norm.endswith(suffix) and len(after_prefix_norm) - len(suffix) >= 3:
                variants.append(after_prefix_norm[:-len(suffix)])

    return list(dict.fromkeys(variants))  # dedupe preserving order


def generate_morph_variants(word):
    """Aggressively strip all affixes to find dictionary base forms.

    Tries all combinations of prefix + suffix stripping to recover
    the dictionary headword for inflected forms like:
      ابكي → بكى (strip verb prefix ا, restore ى)
      تركتني → ترك (strip suffix تني)
      يستطيعون → استطاع (strip prefix ي, suffix ون)
    """
    b = bare(word)
    variants = set()
    min_stem = 2  # minimum remaining stem length

    # --- Layer 1: Just suffix stripping ---
    all_suffixes = MORPH_SUFFIXES + VERB_OBJ_SUFFIXES
    for suffix in all_suffixes:
        if b.endswith(suffix) and len(b) - len(suffix) >= min_stem:
            stem = b[:-len(suffix)]
            variants.add(stem)
            # Try restoring weak-final letters: ى، و، ي، ا
            variants.add(stem + 'ى')
            variants.add(stem + 'و')
            variants.add(stem + 'ي')
            variants.add(stem + 'ا')
            variants.add(stem + 'ة')

    # --- Layer 2: vocab-matcher prefix + morph suffix ---
    for prefix in PREFIXES:
        if not b.startswith(prefix):
            continue
        after = b[len(prefix):]
        if len(after) < min_stem:
            continue
        variants.add(after)
        for suffix in all_suffixes:
            if after.endswith(suffix) and len(after) - len(suffix) >= min_stem:
                stem = after[:-len(suffix)]
                variants.add(stem)
                variants.add(stem + 'ى')
                variants.add(stem + 'و')
                variants.add(stem + 'ي')
                variants.add(stem + 'ا')
                variants.add(stem + 'ة')

    # --- Layer 3: Verb present-tense prefix (ا/ي/ت/ن) + suffix ---
    for vp in VERB_PREFIXES:
        if not b.startswith(vp):
            continue
        after_vp = b[len(vp):]
        if len(after_vp) < min_stem:
            continue
        variants.add(after_vp)
        variants.add(after_vp + 'ى')
        variants.add(after_vp + 'و')
        variants.add(after_vp + 'ي')
        variants.add(after_vp + 'ا')
        for suffix in all_suffixes:
            if after_vp.endswith(suffix) and len(after_vp) - len(suffix) >= min_stem:
                stem = after_vp[:-len(suffix)]
                variants.add(stem)
                variants.add(stem + 'ى')
                variants.add(stem + 'و')
                variants.add(stem + 'ي')
                variants.add(stem + 'ا')
                variants.add(stem + 'ة')

    # --- Layer 4: vocab-matcher prefix + verb prefix + suffix ---
    for prefix in PREFIXES:
        if not b.startswith(prefix):
            continue
        after_p = b[len(prefix):]
        for vp in VERB_PREFIXES:
            if not after_p.startswith(vp):
                continue
            after_vp = after_p[len(vp):]
            if len(after_vp) < min_stem:
                continue
            variants.add(after_vp)
            variants.add(after_vp + 'ى')
            variants.add(after_vp + 'و')
            for suffix in all_suffixes:
                if after_vp.endswith(suffix) and len(after_vp) - len(suffix) >= min_stem:
                    stem = after_vp[:-len(suffix)]
                    variants.add(stem)
                    variants.add(stem + 'ى')
                    variants.add(stem + 'و')
                    variants.add(stem + 'ي')

    # --- Layer 5: Common Arabic morphological patterns ---
    # Five nouns: اب/اخ/حم/فو/ذو → construct forms ابو/اخو + pronoun suffixes
    if b.startswith('اب') and len(b) >= 3:
        variants.add('اب')
        variants.add('ابو')
    if b.startswith('اخ') and len(b) >= 3:
        variants.add('اخ')
        variants.add('اخو')

    # --- Layer 6: Participle/مصدر pattern stripping ---
    # Strip ال prefix first if present, then try participle patterns
    stems_to_try = [b]
    if b.startswith('ال') and len(b) >= 5:
        stems_to_try.append(b[2:])
    for prefix in PREFIXES:
        if b.startswith(prefix) and len(b) - len(prefix) >= 3:
            stems_to_try.append(b[len(prefix):])
    # Also add verb-prefix-stripped stems
    for vp in VERB_PREFIXES:
        if b.startswith(vp) and len(b) - len(vp) >= 3:
            stems_to_try.append(b[len(vp):])

    for stem in stems_to_try:
        # Participle prefixes: م (active/passive participle), مت (Form V/VI participle),
        # مست (Form X participle), من (Form VII participle)
        participle_prefixes = ['مست', 'مت', 'من', 'م']
        for pp in participle_prefixes:
            if stem.startswith(pp) and len(stem) - len(pp) >= 2:
                root = stem[len(pp):]
                variants.add(root)
                variants.add(root + 'ة')
                variants.add(root + 'ى')
                variants.add(root + 'و')
                variants.add(root + 'ي')
                variants.add(root + 'ا')
                # Also try adding common verb form prefixes back
                variants.add('ا' + root)  # Form IV
                variants.add('ت' + root)  # Form V/VI
                variants.add('است' + root)  # Form X
                variants.add('ان' + root)  # Form VII
                # Also strip suffix then check
                for suffix in ['ات', 'ين', 'ون', 'ة', 'ان', 'ا']:
                    if root.endswith(suffix) and len(root) - len(suffix) >= 2:
                        r2 = root[:-len(suffix)]
                        variants.add(r2)
                        variants.add(r2 + 'ة')
                        variants.add(r2 + 'ى')
                        variants.add('ا' + r2)
                        variants.add('ت' + r2)

    # --- Layer 7: Comprehensive verb form prefixes ---
    # For all stems (including after ال/و/ف stripping), try stripping
    # verb form prefixes: است (X), ان (VII), افت/ات (VIII), تف/تفا (V/VI)
    for stem in stems_to_try:
        verb_form_prefixes = ['استت', 'است', 'انت', 'ان', 'افت', 'ات', 'تف', 'تفا', 'تست']
        for vfp in verb_form_prefixes:
            if stem.startswith(vfp) and len(stem) - len(vfp) >= 2:
                root = stem[len(vfp):]
                variants.add(root)
                variants.add(root + 'ى')
                variants.add(root + 'و')
                variants.add(root + 'ا')
                variants.add(vfp[:3] + root)  # Try with partial prefix

    # --- Layer 8: Broken plural → try singular forms ---
    for stem in stems_to_try:
        if len(stem) >= 4:
            # فعائل → فعيلة (e.g., قبائل → قبيلة)
            # فواعل → فاعل (e.g., فوارس → فارس)
            # أفعال → فعل (e.g., أبطال → بطل)
            # فِعال → فَعَل (e.g., رجال → رجل, جبال → جبل)
            if stem.startswith('ا') and len(stem) >= 4:
                # أفعال pattern: try stripping initial alef
                inner = stem[1:]
                variants.add(inner)
                # Also try removing the alef and the ا in pattern
                if len(inner) >= 3:
                    variants.add(inner[0] + inner[2:])  # skip second letter (long vowel)
            # Try removing long vowels (ا/و/ي) from middle of word
            for i in range(1, len(stem) - 1):
                if stem[i] in 'اوي':
                    collapsed = stem[:i] + stem[i+1:]
                    if len(collapsed) >= 3:
                        variants.add(collapsed)
                        variants.add(collapsed + 'ة')

    return list(variants)


# ─── Source 1: Hans Wehr dictionary ───

# Blacklist HW translations that are wrong/misleading when applied broadly
# These are typically proper nouns or month names that match common word patterns
HW_BLACKLIST_VALUES = {
    'August', 'WL',  # آب = August (month), but اب = father
}


def load_hans_wehr():
    """Load all Hans Wehr entries into a bare-form → translation dict."""
    hw = {}
    if not os.path.isdir(HW_DIR):
        print(f"  WARNING: Hans Wehr directory not found at {HW_DIR}", file=sys.stderr)
        return hw

    for fname in sorted(os.listdir(HW_DIR)):
        if not fname.endswith('.json'):
            continue
        with open(os.path.join(HW_DIR, fname), encoding='utf-8') as f:
            data = json.load(f)
        for entry in data.get('data', []):
            for w in entry.get('response', {}).get('words', []):
                text = w.get('text') or ''
                text = text.strip()
                if not text:
                    continue
                trans = w.get('translation') or {}
                if not isinstance(trans, dict):
                    continue
                # Prefer 'short' (actual Hans Wehr translation), fall back to 'google'
                short_raw = (trans.get('short', '') or '').strip()
                short_clean = re.sub(r'<[^>]+>', '', short_raw).strip() if short_raw else ''
                google = (trans.get('google', '') or '').strip()
                # Use short if it's a reasonable length, otherwise google
                if short_clean and len(short_clean) <= 80:
                    meaning = short_clean
                elif google:
                    meaning = google
                elif short_clean:
                    meaning = short_clean
                else:
                    continue
                if not meaning:
                    continue
                # Skip blacklisted translations
                if meaning in HW_BLACKLIST_VALUES:
                    continue
                # Truncate very long meanings
                if len(meaning) > 80:
                    meaning = meaning[:77] + '...'
                key = bare(text)
                if key and key not in hw:
                    hw[key] = meaning
    return hw


# ─── Source 2: Hardcoded common Arabic words ───

COMMON_WORDS = {
    # Short common words (2-letter after normalization)
    'ان': 'that; indeed (أنّ/إنّ)',
    'بي': 'in me, with me',
    'في': 'in, at',
    'لي': 'for me',
    'لك': 'for you',
    'لها': 'for her',
    'له': 'for him',
    # Pronouns
    'انا': 'I',
    'انت': 'you (m.)',
    'انت': 'you (m.)',
    'انتم': 'you (pl. m.)',
    'انتن': 'you (pl. f.)',
    'هو': 'he, it',
    'هي': 'she, it',
    'نحن': 'we',
    'هم': 'they (m.)',
    'هن': 'they (f.)',
    'هما': 'they (dual)',
    # Demonstratives
    'هذا': 'this (m.)',
    'هذه': 'this (f.)',
    'ذلك': 'that (m.)',
    'تلك': 'that (f.)',
    'هؤلاء': 'these',
    'اولئك': 'those',
    # Relative pronouns
    'الذي': 'who, which (m.)',
    'التي': 'who, which (f.)',
    'الذين': 'who, which (pl. m.)',
    'اللذين': 'who, which (dual m.)',
    'اللاتي': 'who, which (pl. f.)',
    'اللواتي': 'who, which (pl. f.)',
    # Particles and prepositions
    'الى': 'to, toward',
    'على': 'on, upon',
    'عن': 'from, about',
    'مع': 'with',
    'تحت': 'under, beneath',
    'فوق': 'above, over',
    'بين': 'between',
    'قبل': 'before',
    'بعد': 'after',
    'عند': 'at, with, near',
    'حول': 'around, about',
    'دون': 'without, below',
    'خلف': 'behind',
    'امام': 'in front of',
    'وراء': 'behind, beyond',
    'منذ': 'since',
    'حتى': 'until, even',
    'لدى': 'at, with',
    'نحو': 'toward; about',
    'خلال': 'during, through',
    # Conjunctions and connectors
    'بل': 'rather, but',
    'لكن': 'but, however',
    'ولكن': 'but, however',
    'ثم': 'then',
    'حين': 'when, time',
    'حينما': 'when',
    'عندما': 'when',
    'بينما': 'while',
    'كلما': 'whenever',
    'كانما': 'as if',
    'كانها': 'as if she',
    'كانه': 'as if he',
    'انما': 'indeed, only',
    'فانما': 'then indeed',
    'لانه': 'because he',
    'لانها': 'because she',
    'لان': 'because',
    'حيث': 'where',
    'اذ': 'when, since',
    'اذا': 'when, if',
    'لما': 'when; since',
    'كيف': 'how',
    'اين': 'where',
    'متى': 'when',
    'كم': 'how many/much',
    'لماذا': 'why',
    'ماذا': 'what',
    # Negation and emphasis
    'ليس': 'is not',
    'ليست': 'is not (f.)',
    'ليسوا': 'they are not',
    'لست': 'I am not',
    'لسنا': 'we are not',
    'لن': 'will not',
    'لم': 'did not',
    'ام': 'or (in questions)',
    'او': 'or',
    'سوف': 'will (future)',
    'سوى': 'other than, except',
    'غير': 'other than, non-',
    'الا': 'except, only; is it not?',
    'انه': 'indeed he/it',
    'انها': 'indeed she/it',
    'انهم': 'indeed they',
    'اننا': 'indeed we',
    'انني': 'indeed I',
    'فانني': 'then indeed I',
    'فانه': 'then indeed he',
    # Common verbs (bare past 3ms)
    'كان': 'was, to be',
    'قال': 'said',
    'جاء': 'came',
    'راى': 'saw',
    'علم': 'knew',
    'وجد': 'found',
    'اخذ': 'took',
    'جعل': 'made',
    'ترك': 'left, abandoned',
    'ذهب': 'went',
    'اتى': 'came',
    'رجع': 'returned',
    'بقي': 'remained',
    'صار': 'became',
    'ظل': 'remained, continued',
    'بات': 'spent the night',
    'زال': 'ceased',
    'دام': 'lasted',
    'عاد': 'returned',
    'مضى': 'passed, went',
    'سار': 'walked, traveled',
    'وقف': 'stood, stopped',
    'نزل': 'descended, alighted',
    'ركب': 'rode, mounted',
    'طار': 'flew',
    'بكى': 'wept, cried',
    'دعا': 'called, invited',
    'شكا': 'complained',
    'رمى': 'threw',
    'سقى': 'watered, gave drink',
    'لقي': 'met, encountered',
    'بنى': 'built',
    'مشى': 'walked',
    'هدى': 'guided',
    'سعى': 'strove, sought',
    'غزا': 'raided, invaded',
    'عدا': 'ran; attacked',
    'نجا': 'escaped, was saved',
    'بدا': 'appeared',
    'ادى': 'performed',
    'حكى': 'told, narrated',
    'خلا': 'was empty; passed',
    'علا': 'rose, was high',
    'سما': 'rose, was elevated',
    'غدا': 'went in morning; became',
    'قضى': 'decreed; spent',
    'نهى': 'forbade',
    'تلا': 'recited, followed',
    'طغى': 'exceeded; oppressed',
    'زكى': 'purified, grew',
    'ابى': 'refused',
    'عفا': 'pardoned; faded',
    'هوى': 'fell; desired',
    'شفى': 'healed, cured',
    'كفى': 'sufficed',
    'وفى': 'fulfilled',
    'نفى': 'denied, exiled',
    'قوي': 'was strong',
    # Common conjugated forms
    'كنت': 'I was; you were',
    'كانت': 'she was; it was',
    'كانوا': 'they were',
    'كنا': 'we were',
    'قلت': 'I said; you said',
    'قالت': 'she said',
    'قالوا': 'they said',
    'جاءت': 'she/it came',
    'جاءوا': 'they came',
    'رايت': 'I saw; you saw',
    'رايتها': 'I saw her',
    'لقيت': 'I met; you met',
    'نزلت': 'I descended; she descended',
    'ذكرت': 'I mentioned; she mentioned',
    'وجدت': 'I found; she found',
    'تركت': 'I left; she left',
    'عرفت': 'I knew; she knew',
    'سمعت': 'I heard; she heard',
    'جعلت': 'I made; she made',
    'اصبح': 'became (in morning)',
    'اصبحت': 'she/I became (in morning)',
    'امسى': 'became (in evening)',
    # Present tense common verbs
    'يكون': 'he is/will be',
    'تكون': 'she/you are/will be',
    'اكون': 'I am/will be',
    'نكون': 'we are/will be',
    'يقول': 'he says',
    'تقول': 'you/she say(s)',
    'اقول': 'I say',
    'يرى': 'he sees',
    'ترى': 'you/she see(s)',
    'ارى': 'I see',
    'يعلم': 'he knows',
    'تعلم': 'you/she know(s)',
    'يجد': 'he finds',
    'تجد': 'you/she find(s)',
    'يجعل': 'he makes',
    'يبقى': 'he remains',
    'تبقى': 'she/you remain(s)',
    'يمضي': 'he passes/goes',
    'يمشي': 'he walks',
    'يسير': 'he walks/travels',
    'يبكي': 'he weeps',
    'تبكي': 'she/you weep(s)',
    'يدعو': 'he calls/invites',
    'تدعو': 'she/you call(s)',
    'يرمي': 'he throws',
    'يغزو': 'he raids',
    'يعدو': 'he runs/attacks',
    'يسعى': 'he strives',
    'يبدو': 'he/it appears',
    'تبدو': 'she/it appears',
    # Common nouns
    'ارض': 'earth, land',
    'سماء': 'sky, heaven',
    'ماء': 'water',
    'نار': 'fire',
    'ليل': 'night',
    'نهار': 'daytime',
    'صبح': 'morning',
    'ليلة': 'night (one)',
    'يوم': 'day',
    'ايام': 'days',
    'شهر': 'month',
    'سنة': 'year',
    'دهر': 'time, fate',
    'عمر': 'lifetime, age',
    'موت': 'death',
    'حياة': 'life',
    'قلب': 'heart',
    'عين': 'eye; spring',
    'عيون': 'eyes; springs',
    'يد': 'hand',
    'يدي': 'my hand',
    'يدين': 'two hands',
    'راس': 'head',
    'وجه': 'face',
    'نفس': 'soul, self',
    'روح': 'spirit, soul',
    'جسم': 'body',
    'بدن': 'body',
    'دم': 'blood',
    'دمع': 'tears',
    'قوم': 'people, tribe',
    'اهل': 'people, family',
    'رجل': 'man',
    'رجال': 'men',
    'امراة': 'woman',
    'نساء': 'women',
    'ابن': 'son',
    'بنت': 'daughter',
    'بنات': 'daughters',
    'اب': 'father',
    'ام': 'mother',
    'اخ': 'brother',
    'اخت': 'sister',
    'ابناء': 'sons, children',
    'بنو': 'sons of (construct)',
    'بني': 'sons of (construct)',
    'فرس': 'horse; mare',
    'خيل': 'horses',
    'ناقة': 'she-camel',
    'ابل': 'camels',
    'سيف': 'sword',
    'رمح': 'spear',
    'سهم': 'arrow',
    'قوس': 'bow',
    'درع': 'armor',
    'حرب': 'war',
    'سلم': 'peace',
    'قتل': 'killing',
    'جيش': 'army',
    'فارس': 'horseman, knight',
    'فوارس': 'horsemen, knights',
    'بطل': 'hero',
    'شجاع': 'brave',
    'شجاعة': 'bravery',
    'عز': 'glory, might',
    'عزة': 'glory, might',
    'مجد': 'glory',
    'شرف': 'honor, nobility',
    'كرم': 'generosity',
    'كريم': 'generous, noble',
    'حلم': 'forbearance; dream',
    'صبر': 'patience',
    'حب': 'love',
    'عشق': 'passionate love',
    'هوى': 'love, desire; wind',
    'غرام': 'love, passion',
    'شوق': 'longing, yearning',
    'فراق': 'separation, parting',
    'وصل': 'union, connection',
    'هجر': 'abandonment',
    'دمعة': 'a tear',
    'بكاء': 'weeping, crying',
    'حزن': 'sadness, grief',
    'فرح': 'joy',
    'خمر': 'wine',
    'كاس': 'cup, goblet',
    'ديار': 'homes, abodes',
    'دار': 'house, abode',
    'منزل': 'dwelling, place',
    'خيام': 'tents',
    'خيمة': 'tent',
    'رحل': 'departed; saddle',
    'طلل': 'ruins, traces',
    'اطلال': 'ruins, traces',
    'رسم': 'trace, mark',
    'رسوم': 'traces, marks',
    'وقوف': 'standing, stopping',
    'ركب': 'riders, caravan',
    'سفر': 'journey, travel',
    'طريق': 'road, path',
    'صحراء': 'desert',
    'بادية': 'desert, wilderness',
    'واد': 'valley, wadi',
    'وادي': 'valley, wadi',
    'جبل': 'mountain',
    'بحر': 'sea',
    'نجم': 'star',
    'نجوم': 'stars',
    'شمس': 'sun',
    'قمر': 'moon',
    'ريح': 'wind',
    'رياح': 'winds',
    'مطر': 'rain',
    'سحاب': 'clouds',
    'غيث': 'rain, succor',
    'برق': 'lightning',
    'رعد': 'thunder',
    'ثلج': 'snow',
    'حر': 'heat',
    'برد': 'cold',
    'ظل': 'shade, shadow',
    'نور': 'light',
    'ظلام': 'darkness',
    'بعير': 'camel',
    'حمار': 'donkey',
    'ثور': 'bull, ox',
    'اسد': 'lion',
    'ذئب': 'wolf',
    'غزال': 'gazelle',
    'ظبي': 'gazelle, deer',
    'طير': 'bird(s)',
    'عقاب': 'eagle',
    'حمام': 'doves, pigeons',
    'حية': 'snake',
    'وحش': 'wild animal(s)',
    # Body parts
    'شفة': 'lip',
    'شفاه': 'lips',
    'ثغر': 'mouth; gap',
    'سن': 'tooth; age',
    'لسان': 'tongue',
    'صدر': 'chest, breast',
    'ظهر': 'back',
    'بطن': 'belly',
    'كتف': 'shoulder',
    'ذراع': 'arm, forearm',
    'ساق': 'leg, shank',
    'قدم': 'foot',
    'رقبة': 'neck',
    'جيد': 'neck (poetic)',
    'خد': 'cheek',
    'جبين': 'forehead',
    'شعر': 'hair; poetry',
    # Poetry/literary terms
    'شاعر': 'poet',
    'شعراء': 'poets',
    'قصيدة': 'poem, ode',
    'قصائد': 'poems, odes',
    'بيت': 'verse; house',
    'ابيات': 'verses',
    'معلقة': 'mu\'allaqa (suspended ode)',
    'ديوان': 'collection of poems',
    'قافية': 'rhyme',
    'وزن': 'meter, weight',
    'بلاغة': 'eloquence, rhetoric',
    'فصاحة': 'eloquence',
    # Colors
    'ابيض': 'white',
    'بيضاء': 'white (f.)',
    'اسود': 'black',
    'سوداء': 'black (f.)',
    'احمر': 'red',
    'حمراء': 'red (f.)',
    'اخضر': 'green',
    'خضراء': 'green (f.)',
    'اصفر': 'yellow',
    'صفراء': 'yellow (f.)',
    'ازرق': 'blue',
    'زرقاء': 'blue (f.)',
    # Numbers
    'واحد': 'one',
    'اثنان': 'two',
    'ثلاثة': 'three',
    'اربعة': 'four',
    'خمسة': 'five',
    'عشرة': 'ten',
    'مئة': 'hundred',
    'الف': 'thousand',
    # Time words
    'غد': 'tomorrow',
    'غدا': 'tomorrow',
    'امس': 'yesterday',
    'الان': 'now',
    'ابدا': 'ever, never',
    'دائما': 'always',
    'قط': 'ever (neg.); cat',
    # Abstract concepts common in poetry
    'عقل': 'reason, mind',
    'حكمة': 'wisdom',
    'جهل': 'ignorance',
    'خير': 'good, goodness',
    'شر': 'evil',
    'حق': 'truth, right',
    'باطل': 'falsehood',
    'عدل': 'justice',
    'ظلم': 'injustice, oppression',
    'قوة': 'strength, power',
    'ضعف': 'weakness',
    'مال': 'wealth, property',
    'فقر': 'poverty',
    'ملك': 'king; possession',
    'ملوك': 'kings',
    'سلطان': 'authority, sultan',
    'امير': 'prince, commander',
    'سيد': 'master, lord',
    'عبد': 'servant, slave',
    'حر': 'free; heat',
    'جود': 'generosity',
    'بخل': 'miserliness',
    # Adjectives common in poetry
    'كبير': 'big, great',
    'صغير': 'small',
    'طويل': 'long, tall',
    'قصير': 'short',
    'جديد': 'new',
    'قديم': 'old, ancient',
    'حسن': 'good, beautiful',
    'جميل': 'beautiful',
    'قبيح': 'ugly',
    'عظيم': 'great, mighty',
    'كثير': 'many, much',
    'قليل': 'few, little',
    'بعيد': 'far, distant',
    'قريب': 'near, close',
    'شديد': 'severe, strong',
    'سريع': 'fast',
    'واسع': 'wide, spacious',
    'ضيق': 'narrow, tight',
    # Verbs common in Jahili poetry
    'ذكر': 'remembered; mentioned',
    'سال': 'asked; flowed',
    'نظر': 'looked',
    'سمع': 'heard',
    'شرب': 'drank',
    'اكل': 'ate',
    'نام': 'slept',
    'قام': 'stood up; rose',
    'جلس': 'sat',
    'خرج': 'went out',
    'دخل': 'entered',
    'فتح': 'opened',
    'اغلق': 'closed',
    'ضرب': 'hit, struck',
    'قتل': 'killed',
    'حمل': 'carried',
    'وضع': 'put, placed',
    'طلب': 'sought, requested',
    'امر': 'commanded',
    'سبق': 'preceded; surpassed',
    'لحق': 'caught up; followed',
    'هرب': 'fled',
    'خاف': 'feared',
    'حسب': 'reckoned, thought',
    'ظن': 'thought, supposed',
    'عرف': 'knew, recognized',
    'جهل': 'was ignorant',
    'احب': 'loved',
    'كره': 'hated',
    'رضي': 'was pleased',
    'غضب': 'was angry',
    'فرح': 'rejoiced',
    'حزن': 'was sad',
    'بكى': 'wept',
    'ضحك': 'laughed',
    'صاح': 'shouted',
    'نادى': 'called out',
    'سكت': 'was silent',
    'تكلم': 'spoke',
    'حدث': 'spoke; happened',
    'روى': 'narrated; watered',
    'غنى': 'sang; was rich',
    'حل': 'settled; solved',
    'شد': 'tightened; was strong',
    'مد': 'extended, stretched',
    'رد': 'returned, replied',
    'عد': 'counted',
    'سد': 'blocked, closed',
    'لذ': 'was pleasant',
    'طعن': 'stabbed, thrust',
    'ذاد': 'defended, drove off',
    'صال': 'attacked, charged',
    'جال': 'wandered; charged',
    'مال': 'inclined; wealth',
    'زار': 'visited',
    'سار': 'walked, traveled',
    'دار': 'turned; house',
    'غار': 'raided; cave',
    'ثار': 'revolted; stirred up',
    'فاز': 'won, triumphed',
    'جاد': 'was generous',
    'ساد': 'led, was chief',
    'قاد': 'led',
    'شاء': 'willed, wished',
    'فاء': 'returned',
    'باء': 'returned; incurred',
    'جزى': 'rewarded, repaid',
    'سقى': 'watered, gave drink',
    'حمى': 'protected',
    'رعى': 'tended, pastured',
    'هدى': 'guided',
    'ولى': 'turned; was in charge',
    # Jahili poetry specific
    'عتاد': 'equipment, gear',
    'منية': 'death, fate',
    'منايا': 'deaths, fates',
    'حمام': 'fate, death; doves',
    'ردى': 'death, ruin',
    'حتف': 'death, doom',
    'نية': 'intention',
    'همة': 'ambition, resolve',
    'عزم': 'determination',
    'حيلة': 'trick, stratagem',
    'غدر': 'treachery',
    'وفاء': 'loyalty, faithfulness',
    'ثار': 'revenge; stirred up',
    'نقع': 'dust (of battle)',
    'وغى': 'din of battle',
    'هيجاء': 'battle (poetic)',
    'كتيبة': 'battalion, troop',
    'جموع': 'multitudes, armies',
    'غارة': 'raid, incursion',
    'سبي': 'captive(s)',
    'غنيمة': 'spoils, booty',
    'فخر': 'pride, boasting',
    'مدح': 'praise',
    'هجاء': 'satire, invective',
    'رثاء': 'elegy, lamentation',
    'نسيب': 'love poetry prelude',
    'وقفة': 'halt, stopping (at ruins)',
    'ظعن': 'departing (women/tribe)',
    'ظعينة': 'departing woman; howdah',
    'هودج': 'howdah, camel litter',
    'حداء': 'camel-driving song',
    'مطية': 'riding camel',
    'مطايا': 'riding camels',
    'رحال': 'saddles; journeys',
    'عقال': 'hobble; headband',
    'قطاة': 'sandgrouse (bird)',
    'حبارى': 'bustard (bird)',
    'بازي': 'falcon',
    'صقر': 'hawk, falcon',
    'نسر': 'vulture; eagle',
    'عنكبوت': 'spider',
    'جراد': 'locusts',
    'يربوع': 'jerboa',
    'ضب': 'spiny-tailed lizard',
    'ورل': 'monitor lizard',
    # Desert/nature terms
    'سراب': 'mirage',
    'قفر': 'wasteland, desolate',
    'فلاة': 'desert, wasteland',
    'تنوفة': 'vast desert',
    'رمل': 'sand',
    'رمال': 'sands',
    'كثيب': 'sand dune',
    'حجر': 'stone',
    'صخر': 'rock',
    'شجر': 'trees',
    'نخل': 'palm trees',
    'عشب': 'grass, herbage',
    'ورد': 'rose; arriving at water',
    'غدير': 'pond, pool',
    'بئر': 'well',
    'نبع': 'spring, source',
    'سيل': 'flood, torrent',
    # More verb forms common in poetry
    'اراد': 'wanted, intended',
    'استطاع': 'was able',
    'اصاب': 'hit, struck; was right',
    'اعطى': 'gave',
    'انزل': 'sent down',
    'اقبل': 'approached, came forward',
    'ادبر': 'turned away, retreated',
    'احسن': 'did well, was good',
    'اساء': 'did evil, wronged',
    'اظهر': 'showed, manifested',
    'اخفى': 'hid, concealed',
    'تعالى': 'was exalted',
    'تولى': 'turned away; took charge',
    'تمنى': 'wished, desired',
    'تذكر': 'remembered',
    'انتظر': 'waited',
    'افتخر': 'boasted, was proud',
    'انتصر': 'was victorious',
    'اجتمع': 'gathered, assembled',
    'افترق': 'separated, parted',
    'استقر': 'settled, stabilized',
    # Five nouns (الأسماء الخمسة) in all forms
    'ابو': 'father of',
    'ابا': 'father (accusative)',
    'ابي': 'my father; father of (genitive)',
    'ابوك': 'your father',
    'ابوه': 'his father',
    'ابوها': 'her father',
    'ابيك': 'your father (gen.)',
    'ابيه': 'his father (gen.)',
    'ابيها': 'her father (gen.)',
    'ابوهم': 'their father',
    'ابونا': 'our father',
    'اباك': 'your father (acc.)',
    'اباه': 'his father (acc.)',
    'اباها': 'her father (acc.)',
    'اخو': 'brother of',
    'اخا': 'brother (accusative)',
    'اخي': 'my brother; brother of (gen.)',
    'اخوك': 'your brother',
    'اخوه': 'his brother',
    'اخاك': 'your brother (acc.)',
    'اخاه': 'his brother (acc.)',
    'اخيك': 'your brother (gen.)',
    'اخيه': 'his brother (gen.)',
    'اخوها': 'her brother',
    'ذو': 'possessor of (m.)',
    'ذا': 'possessor of (acc.); this',
    'ذي': 'possessor of (gen.)',
    'فو': 'mouth of',
    'فاه': 'his mouth',
    'فاك': 'your mouth',
    'حمو': 'father-in-law of',
    # Additional common words for Jahili poetry
    'لعمر': 'by the life of',
    'لعمري': 'by my life (oath)',
    'الا': 'indeed!; except',
    'ايها': 'O! (address)',
    'ايتها': 'O! (f. address)',
    'كلا': 'both; nay!',
    'كلتا': 'both (f.)',
    'كلاهما': 'both of them',
    'بعض': 'some, part of',
    'بعضهم': 'some of them',
    'كلهم': 'all of them',
    'جميع': 'all, everyone',
    'جميعا': 'altogether, all',
    'اجمع': 'all together',
    'اياك': 'you (emphatic); beware!',
    'اياه': 'him (emphatic)',
    'اياها': 'her (emphatic)',
    'اياهم': 'them (emphatic)',
    'عسى': 'perhaps, maybe',
    'لعل': 'perhaps, maybe',
    'لعلك': 'perhaps you',
    'لعله': 'perhaps he',
    'لعلها': 'perhaps she',
    'لكنه': 'but he',
    'لكنها': 'but she',
    'لكنهم': 'but they',
    'لكنني': 'but I',
    'يكن': 'be (jussive)',
    'تكن': 'be (jussive, 2nd/f)',
    'يكد': 'almost',
    'يكاد': 'almost',
    'تكاد': 'she/you almost',
    'اكاد': 'I almost',
    'افلا': 'do not then..?',
    'لئن': 'if indeed',
    'ايا': 'O! (vocative)',
    # Common imperative forms
    'قل': 'say!',
    'قف': 'stop!',
    'عد': 'return!; count!',
    'دع': 'leave! let!',
    'اترك': 'leave!',
    'هات': 'give! bring!',
    'تعال': 'come!',
    'خذ': 'take!',
    'كل': 'eat!; every',
    'انظر': 'look!',
    'اسمع': 'listen!',
    'اذهب': 'go!',
    'ارحل': 'depart!',
    'اقبل': 'come forward!',
    # More past tense forms common in poetry
    'رايتهم': 'I/you saw them',
    'رايتها': 'I/you saw her',
    'رايته': 'I/you saw him',
    'وجدته': 'I/you found him',
    'وجدتها': 'I/you found her',
    'تركته': 'I/you left him',
    'تركتها': 'I/you left her',
    'ابصرت': 'I/she saw, perceived',
    'ابصرته': 'I/you saw him',
    'ابصرتني': 'she/you saw me',
    'دعاني': 'he called me',
    'دعاه': 'he called him',
    'دعاها': 'he called her',
    'رماني': 'he threw at me',
    'رماه': 'he threw him',
    'لقيته': 'I/you met him',
    'لقيتها': 'I/you met her',
    'سالته': 'I/you asked him',
    'سالتها': 'I/you asked her',
    'اعطاني': 'he gave me',
    'اعطاه': 'he gave him',
    'اتاني': 'he came to me',
    'اتاه': 'he came to him',
    'اتاها': 'he came to her',
    'اتانا': 'he came to us',
    'اتاك': 'he came to you',
    'اتيت': 'I/you came',
    'اتتني': 'she came to me',
    # Common broken plurals
    'اعداء': 'enemies',
    'اصحاب': 'companions',
    'ارواح': 'spirits, souls',
    'اجسام': 'bodies',
    'اعمال': 'deeds, works',
    'اقوام': 'peoples, tribes',
    'اخبار': 'news, reports',
    'اشعار': 'poems, poetry',
    'اخوان': 'brothers',
    'اصدقاء': 'friends',
    'اسياف': 'swords',
    'ارماح': 'spears',
    'اسهم': 'arrows',
    'افراس': 'horses',
    'اوطان': 'homelands',
    'اودية': 'valleys',
    'احلام': 'dreams; forbearance',
    'اشراف': 'nobles',
    'ابطال': 'heroes',
    'المنايا': 'deaths, fates',
    'اليدين': 'the two hands',
    'الفوارس': 'the horsemen',
    'معارك': 'battles',
    'مواطن': 'places; citizens',
    'حوادث': 'events, incidents',
    'شواهد': 'witnesses; examples',
    'مشاعر': 'feelings; sacred sites',
    'مصائب': 'calamities',
    'دواهي': 'disasters',
    'لياليا': 'nights (poetic)',
    'عيوب': 'faults, defects',
    # Common verbal nouns (masdar)
    'ذهاب': 'going, departure',
    'رجوع': 'return',
    'دخول': 'entering, entry',
    'خروج': 'going out, exit',
    'وصول': 'arrival',
    'نزول': 'descending',
    'ركوب': 'riding',
    'مسير': 'march, travel',
    'قتال': 'fighting, combat',
    'جهاد': 'striving, struggle',
    'صراع': 'struggle, conflict',
    'طعان': 'thrusting (with spear)',
    'ضراب': 'striking (with sword)',
    'كلام': 'speech, talk',
    'سكوت': 'silence',
    'سؤال': 'question',
    'جواب': 'answer',
    'لقاء': 'meeting, encounter',
    'صداقة': 'friendship',
    'عداوة': 'enmity',
    'زيارة': 'visit',
    'اقامه': 'residence, staying',
    'رحيل': 'departure, journey',
    # Words with alif maqsura (ى→ي after normalization)
    'احدي': 'one of (f.)',
    'اخري': 'other (f.)',
    'كبري': 'greatest (f.)',
    'صغري': 'smallest (f.)',
    'اولي': 'first (f.); those of',
    'دنيا': 'world; lowest',
    'عليا': 'highest (f.)',
    'سفلي': 'lowest',
    'يسري': 'left (side)',
    'يمني': 'right (side)',
    'مني': 'from me; wish',
    'عني': 'from me; about me',
    'لدي': 'at me, with me',
    'الي': 'to me',
    'علي': 'on me; Ali (name)',
    # Additional common conjugated forms (post-normalization)
    'اثنان': 'two',
    'اثنتان': 'two (f.)',
    'احوال': 'states, conditions',
    'احزان': 'sorrows',
    'اخوان': 'brothers',
    'اعداء': 'enemies',
    'اولاد': 'children',
    'اشياء': 'things',
    'اسباب': 'reasons, causes',
    'اعمال': 'deeds, works',
    'اخلاق': 'morals, character',
    'اشجار': 'trees',
    'اطفال': 'children',
    'اصوات': 'voices, sounds',
    'اعضاء': 'members, limbs',
    'اثار': 'traces, effects',
    'اخبار': 'news, reports',
    'انهار': 'rivers',
    'امطار': 'rains',
    'ارواح': 'spirits, souls',
    'اعراب': 'Bedouins; grammatical endings',
    'اعناق': 'necks',
    'اقدام': 'feet; bravery',
    'اطراف': 'edges, extremities',
    'اوتار': 'strings; revenge',
    'اوصاف': 'descriptions',
    'اعلام': 'flags; proper nouns',
    'احداث': 'events',
    'ابراج': 'towers; zodiac signs',
    # Common "fa'il" (active participle) forms
    'قائل': 'saying; speaker',
    'قائم': 'standing; existing',
    'نائم': 'sleeping',
    'ذاهب': 'going',
    'راكب': 'riding',
    'طالب': 'seeking; student',
    'حامل': 'carrying',
    'عالم': 'knowing; scholar; world',
    'سالم': 'safe; Salim',
    'ظالم': 'oppressor',
    'صابر': 'patient',
    'شاكر': 'grateful',
    'ناظر': 'looking; overseer',
    'حاضر': 'present; attending',
    'غائب': 'absent',
    'خائف': 'afraid',
    'خائن': 'traitor',
    'صائم': 'fasting',
    'غادر': 'treacherous; left',
    'قادم': 'coming',
    'عائد': 'returning',
    'زائر': 'visitor',
    'باكي': 'weeping',
    'ساري': 'traveling by night',
    'غازي': 'raider; invader',
    'رامي': 'archer; throwing',
    'داعي': 'caller; inviter',
    'ساقي': 'cupbearer',
    'راعي': 'shepherd; patron',
    'هادي': 'guide',
    'حادي': 'camel-driver',
    'جاري': 'running; neighbor',
    'عادي': 'ordinary; hostile',
    'بادي': 'appearing; Bedouin',
    'ماضي': 'past; sharp',
    'قاضي': 'judge',
    'واقي': 'protective',
    # Common "maf'ul" (passive participle) forms
    'مقتول': 'killed, slain',
    'محمود': 'praised',
    'مسلوب': 'robbed',
    'مجهول': 'unknown',
    'معلوم': 'known',
    'معروف': 'known; good deed',
    'مكتوب': 'written',
    'مكسور': 'broken',
    'مفتوح': 'open',
    'محبوب': 'beloved',
    'مطلوب': 'wanted; required',
    'موجود': 'existing',
    'مفقود': 'lost; missing',
    'محفوظ': 'preserved',
    'مشهور': 'famous',
    'مذكور': 'mentioned',
    'منشور': 'published; spread',
    'مسحور': 'bewitched',
    'ملعون': 'cursed',
    'موعود': 'promised',
    'مولود': 'born',
    # High-frequency unmatched words in Jahili poems
    'يضيء': 'it shines, illuminates',
    'العوالي': 'spear tips; highlands',
    'هيكل': 'large horse; temple',
    'جرداء': 'barren (f.); smooth (horse)',
    'للحرب': 'for war',
    'ذعرت': 'I/she was startled',
    'الظباء': 'the gazelles',
    'ظباء': 'gazelles',
    'رهوا': 'gently, calmly',
    'هام': 'wandered; head(s)',
    'تهلك': 'you/she perishes',
    'سدوله': 'its curtains/darkness',
    'مصابيح': 'lanterns, lamps',
    'تشتكي': 'she/you complains',
    'الاهوال': 'terrors, horrors',
    'نعطي': 'we give',
    'تهز': 'she/you shakes',
    'راهب': 'monk; afraid',
    'رهبان': 'monks',
    'اهوج': 'reckless, wild',
    'يبتغي': 'he seeks, desires',
    'زوراء': 'crooked; Baghdad',
    'منهمر': 'pouring (rain)',
    'هلكت': 'I/she perished',
    'ذقت': 'I/you tasted',
    'مهراقه': 'spilled, shed (blood)',
    'ليبتلي': 'to test, afflict',
    'الاوابد': 'wild animals; lasting things',
    'ربرب': 'herd of gazelles',
    'ثقالا': 'heavily',
    'هوي': 'love, passion; wind',
    'جيت': 'I/you came (dialectal)',
    'باي': 'by which',
    'اتي': 'I come',
}


# ─── Source 3: Proper nouns (names in Jahili poetry) ───

PROPER_NOUNS = {
    # People - Antara
    'عبلة': 'Abla (Antara\'s beloved)',
    'عنترة': 'Antara (poet-warrior)',
    'شداد': 'Shaddad (Antara\'s father)',
    'زبيبة': 'Zubaiba (Antara\'s mother)',
    # People - Imru al-Qays
    'امرؤ': 'Imru\' (person)',
    'حجر': 'Hujr (Imru\' al-Qays\' father)',
    # People - Labid
    'لبيد': 'Labid (poet)',
    'ربيعة': 'Rabi\'a (Labid\'s tribe)',
    # People - Tarafa
    'طرفة': 'Tarafa (poet)',
    # Common names in Jahili poetry
    'عمرو': 'Amr (male name)',
    'عمر': 'Umar (male name)',
    'زيد': 'Zayd (male name)',
    'خالد': 'Khalid (male name)',
    'عامر': 'Amir (male name; clan)',
    'سعد': 'Sa\'d (male name)',
    'سلمى': 'Salma (female name)',
    'ليلى': 'Layla (female name)',
    'هند': 'Hind (female name)',
    'سعاد': 'Su\'ad (female name)',
    'اسماء': 'Asma\' (female name; names)',
    'فاطمة': 'Fatima (female name)',
    'زينب': 'Zaynab (female name)',
    'مية': 'Mayya (female name)',
    'اميمة': 'Umayma (female name)',
    'نعم': 'Nu\'m (female name); yes',
    # Tribes
    'قريش': 'Quraysh (tribe)',
    'تميم': 'Tamim (tribe)',
    'اسد': 'Asad (tribe; lion)',
    'عبس': 'Abs (tribe)',
    'ذبيان': 'Dhubyan (tribe)',
    'غطفان': 'Ghatafan (tribe)',
    'هوازن': 'Hawazin (tribe)',
    'كندة': 'Kinda (tribe)',
    'طيء': 'Tayy (tribe)',
    'بكر': 'Bakr (tribe)',
    'تغلب': 'Taghlib (tribe)',
    'حمير': 'Himyar (tribe)',
    'معد': 'Ma\'add (ancestor/tribe)',
    'نزار': 'Nizar (ancestor/tribe)',
    'عدنان': 'Adnan (ancestor)',
    'قحطان': 'Qahtan (ancestor)',
    'كلاب': 'Kilab (tribe; dogs)',
    'مرة': 'Murra (tribe name; once)',
    'سليم': 'Sulaym (tribe)',
    'هذيل': 'Hudhayl (tribe)',
    'جشم': 'Jusham (tribe)',
    'مازن': 'Mazin (tribe name)',
    'شيبان': 'Shayban (tribe)',
    'ضبة': 'Dabba (tribe)',
    'فزارة': 'Fazara (tribe)',
    'ثقيف': 'Thaqif (tribe)',
    'جرهم': 'Jurhum (tribe)',
    'عاد': 'Aad (ancient tribe)',
    'ثمود': 'Thamud (ancient tribe)',
    'قيس': 'Qays (tribe; male name)',
    # Places
    'الحجاز': 'Hijaz (region in Arabia)',
    'حجاز': 'Hijaz (region)',
    'نجد': 'Najd (highland region)',
    'تهامة': 'Tihama (coastal plain)',
    'يمن': 'Yemen',
    'اليمن': 'Yemen',
    'مكة': 'Mecca',
    'يثرب': 'Yathrib (old name of Medina)',
    'عكاظ': 'Ukaz (market/fair)',
    'دارة': 'Dara (place)',
    'سقط': 'Siqt (place)',
    'اللوى': 'al-Liwa (place)',
    'الدخول': 'al-Dukhul (place)',
    'حومل': 'Hawmal (place)',
    'توضح': 'Tawdih (place)',
    'المقراة': 'al-Miqra (place)',
    'عنيزة': 'Unayza (place)',
    'ذات': 'Dhat (place prefix; possessor of)',
    'دارين': 'Darin (trading port)',
    'خيبر': 'Khaybar (oasis)',
    'بصرى': 'Busra (city in Sham)',
    'شام': 'Sham (Syria/Levant)',
    'عراق': 'Iraq',
    'فارس': 'Persia; horseman',
    'روم': 'Byzantines, Romans',
    'حبشة': 'Abyssinia',
    'مصر': 'Egypt',
    # Additional names frequent in poems
    'عوف': 'Awf (male name; clan)',
    'ثعل': 'Tha\'lab (tribe)',
    'زهير': 'Zuhayr (poet/name)',
    'عبيد': 'Ubayd (male name)',
    'حارثه': 'Haritha (male name)',
    'ربيع': 'Rabi\' (name; spring)',
    'حارث': 'Harith (male name)',
    'عتيبه': 'Utayba (tribe)',
    'نهد': 'Nahd (tribe)',
    'جذيمه': 'Judhayma (name)',
    'حصين': 'Husayn (name; fortified)',
}


# ─── Main logic ───

def load_dictionary():
    """Load existing dictionary.json."""
    if os.path.exists(DICT_PATH):
        with open(DICT_PATH, encoding='utf-8') as f:
            data = json.load(f)
        return data.get('entries', {})
    return {}


def save_dictionary(entries):
    """Save dictionary.json preserving format."""
    data = {
        'version': 1,
        'entries': entries
    }
    with open(DICT_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def extract_poem_words(poet_ids):
    """Extract all unique bare words from poems for given poets."""
    all_words = set()
    per_poet = {}

    for poet_id in poet_ids:
        path = os.path.join(POEMS_DIR, f'{poet_id}.json')
        if not os.path.exists(path):
            print(f"  WARNING: Poem file not found: {path}", file=sys.stderr)
            continue
        with open(path, encoding='utf-8') as f:
            poems = json.load(f)

        words = set()
        for poem in poems:
            for verse in poem.get('verses', []):
                for half in [verse.get('sadr', ''), verse.get('ajuz', '')]:
                    for w in ARABIC_WORD_RE.findall(half):
                        b = bare(w)
                        # Skip single characters and empty strings
                        if len(b) >= 2:
                            words.add(b)

        per_poet[poet_id] = words
        all_words |= words

    return all_words, per_poet


def word_matches_dictionary(word, dictionary):
    """Check if a word can be matched using the same logic as vocab-matcher.ts."""
    variants = generate_variants(word)
    for v in variants:
        if v in dictionary:
            return True
    return False


def count_coverage(words, dictionary):
    """Count how many words from a set match in the dictionary."""
    matched = sum(1 for w in words if word_matches_dictionary(w, dictionary))
    return matched, len(words)


def main():
    parser = argparse.ArgumentParser(description='Generate vocabulary entries for Arabic poems')
    parser.add_argument('poets', nargs='*', default=DEFAULT_POETS,
                        help='Poet IDs to process (default: all 4 pre-Islamic poets)')
    args = parser.parse_args()

    print("=" * 60)
    print("  Dictionary Entry Generator for Pre-Islamic Poems")
    print("=" * 60)
    print()

    # Load existing dictionary
    dictionary = load_dictionary()
    original_size = len(dictionary)
    print(f"Existing dictionary: {original_size} entries")

    # Extract all poem words
    print(f"\nExtracting words from: {', '.join(args.poets)}")
    all_words, per_poet = extract_poem_words(args.poets)
    print(f"Total unique bare words: {len(all_words)}")

    # Report initial coverage
    print("\n--- Initial Coverage ---")
    for poet_id, words in per_poet.items():
        matched, total = count_coverage(words, dictionary)
        pct = (matched / total * 100) if total else 0
        print(f"  {poet_id:20s}: {matched:5d}/{total:5d} = {pct:.1f}%")

    # Find unmatched words
    unmatched = set()
    for w in all_words:
        if not word_matches_dictionary(w, dictionary):
            unmatched.add(w)
    print(f"\nUnmatched words to resolve: {len(unmatched)}")

    # ─── Source 1: Hardcoded common words (highest quality, add first) ───
    print("\n[1/5] Adding hardcoded common words...")
    added_common = 0
    for word, meaning in COMMON_WORDS.items():
        if word not in dictionary:
            dictionary[word] = meaning
            added_common += 1

    still_unmatched1 = set()
    for w in all_words:
        if not word_matches_dictionary(w, dictionary):
            still_unmatched1.add(w)
    print(f"  Added common words: {added_common}")
    print(f"  Still unmatched: {len(still_unmatched1)}")

    # ─── Source 2: Proper nouns ───
    print("\n[2/5] Adding proper nouns...")
    added_proper = 0
    for word, meaning in PROPER_NOUNS.items():
        if word not in dictionary:
            dictionary[word] = meaning
            added_proper += 1

    still_unmatched2 = set()
    for w in all_words:
        if not word_matches_dictionary(w, dictionary):
            still_unmatched2.add(w)
    print(f"  Added proper nouns: {added_proper}")
    print(f"  Still unmatched: {len(still_unmatched2)}")

    # ─── Source 3: Hans Wehr (only for words not yet matched) ───
    print("\n[3/5] Loading Hans Wehr dictionary...")
    hw = load_hans_wehr()
    print(f"  Hans Wehr entries loaded: {len(hw)}")

    added_hw = 0
    for word in sorted(still_unmatched2):
        # Skip if already matched (by common words/proper nouns)
        if word_matches_dictionary(word, dictionary):
            continue
        # Try direct match first
        if word in hw:
            dictionary[word] = hw[word]
            added_hw += 1
            continue
        # Try TS-style variants (these are what the frontend generates)
        found = False
        for v in generate_variants(word):
            if v in hw and v not in dictionary:
                dictionary[v] = hw[v]
                added_hw += 1
                found = True
                break
        if found:
            continue
        # Try morph variants against HW (adds the word directly to dictionary)
        for mv in generate_morph_variants(word):
            if mv in hw:
                dictionary[word] = hw[mv]
                added_hw += 1
                break

    # Recalculate unmatched after HW
    still_unmatched3 = set()
    for w in all_words:
        if not word_matches_dictionary(w, dictionary):
            still_unmatched3.add(w)
    print(f"  Added from Hans Wehr: {added_hw}")
    print(f"  Still unmatched: {len(still_unmatched3)}")

    # ─── Source 4: Morphological expansion against enlarged dictionary ───
    print("\n[4/5] Morphological expansion (conjugation/plural stripping)...")
    added_morph = 0
    for word in sorted(still_unmatched3):
        morph_variants = generate_morph_variants(word)
        for mv in morph_variants:
            if mv in dictionary:
                dictionary[word] = dictionary[mv]
                added_morph += 1
                break
            elif mv in hw:
                dictionary[word] = hw[mv]
                added_morph += 1
                break

    still_unmatched4 = set()
    for w in all_words:
        if not word_matches_dictionary(w, dictionary):
            still_unmatched4.add(w)
    print(f"  Added via morphology: {added_morph}")
    print(f"  Still unmatched: {len(still_unmatched4)}")

    # ─── Source 5: Second morphological pass ───
    print("\n[5/5] Second morphological pass...")
    added_morph2 = 0
    for word in sorted(still_unmatched4):
        morph_variants = generate_morph_variants(word)
        for mv in morph_variants:
            if mv in dictionary:
                dictionary[word] = dictionary[mv]
                added_morph2 += 1
                break
            elif mv in hw:
                dictionary[word] = hw[mv]
                added_morph2 += 1
                break

    still_unmatched5 = set()
    for w in all_words:
        if not word_matches_dictionary(w, dictionary):
            still_unmatched5.add(w)
    print(f"  Added via 2nd pass: {added_morph2}")
    print(f"  Still unmatched: {len(still_unmatched5)}")

    # ─── Save ───
    save_dictionary(dictionary)
    new_size = len(dictionary)
    print(f"\n{'=' * 60}")
    print(f"  RESULTS")
    print(f"{'=' * 60}")
    print(f"  Dictionary: {original_size} → {new_size} entries (+{new_size - original_size})")
    print(f"  Sources:")
    print(f"    Common words: +{added_common}")
    print(f"    Proper nouns: +{added_proper}")
    print(f"    Hans Wehr:    +{added_hw}")
    print(f"    Morphology:   +{added_morph}")
    print(f"    Morph pass 2: +{added_morph2}")
    total_added = added_hw + added_common + added_proper + added_morph + added_morph2
    print(f"    TOTAL:        +{total_added}")

    # Final coverage
    print(f"\n--- Final Coverage ---")
    all_matched = 0
    all_total = 0
    for poet_id, words in per_poet.items():
        matched, total = count_coverage(words, dictionary)
        pct = (matched / total * 100) if total else 0
        all_matched += matched
        all_total += total
        print(f"  {poet_id:20s}: {matched:5d}/{total:5d} = {pct:.1f}%")
    overall = (all_matched / all_total * 100) if all_total else 0
    print(f"  {'OVERALL':20s}: {all_matched:5d}/{all_total:5d} = {overall:.1f}%")

    # Show sample unmatched words
    if still_unmatched5:
        sample = sorted(still_unmatched5)[:30]
        print(f"\n  Sample unmatched ({len(still_unmatched5)} total):")
        for w in sample:
            print(f"    {w}")

    print()


if __name__ == '__main__':
    main()
