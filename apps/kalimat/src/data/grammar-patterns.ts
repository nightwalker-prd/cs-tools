import type { GrammarPattern, PatternCategory } from '@/types';

export const grammarPatterns: GrammarPattern[] = [
  {
    "id": 1,
    "form": "فَعَلَ",
    "formD": "فعل",
    "changeId": "Past, Verb, Third, Masculine, Singular",
    "friendlyName": "Basic Action or Thing",
    "count": 25081,
    "formDesc": "Join root letters with vowels",
    "explanation": "This is the most basic pattern in Arabic. It can create both verbs and nouns. For verbs, it usually shows past actions. For nouns, it can create any type of noun - concrete things you can touch, abstract ideas, feelings, or results of actions. The vowels can change (َ ِ ُ) to give different shades of meaning.",
    "affixes": {
      "suffix": {
        "add": "َ"
      },
      "infix_1": {
        "add": "َ"
      },
      "infix_2": {
        "add": "َ"
      }
    },
    "example": {
      "before_word": "ك ت ب",
      "before_meaning": "root meaning: writing/recording",
      "after_word": "كَتَبَ",
      "after_meaning": "he wrote"
    },
    "similar": {
      "reason": "They are all basic past-tense or closely related forms (adding suffixes for who did the action or shifting to passive).",
      "similarPatternIds": [
        12,
        35,
        47
      ]
    },
    "category": "verb"
  },
  {
    "id": 2,
    "form": "الفعل",
    "formD": "الفعل",
    "changeId": "Definiteness",
    "friendlyName": "Adding 'the' prefix",
    "count": 10455,
    "formDesc": "Add ال at the beginning",
    "explanation": "The Arabic prefix ال (al-) is like the English word 'the' - it makes words specific instead of general. For example, كِتَاب (kitaab) means 'a book' but الكِتَاب (al-kitaab) means 'the book', like in the Quranic word الكِتَاب which refers to 'the Book' (meaning the Quran). Similarly, مَسْجِد (masjid) means 'a mosque' but المَسْجِد (al-masjid) means 'the mosque', as in المَسْجِد الحَرَام (al-masjid al-haraam) which refers to the specific Sacred Mosque in Mecca. In addition to specifying something particular, ال can also refer to an entire category (اسم الجنس), like الْإِنْسَان (humankind), or an abstract concept, like الْعَدْل (justice). Adding ال to the beginning of a word helps us know we're talking about something particular rather than just any general thing.",
    "affixes": {
      "prefix": {
        "add": "ال"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book (any book)",
      "after_word": "الكِتَاب",
      "after_meaning": "the book (specific book)"
    },
    "similar": {
      "reason": "All are short (often single-letter) prefixes that attach to the beginning of a word and give it a new grammatical or connecting function (e.g., 'the', 'and', 'so', 'to', 'with', 'like', 'O').",
      "similarPatternIds": [
        3,
        16,
        10,
        24,
        60,
        69
      ]
    },
    "category": "other"
  },
  {
    "id": 3,
    "form": "وفعل",
    "formD": "وفعل",
    "changeId": "Conjunction",
    "friendlyName": "Add 'and' at start",
    "count": 9237,
    "formDesc": "Add و at the beginning",
    "explanation": "This pattern is one of the most common and useful patterns in Arabic - it simply adds the letter وَ (wa) at the beginning of a word to mean 'and'. When you see وَ at the start, it's connecting two or more things together, like in وَقَالَ (and he said) or وَيَعْلَمُ (and he knows). It works just like 'and' in English, letting you join related ideas, actions or things. For example, in the Quran you'll often see phrases like وَاللهُ (and Allah) or وَقَالُوا (and they said) connecting different parts of verses together. There's also a similar pattern using فَ (fa) instead of وَ which means 'then' or 'so', showing that one thing happens after another, like in فَقَالَ (then he said). This pattern not only connects words but also entire sentences, as in وَٱللَّهُ غَفُورٌ رَّحِيمٌ (And Allah is Forgiving, Merciful). Unlike فَ (then/so), which shows sequence, وَ simply joins ideas without implying order. It applies to actions, descriptions, and even standalone statements.",
    "affixes": {
      "prefix": {
        "add": "و"
      }
    },
    "example": {
      "before_word": "قَالَ",
      "before_meaning": "he said",
      "after_word": "وَقَالَ",
      "after_meaning": "and he said"
    },
    "similar": {
      "reason": "They all add a short prefix at the beginning that connects or modifies meaning in a simple way (and, then, to, with, like, O, the...).",
      "similarPatternIds": [
        2,
        16,
        10,
        24,
        60,
        69
      ]
    },
    "category": "prefix"
  },
  {
    "id": 4,
    "form": "فعّل",
    "formD": "فعل",
    "changeId": "Intensive",
    "friendlyName": "Double Middle Letter",
    "count": 8482,
    "formDesc": "Double a letter by adding shadda",
    "explanation": "This pattern makes words stronger by doubling the middle letter with a shadda. It can mean: 1) Doing something a lot, like قَطَّعَ (cut a lot). 2) A job, like خَبَّاز (baker). 3) Making someone do something, like عَلَّمَ (taught).",
    "affixes": {
      "infix_2": {
        "add": "ّ"
      }
    },
    "example": {
      "before_word": "عَلَمَ",
      "before_meaning": "he knew",
      "after_word": "عَلَّمَ",
      "after_meaning": "he taught (made someone know)"
    },
    "similar": {
      "reason": "They add or involve a shadda (double letter) to intensify or emphasize the action/quality in some way.",
      "similarPatternIds": [
        54,
        72,
        86,
        81
      ]
    },
    "category": "noun"
  },
  {
    "id": 5,
    "form": "فعلِ",
    "formD": "فعل",
    "changeId": "Genitive",
    "friendlyName": "Shows Ownership or Connection",
    "count": 7236,
    "formDesc": "Add كسرة at the end",
    "explanation": "This pattern shows up in several situations in Arabic. The main uses are: (1) after connecting words (prepositions) like مِن (from), في (in), or إلى (to) - for example مِنَ البَيتِ (from the house), (2) when something belongs to or is connected with another word, like in كِتابُ اللهِ (Allah's book) where the ِ shows Allah owns or is connected to the book. The pattern can appear with ِ (kasra) at the end to show specific connection like بَيتِ (of the house), or with ٍ (tanween kasra) like بَيتٍ (of a house) for general connection. You'll see this in common phrases like بِسمِ اللهِ (in the name of Allah) which combines both uses. The pattern also appears after words that express quantity like ثَلاثَةُ أَيَّامٍ (three days), after words that express possibility or frequency like رُبَّ (perhaps/many), and in phrases that express qualities or attributes like عَظِيمُ الشَّأْنِ (of great importance). This pattern is also used after words that indicate times and events, such as يَومِ الجُمُعَةِ (Friday) or لَيلَةِ القَدرِ (the Night of Decree), showing a connection between the event and time. It appears after words that show part of something, like نِصفِ الكِتابِ (half of the book) or bَعضِ القَومِ (some of the people), marking a relationship between the whole and its part. It is also found in oaths when وَ (wa) is used to swear by something, like وَالشَّمْسِ (By the sun) or وَالسَّابِحَاتِ (By those who glide), where the ِ follows the oath structure. Another common use is in titles or roles, such as أَمِيرِ المُؤمِنِينَ (Commander of the Faithful) or خَلِيفَةِ الرَّسُولِ (Successor of the Messenger), where the ِ indicates authority or association. In the Quran, you'll often see this pattern in beautiful phrases that combine multiple uses, like رَبِّ العَالَمِينَ (Lord of the worlds) or مَالِكِ يَوْمِ الدِّينِ (Master of the Day of Judgment).",
    "affixes": {
      "suffix": {
        "add": "ِ"
      }
    },
    "example": {
      "before_word": "الله",
      "before_meaning": "Allah",
      "after_word": "اللهِ",
      "after_meaning": "of Allah/Allah's"
    },
    "similar": {
      "reason": "They all add a short vowel or tanween ending (-َ, -ًا, -ِ, -ٍ, -ُ, -ٌ) to show different grammatical roles (case endings).",
      "similarPatternIds": [
        11,
        6,
        19,
        9,
        28
      ]
    },
    "category": "suffix"
  },
  {
    "id": 6,
    "form": "فعلَ",
    "formD": "فعل",
    "changeId": "Noun/Verb Ending: Action Happens To / Should Happen",
    "friendlyName": "Thing Being Acted On / Verb 'Should'",
    "count": 4742,
    "formDesc": "Ends with َ (fatha sound)",
    "explanation": "When a word ends with the sound َ (fatha): 1) For nouns, it often shows what the action is happening to. Like الْكِتَابَ (al-kitaaba - the book) in 'I read the book'. 2) For present tense verbs (like يَفْعَلُ), changing the end to ـَ means it 'should' or 'might' happen, or happens after words like 'that' or 'in order to'. Example: لِيَذْهَبَ (li-yadhhaba - so that he may go). (Remember, simple past verbs ending in ـَ mean 'he did').",
    "affixes": {
      "suffix": {
        "add": "َ"
      }
    },
    "example": {
      "before_word": "كِتَاب (noun)",
      "before_meaning": "book",
      "after_word": "كِتَابَ",
      "after_meaning": "the book (as the thing the action happens to)"
    },
    "similar": {
      "reason": "They all add a short vowel or tanween ending (-َ, -ًا, -ِ, -ٍ, -ُ, -ٌ) to show different grammatical roles for nouns or verbs.",
      "similarPatternIds": [
        5,
        11,
        19,
        9,
        28,
        1,
        42,
        53
      ]
    },
    "category": "verb"
  },
  {
    "id": 7,
    "form": "يُفعل",
    "formD": "يفعل",
    "changeId": "'Is Being Done To' Prefix (Now)",
    "friendlyName": "Is Being Done To (Now)",
    "count": 4668,
    "formDesc": "Starts with يُـ (yu) or تُـ (tu) sound.",
    "explanation": "When a verb starts with a يُـ (yu) or تُـ (tu) sound, it often means the action is being done *to* the subject, not *by* the subject. For example, يَكْتُبُ (yaktubu - he writes) starts with يَـ (ya). But يُكْتَبُ (yuktabu - it is written) starts with يُـ (yu). The يُـ tells you the thing isn't doing the writing, it's being written. Contrast the starting يُـ (yu) here with a يَـ (ya) start, which usually means the subject *is doing* the action.",
    "affixes": {
      "prefix": {
        "add": "يُ"
      }
    },
    "example": {
      "before_word": "يَكْتُبُ",
      "before_meaning": "he writes",
      "after_word": "يُكْتَبُ",
      "after_meaning": "it is written"
    },
    "similar": {
      "reason": "They add a prefix (يُـ, تُـ, نُـ, أُـ) to show an action is being done TO the subject right now.",
      "similarPatternIds": [
        53,
        31,
        62,
        73,
        77,
        83,
        76
      ]
    },
    "category": "other"
  },
  {
    "id": 9,
    "form": "فعلُ",
    "formD": "فعل",
    "changeId": "Noun/Verb Ending: The Doer / Is Doing",
    "friendlyName": "The Doer Marker / Verb 'Is Doing'",
    "count": 4265,
    "formDesc": "Ends with ُ (damma sound)",
    "explanation": "When a word ends with the sound ُ (damma): 1) For nouns, it tells you this word is the main 'doer' or subject. Like اللهُ (Allahu) in 'Allah is One'. 2) For present tense verbs**, this is the standard ending that shows the action *is happening* now. Like يَكْتُبُ (yaktub**u** - he is writing / he writes). Changing this ending changes the verb's meaning.",
    "affixes": {
      "suffix": {
        "add": "ُ"
      }
    },
    "example": {
      "before_word": "الرَّسُول (noun)",
      "before_meaning": "the Messenger",
      "after_word": "الرَّسُولُ",
      "after_meaning": "the Messenger (as the doer of an action)"
    },
    "similar": {
      "reason": "They all add a short vowel or tanween ending (-َ, -ًا, -ِ, -ٍ, -ُ, -ٌ) to show different grammatical roles for nouns or verbs.",
      "similarPatternIds": [
        5,
        11,
        6,
        19,
        28,
        53,
        42
      ]
    },
    "category": "verb"
  },
  {
    "id": 10,
    "form": "لفعل",
    "formD": "لفعل",
    "changeId": "Prefix for 'To', 'For', or 'Surely'",
    "friendlyName": "Adding Direction or Emphasis",
    "count": 3858,
    "formDesc": "Adds لـ (la/li/lee) at the beginning",
    "explanation": "Adding لـ (L sound) at the start changes meaning. لِـ (li) often means 'to' or 'for', like لِلْبَيْتِ (lil-bayti - for the house). لَـ (la) makes it stronger, meaning 'surely', like لَأَنْتُمْ (la antum - surely you!). لِيَـ (liya) means 'so that', like لِيَعْبُدُوا (li ya'budoo - so that they worship). Sometimes it's extra strong with a shadda لَّـ (lla) meaning 'most surely!'.",
    "affixes": {
      "prefix": {
        "add": "ل"
      }
    },
    "example": {
      "before_word": "النَّاس",
      "before_meaning": "the people",
      "after_word": "لِلنَّاسِ",
      "after_meaning": "for the people"
    },
    "similar": {
      "reason": "They're short-letter prefixes that alter meaning (to/for, and, then, with, like, O, etc.).",
      "similarPatternIds": [
        3,
        16,
        24,
        69,
        2
      ]
    },
    "category": "other"
  },
  {
    "id": 11,
    "form": "فعلًا",
    "formD": "فعلا",
    "changeId": "Noun Ending: Thing Acted On ('a...') or How",
    "friendlyName": "Thing Acted On or How",
    "count": 3708,
    "formDesc": "Noun ends with ـًا (an sound)",
    "explanation": "When a noun ends with the sound ـًا (an), it usually tells you one of two things: 1) It's a general thing ('a thing', not 'the thing') that the action is happening to, like كِتَابًا (kitaaban - a book) in 'I read a book'. 2) It tells you how the action was done, like سَرِيعًا (saree'an - quickly) in 'He ran quickly'. Sometimes it shows a state, like جَمِيعًا (jamee'an - all together). Verbs don't usually end this way.",
    "affixes": {
      "suffix": {
        "add": "اً"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book",
      "after_word": "كِتَابًا",
      "after_meaning": "a book (as the thing the action happens to)"
    },
    "similar": {
      "reason": "They all add a short vowel or tanween ending (-َ, -ًا, -ِ, -ٍ, -ُ, -ٌ) to show different grammatical roles for nouns.",
      "similarPatternIds": [
        5,
        6,
        19,
        9,
        28
      ]
    },
    "category": "noun"
  },
  {
    "id": 12,
    "form": "فعلوا",
    "formD": "فعلوا",
    "changeId": "They Did It (Past)",
    "friendlyName": "Group Action Marker (Past)",
    "count": 3658,
    "formDesc": "Ends with ـُوا (oo sound)",
    "explanation": "Adding ـُوا (oo sound) to the end of a past tense verb shows that 'they' (a group of people, usually men or mixed) did the action. Like آمَنَ (aamana - he believed) becomes آمَنُوا (aamanoo - they believed). It's for past actions done by a group.",
    "affixes": {
      "suffix": {
        "add": "وا"
      }
    },
    "example": {
      "before_word": "آمَنَ",
      "before_meaning": "he believed",
      "after_word": "آمَنُوا",
      "after_meaning": "they believed"
    },
    "similar": {
      "reason": "They are all past-tense verb endings that show who did it (they, you all, etc.).",
      "similarPatternIds": [
        15,
        35,
        75,
        50,
        80
      ]
    },
    "category": "verb"
  },
  {
    "id": 13,
    "form": "فعله",
    "formD": "فعله",
    "changeId": "Adding 'his' or 'him'",
    "friendlyName": "Adding 'his' or 'him'",
    "count": 3550,
    "formDesc": "Add ـه (hu or hi sound) at the end",
    "explanation": "Adding a ه (h sound, often like 'hu' or 'hi') to the end of a word usually means 'his' or 'him'. For example, كِتَابُهُ (kitaabuhu) means 'his book'. رَبُّهُ (rabbuhu) means 'his Lord'. Sometimes it sounds like 'hi' (ـهِ) after certain sounds. This little ending shows who owns something ('his house') or who the action affects ('helped him').",
    "affixes": {
      "suffix": {
        "add": "ه"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book",
      "after_word": "كِتَابُهُ",
      "after_meaning": "his book"
    },
    "similar": {
      "reason": "All are pronoun-suffix patterns showing possession or object connection (his, her, their, your, my, our, etc.).",
      "similarPatternIds": [
        14,
        22,
        23,
        32,
        37,
        45,
        88,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 14,
    "form": "فعلهم",
    "formD": "فعلهم",
    "changeId": "Adding 'their' or 'them'",
    "friendlyName": "Adding Their or Them",
    "count": 3523,
    "formDesc": "Add ـهم (hum or him sound) at the end",
    "explanation": "Adding هم (hum sound) to the end of a word means 'their' or 'them' (for a group of people, usually men or mixed). For example, كِتَابُهُمْ (kitaabuhum) means 'their book'. يَعْلَمُهُمْ (ya'lamuhum) means 'he knows them'. Sometimes it sounds like 'him' (ـهِمْ) after an 'ee' sound. It shows ownership ('their house') or that the action affects them ('Allah guided them').",
    "affixes": {
      "suffix": {
        "add": "هم"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book",
      "after_word": "كِتَابُهُمْ",
      "after_meaning": "their book"
    },
    "similar": {
      "reason": "They all attach pronoun suffixes showing possession or object (e.g., his, their, your, my, our, etc.).",
      "similarPatternIds": [
        13,
        22,
        23,
        32,
        37,
        45,
        88,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 15,
    "form": "فعلون",
    "formD": "فعلون",
    "changeId": "They Do It (Now)",
    "friendlyName": "Makes Word Mean 'They Do'",
    "count": 3149,
    "formDesc": "Ends with ـُونَ (oona sound)",
    "explanation": "Adding ـُونَ (oona) to the end of a present tense verb shows that 'they' (a group of people, usually men or mixed) are doing the action right now. For example, يَكْتُبُ (yaktubu - he writes) becomes يَكْتُبُونَ (yaktuboona - they write). يَعْلَمُ (ya'lamu - he knows) becomes يَعْلَمُونَ (ya'lamoona - they know).",
    "affixes": {
      "suffix": {
        "add": "ون"
      }
    },
    "example": {
      "before_word": "يَعْلَمُ",
      "before_meaning": "he knows",
      "after_word": "يَعْلَمُونَ",
      "after_meaning": "they know"
    },
    "similar": {
      "reason": "They all use a suffix to indicate plural doers (or receivers) in verbs/nouns, like men doing something, women doing something, or two people.",
      "similarPatternIds": [
        12,
        21,
        75,
        50
      ]
    },
    "category": "other"
  },
  {
    "id": 16,
    "form": "فَفعل",
    "formD": "ففعل",
    "changeId": "Adding 'so' or 'then'",
    "friendlyName": "Adds 'Then' or 'So'",
    "count": 3042,
    "formDesc": "Add فَـ (fa) at the beginning",
    "explanation": "Adding فَـ (fa) at the start of a word often means 'so' or 'then'. It connects actions, showing one happens after or because of another. For example, دَخَلَ (dakhala - he entered) becomes فَدَخَلَ (fa dakhala - then he entered). In the Quran, فَسَجَدَ الْمَلَائِكَةُ (fa sajada al-malaa'ikatu - so the angels prostrated) shows their action happened because Allah told them to.",
    "affixes": {
      "prefix": {
        "add": "فَ"
      }
    },
    "example": {
      "before_word": "دَخَلَ",
      "before_meaning": "he entered",
      "after_word": "فَدَخَلَ",
      "after_meaning": "then he entered"
    },
    "similar": {
      "reason": "They're single-letter (or very short) prefixes that link or modify words (and, so, to, with, like, O, etc.).",
      "similarPatternIds": [
        3,
        2,
        10,
        24,
        60,
        69
      ]
    },
    "category": "other"
  },
  {
    "id": 19,
    "form": "فعلٍ",
    "formD": "فعل",
    "changeId": "Noun Ending: Shows Belonging ('of a...')",
    "friendlyName": "General Connection ('of a')",
    "count": 2529,
    "formDesc": "Noun ends with ٍ (in sound)",
    "explanation": "When a noun ends with the sound ٍ (in), it's like saying 'of a...' It makes the word general, not specific ('a thing', not 'the thing'). Used after words like مِنْ (min - from) or shows belonging. Like مِنْ كِتَابٍ (min kitaabin) means 'from a book'. نُورُ يَوْمٍ (nooru yawmin) means 'light of a day'. Verbs don't usually end this way.",
    "affixes": {
      "suffix": {
        "add": "ٍ"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book",
      "after_word": "كِتَابٍ",
      "after_meaning": "a book (when used after words like 'from' or 'of')"
    },
    "similar": {
      "reason": "They all add a short vowel or tanween ending (-َ, -ًا, -ِ, -ٍ, -ُ, -ٌ) to show different grammatical roles for nouns.",
      "similarPatternIds": [
        5,
        11,
        6,
        28,
        9
      ]
    },
    "category": "noun"
  },
  {
    "id": 20,
    "form": "فعلة",
    "formD": "فعلة",
    "changeId": "Makes Word Female or Shows One Time",
    "friendlyName": "Makes Female or One Time",
    "count": 2527,
    "formDesc": "Add ة (ـah sound, sometimes ـat) at the end",
    "explanation": "Adding ة (usually sounds like 'ah' at the end of a word) often does two things: 1) Makes a word female. Like كَاتِب (kaatib - writer) becomes كَاتِبَة (kaatibah - female writer). You see مُؤْمِن (mu'min - male believer) and مُؤْمِنَة (mu'minah - female believer). 2) Shows just one single time an action happens. Like ضَرْب (darb - hitting) can become ضَرْبَة (darbah - a single hit).",
    "affixes": {
      "suffix": {
        "add": "ة"
      }
    },
    "example": {
      "before_word": "مُؤْمِن",
      "before_meaning": "believer (male)",
      "after_word": "مُؤْمِنَة",
      "after_meaning": "believer (female)"
    },
    "similar": {
      "reason": "No direct match found",
      "similarPatternIds": []
    },
    "category": "other"
  },
  {
    "id": 21,
    "form": "فعلين",
    "formD": "فعلين",
    "changeId": "Shows Two Things or Many Things",
    "friendlyName": "Shows Two or Many",
    "count": 2417,
    "formDesc": "Ends with ـَينِ (ayni) or ـِينَ (eena)",
    "explanation": "Adding ين at the end of a word can mean two different things! 1) If it sounds like ـَيْنِ (ayni), it means exactly *two* of something. Like وَالِدَيْنِ (waalidayni - two parents). 2) If it sounds like ـِينَ (eena), it means *many* of something (plural). Like مُسْلِمِينَ (muslimeena - Muslims). You need to listen to the sound before the ين to know if it's two or many! Usually used when the word is receiving an action or after words like 'from'/'in'.",
    "affixes": {
      "suffix": {
        "add": "ين"
      }
    },
    "example": {
      "before_word": "مُؤْمِن",
      "before_meaning": "believer",
      "after_word": "مُؤْمِنِين",
      "after_meaning": "believers (plural)"
    },
    "similar": {
      "reason": "They use a suffix to form plurals/duals (ين, ون, ات, etc.), indicating more than one or exactly two of something.",
      "similarPatternIds": [
        15,
        39,
        75,
        79,
        104
      ]
    },
    "category": "other"
  },
  {
    "id": 22,
    "form": "فعلنا",
    "formD": "فعلنا",
    "changeId": "Adding 'we', 'us', or 'our'",
    "friendlyName": "Adding We/Us/Our",
    "count": 2362,
    "formDesc": "Add نا (naa) at the end",
    "explanation": "Adding نا (naa) at the end of a word connects it to 'we', 'us', or 'our'. 1) On a past verb like فَعَلْنَا (fa'alnaa), it means 'we did it'. Like خَلَقْنَا (khalaqnaa) means 'We created'. 2) On a passive verb like فُعِلْنَا (fu'ilnaa), it means 'it was done to us'. Like هُدِينَا (hudeenaa) means 'we were guided'. 3) On a noun like كِتَابُنَا (kitaabunaa), it means 'our book'. رَبَّنَا (Rabbanaa) means 'Our Lord'.",
    "affixes": {
      "suffix": {
        "add": "نا"
      }
    },
    "example": {
      "before_word": "خَلَقَ",
      "before_meaning": "he created",
      "after_word": "خَلَقْنَا",
      "after_meaning": "we created"
    },
    "similar": {
      "reason": "All are pronoun suffixes or endings that show 'we/our' or other persons (their, his, your, etc.).",
      "similarPatternIds": [
        14,
        13,
        23,
        32,
        37,
        45,
        88,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 23,
    "form": "فعلكم",
    "formD": "فعلكم",
    "changeId": "Adding 'your' or 'you' (for a group)",
    "friendlyName": "Adding 'you all' ending",
    "count": 2310,
    "formDesc": "Add كم (kum) at the end",
    "explanation": "Adding كم (kum) to the end of a word means 'your' or 'you' when talking to a group of people (you all). For example, رَبُّكُمْ (Rabbukum) means 'your Lord'. It can also show the action happens *to* you all, like يَدْعُوكُمْ (yad'ookum) meaning 'He calls you all'. There's a special ending ـكُمَا (kumaa) for just two people (Pattern 98), and ـكُنَّ (kunna) for only women.",
    "affixes": {
      "suffix": {
        "add": "كم"
      }
    },
    "example": {
      "before_word": "رَبّ",
      "before_meaning": "Lord",
      "after_word": "رَبُّكُمْ",
      "after_meaning": "your (plural) Lord"
    },
    "similar": {
      "reason": "They all are pronoun suffixes (كم, هم, ها, نا, etc.) showing ownership or object for multiple or single people.",
      "similarPatternIds": [
        14,
        13,
        22,
        32,
        37,
        45,
        88,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 24,
    "form": "بفعل",
    "formD": "بفعل",
    "changeId": "Adding 'with' or 'by'",
    "friendlyName": "Adding 'with' or 'by'",
    "count": 2243,
    "formDesc": "Add بِـ (bi) at the beginning",
    "explanation": "Adding بِـ (bi) at the start of a word often means 'with', 'by', or sometimes 'in'. For example, بِالْقَلَمِ (bil-qalami) means 'with the pen'. بِالْحَقِّ (bil-haqqi) means 'with the truth' or 'by the truth'. بِهِ (bihi) means 'with him'. It connects things or shows how an action is done.",
    "affixes": {
      "prefix": {
        "add": "ب"
      }
    },
    "example": {
      "before_word": "الْحَقّ",
      "before_meaning": "the truth",
      "after_word": "بِالْحَقِّ",
      "after_meaning": "with/by the truth"
    },
    "similar": {
      "reason": "They're short-letter prefixes that attach to the beginning of a word for prepositional or connective meaning (like b-, w-, f-, l-, k-, etc.).",
      "similarPatternIds": [
        3,
        16,
        10,
        60,
        69,
        38,
        2
      ]
    },
    "category": "other"
  },
  {
    "id": 25,
    "form": "فعيل",
    "formD": "فعيل",
    "changeId": "Shows a Very Strong Quality or Habit",
    "friendlyName": "Super Strong Quality",
    "count": 2220,
    "formDesc": "Has ي (ee sound) between the second and third root letters",
    "explanation": "This pattern often describes a quality that is very strong or permanent. It has a ي (ee sound) in the middle. For example, حَكِيم (Hakeem) means 'All-Wise', not just a little wise. عَلِيم ('Aleem) means 'All-Knowing'. Sometimes it describes something that feels something strongly or often, like عَذَابٌ أَلِيمٌ ('adhaabun aleemun) means 'a very painful punishment'. The punishment *feels* painful.",
    "affixes": {
      "infix_2": {
        "add": "ي"
      }
    },
    "example": {
      "before_word": "حَكَمَ",
      "before_meaning": "he judged",
      "after_word": "حَكِيم",
      "after_meaning": "very wise (one who judges perfectly)"
    },
    "similar": {
      "reason": "They insert a long vowel (ي / و / etc.) or certain vowel pattern to create an adjective/noun with a strong quality or repeated trait.",
      "similarPatternIds": [
        29,
        61,
        66,
        86
      ]
    },
    "category": "other"
  },
  {
    "id": 27,
    "form": "أَفْعَلَ",
    "formD": "افعل",
    "changeId": "Makes Someone/Something Do the Action",
    "friendlyName": "Make Something Happen",
    "count": 2074,
    "formDesc": "Add أ (a sound) at the beginning of the past verb",
    "explanation": "Adding أ (a) at the start of a basic past verb makes it mean 'to cause' that action or 'make someone do' it. For example, خَرَجَ (kharaja) means 'he went out'. But أَخْرَجَ (akhraja) means 'He *made* something/someone go out'. نَزَلَ (nazala) means 'it came down'. But أَنْزَلَ (anzala) means 'He *sent* it down' (made it come down). Look for the أ at the start!",
    "affixes": {
      "prefix": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "خَرَجَ",
      "before_meaning": "he went out",
      "after_word": "أَخْرَجَ",
      "after_meaning": "he made (something) come out"
    },
    "similar": {
      "reason": "They all begin with a hamza (ا / أ) at the start of the verb to change its meaning significantly (cause, command, question, comparison, etc.).",
      "similarPatternIds": [
        55,
        73,
        52,
        51,
        46,
        83,
        44
      ]
    },
    "category": "other"
  },
  {
    "id": 28,
    "form": "فعلٌ",
    "formD": "فعل",
    "changeId": "Noun Ending: Shows 'a Doer' (Not Specific)",
    "friendlyName": "Makes Doer General",
    "count": 2062,
    "formDesc": "Noun ends with ـٌ (un sound)",
    "explanation": "When a noun ends with the sound ـٌ (un), it tells you two things: 1) This word is the main 'doer' or subject in the sentence. 2) It's a general doer, not a specific one ('a...' instead of 'the...'). So كَاتِبٌ (kaatibun) means 'a writer' is doing something. قَلْبٌ (qalbun) means 'a heart' is doing something. Verbs don't usually end this way.",
    "affixes": {
      "suffix": {
        "add": "ٌ"
      }
    },
    "example": {
      "before_word": "كَاتِب",
      "before_meaning": "writer",
      "after_word": "كَاتِبٌ",
      "after_meaning": "a writer (general) - the subject"
    },
    "similar": {
      "reason": "They all add a short vowel or tanween ending (-َ, -ًا, -ِ, -ٍ, -ُ, -ٌ) to show different grammatical roles for nouns.",
      "similarPatternIds": [
        5,
        11,
        6,
        19,
        9
      ]
    },
    "category": "noun"
  },
  {
    "id": 29,
    "form": "فاعل",
    "formD": "فاعل",
    "changeId": "Person Who Does the Action ('Doer')",
    "friendlyName": "Doer of Action",
    "count": 2019,
    "formDesc": "Add ا (aa sound) after the first root letter",
    "explanation": "This pattern describes the person or thing that *does* the action. It usually has an ا (aa sound) after the first letter. For example, كَتَبَ (kataba) means 'he wrote', but كَاتِب (kaatib) means 'writer' (the person who writes). ظَلَمَ (zalama) means 'he did wrong', but ظَالِم (zaalim) means 'wrongdoer'. To make it female, add ة (ah) at the end, like كَاتِبَة (kaatibah - female writer).",
    "affixes": {
      "infix_1": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "كَتَبَ",
      "before_meaning": "he wrote",
      "after_word": "كَاتِب",
      "after_meaning": "writer (one who writes)"
    },
    "similar": {
      "reason": "They create a noun/adjective that describes the doer or one who has a certain quality.",
      "similarPatternIds": [
        25,
        61,
        66,
        86,
        56,
        68
      ]
    },
    "category": "other"
  },
  {
    "id": 30,
    "form": "مُفعِل",
    "formD": "مفعل",
    "changeId": "Doer vs. Receiver (Starts with Mu-)",
    "friendlyName": "Doer/Receiver (Mu- words)",
    "count": 1998,
    "formDesc": "Starts with مُـ (mu-). Check vowel before last main letter (ـِـ vs ـَـ)",
    "explanation": "Words starting with مُـ (mu-) are often related to verbs with extra letters or meanings. The vowel right *before* the last main letter usually tells you if it's the person/thing *doing* the action or *receiving* it. Kasra (ـِـ 'i' sound) means it's the DOER (like مُؤْمِن mu'min - believer). Fatha (ـَـ 'a' sound) means it's the RECEIVER (like مُرْسَل mursal - one sent). (This vowel rule doesn't apply to Pattern 87 words like مَفْعُول).",
    "affixes": {
      "prefix": {
        "add": "مُ"
      },
      "penultimate_vowel": {
        "rule": "Doer → ِ, Receiver → َ"
      }
    },
    "example": {
      "before_word": "آمَنَ",
      "before_meaning": "he believed",
      "after_word": "مُؤْمِن",
      "after_meaning": "believer"
    },
    "similar": {
      "reason": "They all start with م plus some variation (مُ / مَ / مِ / مست / مّ) to create nouns/participles showing doer, receiver, place, time, or tool.",
      "similarPatternIds": [
        67,
        87,
        103,
        102,
        4,
        27,
        49,
        54,
        58
      ]
    },
    "category": "other"
  },
  {
    "id": 31,
    "form": "تفعل",
    "formD": "تفعل",
    "changeId": "You Are Doing It (Now)",
    "friendlyName": "You Are Doing It",
    "count": 1795,
    "formDesc": "Add تـ (ta) at the beginning",
    "explanation": "Adding تـ (ta) at the beginning of a present tense verb usually means 'you' are doing the action. It can also mean 'she' is doing the action. The ending changes depending on who 'you' are: تَفْعَلُ (taf'alu - you, one man), تَفْعَلِينَ (taf'aleena - you, one woman), تَفْعَلُونَ (taf'aloona - you, group of men), etc. You see this when Allah speaks to people, like تَعْلَمُونَ (ta'lamoona - you all know).",
    "affixes": {
      "prefix": {
        "add": "ت"
      }
    },
    "example": {
      "before_word": "فَعَلَ",
      "before_meaning": "he did",
      "after_word": "تَفْعَلُ",
      "after_meaning": "you do"
    },
    "similar": {
      "reason": "They all add a single letter at the start of a verb to form present tense—just targeted at different people (you, she, I, he, we).",
      "similarPatternIds": [
        53,
        62,
        73,
        7,
        77
      ]
    },
    "category": "other"
  },
  {
    "id": 32,
    "form": "فعلك",
    "formD": "فعلك",
    "changeId": "Adding 'your' or 'you' (to one person)",
    "friendlyName": "Adding 'Your' or 'You'",
    "count": 1711,
    "formDesc": "Add ـك (ka or ki sound) at the end",
    "explanation": "Adding ك (k sound) to the end of a word means 'your' or 'you' when talking to *one* person. It sounds like ـكَ (ka) if you're talking to a male, like رَبُّكَ (Rabbuka - your Lord). It sounds like ـكِ (ki) if you're talking to a female, like كِتَابُكِ (kitaabuki - your book). It shows ownership ('your house') or that the action affects that person ('I saw you').",
    "affixes": {
      "suffix": {
        "add": "ك"
      }
    },
    "example": {
      "before_word": "رَبّ",
      "before_meaning": "Lord",
      "after_word": "رَبُّكَ",
      "after_meaning": "your Lord"
    },
    "similar": {
      "reason": "They are all pronoun suffixes (your, their, his, etc.).",
      "similarPatternIds": [
        14,
        13,
        22,
        23,
        37,
        45,
        88,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 34,
    "form": "فعال",
    "formD": "فعال",
    "changeId": "Result or Idea of an Action",
    "friendlyName": "Result of Action",
    "count": 1552,
    "formDesc": "Has ا (aa sound) after the second root letter",
    "explanation": "This pattern often takes an action and turns it into the *thing* that comes from it. Like, the action 'to write' (kataba) gives the result كِتَاب (kitaab - book). The action 'to fight' (qatala) gives the activity قِتَال (qitaal - fighting). The vowel before the ا (aa) sound can change the exact meaning a bit. فِعَال (fi'aal) is common for results/ideas. فِعَالَة (fi'aalah) can be for jobs or trades.",
    "affixes": {
      "infix_2": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "كَتَبَ",
      "before_meaning": "he wrote",
      "after_word": "كِتَاب",
      "after_meaning": "book"
    },
    "similar": {
      "reason": "They insert a long vowel (ا or similar) after the second root letter to form nouns (result, concept, or object).",
      "similarPatternIds": [
        25,
        29,
        61,
        66,
        86
      ]
    },
    "category": "other"
  },
  {
    "id": 35,
    "form": "فعلت",
    "formD": "فعلت",
    "changeId": "I / You / She Did It (Past)",
    "friendlyName": "Past Tense Person Marker",
    "count": 1370,
    "formDesc": "Add تْ / تَ / تِ / تُ (t sound) at the end",
    "explanation": "Adding a ت (t sound) at the end of a past verb tells you *who* did it. The vowel on the ت changes: ـتُ (tu) means 'I did' (فَعَلْتُ - fa'altu). ـتَ (ta) means 'you (male) did' (فَعَلْتَ - fa'alta). ـتِ (ti) means 'you (female) did' (فَعَلْتِ - fa'alti). ـتْ (t with sukun) means 'she did' (فَعَلَتْ - fa'alat).",
    "affixes": {
      "suffix": {
        "add": "ت"
      }
    },
    "example": {
      "before_word": "فَعَلَ",
      "before_meaning": "he did",
      "after_word": "فَعَلْتُ",
      "after_meaning": "I did"
    },
    "similar": {
      "reason": "They are past-tense forms that add a suffix to show who did the action (I, you, she, they, etc.).",
      "similarPatternIds": [
        1,
        12,
        63,
        75,
        50,
        80
      ]
    },
    "category": "verb"
  },
  {
    "id": 37,
    "form": "فعلها",
    "formD": "فعلها",
    "changeId": "Adding 'her' or 'it' (female)",
    "friendlyName": "Add 'her' or 'it' ending",
    "count": 1202,
    "formDesc": "Add ها (haa) at the end",
    "explanation": "Adding ها (haa) at the end of a word connects it to 'her' or a female 'it'. For example, كِتَابُهَا (kitaabuhaa) means 'her book'. You might see فِيهَا (feehaa) meaning 'in it' when talking about something female, like Jannah (Paradise). عَلَيْهَا ('alayhaa) means 'upon her/it'. It shows ownership or connection to a female person or thing.",
    "affixes": {
      "suffix": {
        "add": "ها"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book",
      "after_word": "كِتَابُهَا",
      "after_meaning": "her book"
    },
    "similar": {
      "reason": "All pronoun suffixes (her, his, their, your, my, etc.).",
      "similarPatternIds": [
        14,
        13,
        22,
        23,
        32,
        45,
        88,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 39,
    "form": "فعلات",
    "formD": "فعلات",
    "changeId": "Many Female Things or Types",
    "friendlyName": "Makes Many Female Things",
    "count": 1046,
    "formDesc": "Ends with ـَات (aat sound)",
    "explanation": "Adding ـَات (aat) to the end usually makes female words plural (meaning more than one). For example, كَلِمَة (kalimah - word) becomes كَلِمَات (kalimaat - words). مُؤْمِنَة (mu'minah - female believer) becomes مُؤْمِنَات (mu'minaat - female believers). Sometimes it means different *types* of something, like ثَمَرَات (thamaraat) can mean 'different kinds of fruit'.",
    "affixes": {
      "suffix": {
        "add": "ات"
      }
    },
    "example": {
      "before_word": "كَلِمَة",
      "before_meaning": "word",
      "after_word": "كَلِمَات",
      "after_meaning": "words"
    },
    "similar": {
      "reason": "They form a plural or collective, often for feminine words.",
      "similarPatternIds": [
        21,
        15,
        75,
        79,
        104
      ]
    },
    "category": "other"
  },
  {
    "id": 41,
    "form": "فعلنّ",
    "formD": "فعلن",
    "changeId": "'Definitely!' Ending",
    "friendlyName": "Super Sure Ending",
    "count": 990,
    "formDesc": "Add ـَنَّ (nna sound) at the end of a verb",
    "explanation": "Adding ـَنَّ (nna sound) to the end of a present or future verb makes it super strong and certain. It's like adding 'definitely!' or an exclamation mark. Like يَكْتُبُ (yaktubu - he writes) becomes يَكْتُبَنَّ (yaktubanna - he will *definitely* write!). Sometimes لَـ (la) is added at the beginning too (لَيَكْتُبَنَّ - la yaktubanna), making it even stronger: 'He will absolutely, positively write!'.",
    "affixes": {
      "suffix": {
        "add": "نّ"
      }
    },
    "example": {
      "before_word": "يَنْصُرُ",
      "before_meaning": "he helps",
      "after_word": "يَنْصُرَنَّ",
      "after_meaning": "he will definitely help"
    },
    "similar": {
      "reason": "They add نّ at the end for emphasis or certainty.",
      "similarPatternIds": [
        82,
        38
      ]
    },
    "category": "other"
  },
  {
    "id": 42,
    "form": "فعلْ",
    "formD": "فعل",
    "changeId": "Verb Ending: 'If...' or 'Let him...'",
    "friendlyName": "Makes Commands or Maybes",
    "count": 984,
    "formDesc": "Present verb ends with ْ (sukun - no vowel sound)",
    "explanation": "When a present tense verb ends with ْ (sukun - no vowel sound) instead of its usual ُ (u) sound, it often changes the meaning. 1) Can mean 'if...' like يَكُنْ (yakun - if he is). 2) Used for gentle command ('let him...'): لِيَكْتُبْ (li-yaktub - let him write). 3) Used after لَمْ (lam) for 'did not' in the past: لَمْ يَكُنْ (lam yakun - he was not). (Nouns don't usually end this way unless you stop speaking).",
    "affixes": {
      "suffix": {
        "add": "ْ"
      }
    },
    "example": {
      "before_word": "يَكْتُبُ",
      "before_meaning": "he writes",
      "after_word": "يَكْتُبْ",
      "after_meaning": "if he writes / let him write"
    },
    "similar": {
      "reason": "Both involve a sukun ending for commands or conditional meanings in verbs.",
      "similarPatternIds": [
        36,
        6,
        9,
        53
      ]
    },
    "category": "verb"
  },
  {
    "id": 43,
    "form": "فعلى",
    "formD": "فعلى",
    "changeId": "Special Female Words or 'Best'",
    "friendlyName": "Makes Special Female Words",
    "count": 905,
    "formDesc": "Ends with ى (usually sounds like long aa)",
    "explanation": "Words ending in this ى (long aa sound) are often special female words. فُعْلَى (fu'laa) often means 'the best' or 'greatest' for something female, like الكُبْرَى (al-kubraa - the greatest). فَعْلَى (fa'laa) can describe a female feeling or state, like عَطْشَى ('atshaa - thirsty woman). Other common ones are أُخْرَى (ukhraa - other female thing) and أُولَى (oolaa - first female thing).",
    "affixes": {
      "suffix": {
        "add": "ى"
      }
    },
    "example": {
      "before_word": "كُبْر",
      "before_meaning": "great",
      "after_word": "كُبْرَى",
      "after_meaning": "greatest (feminine)"
    },
    "similar": {
      "reason": "They end in ى to indicate a feminine or highest quality.",
      "similarPatternIds": [
        106,
        92
      ]
    },
    "category": "other"
  },
  {
    "id": 44,
    "form": "أفعال / إفعال",
    "formD": "افعال / افعال",
    "changeId": "Makes Plurals or Action Nouns (Starts with A)",
    "friendlyName": "Makes Many Things or Shows Action Name",
    "count": 875,
    "formDesc": "Add أ/إ (a/i) at the start and ا (aa) after the second root letter",
    "explanation": "This pattern does two main things: 1) Makes some words plural, usually by starting with أ (a) and adding ا (aa) inside. Like نَهْر (nahr - river) becomes أَنْهَار (anhaar - rivers). بَصَر (basar - sight) becomes أَبْصَار (abSaar - sights). 2) It's the name for the action of 'making something happen' (from Pattern 27, أفعل). It starts with إِ (i) and adds ا (aa) inside. Like أَنْزَلَ (anzala - he sent down) gives the action noun إِنْزَال (inzaal - sending down).",
    "affixes": {
      "prefix": {
        "add": "أ"
      },
      "infix_2": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "نَهْر",
      "before_meaning": "river",
      "after_word": "أَنْهَار",
      "after_meaning": "rivers"
    },
    "similar": {
      "reason": "They use أ/إ at the beginning plus an internal vowel (ا) to form plurals or special nouns.",
      "similarPatternIds": [
        51,
        101,
        90,
        27,
        55,
        73,
        52,
        46,
        83
      ]
    },
    "category": "other"
  },
  {
    "id": 45,
    "form": "فعلي",
    "formD": "فعلي",
    "changeId": "Adding 'my' or 'me'",
    "friendlyName": "Makes Something Mine",
    "count": 825,
    "formDesc": "Add ي (ee sound) or نِي (nee sound) at the end",
    "explanation": "Adding ي (ee sound) to the end of a noun means 'my'. Like كِتَاب (kitaab - book) becomes كِتَابِي (kitaabee - my book). رَبّ (Rabb - Lord) becomes رَبِّي (Rabbee - my Lord). If you add نِي (nee) to the end of a verb, it means the action happened *to me*. Like خَلَقَ (khalaqa - he created) becomes خَلَقَنِي (khalaqanee - he created me).",
    "affixes": {
      "suffix": {
        "add": "ي"
      }
    },
    "example": {
      "before_word": "رَبّ",
      "before_meaning": "Lord",
      "after_word": "رَبِّي",
      "after_meaning": "my Lord"
    },
    "similar": {
      "reason": "All pronoun suffixes (my, your, his, her, their, etc.).",
      "similarPatternIds": [
        14,
        13,
        22,
        23,
        32,
        37,
        88,
        98,
        71
      ]
    },
    "category": "other"
  },
  {
    "id": 46,
    "form": "أفعل",
    "formD": "افعل",
    "changeId": "Makes Questions ('Did...?' / 'Is...?')",
    "friendlyName": "Makes Questions",
    "count": 660,
    "formDesc": "Add أ (a sound) at the beginning",
    "explanation": "Adding أ (a sound) at the very beginning of a sentence often turns it into a question. Like فَعَلْتَ (fa'alta - you did) becomes أَفَعَلْتَ؟ (a-fa'alta? - *Did* you do?). It's like asking 'Is it true that...?' or just adding a question mark in English. Sometimes other letters come after the أ like فَ or لَا (أَفَـ / أَلَا) to make different kinds of questions.",
    "affixes": {
      "prefix": {
        "add": "أ"
      }
    },
    "example": {
      "before_word": "فَعَلْتَ",
      "before_meaning": "you did",
      "after_word": "أَفَعَلْتَ",
      "after_meaning": "did you do?"
    },
    "similar": {
      "reason": "They add أ at the start to form a question, similar to other patterns that add أ to change meaning (command, cause, compare).",
      "similarPatternIds": [
        27,
        55,
        52,
        51,
        73,
        83,
        44
      ]
    },
    "category": "other"
  },
  {
    "id": 47,
    "form": "فُعِل",
    "formD": "فعل",
    "changeId": "Was Done To (Past)",
    "friendlyName": "Something Was Done To",
    "count": 624,
    "formDesc": "Starts with ُ (u sound), middle letter has ِ (i sound)",
    "explanation": "This pattern shows that the action happened *to* the subject in the past. The person doing it isn't mentioned or isn't the focus. It usually starts with an ُ (u) sound and has an ِ (i) sound on the middle letter. For example, كَتَبَ (kataba - he wrote) becomes كُتِبَ (kutiba - it *was written*). خَلَقَ (khalaqa - he created) becomes خُلِقَ (khuliqa - he *was created*). Another form meaning 'was done to' starts with أُ (u sound) and typically has a Fatha before the last letter, differing from this form's initial vowel and internal Kasra.",
    "affixes": {
      "infix_1": {
        "add": "ُ"
      },
      "infix_2": {
        "add": "ِ"
      }
    },
    "example": {
      "before_word": "خَلَقَ",
      "before_meaning": "he created",
      "after_word": "خُلِقَ",
      "after_meaning": "was created"
    },
    "similar": {
      "reason": "They are passive past-tense forms or closely related to the basic past. #2 is active past, #38 is passive, #71 is another passive with shadda, #82 is passive with أُ.",
      "similarPatternIds": [
        1,
        72,
        83
      ]
    },
    "category": "verb"
  },
  {
    "id": 62,
    "form": "نفعل",
    "formD": "نفعل",
    "changeId": "We Are Doing It (Now)",
    "friendlyName": "We Do Action",
    "count": 601,
    "formDesc": "Starts with نـ (na)",
    "explanation": "Adding نـ (na) at the start of a present tense verb means 'we' are doing the action now. Like نَعْبُدُ (na'budu) means 'we worship'. نَكْتُبُ (naktubu) means 'we write'. Sometimes it starts with نُـ (nu) if it's a stronger verb or means 'is being done to us'.",
    "affixes": {
      "prefix": {
        "add": "ن"
      }
    },
    "example": {
      "before_word": "يَعْبُدُ",
      "before_meaning": "he worships",
      "after_word": "نَعْبُدُ",
      "after_meaning": "we worship"
    },
    "similar": {
      "reason": "They add a single-letter prefix (ي, ت, ن, ا) for present tense, indicating different persons (we, you, he, I).",
      "similarPatternIds": [
        53,
        31,
        73,
        7,
        77,
        76
      ]
    },
    "category": "other"
  },
  {
    "id": 48,
    "form": "فعلما",
    "formD": "فعلما",
    "changeId": "Adding 'ever' or 'what'",
    "friendlyName": "Makes Words More General ('-ever')",
    "count": 596,
    "formDesc": "Add ما (maa) at the end",
    "explanation": "Adding ما (maa) at the end of some words changes their meaning. It often adds the idea of '-ever'. Like كُلَّ (kulla - all/every) becomes كُلَّمَا (kullamaa - whenever). أَيْنَ (ayna - where) becomes أَيْنَمَا (aynamaa - wherever). Sometimes it means 'what' or 'that which', like بِمَا (bimaa - with what). إِنَّمَا (innamaa) is special and means 'only'.",
    "affixes": {
      "suffix": {
        "add": "ما"
      }
    },
    "example": {
      "before_word": "أَيْنَ",
      "before_meaning": "where",
      "after_word": "أَيْنَمَا",
      "after_meaning": "wherever"
    },
    "similar": {
      "reason": "They add a small ending (ما or ئِذٍ) to change a word into a time expression or make it more general/conditional.",
      "similarPatternIds": [
        95
      ]
    },
    "category": "other"
  },
  {
    "id": 49,
    "form": "افتعل",
    "formD": "افتعل",
    "changeId": "Do For Oneself or Together",
    "friendlyName": "Do for yourself or together",
    "count": 590,
    "formDesc": "Add اِ (i) at the beginning and ت (t) after the first root letter",
    "explanation": "This pattern often means doing something for your own benefit, or doing something together with other people. It usually starts with اِ (i) and has a ت (t) added after the first main letter. Examples: اِتَّخَذَ (ittakhadha - he took for himself), اِجْتَمَعَ (ijtama'a - they gathered together), اِخْتَلَفَ (ikhtalafa - they disagreed with each other). It's like adding 'self' or 'each other' to the meaning.",
    "affixes": {
      "prefix": {
        "add": "ا"
      },
      "infix_1": {
        "add": "ت"
      }
    },
    "example": {
      "before_word": "جَمَعَ",
      "before_meaning": "he gathered",
      "after_word": "اِجْتَمَعَ",
      "after_meaning": "they gathered together"
    },
    "similar": {
      "reason": "They show doing something for oneself or with others by adding extra letters (like ت or ن).",
      "similarPatternIds": [
        54,
        96,
        85,
        99,
        81,
        58
      ]
    },
    "category": "other"
  },
  {
    "id": 50,
    "form": "فعلتم",
    "formD": "فعلم",
    "changeId": "You All Did It (Past)",
    "friendlyName": "Make it about many people",
    "count": 561,
    "formDesc": "Ends with ـتُمْ (tum sound)",
    "explanation": "Adding ـتُمْ (tum) to the end of a past verb means 'you all' (a group of people) did the action. Like فَعَلْتَ (fa'alta - you did) becomes فَعَلْتُمْ (fa'altum - you all did). كَتَبْتَ (katabta - you wrote) becomes كَتَبْتُمْ (katabtum - you all wrote). Look for the 'tum' ending for 'you all' in the past.",
    "affixes": {
      "suffix": {
        "add": "م"
      }
    },
    "example": {
      "before_word": "فَعَلْتَ",
      "before_meaning": "you did",
      "after_word": "فَعَلْتُمْ",
      "after_meaning": "you all did"
    },
    "similar": {
      "reason": "They are past-tense verb endings indicating 'you all' or 'they', showing who did the action.",
      "similarPatternIds": [
        12,
        35,
        63,
        75,
        80
      ]
    },
    "category": "verb"
  },
  {
    "id": 51,
    "form": "أَفْعُل / أَفْعَال / أَفْعِلَة",
    "formD": "افعل / افعال / افعلة",
    "changeId": "Makes Plurals (Starts with A)",
    "friendlyName": "Makes Groups of Things",
    "count": 536,
    "formDesc": "Starts with أ (a sound), has different vowels inside",
    "explanation": "This is a way to make words plural (more than one). They usually start with أ (a) sound. The vowels inside change slightly for different kinds of plurals. Examples: نَفْس (nafs - soul) becomes أَنْفُس (anfus - souls). صَاحِب (Saahib - companion) becomes أَصْحَاب (aS-haab - companions). لِسَان (lisaan - tongue) becomes أَلْسِنَة (alsinah - tongues).",
    "affixes": {
      "prefix": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "نَفْس",
      "before_meaning": "soul",
      "after_word": "أَنْفُس",
      "after_meaning": "souls"
    },
    "similar": {
      "reason": "They begin with ا (hamza) and form plurals or specialized nouns.",
      "similarPatternIds": [
        44,
        101,
        90,
        27,
        55,
        73,
        52,
        46,
        83
      ]
    },
    "category": "other"
  },
  {
    "id": 52,
    "form": "أَفْعَل",
    "formD": "افعل",
    "changeId": "More or Most (-er / -est)",
    "friendlyName": "Makes Things More",
    "count": 524,
    "formDesc": "Starts with أ (a sound), has َ (a) sounds inside",
    "explanation": "Adding أ (a) at the start of an adjective often makes it mean 'more' or 'most'. Like كَبِير (kabeer - big) becomes أَكْبَر (akbar - bigger / biggest). حَسَن (hasan - good) becomes أَحْسَن (aHsan - better / best). You see this in اللهُ أَكْبَرُ (Allahu Akbar - Allah is Greater/Greatest).",
    "affixes": {
      "prefix": {
        "add": "أ"
      }
    },
    "example": {
      "before_word": "حَسَن",
      "before_meaning": "good",
      "after_word": "أَحْسَن",
      "after_meaning": "better/best"
    },
    "similar": {
      "reason": "All add an initial أ (hamza) to the root to create a new function (comparative, command, causative, question).",
      "similarPatternIds": [
        27,
        55,
        51,
        73,
        46,
        83,
        44
      ]
    },
    "category": "other"
  },
  {
    "id": 53,
    "form": "يَفعل",
    "formD": "يفعل",
    "changeId": "Verb: He/It Is Doing It (Now)",
    "friendlyName": "Present Action Marker (He/It)",
    "count": 492,
    "formDesc": "Starts with يـ (ya). Usually ends with ـُ (u) sound.",
    "explanation": "Adding يـ (ya) at the start of a verb usually means 'he' or 'it' is doing the action right now. The standard ending is ـُ (u sound), like يَكْتُبُ (yaktub**u** - he writes). This ـُ ending shows the action *is* happening. If the ending changes to ـَ or ـْ, the meaning changes to things like 'should do' or 'if he does'. Contrast the starting يـ (ya) here, indicating the subject performs the action, with a يُـ (yu) start, which typically indicates the action *is being done* to the subject.",
    "affixes": {
      "prefix": {
        "add": "ي"
      }
    },
    "example": {
      "before_word": "عَمِلَ",
      "before_meaning": "he worked",
      "after_word": "يَعْمَلُ",
      "after_meaning": "he works"
    },
    "similar": {
      "reason": "All add a single letter at the start of the verb to make it present tense (or passive present), just differing by who does the action (he, you, we, I) or whether it's active/passive.",
      "similarPatternIds": [
        31,
        62,
        7,
        73
      ]
    },
    "category": "verb"
  },
  {
    "id": 54,
    "form": "تفعّل",
    "formD": "تفعل",
    "changeId": "Do To Oneself Strongly or Become Slowly",
    "friendlyName": "Self-Action or Gradual Change",
    "count": 486,
    "formDesc": "Starts with تَـ (ta) and has a doubled middle letter (ّ)",
    "explanation": "This pattern starts with تَـ (ta) and has a doubled middle letter (shadda ّ). It can mean: 1) Doing something to yourself, maybe with extra effort. Like تَذَكَّرَ (tadhakkara - he reminded himself, he reflected). 2) Slowly becoming something. Like تَصَبَّرَ (taSabbara - he became patient over time).",
    "affixes": {
      "prefix": {
        "add": "ت"
      },
      "infix_2": {
        "add": "ّ"
      }
    },
    "example": {
      "before_word": "ذَكَرَ",
      "before_meaning": "he remembered",
      "after_word": "تَذَكَّرَ",
      "after_meaning": "he reminded himself"
    },
    "similar": {
      "reason": "They add a ت prefix and often a shadda in the middle to show doing something to oneself, often with effort.",
      "similarPatternIds": [
        4,
        49,
        96,
        85,
        81
      ]
    },
    "category": "other"
  },
  {
    "id": 55,
    "form": "اِفْعَلْ / اُفْعُلْ / أَفْعِلْ",
    "formD": "افعل / افعل / افعل",
    "changeId": "Command ('Do it!') - Different Starts",
    "friendlyName": "Make Command Word",
    "count": 473,
    "formDesc": "Starts with أ/اِ/اُ (a/i/u sound) and ends with ْ (no vowel)",
    "explanation": "This is another way to make commands ('Do it!'). It usually starts with an أ / اِ / اُ (a/i/u sound) and ends with no vowel (sukun ْ). The starting vowel depends on the verb. اِذْهَبْ (idh-hab! - go!). اُدْخُلْ (ud-khul! - enter!). Sometimes it starts with أ (a), especially if the past verb started with أ (like Pattern 27). For example, أَخْرَجَ (akhraja - he made come out) becomes أَخْرِجْ! (akhrij! - Make it come out! / Take it out!).",
    "affixes": {
      "prefix": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "خَرَجَ",
      "before_meaning": "he exited",
      "after_word": "اُخْرُجْ",
      "after_meaning": "exit! (command)"
    },
    "similar": {
      "reason": "They all start with a hamza (ا / أ) that drastically changes the verb's meaning (commands, causative, questions, comparisons, etc.).",
      "similarPatternIds": [
        27,
        73,
        52,
        51,
        46,
        83,
        44
      ]
    },
    "category": "other"
  },
  {
    "id": 56,
    "form": "فَاعَلَ",
    "formD": "فَاعَلَ",
    "changeId": "Doing Together or Stronger Action",
    "friendlyName": "Making Actions Stronger or Two-Way",
    "count": 466,
    "formDesc": "Has آ (long aa sound) after the first root letter",
    "explanation": "This pattern has a long ا (aaa sound, written آ or ا) after the first letter. It often means: 1) Doing an action *with* someone else, or back-and-forth. Like قَاتَلَ (qaatala - he fought someone). عَاهَدَ ('aahada - he made an agreement with someone). 2) Doing an action with more effort or intensity. Like جَاهَدَ (jaahada - he struggled hard). بَارَكَ (baaraka - he blessed greatly).",
    "affixes": {
      "infix_1": {
        "add": "آ"
      }
    },
    "example": {
      "before_word": "صَبَرَ",
      "before_meaning": "he was patient",
      "after_word": "صَابَرَ",
      "after_meaning": "he persevered with patience"
    },
    "similar": {
      "reason": "They involve a long vowel or extra letters to show mutual action or intensity.",
      "similarPatternIds": [
        29,
        85,
        86
      ]
    },
    "category": "other"
  },
  {
    "id": 57,
    "form": "فُعُول",
    "formD": "فعول",
    "changeId": "Groups or Big Ideas",
    "friendlyName": "Groups and Big Ideas",
    "count": 463,
    "formDesc": "Has ُ (u) on first letter and و (oo) after second letter",
    "explanation": "This pattern has an ُ (u) sound on the first letter and a و (oo sound) after the second letter. It can mean two things: 1) A group of things (plural). Like قَلْب (qalb - heart) becomes قُلُوب (quloob - hearts). وَجْه (wajh - face) becomes وُجُوه (wujooh - faces). 2) The main idea or act of doing something. Like دَخَلَ (dakhala - he entered) gives دُخُول (dukhool - the act of entering). خَرَجَ (kharaja - he went out) gives خُرُوج (khurooj - the act of leaving).",
    "affixes": {
      "infix_1": {
        "add": "ُ"
      },
      "infix_2": {
        "add": "ُو"
      }
    },
    "example": {
      "before_word": "قَلْب",
      "before_meaning": "heart",
      "after_word": "قُلُوب",
      "after_meaning": "hearts"
    },
    "similar": {
      "reason": "They insert a long vowel (و) in the middle or use ُ vowels to form groups or concepts.",
      "similarPatternIds": [
        61,
        65,
        91,
        74
      ]
    },
    "category": "other"
  },
  {
    "id": 58,
    "form": "استفعل",
    "formD": "استفعل",
    "changeId": "Asking For or Seeking Something",
    "friendlyName": "Asking For Something",
    "count": 449,
    "formDesc": "Add استـ (ista-) at the beginning",
    "explanation": "Adding استـ (ista-) to the start of a verb usually means 'to ask for' or 'to seek' something. Like غَفَرَ (ghafara - he forgave) becomes اِسْتَغْفَرَ (istaghfara - he *asked for* forgiveness). عَادَ ('aadha - he sought refuge) becomes اِسْتَعَاذَ (ista'aadha - he *sought* refuge). Sometimes it means 'to find' or 'to consider' something that way, like اِسْتَكْبَرَ (istakbara - he acted arrogantly, like he found himself big).",
    "affixes": {
      "prefix": {
        "add": "است"
      }
    },
    "example": {
      "before_word": "غَفَرَ",
      "before_meaning": "he forgave",
      "after_word": "اِسْتَغْفَرَ",
      "after_meaning": "he sought forgiveness"
    },
    "similar": {
      "reason": "They add extra letters (استـ / ت / ان) to show asking for something, doing something for oneself, or doing it with others.",
      "similarPatternIds": [
        102,
        49,
        85
      ]
    },
    "category": "other"
  },
  {
    "id": 60,
    "form": "يٰفعل",
    "formD": "يافعل",
    "changeId": "Calling Out ('O!' / 'Hey!')",
    "friendlyName": "Hey There! Prefix",
    "count": 430,
    "formDesc": "Add يٰـ (yaa) at the beginning",
    "explanation": "Adding يَا (yaa) at the start is like shouting 'Hey!' or saying 'O!' to get someone's attention before you speak to them or mention their name. You see it a lot in the Quran: يَا أَيُّهَا النَّاسُ (Yaa ayyuha an-naas - O mankind!). يَا مُوسَىٰ (Yaa Moosaa - O Moses!). It's used when calling out to someone or something directly.",
    "affixes": {
      "prefix": {
        "add": "يٰ"
      }
    },
    "example": {
      "before_word": "أَيُّهَا النَّاسُ",
      "before_meaning": "mankind",
      "after_word": "يٰأَيُّهَا النَّاسُ",
      "after_meaning": "O mankind!"
    },
    "similar": {
      "reason": "They are short (1-2 letter) prefixes that modify or connect words: calling out (يا), and (و), so (ف), to (ل), with (ب), like (ك), etc.",
      "similarPatternIds": [
        3,
        16,
        10,
        24,
        69,
        38,
        2
      ]
    },
    "category": "other"
  },
  {
    "id": 61,
    "form": "فعول",
    "formD": "فعول",
    "changeId": "Super-Doer or Constant Quality",
    "friendlyName": "Makes Super-Doer",
    "count": 427,
    "formDesc": "Has و (oo sound) after the second root letter",
    "explanation": "This pattern often describes someone who does an action a lot, or has a quality all the time. It has a و (oo sound) after the second letter. Many of Allah's names use this pattern: غَفُور (Ghafoor - Always Forgiving). صَبُور (Saboor - Always Patient). شَكُور (Shakoor - Always Appreciative). It means they are *really* like that, all the time.",
    "affixes": {
      "infix_2": {
        "add": "و"
      }
    },
    "example": {
      "before_word": "غَفَرَ",
      "before_meaning": "he forgave",
      "after_word": "غَفُور",
      "after_meaning": "Most Forgiving"
    },
    "similar": {
      "reason": "They add a long vowel (و or ي) to show a strong or constant quality.",
      "similarPatternIds": [
        25,
        86,
        29,
        66,
        57
      ]
    },
    "category": "other"
  },
  {
    "id": 64,
    "form": "فعلاء",
    "formD": "فعلاء",
    "changeId": "Special Plurals for People or Qualities",
    "friendlyName": "Special Plural and Quality Maker",
    "count": 340,
    "formDesc": "Ends with ـَاء (aa' sound)",
    "explanation": "Words ending in ـَاء (aa') are often plurals, especially for groups of people or describing qualities. فُعَلاء (fu'alaa') is often for types of people, like عُلَمَاء ('ulamaa' - scholars). أَفْعِلاء (af'ilaa') is often for respected groups like أَنْبِيَاء (anbiyaa' - prophets). فَعْلاء (fa'laa') can be for female colors or qualities, like صَفْرَاء (Safraa' - yellow female thing).",
    "affixes": {
      "suffix": {
        "add": "اء"
      }
    },
    "example": {
      "before_word": "عَالِم",
      "before_meaning": "scholar",
      "after_word": "عُلَمَاء",
      "after_meaning": "scholars"
    },
    "similar": {
      "reason": "They both end in اء to form special plurals or feminine qualities.",
      "similarPatternIds": [
        90
      ]
    },
    "category": "other"
  },
  {
    "id": 66,
    "form": "فعال / فعّال",
    "formD": "فعال / فعال",
    "changeId": "Job Words or Important Things / Concepts",
    "friendlyName": "Job and Important Thing Maker",
    "count": 338,
    "formDesc": "Has ا (aa sound) after second root letter (maybe with shadda ّ on it)",
    "explanation": "This pattern has an ا (aa sound) after the second letter. 1) If the second letter also has a shadda ّ (فَعَّال - fa''aal), it often means someone who does that thing as a job or does it *all the time*. Like خَبَّاز (khabbaaz - baker). كَذَّاب (kadhdhaab - big liar). 2) Without the shadda (فَعَال - fa'aal), it often names an important thing or idea. Like سَلَام (salaam - peace). كَلَام (kalaam - speech).",
    "affixes": {
      "infix_2": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "كَذَبَ",
      "before_meaning": "he lied",
      "after_word": "كَذَّاب",
      "after_meaning": "habitual liar"
    },
    "similar": {
      "reason": "They insert a long vowel (ا) after the second root letter to form a doer noun or major concept.",
      "similarPatternIds": [
        29,
        25,
        61,
        68,
        86
      ]
    },
    "category": "other"
  },
  {
    "id": 69,
    "form": "كفعل",
    "formD": "كفعل",
    "changeId": "Adding 'like' or 'as'",
    "friendlyName": "Adds 'like' or 'similar to'",
    "count": 309,
    "formDesc": "Add كَـ (ka) at the beginning",
    "explanation": "Adding كَـ (ka) at the start of a word usually means 'like' or 'as'. It compares things. For example, كَمَثَلِ (ka-mathali) means 'like the example of...'. كَالْحِجَارَةِ (kal-hijaarati) means 'like stones'. It shows similarity.",
    "affixes": {
      "prefix": {
        "add": "ك"
      }
    },
    "example": {
      "before_word": "مَثَل",
      "before_meaning": "example",
      "after_word": "كَمَثَلِ",
      "after_meaning": "like the example of"
    },
    "similar": {
      "reason": "They're short prefixes that modify meaning (like, and, so, to, with, etc.).",
      "similarPatternIds": [
        3,
        16,
        10,
        24,
        60,
        38,
        2
      ]
    },
    "category": "other"
  },
  {
    "id": 71,
    "form": "فعلنِ / فعلني",
    "formD": "فعلن / فعلني",
    "changeId": "Action Done 'to me'",
    "friendlyName": "Add 'me' to action",
    "count": 255,
    "formDesc": "Add ـنِي (nee) or ـنِ (ni) at the end of a verb",
    "explanation": "When a verb ends with ـنِي (nee) or sometimes just ـنِ (ni), it means the action happened *to me*. The 'me' is receiving the action. For example, خَلَقَ (khalaqa - he created) becomes خَلَقَنِي (khalaqanee - He created *me*). عَلَّمَ ('allama - he taught) becomes عَلَّمَنِي ('allamanee - he taught *me*).",
    "affixes": {
      "suffix": {
        "add": "نِ"
      }
    },
    "example": {
      "before_word": "خَلَقَ",
      "before_meaning": "He created",
      "after_word": "خَلَقَنِي",
      "after_meaning": "He created me"
    },
    "similar": {
      "reason": "They are all pronoun suffixes (me, him, them, your, etc.) indicating who receives the action or owns something.",
      "similarPatternIds": [
        14,
        13,
        22,
        23,
        32,
        37,
        45,
        88,
        98
      ]
    },
    "category": "other"
  },
  {
    "id": 72,
    "form": "فُعِّل",
    "formD": "فعل",
    "changeId": "Was Done To (Strongly, Past)",
    "friendlyName": "Makes Things Passive or Total",
    "count": 253,
    "formDesc": "Starts with ُ (u sound), has doubled middle letter (ّ) with ِ (i sound)",
    "explanation": "This indicates a passive action in the past, specifically for verbs that originally had a doubled middle letter to show intensity or causation. It uses an initial ُ (u) sound and keeps the doubled middle letter (with an ِ 'i' sound). For example, زَيَّنَ (zayyana - he made beautiful) becomes زُيِّنَ (zuyyina - it *was made* beautiful). عَلَّمَ ('allama - he taught) becomes عُلِّمَ ('ullima - he *was taught*). Notice the ِ (i) sound on the middle letter, just like the simpler فُعِلَ passive form.",
    "affixes": {
      "infix_1": {
        "add": "ُ"
      },
      "infix_2": {
        "add": "ّ"
      }
    },
    "example": {
      "before_word": "زَيَّنَ",
      "before_meaning": "he beautified",
      "after_word": "زُيِّنَ",
      "after_meaning": "was beautified"
    },
    "similar": {
      "reason": "They use a shadda in the middle (like فعّل) but in passive form (فُعِّل). Similar to #38 (فُعِل) for passive. Both modify the root to show 'was done'.",
      "similarPatternIds": [
        4,
        47
      ]
    },
    "category": "verb"
  },
  {
    "id": 73,
    "form": "أَفْعَلُ",
    "formD": "افعل",
    "changeId": "I Am Doing It (Now)",
    "friendlyName": "I Do Something",
    "count": 245,
    "formDesc": "Starts with أ (a or u sound)",
    "explanation": "Adding أ (usually 'a' sound, sometimes 'u' sound) at the start of a present tense verb means 'I' am doing the action now. Like أَعْبُدُ (a'budu) means 'I worship'. أَكْتُبُ (aktubu) means 'I write'. If the verb is about 'making something happen' (like Pattern 27) or 'doing strongly' (like Pattern 4), it might start with أُ (u) sound, like أُنْزِلُ (unzilu - I send down).",
    "affixes": {
      "prefix": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "يَعْبُدُ",
      "before_meaning": "he worships",
      "after_word": "أَعْبُدُ",
      "after_meaning": "I worship"
    },
    "similar": {
      "reason": "They all add an alif (ا) to the beginning of the verb to shift meaning (I do now, command, question, cause, etc.).",
      "similarPatternIds": [
        27,
        55,
        52,
        51,
        46,
        83,
        44
      ]
    },
    "category": "other"
  },
  {
    "id": 74,
    "form": "فُعَال",
    "formD": "فعال",
    "changeId": "Group, State, or Animal Name",
    "friendlyName": "Group or Collection Maker",
    "count": 236,
    "formDesc": "Starts with ُ (u sound) and has ا (aa sound) after second letter",
    "explanation": "This pattern starts with ُ (u) and has an ا (aa) sound after the second letter. It can make words for: 1) Groups or collections: like شُعَب (shu'ab - branches, groups). 2) Strong feelings or states: like نُعَاس (nu'aas - sleepiness). 3) Some animal names: like غُرَاب (ghuraab - crow).",
    "affixes": {
      "infix_1": {
        "add": "ُ"
      },
      "infix_2": {
        "add": "َا"
      }
    },
    "example": {
      "before_word": "جَنَحَ",
      "before_meaning": "he inclined",
      "after_word": "جُنَاح",
      "after_meaning": "sin"
    },
    "similar": {
      "reason": "They add a damma on the first letter and a long vowel (ا or و) later to form group/concept nouns.",
      "similarPatternIds": [
        34,
        57
      ]
    },
    "category": "other"
  },
  {
    "id": 75,
    "form": "فعلن",
    "formD": "فعلن",
    "changeId": "They (Women) Do/Did It",
    "friendlyName": "Group Action Marker (Women)",
    "count": 235,
    "formDesc": "Ends with ـْنَ (na sound)",
    "explanation": "Adding ـْنَ (na) at the end of a verb shows that 'they' (a group of *women*) are doing or did the action. For present tense: يَذْهَبْنَ (yadh-habna - they go). For past tense: فَعَلْنَ (fa'alna - they did). This ending is specifically for a group of females.",
    "affixes": {
      "suffix": {
        "add": "ن"
      }
    },
    "example": {
      "before_word": "يَذْهَبُ",
      "before_meaning": "he goes",
      "after_word": "يَذْهَبْنَ",
      "after_meaning": "they (women) go"
    },
    "similar": {
      "reason": "They are plural verb endings for 'they' (women or men).",
      "similarPatternIds": [
        12,
        63,
        15,
        39,
        50
      ]
    },
    "category": "other"
  },
  {
    "id": 77,
    "form": "تُفعل",
    "formD": "تفعل",
    "changeId": "'Is Being Done To' You/Her (Now)",
    "friendlyName": "Receiving Action Now (You/Her)",
    "count": 226,
    "formDesc": "Add تُ at the beginning",
    "explanation": "This indicates an action is being done to the subject right now. The تُـ (tu) start specifies that the subject is 'you' (singular/plural) or 'she', differing from the يُـ (yu) start used for 'he' or 'it'. For example, تَسْأَلُ (tas'alu - you ask) becomes تُسْأَلُ (tus'alu - *you are asked*). تُحْشَرُ (tuHsharu - you are gathered).",
    "affixes": {
      "prefix": {
        "add": "تُ"
      }
    },
    "example": {
      "before_word": "تَسْأَلُ",
      "before_meaning": "you ask",
      "after_word": "تُسْأَلُ",
      "after_meaning": "you are asked"
    },
    "similar": {
      "reason": "They're present-tense passive markers with a prefix (تُ / يُ / نُ / أُ), used for 'you/she' or 'he/we/I' in a passive sense.",
      "similarPatternIds": [
        31,
        7,
        62,
        73,
        83,
        76
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 78,
    "form": "فَعِل",
    "formD": "فعل",
    "changeId": "Feeling or State Verbs (Past)",
    "friendlyName": "Feeling or Becoming Words",
    "count": 222,
    "formDesc": "Middle root letter has ِ (i sound) in past tense",
    "explanation": "This simple past tense verb pattern often describes feelings, emotions, or states, rather than physical actions. It usually has an ِ (i) sound on the middle letter in the past. Examples: فَرِحَ (fariHa - he became happy). حَزِنَ (Hazina - he became sad). عَلِمَ ('alima - he knew / became knowledgeable).",
    "affixes": {
      "infix_1": {
        "add": "َ"
      },
      "infix_2": {
        "add": "ِ"
      }
    },
    "example": {
      "before_word": "فَرَح",
      "before_meaning": "joy (noun)",
      "after_word": "فَرِحَ",
      "after_meaning": "he became happy"
    },
    "similar": {
      "reason": "They share the same simple past verb structure, just with different middle vowels indicating action vs. state/feeling.",
      "similarPatternIds": [
        33,
        1,
        59
      ]
    },
    "category": "verb"
  },
  {
    "id": 79,
    "form": "فعلان",
    "formD": "فعلان",
    "changeId": "Two of Something",
    "friendlyName": "Makes Things Come in Pairs",
    "count": 208,
    "formDesc": "Ends with ـَانِ (aani sound)",
    "explanation": "Adding ـَانِ (aani) to the end of a noun means exactly *two* of that thing. Like وَالِد (waalid - parent) becomes وَالِدَانِ (waalidaani - two parents). رَجُل (rajul - man) becomes رَجُلَانِ (rajulaani - two men). If the noun is female, it ends in ـَتَانِ (ataani), like جَنَّة (jannah - garden) becomes جَنَّتَانِ (jannataani - two gardens). This ending is usually used when the pair is the 'doer'.",
    "affixes": {
      "suffix": {
        "add": "ان"
      }
    },
    "example": {
      "before_word": "وَالِد",
      "before_meaning": "parent",
      "after_word": "وَالِدَانِ",
      "after_meaning": "two parents"
    },
    "similar": {
      "reason": "They end in ـانِ or ـَيْنِ to show exactly two.",
      "similarPatternIds": [
        80,
        21,
        84
      ]
    },
    "category": "other"
  },
  {
    "id": 80,
    "form": "فعلا",
    "formD": "فعلا",
    "changeId": "They Both Did It (Past)",
    "friendlyName": "Two People Action",
    "count": 195,
    "formDesc": "Ends with ـَا (long aa sound)",
    "explanation": "Adding ـَا (long aa sound) to the end of a past verb shows that exactly *two* people did the action. Like ذَهَبَ (dhahaba - he went) becomes ذَهَبَا (dhahabaa - they *both* went). قَالَ (qaala - he said) becomes قَالَا (qaalaa - they *both* said). If the two people are female, it ends in ـَتَا (ataa), like قَالَتَا (qaalataa - they both [females] said).",
    "affixes": {
      "suffix": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "ذَهَبَ",
      "before_meaning": "he went",
      "after_word": "ذَهَبَا",
      "after_meaning": "they both went"
    },
    "similar": {
      "reason": "They are suffixes added to past verbs to show who did it (they both, they all, you all, etc.).",
      "similarPatternIds": [
        12,
        35,
        63,
        50,
        79
      ]
    },
    "category": "verb"
  },
  {
    "id": 81,
    "form": "فتّعل",
    "formD": "فتعل",
    "changeId": "Do Strongly To/For Oneself",
    "friendlyName": "Self-focused intense action",
    "count": 191,
    "formDesc": "Add ت with a shadda between first two letters",
    "explanation": "This pattern shows actions done to oneself with extra strength, often involving effort or closeness where a ت (t) sound merges with the first letter. Examples: يَتَّقِي (yattaqee) means 'he protects himself strongly' or 'he is God-fearing', يَتَّبِعُ (yattabi'u) means 'he follows closely'.",
    "affixes": {
      "infix_1": {
        "add": "تّ"
      }
    },
    "example": {
      "before_word": "تَبِعَ",
      "before_meaning": "he followed",
      "after_word": "يَتَّبِعُ",
      "after_meaning": "he follows closely"
    },
    "similar": {
      "reason": "They show an intensive or reflexive action by doubling or inserting ت (تفعّل, افتعل, فتّعل, تفاعل, انفعل).",
      "similarPatternIds": [
        49,
        54,
        96,
        85,
        99
      ]
    },
    "category": "other"
  },
  {
    "id": 83,
    "form": "أُفْعِلَ",
    "formD": "افعل",
    "changeId": "Was Made To Do (Past)",
    "friendlyName": "Was Done To Someone",
    "count": 179,
    "formDesc": "Starts with أُ (u sound), middle letter has َ (a sound)",
    "explanation": "This pattern shows that someone *was made* to do something, or something *was caused* to happen in the past. It's the passive form corresponding to verbs that start with أ ('a' sound) in the active past tense to mean 'making something happen'. It starts with أُ (u sound). **Important:** Unlike other past passive forms which typically have a Kasra (ـِـ 'i' sound) before the last letter, this form usually uses a Fatha (ـَـ 'a' sound). Examples: أَنْزَلَ (anzala - he sent down) becomes أُنْزِلَ (unzila - it *was sent down*). أَدْخَلَ (adkhala - he made enter) becomes أُدْخِلَ (udkhila - he *was made* to enter).",
    "affixes": {
      "prefix": {
        "add": "أُ"
      },
      "infix_2": {
        "add": "َ"
      }
    },
    "example": {
      "before_word": "أَنْزَلَ",
      "before_meaning": "he sent down",
      "after_word": "أُنْزِلَ",
      "after_meaning": "was sent down"
    },
    "similar": {
      "reason": "They're past-tense passive forms with a vowel prefix (أُ / تُ / etc.), closely related to #38 (فُعِل) for passive. Also see other hamza-begin forms (#23,#66,#69).",
      "similarPatternIds": [
        47,
        77,
        27,
        73,
        46,
        7,
        76,
        44,
        51
      ]
    },
    "category": "verb"
  },
  {
    "id": 84,
    "form": "فَعْلان",
    "formD": "فعلان",
    "changeId": "Super Strong Feeling or State",
    "friendlyName": "Super Strong State",
    "count": 175,
    "formDesc": "Middle letter has ْ (no vowel), ends with ـَان (aan sound)",
    "explanation": "This pattern describes a feeling or state that is very strong, often temporary. It has a silent middle letter (sukun ْ) and ends in ـَان (aan). Examples: عَطْشَان ('aTshaan - extremely thirsty). غَضْبَان (ghaDbaan - extremely angry). The female version often uses Pattern 43 (فَعْلَى).",
    "affixes": {
      "suffix": {
        "add": "ان"
      },
      "infix_2": {
        "add": "ْ"
      }
    },
    "example": {
      "before_word": "غَضِبَ",
      "before_meaning": "he was angry",
      "after_word": "غَضْبَان",
      "after_meaning": "extremely angry"
    },
    "similar": {
      "reason": "They end with -ان for an intense state or fullness, or for two.",
      "similarPatternIds": [
        79
      ]
    },
    "category": "other"
  },
  {
    "id": 85,
    "form": "تَفاعل",
    "formD": "تفاعل",
    "changeId": "Doing Together",
    "friendlyName": "Do Together or Self-Existing Action",
    "count": 157,
    "formDesc": "Starts with تَـ (ta) and has ا (aa sound) after the first root letter",
    "explanation": "This pattern usually means people are doing something *together* or *to each other*. It starts with تَـ (ta) and has an ا (aa sound) after the first main letter. Examples: تَعَاوَنُوا (ta'aawanoo - they helped each other). تَنَازَعَ (tanaaza'a - they disputed with each other). تَرَاضٍ (taraaDin - mutual agreement).",
    "affixes": {
      "prefix": {
        "add": "تَ"
      },
      "infix_1": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "نَزَعَ",
      "before_meaning": "he pulled",
      "after_word": "تَنَازَعَ",
      "after_meaning": "they disputed with one another"
    },
    "similar": {
      "reason": "They show mutual or self-directed action by adding extra letters (ت, ا, ن).",
      "similarPatternIds": [
        49,
        54,
        96,
        94,
        81,
        99,
        58
      ]
    },
    "category": "other"
  },
  {
    "id": 86,
    "form": "فعّال",
    "formD": "فعال",
    "changeId": "Professional Doer or Does A LOT",
    "friendlyName": "Professional Doer",
    "count": 153,
    "formDesc": "Has a doubled middle letter (ّ) and an ا (aa sound) after it",
    "explanation": "This pattern describes someone who does an action as their job, or does it constantly and intensely. It has a doubled middle letter (shadda ّ) followed by ا (aa sound). Examples: خَبَّاز (khabbaaz - baker). كَذَّاب (kadhdhaab - habitual liar). خَلَّاق (khallaaq - The Constant Creator). It's stronger than Pattern 29 (فاعل).",
    "affixes": {
      "vowel_2": {
        "add": "ّ"
      },
      "infix_2": {
        "add": "ا"
      }
    },
    "example": {
      "before_word": "كَذَبَ",
      "before_meaning": "he lied",
      "after_word": "كَذَّاب",
      "after_meaning": "habitual liar"
    },
    "similar": {
      "reason": "They double a letter (شدة) and often add a long vowel to show someone who does an action repeatedly or intensely.",
      "similarPatternIds": [
        4,
        25,
        54,
        66,
        70,
        29,
        68,
        56,
        61
      ]
    },
    "category": "other"
  },
  {
    "id": 87,
    "form": "مَفْعُول",
    "formD": "مفعول",
    "changeId": "The Thing Action Happened To",
    "friendlyName": "Received Action Word",
    "count": 150,
    "formDesc": "Starts with مَـ (ma), has و (oo sound) before the last letter",
    "explanation": "This pattern describes the thing (or person) that the action was done *to*. It starts with مَـ (ma) and has a و (oo sound) before the last main letter. Examples: كَتَبَ (kataba - he wrote) -> مَكْتُوب (maktoob - something *written*). قَتَلَ (qatala - he killed) -> مَقْتُول (maqtool - someone *killed*). عَلِمَ ('alima - he knew) -> مَعْلُوم (ma'loom - something *known*).",
    "affixes": {
      "prefix": {
        "add": "مَ"
      },
      "infix_1": {
        "add": "ْ"
      },
      "infix_2": {
        "add": "و"
      },
      "vowel_2": {
        "add": "ُ"
      }
    },
    "example": {
      "before_word": "كَتَبَ",
      "before_meaning": "he wrote",
      "after_word": "مَكْتُوب",
      "after_meaning": "written"
    },
    "similar": {
      "reason": "They add مَ at the start and و in the middle to show something affected by an action.",
      "similarPatternIds": [
        30,
        67,
        103,
        102
      ]
    },
    "category": "other"
  },
  {
    "id": 88,
    "form": "فعلهن",
    "formD": "فعلهن",
    "changeId": "Adding 'their' or 'them' (for women)",
    "friendlyName": "Add 'their/them' for girls",
    "count": 132,
    "formDesc": "Add هن (hunna or hinna sound) at the end",
    "explanation": "Adding هن (hunna sound) to the end of a word means 'their' or 'them' when talking about a group of *women*. Like كِتَابُهُنَّ (kitaabuhunna - their book). Sometimes it sounds like 'hinna' (ـهِنَّ) after certain sounds, like فِيهِنَّ (feehinna - in them). This is the female version of Pattern 14 (ـهم).",
    "affixes": {
      "suffix": {
        "add": "هن"
      }
    },
    "example": {
      "before_word": "كِتَاب",
      "before_meaning": "book",
      "after_word": "كِتَابُهُنَّ",
      "after_meaning": "their book (for women)"
    },
    "similar": {
      "reason": "They attach pronoun suffixes (هن, هم, كم, نا, ك, etc.) showing possession or object.",
      "similarPatternIds": [
        14,
        13,
        22,
        23,
        32,
        37,
        45,
        98,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 89,
    "form": "سيفعل",
    "formD": "سيفعل",
    "changeId": "Will Happen (Future)",
    "friendlyName": "Future Action Marker",
    "count": 120,
    "formDesc": "Add سَـ (sa) at the beginning",
    "explanation": "Adding سَـ (sa) to the very start of a present tense verb makes it mean 'will happen' in the future (usually the near future). Like يَعْلَمُ (ya'lamu - he knows) becomes سَيَعْلَمُ (sa-ya'lamu - he *will* know). تَرَىٰ (taraa - you see) becomes سَتَرَىٰ (sa-taraa - you *will* see).",
    "affixes": {
      "prefix": {
        "add": "سَ"
      }
    },
    "example": {
      "before_word": "يَعْلَمُ",
      "before_meaning": "he knows",
      "after_word": "سَيَعْلَمُ",
      "after_meaning": "he will know"
    },
    "similar": {
      "reason": "All are short (often single-letter) prefixes that attach to the beginning of a word and give it a new grammatical or connecting function (future, the, and, so, to, etc.).",
      "similarPatternIds": [
        3,
        16,
        10,
        24,
        60,
        69
      ]
    },
    "category": "verb"
  },
  {
    "id": 90,
    "form": "أفعلاء",
    "formD": "افعلاء",
    "changeId": "Plurals for Important People (Starts with A)",
    "friendlyName": "Makes Many People",
    "count": 118,
    "formDesc": "Starts with أ (a) and ends with ـَاء (aa')",
    "explanation": "This pattern makes plurals for groups of people, often important roles. It starts with أ (a) and ends with ـَاء (aa'). Examples: نَبِيّ (nabiyy - prophet) becomes أَنْبِيَاء (anbiyaa' - prophets). وَلِيّ (waliyy - friend/protector) becomes أَوْلِيَاء (awliyaa' - friends/protectors). شَهِيد (shaheed - witness) becomes شُهَدَاء (shuhadaa' - witnesses - sometimes the first vowel is 'u').",
    "affixes": {
      "prefix": {
        "add": "أ"
      },
      "suffix": {
        "add": "اء"
      }
    },
    "example": {
      "before_word": "نَبِيّ",
      "before_meaning": "prophet",
      "after_word": "أَنْبِيَاء",
      "after_meaning": "prophets"
    },
    "similar": {
      "reason": "They add أ at the start and اء at the end to form certain plurals for people.",
      "similarPatternIds": [
        64,
        101,
        44,
        51
      ]
    },
    "category": "other"
  },
  {
    "id": 91,
    "form": "فُعَل / فُعُل",
    "formD": "فعل / فعل",
    "changeId": "Group Words (Starts with U sound)",
    "friendlyName": "Makes Group Words",
    "count": 116,
    "formDesc": "Starts with ُ (u sound), vowels vary",
    "explanation": "This pattern often makes plurals or group nouns, and usually starts with an ُ (u) sound. Examples: قَرْيَة (qaryah - village) becomes قُرًى (quran - villages). رَسُول (rasool - messenger) becomes رُسُل (rusul - messengers). أُمَّة (ummah - nation) becomes أُمَم (umam - nations). صُورَة (Soorah - picture/chapter) becomes صُوَر (Suwar - pictures/chapters).",
    "affixes": {
      "infix_1": {
        "add": "ُ"
      }
    },
    "example": {
      "before_word": "رَسُول",
      "before_meaning": "messenger",
      "after_word": "رُسُل",
      "after_meaning": "messengers"
    },
    "similar": {
      "reason": "They often start with ُ (u sound) to form plurals or collectives.",
      "similarPatternIds": [
        40,
        65,
        57
      ]
    },
    "category": "other"
  },
  {
    "id": 36,
    "form": "فُعْلى",
    "formD": "فعلى",
    "changeId": "Special Female Words or Ideas (Ends in ى)",
    "friendlyName": "Makes Special Female Words",
    "count": 112,
    "formDesc": "Starts with ُ (u sound), middle is silent (ْ), ends with ى (aa sound)",
    "explanation": "This pattern starts with ُ (u), has a silent middle letter (sukun ْ), and ends with ى (aa sound). It makes special female words or abstract ideas. Examples: حُسْنَى (Husnaa - the best / best reward). بُشْرَى (bushraa - good news). قُرْبَى (qurbaa - kinship / nearness). أُنْثَى (unthaa - female). أُخْرَى (ukhraa - other female).",
    "affixes": {
      "suffix": {
        "add": "ى"
      },
      "infix_1": {
        "add": "ُ"
      },
      "infix_2": {
        "add": "ْ"
      }
    },
    "example": {
      "before_word": "بَشَرَ",
      "before_meaning": "he gave news",
      "after_word": "بُشْرَى",
      "after_meaning": "good news"
    },
    "similar": {
      "reason": "They end in ى and often start with ُ, indicating feminine, superlative, or abstract nouns.",
      "similarPatternIds": [
        106,
        43
      ]
    },
    "category": "other"
  },
  {
    "id": 93,
    "form": "فِعَل",
    "formD": "فعل",
    "changeId": "Parts, Pieces, or Types",
    "friendlyName": "Makes Parts and Types",
    "count": 111,
    "formDesc": "Starts with ِ (i sound), second letter has َ (a sound)",
    "explanation": "This pattern starts with ِ (i) and has َ (a) on the second letter. It often makes plurals that mean pieces or different types of something. Examples: قِطْعَة (qiT'ah - piece) becomes قِطَع (qiTa' - pieces). نِعْمَة (ni'mah - blessing) becomes نِعَم (ni'am - blessings). فِئَة (fi'ah - group/category).",
    "affixes": {
      "infix_1": {
        "add": "ِ"
      },
      "infix_2": {
        "add": "َ"
      }
    },
    "example": {
      "before_word": "نِعْمَة",
      "before_meaning": "blessing",
      "after_word": "نِعَم",
      "after_meaning": "blessings"
    },
    "similar": {
      "reason": "They use ِ (i) and َ (a) vowels to form nouns, often plurals showing pieces or types.",
      "similarPatternIds": [
        18,
        26,
        33
      ]
    },
    "category": "other"
  },
  {
    "id": 94,
    "form": "تَفعيل",
    "formD": "تفعيل",
    "changeId": "Name of the Strong Action",
    "friendlyName": "Action Name Maker",
    "count": 109,
    "formDesc": "Starts with تَـ (ta) and has ي (ee sound) after second root letter",
    "explanation": "This pattern makes the *name* of the action for verbs that have a doubled middle letter (Pattern 4, 'Makes Action Stronger'). It starts with تَـ (ta) and has a ي (ee sound) inside. Examples: عَلَّمَ ('allama - he taught) -> تَعْلِيم (ta'leem - teaching). سَلَّمَ (sallama - he submitted) -> تَسْلِيم (tasleem - submission). ذَكَّرَ (dhakkara - he reminded) -> تَذْكِير (tadhkeer - reminding).",
    "affixes": {
      "prefix": {
        "add": "تَ"
      },
      "infix_2": {
        "add": "ي"
      }
    },
    "example": {
      "before_word": "سَلَّمَ",
      "before_meaning": "he submitted",
      "after_word": "تَسْلِيم",
      "after_meaning": "submission"
    },
    "similar": {
      "reason": "They add تـ prefix and often a ي or ا inside to create the noun form of an action.",
      "similarPatternIds": [
        54,
        85,
        49,
        96,
        81
      ]
    },
    "category": "other"
  },
  {
    "id": 95,
    "form": "فعلئِذٍ",
    "formD": "فعلاذ",
    "changeId": "'On That Day/Time' Ending",
    "friendlyName": "Add 'at that time'",
    "count": 93,
    "formDesc": "Add ـئِذٍ (idhin sound) at the end",
    "explanation": "Adding the ending ـئِذٍ (idhin) to a word for time (like day, hour, moment) makes it refer to *that specific* time, usually mentioned earlier. Examples: يَوْم (yawm - day) becomes يَوْمَئِذٍ (yawma'idhin - on *that* day). حِين (Heen - time) becomes حِينَئِذٍ (Heena'idhin - at *that* time).",
    "affixes": {
      "suffix": {
        "add": "ئِذٍ"
      }
    },
    "example": {
      "before_word": "يَوْم",
      "before_meaning": "day",
      "after_word": "يَوْمَئِذٍ",
      "after_meaning": "on that day"
    },
    "similar": {
      "reason": "They add a small ending (ئِذٍ or ما) to change a word into a time expression or make it more general/conditional.",
      "similarPatternIds": [
        48
      ]
    },
    "category": "other"
  },
  {
    "id": 96,
    "form": "فتعل",
    "formD": "فتعل",
    "changeId": "Do To/For Oneself (Base Idea)",
    "friendlyName": "Do to yourself",
    "count": 92,
    "formDesc": "Basic idea: add ت (t) after first root letter",
    "explanation": "This isn't usually a word on its own, but it's the *idea* behind patterns like 49 (افتعل) where you add a ت (t) after the first main letter to show doing something for yourself. To make a real word, you usually add something at the beginning too, like اِ (i) for past (اِشْتَرَى - ishtaraa, he bought for himself) or يَ (ya) for present (يَشْتَرِي - yashtaree, he buys for himself).",
    "affixes": {
      "infix_1": {
        "add": "ت"
      }
    },
    "example": {
      "before_word": "شَرَى",
      "before_meaning": "he bought/sold",
      "after_word": "اِشْتَرَى",
      "after_meaning": "he bought (for himself)"
    },
    "similar": {
      "reason": "They insert ت after the first letter to show reflexive or self-directed actions.",
      "similarPatternIds": [
        49,
        54,
        85,
        81,
        99
      ]
    },
    "category": "other"
  },
  {
    "id": 97,
    "form": "فعليّ",
    "formD": "فعلي",
    "changeId": "Belonging To ('-an' / '-ic')",
    "friendlyName": "Makes belonging words",
    "count": 82,
    "formDesc": "Add ـِيّ (iyy sound) at the end",
    "explanation": "Adding ـِيّ (iyy sound) to the end of a noun turns it into an adjective meaning 'belonging to' or 'related to' that noun. It's like adding '-an', '-ic', or '-ish' in English. Examples: مَكَّة (Makkah) -> مَكِّيّ (Makkiyy - Meccan). عَرَب ('Arab - Arabs) -> عَرَبِيّ ('Arabiyy - Arabic).",
    "affixes": {
      "suffix": {
        "add": "يّ"
      }
    },
    "example": {
      "before_word": "عَرَب",
      "before_meaning": "Arabs",
      "after_word": "عَرَبِيّ",
      "after_meaning": "Arabic"
    },
    "similar": {
      "reason": "They both add a ي-based ending to show relationship or connection (-يّ, -ية).",
      "similarPatternIds": [
        107
      ]
    },
    "category": "other"
  },
  {
    "id": 98,
    "form": "فعلكما",
    "formD": "فعلكما",
    "changeId": "Adding 'your' or 'you' (for two people)",
    "friendlyName": "Add 'you two' ending",
    "count": 72,
    "formDesc": "Add كما (kumaa sound) at the end",
    "explanation": "Adding كما (kumaa) to the end of a word means 'your' or 'you' when talking to exactly *two* people. For example, رَبُّكُمَا (Rabbukumaa) means 'Lord of you two'. إِلَيْكُمَا (ilaykumaa) means 'to you two'. This is different from ـكَ/ـكِ (for one person, Pattern 32) and ـكُمْ (for a group, Pattern 23).",
    "affixes": {
      "suffix": {
        "add": "كما"
      }
    },
    "example": {
      "before_word": "رَبّ",
      "before_meaning": "Lord",
      "after_word": "رَبُّكُمَا",
      "after_meaning": "your Lord (for two people)"
    },
    "similar": {
      "reason": "They are all pronoun suffixes (كُمَا, هُم, هَا, نَا...) indicating possession or addressing exactly two, many, or one.",
      "similarPatternIds": [
        14,
        13,
        22,
        23,
        32,
        37,
        45,
        88,
        71
      ]
    },
    "category": "pronoun"
  },
  {
    "id": 99,
    "form": "انفعل",
    "formD": "انفعل",
    "changeId": "Happens By Itself",
    "friendlyName": "Happens By Itself",
    "count": 54,
    "formDesc": "Add انـ (in-) at the beginning",
    "explanation": "Adding انـ (in-) at the start of a verb often means the action happens *by itself*. No one is doing it; it just happens. Examples: فَجَرَ (fajara - he burst something) becomes اِنْفَجَرَ (infajara - it burst open *by itself*). قَلَبَ (qalaba - he turned something over) becomes اِنْقَلَبَ (inqalaba - it turned over / turned back *by itself*).",
    "affixes": {
      "prefix": {
        "add": "ان"
      }
    },
    "example": {
      "before_word": "فَجَرَ",
      "before_meaning": "he burst (something)",
      "after_word": "انْفَجَرَ",
      "after_meaning": "it burst open (by itself)"
    },
    "similar": {
      "reason": "They add extra letters at the start (ان, ا, ت) to show actions happening by themselves or to oneself.",
      "similarPatternIds": [
        49,
        54,
        96,
        85,
        81
      ]
    },
    "category": "other"
  },
  {
    "id": 101,
    "form": "أفعلة",
    "formD": "افعلة",
    "changeId": "Plurals or Numbers (Starts with A, ends with ـah)",
    "friendlyName": "Makes Groups and Numbers",
    "count": 46,
    "formDesc": "Add أ (a) at the beginning and ة (ah sound) at the end",
    "explanation": "This pattern starts with أ (a) and ends with ة (ah sound). It's used for: 1) Making some words plural: Like لِسَان (lisaan - tongue) becomes أَلْسِنَة (alsinah - tongues). سِلَاح (silaaH - weapon) becomes أَسْلِحَة (asliHah - weapons). 2) Some numbers: Like أَرْبَعَة (arba'ah - four).",
    "affixes": {
      "prefix": {
        "add": "أ"
      },
      "suffix": {
        "add": "ة"
      }
    },
    "example": {
      "before_word": "لِسَان",
      "before_meaning": "tongue",
      "after_word": "أَلْسِنَة",
      "after_meaning": "tongues"
    },
    "similar": {
      "reason": "They begin with أ and end with ة to form certain plurals or numbers.",
      "similarPatternIds": [
        44,
        51,
        90
      ]
    },
    "category": "other"
  },
  {
    "id": 102,
    "form": "مستفعل",
    "formD": "مستفعل",
    "changeId": "Person Asking For or Affected By",
    "friendlyName": "Seeking or Being Affected",
    "count": 44,
    "formDesc": "Add مست at the beginning",
    "explanation": "This pattern describes the person involved in the action of 'asking for/seeking' (corresponding to verbs starting with استـ 'ista-'). It starts with مستـ (musta-). 1) If the vowel before the last letter is ِ (i) sound (مُسْتَفْعِل), it's the person *doing* the seeking. Like مُسْتَغْفِر (mustaghfir - one seeking forgiveness). 2) If the vowel is َ (a) sound (مُسْتَفْعَل), it's the person or thing *being affected* or sought. Like مُسْتَضْعَف (mustaD'af - one considered weak / oppressed).",
    "affixes": {
      "prefix": {
        "add": "مست"
      }
    },
    "example": {
      "before_word": "غَفَرَ",
      "before_meaning": "he forgave",
      "after_word": "مُسْتَغْفِر",
      "after_meaning": "one seeking forgiveness"
    },
    "similar": {
      "reason": "They have a م at the start (مُ / مست / مِ / etc.) indicating doer/place/tool/affected person.",
      "similarPatternIds": [
        58,
        30,
        67,
        87,
        103
      ]
    },
    "category": "other"
  },
  {
    "id": 103,
    "form": "مِفعل / مِفعال / مِفعلة",
    "formD": "مفعل / مفعال / مفعلة",
    "changeId": "Tool or Instrument Name",
    "friendlyName": "Tool or Place Maker",
    "count": 40,
    "formDesc": "Starts with مِـ (mi sound)",
    "explanation": "This pattern makes names for tools you use to do something. It usually starts with مِـ (mi sound). Examples: فَتَحَ (fataHa - he opened) -> مِفْتَاح (miftaaH - key). نَشَرَ (nashara - he sawed/spread) -> مِنْشَار (minshaar - saw).",
    "affixes": {
      "prefix": {
        "add": "مِ"
      }
    },
    "example": {
      "before_word": "فَتَحَ",
      "before_meaning": "he opened",
      "after_word": "مِفْتَاح",
      "after_meaning": "key (tool for opening)"
    },
    "similar": {
      "reason": "All start with م + (some vowel) to create nouns (tool, place, doer, etc.).",
      "similarPatternIds": [
        30,
        67,
        87,
        102
      ]
    },
    "category": "other"
  },
  {
    "id": 104,
    "form": "فواعل",
    "formD": "فواعل",
    "changeId": "Plural with 'wa' Inside",
    "friendlyName": "Makes Many Things",
    "count": 37,
    "formDesc": "Puts وا (waa or wa sound) after the first root letter",
    "explanation": "This is another way to make words plural. It puts a وا (waa or wa sound) after the first main letter. Examples: كَوْكَب (kawkab - planet) becomes كَوَاكِب (kawaakib - planets). فَاحِشَة (faaHishah - shameful deed) becomes فَوَاحِش (fawaaHish - shameful deeds). It's often used for the plural of female 'doer' words (Pattern 29 ending in ة).",
    "affixes": {
      "infix_1": {
        "add": "وا"
      }
    },
    "example": {
      "before_word": "فَاحِشَة",
      "before_meaning": "shameful deed",
      "after_word": "فَوَاحِش",
      "after_meaning": "shameful deeds"
    },
    "similar": {
      "reason": "They form plurals by adding internal letters or suffixes.",
      "similarPatternIds": [
        21,
        39,
        15,
        75,
        79
      ]
    },
    "category": "plural"
  },
  {
    "id": 105,
    "form": "افعلي",
    "formD": "فعلي",
    "changeId": "Command for Girls ('Do it!')",
    "friendlyName": "Make Command For Girls",
    "count": 31,
    "formDesc": "Add ي (ee sound) at the end of a command",
    "explanation": "This makes a command (like Pattern 36 or 55) work for talking to *one girl or woman*. You just add a ي (ee sound) at the end. Examples: اِذْهَبْ (idh-hab! - go!) becomes اِذْهَبِي (idh-habee! - go! [to a girl]). اُسْجُدْ (usjud! - prostrate!) becomes اُسْجُدِي (usjudee! - prostrate! [to a girl]).",
    "affixes": {
      "suffix": {
        "add": "ي"
      }
    },
    "example": {
      "before_word": "اسْجُدْ",
      "before_meaning": "prostrate! (to a man)",
      "after_word": "اسْجُدِي",
      "after_meaning": "prostrate! (to a woman)"
    },
    "similar": {
      "reason": "They create command forms, one for males (36/55), one for females (105).",
      "similarPatternIds": [
        55,
        36
      ]
    },
    "category": "other"
  },
  {
    "id": 106,
    "form": "فَعْلى",
    "formD": "فعلى",
    "changeId": "Group/State Words Ending in ى",
    "friendlyName": "Special Group or State Maker",
    "count": 28,
    "formDesc": "Middle letter is silent (ْ), ends with ى (aa sound)",
    "explanation": "This pattern has a silent middle letter (sukun ْ) and ends with ى (aa sound). It can make words for: 1) Groups of people with a shared condition: like مَرِيض (mareeD - sick person) becomes مَرْضَى (marDaa - sick people). مَيِّت (mayyit - dead person) becomes مَوْتَى (mawtaa - dead people). 2) Abstract ideas: like ذِكْرَى (dhikraa - remembrance). 3) Places: like مَثْوَى (mathwaa - dwelling place).",
    "affixes": {
      "suffix": {
        "add": "ى"
      },
      "infix_2": {
        "add": "ْ"
      }
    },
    "example": {
      "before_word": "مَرِيض",
      "before_meaning": "sick person",
      "after_word": "مَرْضَى",
      "after_meaning": "sick people"
    },
    "similar": {
      "reason": "They end with ى and have a sukun on the middle letter.",
      "similarPatternIds": [
        43,
        92
      ]
    },
    "category": "other"
  },
  {
    "id": 107,
    "form": "فعلية",
    "formD": "فعلية",
    "changeId": "State or Idea ('-ness' / '-ism')",
    "friendlyName": "Makes Quality Words",
    "count": 10,
    "formDesc": "Add ـِيَّة (iyyah sound) at the end",
    "explanation": "Adding ـِيَّة (iyyah) to the end of a word often makes it into an abstract noun describing a state, condition, or 'ism'. Examples: جَاهِل (jaahil - ignorant person) becomes جَاهِلِيَّة (jaahiliyyah - state of ignorance). ذُرِّيّ (dhurriyy - related to offspring) becomes ذُرِّيَّة (dhurriyyah - offspring / descendants as a concept).",
    "affixes": {
      "suffix": {
        "add": "ية"
      }
    },
    "example": {
      "before_word": "جَاهِل",
      "before_meaning": "ignorant person",
      "after_word": "جَاهِلِيَّة",
      "after_meaning": "state of ignorance"
    },
    "similar": {
      "reason": "They add a ي-based ending (ية or يّ) to form an abstract state or adjective of relation.",
      "similarPatternIds": [
        97,
        20
      ]
    },
    "category": "other"
  }
];

export const grammarPatternMap: Record<number, GrammarPattern> = Object.fromEntries(
  grammarPatterns.map(p => [p.id, p])
);

export const PATTERN_CATEGORIES: { key: PatternCategory; label: string }[] = [
  { key: 'verb', label: 'Verbs' },
  { key: 'noun', label: 'Nouns' },
  { key: 'prefix', label: 'Prefixes' },
  { key: 'suffix', label: 'Suffixes' },
  { key: 'pronoun', label: 'Pronouns' },
  { key: 'plural', label: 'Plurals' },
  { key: 'other', label: 'Other' },
];
