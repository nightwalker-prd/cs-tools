export interface SemanticCluster {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  roots: string[];
}

export const semanticClusters: SemanticCluster[] = [
  {
    id: 'worship',
    nameEn: 'Worship & Devotion',
    nameAr: 'عبادة',
    description: 'Roots related to worship, prayer, prostration, and devotional acts',
    roots: ['عبد', 'صلو', 'سجد', 'ركع', 'زكو', 'صوم', 'حجج', 'طوف', 'ذكر', 'سبح'],
  },
  {
    id: 'knowledge',
    nameEn: 'Knowledge & Learning',
    nameAr: 'علم ومعرفة',
    description: 'Roots related to knowledge, understanding, wisdom, and learning',
    roots: ['علم', 'فقه', 'درس', 'حكم', 'فهم', 'عقل', 'بصر', 'شعر', 'خبر', 'ذكر'],
  },
  {
    id: 'guidance',
    nameEn: 'Guidance & Truth',
    nameAr: 'هداية',
    description: 'Roots related to divine guidance, the straight path, and truth',
    roots: ['هدي', 'رشد', 'صرط', 'نور', 'حقق', 'بين', 'دلل', 'سوي', 'قوم', 'سدد'],
  },
  {
    id: 'belief',
    nameEn: 'Faith & Belief',
    nameAr: 'إيمان',
    description: 'Roots related to belief, trust, repentance, and witnessing',
    roots: ['أمن', 'صدق', 'يقن', 'توب', 'شهد', 'وكل', 'خشع', 'تقو', 'ورع', 'خلص'],
  },
  {
    id: 'creation',
    nameEn: 'Creation & Nature',
    nameAr: 'خلق',
    description: 'Roots related to creation, origination, and making',
    roots: ['خلق', 'جعل', 'فطر', 'بدع', 'نشأ', 'كون', 'صور', 'برأ', 'صنع', 'أمر'],
  },
  {
    id: 'speech',
    nameEn: 'Speech & Communication',
    nameAr: 'كلام',
    description: 'Roots related to speech, calling, asking, and communication',
    roots: ['قول', 'نطق', 'كلم', 'دعو', 'سأل', 'نبأ', 'قصص', 'حدث', 'وعظ', 'بلغ'],
  },
  {
    id: 'time',
    nameEn: 'Time & Destiny',
    nameAr: 'زمن وقدر',
    description: 'Roots related to time, predestination, and appointed terms',
    roots: ['يوم', 'وقت', 'قدر', 'أجل', 'ساع', 'دهر', 'عصر', 'غدو', 'بكر', 'ليل'],
  },
  {
    id: 'provision',
    nameEn: 'Provision & Sustenance',
    nameAr: 'رزق',
    description: 'Roots related to provision, food, drink, and divine bounty',
    roots: ['رزق', 'طعم', 'أكل', 'شرب', 'نعم', 'فضل', 'عطو', 'كثر', 'وسع', 'غني'],
  },
  {
    id: 'justice',
    nameEn: 'Justice & Law',
    nameAr: 'عدل',
    description: 'Roots related to justice, judgment, equity, and divine law',
    roots: ['عدل', 'حكم', 'قسط', 'ظلم', 'جزي', 'حسب', 'وزن', 'شرع', 'حلل', 'حرم'],
  },
  {
    id: 'heart',
    nameEn: 'Heart & Soul',
    nameAr: 'قلب ونفس',
    description: 'Roots related to the heart, soul, spirit, and inner self',
    roots: ['قلب', 'نفس', 'روح', 'صدر', 'فؤد', 'عين', 'سمع', 'بصر', 'حسس', 'وجد'],
  },
  {
    id: 'movement',
    nameEn: 'Movement & Travel',
    nameAr: 'حركة',
    description: 'Roots related to movement, travel, coming, and going',
    roots: ['مشي', 'سير', 'ذهب', 'جيأ', 'خرج', 'دخل', 'رجع', 'قبل', 'دبر', 'هجر'],
  },
  {
    id: 'family',
    nameEn: 'Family & Society',
    nameAr: 'أسرة',
    description: 'Roots related to family relations, parenthood, and social bonds',
    roots: ['أبو', 'أمم', 'أخو', 'ولد', 'زوج', 'بنو', 'أهل', 'قوم', 'نسو', 'يتم'],
  },
  {
    id: 'earth',
    nameEn: 'Earth & Sky',
    nameAr: 'أرض وسماء',
    description: 'Roots related to the earth, heavens, seas, and natural features',
    roots: ['أرض', 'سمو', 'بحر', 'نهر', 'جبل', 'شجر', 'مطر', 'ريح', 'زرع', 'ثمر'],
  },
  {
    id: 'light-dark',
    nameEn: 'Light & Darkness',
    nameAr: 'نور وظلمة',
    description: 'Roots related to light, darkness, day, night, and celestial bodies',
    roots: ['نور', 'ظلم', 'صبح', 'ليل', 'نجم', 'شمس', 'قمر', 'فلق', 'ضوء', 'سرج'],
  },
  {
    id: 'power',
    nameEn: 'Power & Authority',
    nameAr: 'قوة وسلطة',
    description: 'Roots related to power, kingship, authority, and dominion',
    roots: ['ملك', 'قوي', 'عزز', 'قهر', 'سلط', 'جبر', 'كبر', 'علو', 'غلب', 'نصر'],
  },
  {
    id: 'mercy',
    nameEn: 'Mercy & Compassion',
    nameAr: 'رحمة',
    description: 'Roots related to divine mercy, forgiveness, and compassion',
    roots: ['رحم', 'غفر', 'عفو', 'حلم', 'صفح', 'لطف', 'برر', 'حنن', 'رأف', 'ودد'],
  },
  {
    id: 'punishment',
    nameEn: 'Warning & Punishment',
    nameAr: 'عذاب',
    description: 'Roots related to warning, punishment, hellfire, and retribution',
    roots: ['عذب', 'نذر', 'خوف', 'نرر', 'جحم', 'سعر', 'لعن', 'غضب', 'أخذ', 'هلك'],
  },
  {
    id: 'wealth',
    nameEn: 'Wealth & Trade',
    nameAr: 'مال وتجارة',
    description: 'Roots related to wealth, commerce, buying, selling, and earning',
    roots: ['مول', 'تجر', 'بيع', 'شري', 'كسب', 'ربح', 'ربو', 'نفق', 'أجر', 'خسر'],
  },
  {
    id: 'life-death',
    nameEn: 'Life & Death',
    nameAr: 'حياة وموت',
    description: 'Roots related to life, death, resurrection, and the hereafter',
    roots: ['حيي', 'موت', 'قتل', 'بعث', 'نشر', 'قبر', 'أخر', 'دنو', 'حشر', 'جمع'],
  },
  {
    id: 'scripture',
    nameEn: 'Scripture & Revelation',
    nameAr: 'كتاب ووحي',
    description: 'Roots related to scripture, revelation, signs, and recitation',
    roots: ['كتب', 'قرأ', 'نزل', 'وحي', 'آيي', 'رسل', 'نبأ', 'بشر', 'أنزل', 'تلو'],
  },
];
