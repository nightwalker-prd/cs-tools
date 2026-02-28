import { useState, useEffect, useRef } from "react";

const ROOTS = [
  { id: "ktb", letters: "ك-ت-ب", arabic: "كتب", field: "Writing", tier: 1 },
  { id: "elm", letters: "ع-ل-م", arabic: "علم", field: "Knowledge", tier: 1 },
  { id: "drs", letters: "د-ر-س", arabic: "درس", field: "Study", tier: 1 },
  { id: "fth", letters: "ف-ت-ح", arabic: "فتح", field: "Opening", tier: 1 },
  { id: "sne", letters: "ص-ن-ع", arabic: "صنع", field: "Making", tier: 1 },
  { id: "hkm", letters: "ح-ك-م", arabic: "حكم", field: "Judgment", tier: 1 },
  { id: "eml", letters: "ع-م-ل", arabic: "عمل", field: "Work", tier: 1 },
  { id: "qwl", letters: "ق-و-ل", arabic: "قول", field: "Speech", tier: 2, type: "hollow" },
  { id: "bye", letters: "ب-ي-ع", arabic: "بيع", field: "Trade", tier: 2, type: "weak" },
  { id: "tlb", letters: "ط-ل-ب", arabic: "طلب", field: "Seeking", tier: 1 },
  { id: "jhd", letters: "ج-ه-د", arabic: "جهد", field: "Effort", tier: 1 },
  { id: "hsb", letters: "ح-س-ب", arabic: "حسب", field: "Counting", tier: 1 },
];

const PATTERNS = [
  { id: "fa3il", display: "فَاعِلٌ", name: "Active Participle", desc: "The one who does", tier: 1, color: "#4ECDC4" },
  { id: "maf3ul", display: "مَفْعُولٌ", name: "Passive Participle", desc: "The thing done to", tier: 1, color: "#FF6B6B" },
  { id: "fa33al", display: "فَعَّالٌ", name: "Intensive / Professional", desc: "One who does it a lot", tier: 1, color: "#FFE66D" },
  { id: "maf3al", display: "مَفْعَلٌ", name: "Place Noun", desc: "Where it happens", tier: 1, color: "#95E1D3" },
  { id: "fi3ala", display: "فِعَالَةٌ", name: "Trade / Craft", desc: "The profession itself", tier: 2, color: "#F38181" },
  { id: "fa3il_adj", display: "فَعِيلٌ", name: "Quality Adjective", desc: "Having the quality", tier: 1, color: "#AA96DA" },
  { id: "mif3al", display: "مِفْعَالٌ", name: "Intensive Instrument", desc: "Tool that does it a lot", tier: 2, color: "#C9B1FF" },
  { id: "taf3il", display: "تَفْعِيلٌ", name: "Form II Verbal Noun", desc: "Intensive/causative action", tier: 2, color: "#FCBAD3" },
  { id: "fi3al", display: "فِعَالٌ", name: "Broken Plural", desc: "Plural form", tier: 2, color: "#A8D8EA" },
  { id: "fu3ul", display: "فُعُولٌ", name: "Broken Plural II", desc: "Another plural form", tier: 2, color: "#78C4D4" },
];

