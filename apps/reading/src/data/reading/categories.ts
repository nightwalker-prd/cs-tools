// src/data/reading/categories.ts

/**
 * Category definition
 */
export interface Category {
  id: string;
  en: string;
  ar: string;
}

/**
 * All reading text categories with Arabic translations
 */
export const CATEGORIES: Record<string, Category> = {
  'adab-manners': { id: 'adab-manners', en: 'Adab & Manners', ar: 'الأدب والأخلاق' },
  'business-ethics': { id: 'business-ethics', en: 'Business Ethics', ar: 'أخلاقيات العمل التجاري' },
  'character-building': { id: 'character-building', en: 'Character Building', ar: 'بناء الشخصية' },
  'character-development': { id: 'character-development', en: 'Character Development', ar: 'تنمية الشخصية' },
  'community-brotherhood': { id: 'community-brotherhood', en: 'Community & Brotherhood', ar: 'المجتمع والأخوة' },
  'companion-stories': { id: 'companion-stories', en: 'Companion Stories', ar: 'قصص الصحابة' },
  'daily-life': { id: 'daily-life', en: 'Daily Life', ar: 'الحياة اليومية' },
  'daily-life-society': { id: 'daily-life-society', en: 'Daily Life & Society', ar: 'الحياة اليومية والمجتمع' },
  'decision-making': { id: 'decision-making', en: 'Decision Making', ar: 'اتخاذ القرار' },
  'education-learning': { id: 'education-learning', en: 'Education & Learning', ar: 'التعليم والتعلم' },
  'education-practice': { id: 'education-practice', en: 'Education & Practice', ar: 'التعليم والممارسة' },
  'education-wisdom': { id: 'education-wisdom', en: 'Education & Wisdom', ar: 'التعليم والحكمة' },
  'eschatology': { id: 'eschatology', en: 'Eschatology', ar: 'علم الآخرة' },
  'essays-reflections': { id: 'essays-reflections', en: 'Essays & Reflections', ar: 'مقالات وتأملات' },
  'fables-parables': { id: 'fables-parables', en: 'Fables & Parables', ar: 'الحكايات والأمثال' },
  'faith-belief': { id: 'faith-belief', en: 'Faith & Belief', ar: 'الإيمان والعقيدة' },
  'faith-gratitude': { id: 'faith-gratitude', en: 'Faith & Gratitude', ar: 'الإيمان والشكر' },
  'faith-perseverance': { id: 'faith-perseverance', en: 'Faith & Perseverance', ar: 'الإيمان والمثابرة' },
  'faith-reflection': { id: 'faith-reflection', en: 'Faith & Reflection', ar: 'الإيمان والتأمل' },
  'family-values': { id: 'family-values', en: 'Family Values', ar: 'القيم الأسرية' },
  'generosity-giving': { id: 'generosity-giving', en: 'Generosity & Giving', ar: 'الكرم والعطاء' },
  'gratitude': { id: 'gratitude', en: 'Gratitude', ar: 'الشكر' },
  'gratitude-praise': { id: 'gratitude-praise', en: 'Gratitude & Praise', ar: 'الشكر والحمد' },
  'health-wellness': { id: 'health-wellness', en: 'Health & Wellness', ar: 'الصحة والعافية' },
  'historical-events': { id: 'historical-events', en: 'Historical Events', ar: 'الأحداث التاريخية' },
  'history-events': { id: 'history-events', en: 'History & Events', ar: 'التاريخ والأحداث' },
  'honesty-truthfulness': { id: 'honesty-truthfulness', en: 'Honesty & Truthfulness', ar: 'الصدق والأمانة' },
  'islamic-civilization': { id: 'islamic-civilization', en: 'Islamic Civilization', ar: 'الحضارة الإسلامية' },
  'islamic-education': { id: 'islamic-education', en: 'Islamic Education', ar: 'التربية الإسلامية' },
  'islamic-etiquette': { id: 'islamic-etiquette', en: 'Islamic Etiquette', ar: 'الآداب الإسلامية' },
  'islamic-foundations': { id: 'islamic-foundations', en: 'Islamic Foundations', ar: 'الأسس الإسلامية' },
  'islamic-history': { id: 'islamic-history', en: 'Islamic History', ar: 'التاريخ الإسلامي' },
  'islamic-philosophy': { id: 'islamic-philosophy', en: 'Islamic Philosophy', ar: 'الفلسفة الإسلامية' },
  'islamic-scholarship': { id: 'islamic-scholarship', en: 'Islamic Scholarship', ar: 'العلوم الإسلامية' },
  'islamic-social-justice': { id: 'islamic-social-justice', en: 'Islamic Social Justice', ar: 'العدالة الاجتماعية الإسلامية' },
  'islamic-spirituality': { id: 'islamic-spirituality', en: 'Islamic Spirituality', ar: 'الروحانية الإسلامية' },
  'islamic-values': { id: 'islamic-values', en: 'Islamic Values', ar: 'القيم الإسلامية' },
  'kindness-mercy': { id: 'kindness-mercy', en: 'Kindness & Mercy', ar: 'اللطف والرحمة' },
  'mercy-compassion': { id: 'mercy-compassion', en: 'Mercy & Compassion', ar: 'الرحمة والشفقة' },
  'moral-lessons': { id: 'moral-lessons', en: 'Moral Lessons', ar: 'الدروس الأخلاقية' },
  'nature-creation': { id: 'nature-creation', en: 'Nature & Creation', ar: 'الطبيعة والخلق' },
  'noble-character': { id: 'noble-character', en: 'Noble Character', ar: 'الشخصية النبيلة' },
  'parental-guidance': { id: 'parental-guidance', en: 'Parental Guidance', ar: 'التوجيه الوالدي' },
  'patience-perseverance': { id: 'patience-perseverance', en: 'Patience and Perseverance', ar: 'الصبر والمثابرة' },
  'personal-hygiene': { id: 'personal-hygiene', en: 'Personal Hygiene', ar: 'النظافة الشخصية' },
  'prophetic-biography': { id: 'prophetic-biography', en: 'Prophetic Biography', ar: 'السيرة النبوية' },
  'prophetic-love': { id: 'prophetic-love', en: 'Prophetic Love', ar: 'محبة النبي' },
  'prophetic-medicine': { id: 'prophetic-medicine', en: 'Prophetic Medicine', ar: 'الطب النبوي' },
  'prophetic-miracles': { id: 'prophetic-miracles', en: 'Prophetic Miracles', ar: 'معجزات النبي' },
  'prophetic-sayings': { id: 'prophetic-sayings', en: 'Prophetic Sayings', ar: 'الأحاديث النبوية' },
  'prophetic-stories': { id: 'prophetic-stories', en: 'Prophetic Stories', ar: 'قصص الأنبياء' },
  'prophetic-tradition': { id: 'prophetic-tradition', en: 'Prophetic Tradition', ar: 'السنة النبوية' },
  'quran-spirituality': { id: 'quran-spirituality', en: 'Quran & Spirituality', ar: 'القرآن والروحانية' },
  'quran-study': { id: 'quran-study', en: 'Quran & Study', ar: 'القرآن والدراسة' },
  'quranic-lessons': { id: 'quranic-lessons', en: 'Quranic Lessons', ar: 'الدروس القرآنية' },
  'quranic-parables': { id: 'quranic-parables', en: 'Quranic Parables', ar: 'أمثال قرآنية' },
  'quranic-stories': { id: 'quranic-stories', en: 'Quranic Stories', ar: 'قصص قرآنية' },
  'relationships': { id: 'relationships', en: 'Relationships', ar: 'العلاقات' },
  'scholarly-pursuit': { id: 'scholarly-pursuit', en: 'Scholarly Pursuit', ar: 'السعي العلمي' },
  'science-nature': { id: 'science-nature', en: 'Science & Nature', ar: 'العلوم والطبيعة' },
  'seeking-knowledge': { id: 'seeking-knowledge', en: 'Seeking Knowledge', ar: 'طلب العلم' },
  'self-control': { id: 'self-control', en: 'Self-Control', ar: 'ضبط النفس' },
  'self-development': { id: 'self-development', en: 'Self-Development', ar: 'تطوير الذات' },
  'social-bonds': { id: 'social-bonds', en: 'Social Bonds', ar: 'الروابط الاجتماعية' },
  'social-cohesion': { id: 'social-cohesion', en: 'Social Cohesion', ar: 'التماسك الاجتماعي' },
  'social-ethics': { id: 'social-ethics', en: 'Social Ethics', ar: 'الأخلاق الاجتماعية' },
  'social-justice': { id: 'social-justice', en: 'Social Justice', ar: 'العدالة الاجتماعية' },
  'social-manners': { id: 'social-manners', en: 'Social Manners', ar: 'الآداب الاجتماعية' },
  'social-relations': { id: 'social-relations', en: 'Social Relations', ar: 'العلاقات الاجتماعية' },
  'social-responsibility': { id: 'social-responsibility', en: 'Social Responsibility', ar: 'المسؤولية الاجتماعية' },
  'spiritual-balance': { id: 'spiritual-balance', en: 'Spiritual Balance', ar: 'التوازن الروحي' },
  'spiritual-development': { id: 'spiritual-development', en: 'Spiritual Development', ar: 'التطور الروحي' },
  'spiritual-practice': { id: 'spiritual-practice', en: 'Spiritual Practice', ar: 'الممارسة الروحية' },
  'spiritual-struggle': { id: 'spiritual-struggle', en: 'Spiritual Struggle', ar: 'الجهاد الروحي' },
  'theology-wisdom': { id: 'theology-wisdom', en: 'Theology & Wisdom', ar: 'اللاهوت والحكمة' },
  'time-management': { id: 'time-management', en: 'Time Management', ar: 'إدارة الوقت' },
  'travel-geography': { id: 'travel-geography', en: 'Travel & Geography', ar: 'السفر والجغرافيا' },
  'wisdom-advice': { id: 'wisdom-advice', en: 'Wisdom & Advice', ar: 'الحكمة والنصيحة' },
  'wisdom-literature': { id: 'wisdom-literature', en: 'Wisdom Literature', ar: 'أدب الحكمة' },
  'work-ethics': { id: 'work-ethics', en: 'Work Ethics', ar: 'أخلاقيات العمل' },
  'worldview-philosophy': { id: 'worldview-philosophy', en: 'Worldview & Philosophy', ar: 'النظرة الكونية والفلسفة' },
  'worship-devotion': { id: 'worship-devotion', en: 'Worship & Devotion', ar: 'العبادة والتفاني' },
  'worship-places': { id: 'worship-places', en: 'Worship & Places', ar: 'العبادة والأماكن' },
  'worship-rituals': { id: 'worship-rituals', en: 'Worship & Rituals', ar: 'العبادة والطقوس' },
  'poetry-literature': { id: 'poetry-literature', en: 'Poetry & Literature', ar: 'الشعر والأدب' },
  'ghazal-love-poetry': { id: 'ghazal-love-poetry', en: 'Ghazal & Love Poetry', ar: 'الغزل والشعر العاطفي' },
  'biographical': { id: 'biographical', en: 'Biographical', ar: 'السير والتراجم' },
  'wisdom-proverbs': { id: 'wisdom-proverbs', en: 'Wisdom & Proverbs', ar: 'الحكم والأمثال' },
  'vivid-scenes': { id: 'vivid-scenes', en: 'Vivid Scenes', ar: 'مشاهد حية' },
  'humor-satire': { id: 'humor-satire', en: 'Humor & Satire', ar: 'الفكاهة والسخرية' },
  'dialogues-debates': { id: 'dialogues-debates', en: 'Dialogues & Debates', ar: 'الحوارات والمناظرات' },
  'food-hospitality': { id: 'food-hospitality', en: 'Food & Hospitality', ar: 'الطعام والضيافة' },
  'courage-bravery': { id: 'courage-bravery', en: 'Courage & Bravery', ar: 'الشجاعة والبسالة' },
  'letters-correspondence': { id: 'letters-correspondence', en: 'Letters & Correspondence', ar: 'الرسائل والمراسلات' },
  'nature-descriptions': { id: 'nature-descriptions', en: 'Nature Descriptions', ar: 'وصف الطبيعة' },
  'dreams-visions': { id: 'dreams-visions', en: 'Dreams & Visions', ar: 'الرؤى والأحلام' },
  'medicine-healing': { id: 'medicine-healing', en: 'Medicine & Healing', ar: 'الطب والشفاء' },
  'foreign-policy': { id: 'foreign-policy', en: 'Foreign Policy', ar: 'السياسة الخارجية' },
  'security-intelligence': { id: 'security-intelligence', en: 'Security & Intelligence', ar: 'الأمن والاستخبارات' },
  'geopolitical-essays': { id: 'geopolitical-essays', en: 'Geopolitical Essays', ar: 'مقالات جيوسياسية' },
};

/**
 * Get category by English name (case-insensitive)
 */
export function getCategoryByName(name: string): Category | undefined {
  // First try to normalize the name to kebab-case ID
  const normalized = name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z-]/g, '');

  // Check if normalized ID exists
  if (CATEGORIES[normalized]) {
    return CATEGORIES[normalized];
  }

  // Fall back to exact match on English name (case-insensitive)
  return Object.values(CATEGORIES).find(
    c => c.en.toLowerCase() === name.toLowerCase()
  );
}