// Comprehensive combination database
const COMBINATIONS = {
  // ك-ت-ب
  "ktb+fa3il": { word: "كَاتِبٌ", meaning: "Writer / scribe", success: true, note: "One of the most iconic فَاعِلٌ forms. From ancient scribes to modern authors." },
  "ktb+maf3ul": { word: "مَكْتُوبٌ", meaning: "Written / letter / fate", success: true, note: "Also used metaphorically: 'it was maktūb' — it was written (destined)." },
  "ktb+fa33al": { word: "كَتَّابٌ", meaning: "Quran school teacher / prolific writer", success: true, note: "The كُتَّاب was the traditional elementary school for memorizing Quran." },
  "ktb+maf3al": { word: "مَكْتَبٌ", meaning: "Office / desk", success: true, note: "Place where writing happens. مَكْتَبَة (library) is the related feminine form." },
  "ktb+fi3ala": { word: "كِتَابَةٌ", meaning: "Writing (the act/craft)", success: true, note: "The craft and profession of writing. One of the clearest فِعَالَة examples." },
  "ktb+fa3il_adj": { word: "—", meaning: "", success: false, note: "كَتِيب exists but means 'booklet/pamphlet' — the pattern shifted meaning here. فَعِيل with this root doesn't produce a standard quality adjective." },
  "ktb+mif3al": { word: "مِكْتَابٌ", meaning: "", success: false, note: "Not attested. Arabic chose مِكْتَب for 'typewriter' in some dialects instead, or just used آلَة كَاتِبَة." },
  "ktb+taf3il": { word: "تَكْتِيبٌ", meaning: "", success: false, note: "Not standard. The concept of 'organizing into battalions' (كَتَائِب) exists but uses a different derivation." },
  "ktb+fi3al": { word: "كِتَابٌ", meaning: "Book", success: true, note: "One of the most fundamental words in Arabic. الكِتَاب — 'The Book' — refers to the Quran." },
  "ktb+fu3ul": { word: "كُتُبٌ", meaning: "Books (plural)", success: true, note: "Broken plural of كِتَاب. This pattern is highly productive for فِعَال nouns." },

  // ع-ل-م
  "elm+fa3il": { word: "عَالِمٌ", meaning: "Scholar / knower", success: true, note: "Plural: عُلَمَاء. The scholars of Islam. Also means 'world' (عَالَم) with different voweling." },
  "elm+maf3ul": { word: "مَعْلُومٌ", meaning: "Known / information", success: true, note: "مَعْلُومَات (information/data) is everywhere in modern Arabic." },
  "elm+fa33al": { word: "عَلَّامٌ", meaning: "Very knowledgeable / all-knowing", success: true, note: "عَلَّام الغُيُوب — Knower of the Unseen. Used as a divine attribute." },
  "elm+maf3al": { word: "مَعْلَمٌ", meaning: "Landmark / sign", success: true, note: "Plural مَعَالِم — landmarks, features. A place where knowledge is found." },
  "elm+fi3ala": { word: "—", meaning: "", success: false, note: "Knowledge isn't typically framed as a trade/craft in Arabic. The system chose عِلْم (فِعْل pattern) instead." },
  "elm+fa3il_adj": { word: "عَلِيمٌ", meaning: "All-Knowing", success: true, note: "One of the 99 Names of Allah. فَعِيل here intensifies the quality beyond فَاعِل." },
  "elm+mif3al": { word: "—", meaning: "", success: false, note: "No instrument of knowing. Knowledge isn't tool-based in the Arabic conceptual system." },
  "elm+taf3il": { word: "تَعْلِيمٌ", meaning: "Education / teaching", success: true, note: "The act of causing someone to know. Form II adds causative meaning: عَلِمَ (knew) → عَلَّمَ (taught)." },
  "elm+fi3al": { word: "—", meaning: "", success: false, note: "This root uses عِلْم (فِعْل) and عُلُوم (فُعُول) instead. Not every root uses every plural pattern." },
  "elm+fu3ul": { word: "عُلُومٌ", meaning: "Sciences / branches of knowledge", success: true, note: "Plural of عِلْم. كُلِّيَّة العُلُوم — Faculty of Sciences." },

  // د-ر-س
  "drs+fa3il": { word: "دَارِسٌ", meaning: "Student / one who studies", success: true, note: "Less common than طَالِب for 'student' but fully valid. Also means 'faded/effaced'." },
  "drs+maf3ul": { word: "مَدْرُوسٌ", meaning: "Studied / well-considered", success: true, note: "خُطَّة مَدْرُوسَة — a well-studied plan." },
  "drs+fa33al": { word: "دَرَّاسٌ", meaning: "Avid studier / one who studies intensely", success: true, note: "Someone who hits the books hard. The تَشْدِيد (doubling) adds intensity." },
  "drs+maf3al": { word: "مَدْرَسٌ", meaning: "→ مَدْرَسَةٌ — School", success: true, note: "The place where studying happens. One of the most recognizable مَفْعَل derivatives." },
  "drs+fi3ala": { word: "دِرَاسَةٌ", meaning: "Study / academic research", success: true, note: "دِرَاسَات عُلْيَا — graduate studies. The act/profession of studying." },
  "drs+fa3il_adj": { word: "—", meaning: "", success: false, note: "No standard دَرِيس as a quality adjective. The semantic field of 'study' doesn't lend itself to فَعِيل quality descriptions." },
  "drs+mif3al": { word: "—", meaning: "", success: false, note: "No instrument of studying in this pattern. You can't tool-ify the act of studying." },
  "drs+taf3il": { word: "تَدْرِيسٌ", meaning: "Teaching / instruction", success: true, note: "هَيْئَة التَّدْرِيس — teaching faculty. Causative: making someone study." },
  "drs+fi3al": { word: "—", meaning: "", success: false, note: "This root doesn't use this particular plural pattern. دُرُوس (فُعُول) is the standard plural." },
  "drs+fu3ul": { word: "دُرُوسٌ", meaning: "Lessons", success: true, note: "Plural of دَرْس (lesson). One of the first words every Arabic student learns!" },

  // ف-ت-ح
  "fth+fa3il": { word: "فَاتِحٌ", meaning: "Conqueror / opener", success: true, note: "الفَاتِحَة — The Opening. First surah of the Quran. Also: مُحَمَّد الفَاتِح (Mehmed the Conqueror)." },
  "fth+maf3ul": { word: "مَفْتُوحٌ", meaning: "Open / opened", success: true, note: "Also a grammatical term: the فَتْحَة vowel mark is called so because the mouth 'opens'." },
  "fth+fa33al": { word: "فَتَّاحٌ", meaning: "The Supreme Opener / Judge", success: true, note: "الفَتَّاح — a Name of Allah. The One who opens all doors and resolves all matters." },
  "fth+maf3al": { word: "مَفْتَحٌ", meaning: "→ مِفْتَاح — Key", success: true, note: "The standard form shifted to مِفْتَاح. The 'instrument of opening' — Arabic chose مِفْعَال over مَفْعَل here." },
  "fth+fi3ala": { word: "—", meaning: "", success: false, note: "Opening/conquering isn't conceptualized as a trade. The act is فَتْح (conquest) using the simple فَعْل pattern." },
  "fth+fa3il_adj": { word: "—", meaning: "", success: false, note: "No فَتِيح as a standard adjective. The quality of 'openness' is expressed differently in Arabic." },
  "fth+mif3al": { word: "مِفْتَاحٌ", meaning: "Key", success: true, note: "The tool that opens! مَفَاتِيح (keys) — one of the most satisfying مِفْعَال forms." },
  "fth+taf3il": { word: "تَفْتِيحٌ", meaning: "Lightening (of color) / opening up", success: true, note: "Used for lightening colors or gradual opening. Less common but valid." },
  "fth+fi3al": { word: "—", meaning: "", success: false, note: "This root uses فُتُوح and فُتُوحَات for 'conquests' instead." },
  "fth+fu3ul": { word: "فُتُوحٌ", meaning: "Conquests", success: true, note: "فُتُوحَات الشَّام — the conquests of the Levant. Historical term." },

  // ص-ن-ع
  "sne+fa3il": { word: "صَانِعٌ", meaning: "Maker / craftsman", success: true, note: "الصَّانِع — The Maker. Also used for any skilled artisan." },
  "sne+maf3ul": { word: "مَصْنُوعٌ", meaning: "Manufactured / artifact", success: true, note: "مَصْنُوعَات — manufactured goods, products." },
  "sne+fa33al": { word: "—", meaning: "", success: false, note: "صَنَّاع isn't standard. Arabic uses صَانِع or صَنَائِعِي for craftsman instead." },
  "sne+maf3al": { word: "مَصْنَعٌ", meaning: "Factory", success: true, note: "The place where making happens. مَصَانِع — factories. Core modern vocabulary." },
  "sne+fi3ala": { word: "صِنَاعَةٌ", meaning: "Industry / craft / manufacturing", success: true, note: "صِنَاعَة تَقْلِيدِيَّة — traditional craftsmanship. Perfect فِعَالَة example." },
  "sne+fa3il_adj": { word: "—", meaning: "", success: false, note: "No standard صَنِيع as a quality. صَنِيعَة exists but means 'a good deed/favor' — semantic drift." },
  "sne+mif3al": { word: "—", meaning: "", success: false, note: "The 'instrument of making' is too abstract. Arabic prefers specific tool names." },
  "sne+taf3il": { word: "تَصْنِيعٌ", meaning: "Manufacturing / industrialization", success: true, note: "التَّصْنِيع — industrialization. A key term in modern economics." },
  "sne+fi3al": { word: "—", meaning: "", success: false, note: "This root uses صَنَائِع as its primary plural pattern instead." },
  "sne+fu3ul": { word: "—", meaning: "", success: false, note: "Not productive here. صُنْع (making) doesn't pluralize this way — it's a verbal noun, not a count noun." },

  // ح-ك-م
  "hkm+fa3il": { word: "حَاكِمٌ", meaning: "Ruler / governor / judge", success: true, note: "The one who judges and rules. حُكَّام — rulers." },
  "hkm+maf3ul": { word: "مَحْكُومٌ", meaning: "Ruled / governed / sentenced", success: true, note: "مَحْكُوم عَلَيْهِ — the one sentenced. The governed." },
  "hkm+fa33al": { word: "—", meaning: "", success: false, note: "No standard حَكَّام as 'professional judge'. Arabic uses حَاكِم and قَاضٍ instead for judicial roles." },
  "hkm+maf3al": { word: "مَحْكَمٌ", meaning: "→ مَحْكَمَةٌ — Court of law", success: true, note: "The place where judgment happens. المَحْكَمَة العُلْيَا — the Supreme Court." },
  "hkm+fi3ala": { word: "—", meaning: "", success: false, note: "Judging isn't framed as a craft. Arabic uses حُكْم (judgment) and قَضَاء (judiciary) instead." },
  "hkm+fa3il_adj": { word: "حَكِيمٌ", meaning: "Wise", success: true, note: "الحَكِيم — The All-Wise. One of the 99 Names. Also لُقْمَان الحَكِيم." },
  "hkm+mif3al": { word: "—", meaning: "", success: false, note: "No instrument of judging. Wisdom isn't a tool-based concept." },
  "hkm+taf3il": { word: "تَحْكِيمٌ", meaning: "Arbitration / adjudication", success: true, note: "هَيْئَة التَّحْكِيم — arbitration panel. Making someone judge." },
  "hkm+fi3al": { word: "—", meaning: "", success: false, note: "Uses أَحْكَام (أَفْعَال pattern) for the plural of حُكْم instead." },
  "hkm+fu3ul": { word: "—", meaning: "", success: false, note: "Not productive. حِكَم (broken plural of حِكْمَة) uses a different pattern." },

  // ع-م-ل
  "eml+fa3il": { word: "عَامِلٌ", meaning: "Worker / factor / agent", success: true, note: "عُمَّال — workers. Also grammatical: عَامِل — the governing word in إعراب." },
  "eml+maf3ul": { word: "مَعْمُولٌ", meaning: "Made / manufactured / governed (gram.)", success: true, note: "مَعْمُول بِهِ — acted upon. Also a pastry! And a grammar term." },
  "eml+fa33al": { word: "عَمَّالٌ", meaning: "Hard worker / laborer", success: true, note: "Someone who works intensively. Less common than عَامِل but valid." },
  "eml+maf3al": { word: "مَعْمَلٌ", meaning: "Laboratory / workshop", success: true, note: "The place where work/experimentation happens. مَعَامِل — laboratories." },
  "eml+fi3ala": { word: "عِمَالَةٌ", meaning: "Labor / workforce / agency", success: true, note: "Can also mean 'commission' in business. The trade/practice of working." },
  "eml+fa3il_adj": { word: "—", meaning: "", success: false, note: "No standard عَمِيل as a quality adjective. عَمِيل exists but means 'agent/client' — different derivation." },
  "eml+mif3al": { word: "—", meaning: "", success: false, note: "Work is too abstract for an instrument noun here." },
  "eml+taf3il": { word: "—", meaning: "", success: false, note: "No standard تَعْمِيل. The Form II verbal noun of this root isn't commonly used." },
  "eml+fi3al": { word: "عِمَالٌ", meaning: "", success: false, note: "Not standard. The plural of عَامِل is عُمَّال (فُعَّال pattern) instead." },
  "eml+fu3ul": { word: "—", meaning: "", success: false, note: "عَمَل pluralizes as أَعْمَال (أَفْعَال) not فُعُول." },

  // ق-و-ل (hollow)
  "qwl+fa3il": { word: "قَائِلٌ", meaning: "Speaker / the one who said", success: true, note: "⚡ Hollow root! The وَاو disappears and becomes a hamza seat: فَاعِل → قَائِل not *قَاوِل." },
  "qwl+maf3ul": { word: "مَقُولٌ", meaning: "Said / spoken / statement", success: true, note: "⚡ The hollow letter compresses: مَفْعُول → مَقُول. Also مَقُولَة — a famous saying." },
  "qwl+fa33al": { word: "قَوَّالٌ", meaning: "Outspoken / talkative person", success: true, note: "⚡ Here the وَاو stays because the شَدَّة holds it in place. The doubling protects the weak letter." },
  "qwl+maf3al": { word: "مَقَالٌ", meaning: "Article / essay / speech", success: true, note: "⚡ Hollow transformation: مَفْعَل → مَقَال. The place/product of speaking. مَقَالَات — articles." },
  "qwl+fi3ala": { word: "—", meaning: "", success: false, note: "Speaking isn't a trade-pattern word. Arabic uses قَوْل (saying) and كَلَام (speech) instead." },
  "qwl+fa3il_adj": { word: "—", meaning: "", success: false, note: "No قَوِيل. The quality of being spoken uses different patterns." },
  "qwl+mif3al": { word: "مِقْوَالٌ", meaning: "Very talkative person", success: true, note: "⚡ The وَاو reappears in this pattern. Someone who talks too much!" },
  "qwl+taf3il": { word: "تَقْوِيلٌ", meaning: "Putting words in someone's mouth", success: true, note: "⚡ قَوَّلَهُ — to make someone say something. Attributing speech to someone." },
  "qwl+fi3al": { word: "—", meaning: "", success: false, note: "Hollow roots often resist certain plural patterns. أَقْوَال (أَفْعَال) is the standard plural." },
  "qwl+fu3ul": { word: "—", meaning: "", success: false, note: "Not productive here. قَوْل pluralizes as أَقْوَال instead." },

  // ب-ي-ع (weak)
  "bye+fa3il": { word: "بَائِعٌ", meaning: "Seller / vendor", success: true, note: "⚡ Weak root! The يَاء transforms: فَاعِل → بَائِع. The hamza seat appears." },
  "bye+maf3ul": { word: "مَبِيعٌ", meaning: "Sold / merchandise", success: true, note: "⚡ Weak transformation: مَفْعُول → مَبِيع. مَبِيعَات — sales figures." },
  "bye+fa33al": { word: "بَيَّاعٌ", meaning: "Street vendor / hawker", success: true, note: "⚡ The يَاء is protected by the شَدَّة, just like hollow roots. An informal seller." },
  "bye+maf3al": { word: "—", meaning: "", success: false, note: "No standard مَبْيَع as a place. Arabic uses سُوق (market) and مَتْجَر (store) instead." },
  "bye+fi3ala": { word: "—", meaning: "", success: false, note: "Not standard for this root. بَيْع (selling) uses the simple pattern." },
  "bye+fa3il_adj": { word: "—", meaning: "", success: false, note: "No بَيِيع. Commercial quality is expressed through other vocabulary." },
  "bye+mif3al": { word: "—", meaning: "", success: false, note: "No instrument of selling in this pattern." },
  "bye+taf3il": { word: "تَبْيِيعٌ", meaning: "", success: false, note: "Not commonly used. The concept of 'making someone sell' doesn't have a standard Form II." },
  "bye+fi3al": { word: "—", meaning: "", success: false, note: "بُيُوع (فُعُول) is used for types of sales transactions." },
  "bye+fu3ul": { word: "بُيُوعٌ", meaning: "Types of sales / transactions", success: true, note: "⚡ Technical fiqh term for different categories of sale contracts." },

  // ط-ل-ب
  "tlb+fa3il": { word: "طَالِبٌ", meaning: "Student / seeker", success: true, note: "طَالِب عِلْم — seeker of knowledge. The most common word for 'student'." },
  "tlb+maf3ul": { word: "مَطْلُوبٌ", meaning: "Required / wanted / demanded", success: true, note: "المَطْلُوب — what is required. Also 'wanted' (as in wanted by police)." },
  "tlb+fa33al": { word: "طَلَّابٌ", meaning: "Persistent seeker / very demanding", success: true, note: "Someone who seeks relentlessly. Less common but expressive." },
  "tlb+maf3al": { word: "مَطْلَبٌ", meaning: "Demand / requirement / goal", success: true, note: "مَطَالِب — demands, requirements. What is being sought." },
  "tlb+fi3ala": { word: "—", meaning: "", success: false, note: "Seeking isn't conceptualized as a trade. طَلَب (request/demand) uses the simple pattern." },
  "tlb+fa3il_adj": { word: "—", meaning: "", success: false, note: "No standard طَلِيب. The quality of 'being sought' uses مَطْلُوب instead." },
  "tlb+mif3al": { word: "—", meaning: "", success: false, note: "No instrument of seeking in this pattern." },
  "tlb+taf3il": { word: "—", meaning: "", success: false, note: "Not commonly used in Form II verbal noun." },
  "tlb+fi3al": { word: "طِلَابٌ", meaning: "", success: false, note: "Non-standard. طُلَّاب (فُعَّال) is the productive plural for طَالِب." },
  "tlb+fu3ul": { word: "—", meaning: "", success: false, note: "طَلَب pluralizes differently. Not every noun uses فُعُول." },

  // ج-ه-د
  "jhd+fa3il": { word: "—", meaning: "", success: false, note: "مُجَاهِد (Form III participle) is used instead. The base فَاعِل isn't standard here." },
  "jhd+maf3ul": { word: "مَجْهُودٌ", meaning: "Effort / exertion", success: true, note: "بَذَلَ مَجْهُودًا — to exert effort. Technically a passive participle used as a noun." },
  "jhd+fa33al": { word: "—", meaning: "", success: false, note: "No standard جَهَّاد. The concept of intensive striving uses مُجَاهِد from Form III." },
  "jhd+maf3al": { word: "—", meaning: "", success: false, note: "No place of effort in this pattern." },
  "jhd+fi3ala": { word: "—", meaning: "", success: false, note: "Not a trade-pattern word for this root." },
  "jhd+fa3il_adj": { word: "جَهِيدٌ", meaning: "", success: false, note: "Not standard. جَهِيد isn't an established adjective." },
  "jhd+mif3al": { word: "—", meaning: "", success: false, note: "Effort can't be instrumentalized this way." },
  "jhd+taf3il": { word: "—", meaning: "", success: false, note: "Not standard Form II verbal noun. تَجَاهُد or اجْتِهَاد are used instead." },
  "jhd+fi3al": { word: "جِهَادٌ", meaning: "Striving / struggle", success: true, note: "From the root meaning 'to exert effort'. جِهَاد النَّفْس — striving against the self." },
  "jhd+fu3ul": { word: "جُهُودٌ", meaning: "Efforts (plural)", success: true, note: "بَذَلَ جُهُودًا كَبِيرَة — exerted great efforts." },

  // ح-س-ب
  "hsb+fa3il": { word: "حَاسِبٌ", meaning: "Calculator / computer / one who reckons", success: true, note: "حَاسُوب is the more common word for 'computer' in formal Arabic." },
  "hsb+maf3ul": { word: "مَحْسُوبٌ", meaning: "Calculated / counted", success: true, note: "Also means 'protégé/client' — someone counted as belonging to a patron." },
  "hsb+fa33al": { word: "حَسَّابٌ", meaning: "Expert accountant / great calculator", success: true, note: "One who calculates with great skill or frequency." },
  "hsb+maf3al": { word: "—", meaning: "", success: false, note: "No standard 'place of counting' in this pattern. مُحَاسَبَة (accounting) uses Form III." },
  "hsb+fi3ala": { word: "—", meaning: "", success: false, note: "Not standard. حِسَاب (account/math) uses the فِعَال pattern but as a singular noun." },
  "hsb+fa3il_adj": { word: "حَسِيبٌ", meaning: "Noble / of good lineage / The Reckoner", success: true, note: "الحَسِيب — a Name of Allah. Also means someone of distinguished ancestry." },
  "hsb+mif3al": { word: "—", meaning: "", success: false, note: "Not standard. Computer/calculator uses حَاسُوب (فَاعُول pattern) instead." },
  "hsb+taf3il": { word: "—", meaning: "", success: false, note: "Not commonly used. مُحَاسَبَة (Form III) dominates for 'accounting'." },
  "hsb+fi3al": { word: "حِسَابٌ", meaning: "Account / arithmetic / reckoning", success: true, note: "يَوْم الحِسَاب — Day of Reckoning. Also: bank account, mathematics." },
  "hsb+fu3ul": { word: "—", meaning: "", success: false, note: "حِسَاب pluralizes as حِسَابَات (sound feminine plural). Not every noun breaks." },
};

// Particle effects
const Particles = ({ active, success }) => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (!active) return;
    const newParticles = Array.from({ length: success ? 20 : 8 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 20,
      dx: (Math.random() - 0.5) * 100,
      dy: -Math.random() * 80 - 20,
      size: Math.random() * 6 + 2,
      color: success
        ? ["#FFD700", "#4ECDC4", "#FFE66D", "#F8B500"][Math.floor(Math.random() * 4)]
        : ["#FF6B6B", "#cc5555", "#994444"][Math.floor(Math.random() * 3)],
      delay: Math.random() * 0.3,
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(t);
  }, [active, success]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            animation: `particleFly 1.2s ease-out ${p.delay}s forwards`,
            opacity: 0,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
          }}
        />
      ))}
    </div>
  );
};

export default function SarfForge() {
  const [selectedRoot, setSelectedRoot] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [result, setResult] = useState(null);
  const [discoveries, setDiscoveries] = useState([]);
  const [showParticles, setShowParticles] = useState(false);
  const [particleSuccess, setParticleSuccess] = useState(false);
  const [forgeAnimation, setForgeAnimation] = useState(false);
  const [tier2Unlocked, setTier2Unlocked] = useState(false);
  const [stats, setStats] = useState({ attempts: 0, found: 0, failed: 0 });
  const [showCollection, setShowCollection] = useState(false);
  const forgeRef = useRef(null);

  const totalPossible = Object.values(COMBINATIONS).filter((c) => c.success).length;

  useEffect(() => {
    if (discoveries.length >= 8 && !tier2Unlocked) {
      setTier2Unlocked(true);
    }
  }, [discoveries.length, tier2Unlocked]);

  const forge = () => {
    if (!selectedRoot || !selectedPattern) return;
    const key = `${selectedRoot.id}+${selectedPattern.id}`;
    const combo = COMBINATIONS[key];

    setForgeAnimation(true);
    setResult(null);

    setTimeout(() => {
      setForgeAnimation(false);
      if (combo) {
        setResult(combo);
        setShowParticles(true);
        setParticleSuccess(combo.success);
        setTimeout(() => setShowParticles(false), 100);

        setStats((s) => ({
          attempts: s.attempts + 1,
          found: s.found + (combo.success ? 1 : 0),
          failed: s.failed + (combo.success ? 0 : 1),
        }));

        if (combo.success && !discoveries.find((d) => d.key === key)) {
          setDiscoveries((d) => [
            ...d,
            {
              key,
              word: combo.word,
              meaning: combo.meaning,
              root: selectedRoot,
              pattern: selectedPattern,
            },
          ]);
        }
      }
    }, 800);
  };

  const availableRoots = ROOTS.filter((r) => r.tier === 1 || (r.tier === 2 && tier2Unlocked));
  const availablePatterns = PATTERNS.filter((p) => p.tier === 1 || (p.tier === 2 && tier2Unlocked));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #0a0a12 0%, #121225 40%, #0d1117 100%)",
      color: "#e0ddd5",
      fontFamily: "'Crimson Text', 'Georgia', serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Amiri:wght@400;700&display=swap');

        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
        }
        @keyframes forgeGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 200, 50, 0.1); }
          50% { box-shadow: 0 0 40px rgba(255, 200, 50, 0.3); }
        }
        @keyframes forgePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes unlockPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .root-card {
          cursor: pointer;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          transition: all 0.25s ease;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .root-card:hover {
          border-color: rgba(78, 205, 196, 0.4);
          background: rgba(78, 205, 196, 0.06);
          transform: translateY(-2px);
        }
        .root-card.selected {
          border-color: rgba(78, 205, 196, 0.7);
          background: rgba(78, 205, 196, 0.1);
          box-shadow: 0 0 20px rgba(78, 205, 196, 0.15);
        }
        .root-card.tier2 {
          border-color: rgba(255, 180, 50, 0.3);
        }
        .root-card.tier2:hover {
          border-color: rgba(255, 180, 50, 0.5);
          background: rgba(255, 180, 50, 0.06);
        }
        .root-card.tier2.selected {
          border-color: rgba(255, 180, 50, 0.7);
          background: rgba(255, 180, 50, 0.1);
          box-shadow: 0 0 20px rgba(255, 180, 50, 0.15);
        }
        .pattern-card {
          cursor: pointer;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          transition: all 0.25s ease;
          text-align: center;
        }
        .pattern-card:hover {
          transform: translateY(-2px);
        }
        .pattern-card.selected {
          box-shadow: 0 0 20px rgba(255,255,255,0.1);
        }
        .forge-btn {
          cursor: pointer;
          border: none;
          padding: 14px 40px;
          border-radius: 12px;
          font-size: 18px;
          font-family: 'Amiri', serif;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .forge-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .forge-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 200, 50, 0.3);
        }
        .forge-btn:not(:disabled):active {
          transform: translateY(0);
        }
        .collection-item {
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .stat-box {
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          text-align: center;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontSize: 32, fontFamily: "'Amiri', serif", fontWeight: 700,
          margin: 0, letterSpacing: "0.02em",
          background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "shimmer 4s linear infinite",
        }}>
          مَصْنَعُ الصَّرْف
        </h1>
        <p style={{ fontSize: 14, color: "#8a8775", margin: "4px 0 0", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
          The Ṣarf Forge — Craft Words from Roots & Patterns
        </p>

        {/* Stats bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
          <div className="stat-box">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#4ECDC4" }}>{discoveries.length}</div>
            <div style={{ fontSize: 10, color: "#8a8775", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>Discovered</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FFD700" }}>{totalPossible}</div>
            <div style={{ fontSize: 10, color: "#8a8775", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>Total Words</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FF6B6B" }}>{stats.failed}</div>
            <div style={{ fontSize: 10, color: "#8a8775", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>Dead Ends</div>
          </div>
          <div className="stat-box" style={{ cursor: "pointer" }} onClick={() => setShowCollection(!showCollection)}>
            <div style={{ fontSize: 20 }}>📖</div>
            <div style={{ fontSize: 10, color: "#8a8775", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>Collection</div>
          </div>
        </div>

        {/* Tier unlock notification */}
        {tier2Unlocked && stats.attempts > 0 && stats.attempts <= 12 && (
          <div style={{
            marginTop: 10, padding: "6px 16px", borderRadius: 8,
            background: "rgba(255, 180, 50, 0.1)", border: "1px solid rgba(255, 180, 50, 0.3)",
            display: "inline-block", fontSize: 13, color: "#FFB432",
            animation: "unlockPulse 2s ease infinite",
            fontFamily: "system-ui, sans-serif",
          }}>
            ✦ Tier 2 Unlocked — Hollow roots, weak roots, and advanced patterns
          </div>
        )}
      </div>

      {/* Collection overlay */}
      {showCollection && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }} onClick={(e) => e.target === e.currentTarget && setShowCollection(false)}>
          <div style={{
            background: "#15152a", borderRadius: 16, padding: 24, maxWidth: 500, width: "100%",
            maxHeight: "70vh", overflow: "auto", border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <h2 style={{ fontFamily: "'Amiri', serif", fontSize: 22, margin: "0 0 16px", color: "#FFD700" }}>
              📖 Word Collection ({discoveries.length}/{totalPossible})
            </h2>
            {discoveries.length === 0 ? (
              <p style={{ color: "#8a8775", fontStyle: "italic" }}>No words discovered yet. Start forging!</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {discoveries.map((d) => (
                  <div key={d.key} className="collection-item">
                    <div>
                      <span style={{ fontFamily: "'Amiri', serif", fontSize: 20, color: "#FFD700" }}>{d.word}</span>
                      <span style={{ fontSize: 13, color: "#8a8775", marginRight: 8, fontFamily: "system-ui, sans-serif" }}> — {d.meaning}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#666", whiteSpace: "nowrap", fontFamily: "system-ui, sans-serif" }}>
                      {d.root.letters} + {d.pattern.display}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowCollection(false)} style={{
              marginTop: 16, padding: "8px 20px", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8, background: "transparent", color: "#e0ddd5", cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
            }}>Close</button>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Root Selection */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{
            fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#4ECDC4", margin: "0 0 10px", fontFamily: "system-ui, sans-serif", fontWeight: 600,
          }}>① Select Root — الجَذْر</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {availableRoots.map((root) => (
              <div
                key={root.id}
                className={`root-card ${selectedRoot?.id === root.id ? "selected" : ""} ${root.tier === 2 ? "tier2" : ""}`}
                onClick={() => { setSelectedRoot(root); setResult(null); }}
              >
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 22, direction: "rtl" }}>{root.letters}</div>
                <div style={{ fontSize: 10, color: "#8a8775", marginTop: 2, fontFamily: "system-ui, sans-serif" }}>
                  {root.field}
                  {root.type && <span style={{ color: "#FFB432", marginLeft: 4 }}>⚡{root.type}</span>}
                </div>
              </div>
            ))}
            {!tier2Unlocked && (
              <div style={{
                padding: "10px 14px", borderRadius: 10, border: "1.5px dashed rgba(255,180,50,0.2)",
                background: "rgba(255,180,50,0.02)", textAlign: "center", opacity: 0.5,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 11, color: "#FFB432", fontFamily: "system-ui, sans-serif" }}>🔒 Discover 8 words to unlock Tier 2</span>
              </div>
            )}
          </div>
        </div>

        {/* Pattern Selection */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#FF6B6B", margin: "0 0 10px", fontFamily: "system-ui, sans-serif", fontWeight: 600,
          }}>② Select Pattern — الوَزْن</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {availablePatterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`pattern-card ${selectedPattern?.id === pattern.id ? "selected" : ""}`}
                onClick={() => { setSelectedPattern(pattern); setResult(null); }}
                style={{
                  borderColor: selectedPattern?.id === pattern.id
                    ? `${pattern.color}99` : undefined,
                  background: selectedPattern?.id === pattern.id
                    ? `${pattern.color}15` : undefined,
                  boxShadow: selectedPattern?.id === pattern.id
                    ? `0 0 20px ${pattern.color}20` : undefined,
                }}
              >
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 20, direction: "rtl", color: pattern.color }}>
                  {pattern.display}
                </div>
                <div style={{ fontSize: 10, color: "#8a8775", marginTop: 2, fontFamily: "system-ui, sans-serif" }}>{pattern.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Forge Area */}
        <div ref={forgeRef} style={{
          position: "relative",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: 24,
          textAlign: "center",
          animation: forgeAnimation ? "forgePulse 0.8s ease" : "forgeGlow 3s ease infinite",
          marginBottom: 20,
        }}>
          <Particles active={showParticles} success={particleSuccess} />

          {/* Selected items display */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 16 }}>
            <div style={{
              padding: "12px 20px", borderRadius: 10, minWidth: 100,
              background: selectedRoot ? "rgba(78, 205, 196, 0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${selectedRoot ? "rgba(78, 205, 196, 0.3)" : "rgba(255,255,255,0.06)"}`,
            }}>
              {selectedRoot ? (
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 26, direction: "rtl", color: "#4ECDC4" }}>
                  {selectedRoot.letters}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: "#555", fontFamily: "system-ui, sans-serif" }}>Root</div>
              )}
            </div>

            <div style={{
              fontSize: 28, color: "#FFD700", fontFamily: "'Amiri', serif",
              opacity: selectedRoot && selectedPattern ? 1 : 0.3,
            }}>×</div>

            <div style={{
              padding: "12px 20px", borderRadius: 10, minWidth: 100,
              background: selectedPattern ? `${selectedPattern.color}15` : "rgba(255,255,255,0.03)",
              border: `1px solid ${selectedPattern ? `${selectedPattern.color}50` : "rgba(255,255,255,0.06)"}`,
            }}>
              {selectedPattern ? (
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 26, direction: "rtl", color: selectedPattern.color }}>
                  {selectedPattern.display}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: "#555", fontFamily: "system-ui, sans-serif" }}>Pattern</div>
              )}
            </div>
          </div>

          {/* Forge button */}
          <button
            className="forge-btn"
            disabled={!selectedRoot || !selectedPattern || forgeAnimation}
            onClick={forge}
            style={{
              background: selectedRoot && selectedPattern
                ? "linear-gradient(135deg, #FFD700, #FFA500)" : "rgba(255,255,255,0.05)",
              color: selectedRoot && selectedPattern ? "#1a1a2e" : "#555",
            }}
          >
            {forgeAnimation ? "⚒ Forging..." : "⚒ Forge Word"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{
            animation: "slideUp 0.4s ease",
            background: result.success
              ? "linear-gradient(135deg, rgba(78, 205, 196, 0.08), rgba(255, 215, 0, 0.05))"
              : "linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 107, 107, 0.03))",
            border: `1px solid ${result.success ? "rgba(78, 205, 196, 0.25)" : "rgba(255, 107, 107, 0.25)"}`,
            borderRadius: 16,
            padding: 24,
            position: "relative",
          }}>
            {/* Success/fail badge */}
            <div style={{
              position: "absolute", top: -10, left: 20,
              padding: "3px 12px", borderRadius: 20, fontSize: 11,
              fontFamily: "system-ui, sans-serif", fontWeight: 600,
              letterSpacing: "0.05em", textTransform: "uppercase",
              background: result.success ? "#4ECDC4" : "#FF6B6B",
              color: "#1a1a2e",
            }}>
              {result.success ? "✦ Word Discovered" : "✗ Dead End"}
            </div>

            {result.success ? (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Amiri', serif", fontSize: 42, color: "#FFD700",
                  direction: "rtl", margin: "8px 0",
                  textShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
                }}>
                  {result.word}
                </div>
                <div style={{ fontSize: 18, color: "#e0ddd5", margin: "4px 0 12px" }}>
                  {result.meaning}
                </div>
                <div style={{
                  fontSize: 14, color: "#8a8775", lineHeight: 1.6,
                  maxWidth: 600, margin: "0 auto",
                  padding: "12px 16px", borderRadius: 8,
                  background: "rgba(0,0,0,0.2)",
                }}>
                  {result.note}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Amiri', serif", fontSize: 28, color: "#FF6B6B",
                  margin: "8px 0", direction: "rtl", opacity: 0.6,
                }}>
                  {selectedRoot.letters} + {selectedPattern.display}
                </div>
                <div style={{ fontSize: 15, color: "#cc8888", margin: "4px 0 12px", fontStyle: "italic" }}>
                  This combination doesn't produce a standard word
                </div>
                <div style={{
                  fontSize: 14, color: "#a09880", lineHeight: 1.6,
                  maxWidth: 600, margin: "0 auto",
                  padding: "12px 16px", borderRadius: 8,
                  background: "rgba(0,0,0,0.2)",
                  textAlign: "left",
                }}>
                  💡 {result.note}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
