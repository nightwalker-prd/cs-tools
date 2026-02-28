import type { NahwTopic } from '../types';

export const numberPhrases: NahwTopic = {
  id: 'number-phrases',
  titleAr: 'العَدَد والمَعْدُود',
  titleEn: 'Number Phrases',
  transliteration: "al-'Adad wal-Ma'dud",
  categoryId: 'phrases',
  subcategoryId: 'number-phrases',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Arabic numbers follow six different grammatical patterns depending on the range. Numbers 1-2 act as adjectives, 3-10 form possessive phrases with chiastic gender concord, 11-19 use tamyiz with a singular counted noun, tens use tamyiz, and 100/1000 form possessive phrases. Ordinal numbers follow the ism al-fa\'il pattern.',
      body: `## Number Phrases (العَدَد والمَعْدُود)

A number phrase is composed of two parts:
- **عَدَد** -- the number
- **مَعْدُود** -- the item being counted

Arabic cardinal numbers fall into **six categories** based on grammatical behaviour.

### Numbers 1-2: Agreement (مَنْعُوت -- نَعْت)

The meaning of one and two is already understood from the singular/dual forms, so these numbers are only added for **emphasis**. They act as adjectives (na\`t) and **agree in gender** with the counted noun.

> **إِلٰهٌ وَاحِدٌ** -- *one God / only one God*
> **رَجُلَانِ اثْنَانِ** -- *two men*

### Numbers 3-10: Chiastic Concord (مُضَاف -- مُضَاف إِلَيْه)

The number becomes **mudaf** to the counted noun, which is in the **plural** form.

**Chiastic concord (المُخَالَفَة):** Numbers 3-10 take the **opposite gender** to their counted noun:
- Masculine counted noun: number gets تاء مربوطة
- Feminine counted noun: number loses تاء مربوطة

> **ثَلَاثَةُ رِجَالٍ** -- *three men* (رجل is masculine, so ثلاثة has taa marbuta)
> **ثَلَاثُ نِسَاءٍ** -- *three women* (feminine, so ثلاث without taa)

**Important:** Chiastic concord is based on the **singular** form, not the plural:
> **ثَلَاثُ سُوَرٍ** -- *three chapters* (singular سُوْرَة is feminine)

### Numbers 11-19: Tamyiz Structure

The counted noun is **singular** and becomes **تَمْيِيز** (specification):

> **رَأَى يُوسُفُ ﷺ أَحَدَ عَشَرَ كَوْكَبًا** -- *Yusuf saw eleven stars.*

**Gender rules for 11-12:** Both parts of the number **agree** with the counted noun.
**Gender rules for 13-19:** The unit has **chiastic concord**, while the ten **agrees** with the counted noun.

Numbers 11-19 (except 12) are **mabni** (indeclinable). Number 12 changes like a dual noun:
> **جَاءَ اثْنَا عَشَرَ رَجُلًا** (nominative: اثنا)
> **قَرَأَ أَحْمَدُ اثْنَيْ عَشَرَ كِتَابًا** (accusative: اثنيْ)

### Tens (20-90): Tamyiz Structure

These follow the pattern of sound masculine plural (ending in -una/-ina). The counted noun is **singular** as tamyiz. Gender **does not change**:

> **عِشْرُونَ وَلَدًا** -- *twenty boys*
> **عِشْرُونَ بِنْتًا** -- *twenty girls*

### Tens + Units (21-99)

In Arabic, the **units precede the tens**, joined by وَ:

> **مَضَى خَمْسَةٌ وَثَلَاثُونَ يَوْمًا** -- *Thirty-five days have passed.*

Units 1-2 **agree** in gender; units 3-9 have **chiastic concord**.

### Hundreds and Thousands (مُضَاف -- مُضَاف إِلَيْه)

Both use possessive structure. The counted noun is **singular**. Gender does not change:

> **مِائَةُ عَامٍ** -- *one hundred years*
> **أَلْفُ شَهْرٍ** -- *one thousand months*

When مِائَة or أَلْف are themselves counted by 3-10, they remain **singular** (unlike regular nouns):
> **ثَلَاثِ مِائَةِ رَجُلٍ** -- *three hundred men*

### Ordinal Numbers

Ordinals 1st-10th follow the **ism al-fa\`il** pattern and act as na\`t (adjectives):
> **اليَوْمُ الأَوَّلُ** -- *the first day*
> **اللَّيْلَةُ الأُولَى** -- *the first night*

Ordinals 11th-19th: only the unit has ال, both parts have fathah.
Ordinals 20th+: unit agrees in gender, ten is unchanged.

### بِضْع and بِضْعَة

These express "a few" (between 3 and 9) and follow the same chiastic concord rules as 3-10:
> **بِضْعَةُ رِجَالٍ** -- *a few men* (chiastic: بضعة with taa for masculine)

### Verb Agreement with Number Phrases

When a number phrase is the subject, the verb agrees with the **counted noun**, not the number:
> **جَاءَ ثَلَاثَةُ رِجَالٍ** -- *Three men came.* (masculine verb for masculine رجال)
> **جَاءَتْ ثَلَاثُ نِسَاءٍ** -- *Three women came.* (feminine verb for feminine نساء)

If the verb precedes the subject, it is always **singular**.

### Making Number Phrases Definite

To make a number phrase definite, add **ال** to the **number** (not the counted noun) for 3-10:
> **الثَّلَاثَةُ رِجَالٍ** -- *the three men*

For 11-19 and tens, add **ال** to the number; for compound numbers, **ال** goes on the unit:
> **الأَحَدَ عَشَرَ كَوْكَبًا** -- *the eleven stars*

### Expanded Ordinal Rules

**Ordinals 11th-19th:** Only the **unit** takes ال. Both parts carry fathah (مبني على الفتح). They act as na\`t:
> **اليَوْمُ الثَّالِثَ عَشَرَ** -- *the thirteenth day*
> **اللَّيْلَةُ الثَّالِثَةَ عَشْرَةَ** -- *the thirteenth night*

**Ordinals 20th, 30th, etc.:** The tens form is used directly as na\`t:
> **الدَّرْسُ العِشْرُونَ** -- *the twentieth lesson*

**Compound ordinals (21st-99th):** The unit changes for gender, the ten does not:
> **اليَوْمُ الحَادِي وَالعِشْرُونَ** -- *the twenty-first day*
> **اللَّيْلَةُ الحَادِيَةُ وَالعِشْرُونَ** -- *the twenty-first night*`,
      rules: [
        {
          arabic: 'الأعْدَادُ مِنْ ٣ إِلَى ١٠ تُخَالِفُ المَعْدُودَ فِي الجِنْسِ',
          english:
            'Numbers 3-10 have chiastic concord: they take the OPPOSITE gender to their counted noun. The counted noun is plural.',
          examples: [
            {
              arabic: 'ثَلَاثَةُ رِجَالٍ',
              translation: 'three men',
              irab: 'رجل is masculine; ثلاثة has taa marbuta (feminine form)',
            },
            {
              arabic: 'ثَلَاثُ نِسَاءٍ',
              translation: 'three women',
              irab: 'Feminine counted noun; ثلاث has no taa (masculine form)',
            },
          ],
        },
        {
          arabic: 'الأعْدَادُ مِنْ ١١ إِلَى ١٩: المَعْدُودُ مُفْرَدٌ تَمْيِيزٌ',
          english:
            'Numbers 11-19 take a singular counted noun as tamyiz. For 11-12, both parts agree in gender. For 13-19, the unit has chiastic concord while the ten agrees.',
          examples: [
            {
              arabic: 'أَحَدَ عَشَرَ كَوْكَبًا',
              translation: 'eleven stars',
              irab: 'Both parts masculine (agreeing with masculine كوكب)',
            },
            {
              arabic: 'ثَلَاثَةَ عَشَرَ رَجُلًا',
              translation: 'thirteen men',
              irab: 'Unit ثلاثة has chiastic concord (taa for masc), ten عشر agrees',
            },
          ],
        },
        {
          english:
            'Tens (20-90) do not change for gender. The counted noun is singular as tamyiz.',
          examples: [
            {
              arabic: 'بَلَغَ الرَّجُلُ أَرْبَعِينَ سَنَةً',
              translation: 'The man reached forty years.',
              irab: 'أربعين = mumayiz (mansub), سنة = tamyiz (singular)',
            },
          ],
        },
        {
          english:
            'Hundreds and thousands form possessive phrases with a singular counted noun.',
          examples: [
            {
              arabic: 'مِائَةُ عَامٍ',
              translation: 'one hundred years',
              irab: 'مائة = mudaf, عام = mudaf ilayhi (singular)',
            },
            {
              arabic: 'ثَلَاثِ مِائَةِ رَجُلٍ',
              translation: 'three hundred men',
              irab: 'Nested idafa: ثلاث -> مائة -> رجل',
            },
          ],
        },
        {
          english:
            'When a number phrase is the subject, the verb agrees with the counted noun (not the number). If the verb precedes the subject, it is always singular.',
          examples: [
            {
              arabic: 'جَاءَ ثَلَاثَةُ رِجَالٍ',
              translation: 'Three men came.',
              irab: 'Masculine singular verb (precedes subject), agrees with masculine رجال',
            },
            {
              arabic: 'جَاءَتْ ثَلَاثُ نِسَاءٍ',
              translation: 'Three women came.',
              irab: 'Feminine singular verb (precedes subject), agrees with feminine نساء',
            },
          ],
        },
        {
          english:
            'The word مَرَّة (time/instance) functions as maf\'ul mutlaq to express quantity.',
          examples: [
            {
              arabic: 'حَجَّ زَيْدٌ ثَلَاثَ مَرَّاتٍ',
              translation: 'Zaid performed Hajj three times.',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'Cardinal Number Rules Summary',
          titleAr: 'أحكام الأعداد الأصلية',
          headers: ['Range', 'Structure', 'Counted Noun', 'Gender Rule', 'Example'],
          rows: [
            ['1-2', 'man\'ut -- na\'t', 'Singular/Dual', 'Agrees', 'وَلَدٌ وَاحِدٌ'],
            ['3-10', 'mudaf -- mudaf ilayhi', 'Plural', 'Chiastic', 'ثَلَاثَةُ أَوْلَادٍ'],
            ['11-12', 'tamyiz', 'Singular', 'Agrees', 'أَحَدَ عَشَرَ وَلَدًا'],
            ['13-19', 'tamyiz', 'Singular', 'Unit: chiastic, Ten: agrees', 'ثَلَاثَةَ عَشَرَ وَلَدًا'],
            ['Tens (20-90)', 'tamyiz', 'Singular', 'Unchanged', 'عِشْرُونَ وَلَدًا'],
            ['100 / 1000', 'mudaf -- mudaf ilayhi', 'Singular', 'Unchanged', 'مِائَةُ عَامٍ'],
          ],
        },
        {
          title: 'Numbers 3-10 (Arabic)',
          titleAr: 'الأعداد من ٣ إلى ١٠',
          headers: ['English', 'With Masculine Noun', 'With Feminine Noun'],
          rows: [
            ['three', 'ثَلَاثَةُ رِجَالٍ', 'ثَلَاثُ نِسَاءٍ'],
            ['four', 'أَرْبَعَةُ رِجَالٍ', 'أَرْبَعُ نِسَاءٍ'],
            ['five', 'خَمْسَةُ رِجَالٍ', 'خَمْسُ نِسَاءٍ'],
            ['six', 'سِتَّةُ رِجَالٍ', 'سِتُّ نِسَاءٍ'],
            ['seven', 'سَبْعَةُ رِجَالٍ', 'سَبْعُ نِسَاءٍ'],
            ['eight', 'ثَمَانِيَةُ رِجَالٍ', 'ثَمَانِي نِسَاءٍ'],
            ['nine', 'تِسْعَةُ رِجَالٍ', 'تِسْعُ نِسَاءٍ'],
            ['ten', 'عَشَرَةُ رِجَالٍ', 'عَشْرُ نِسَاءٍ'],
          ],
        },
        {
          title: 'Ordinal Numbers 1st-10th',
          titleAr: 'الأعداد الترتيبية',
          headers: ['English', 'Masculine', 'Feminine'],
          rows: [
            ['first', 'الأَوَّلُ', 'الأُولَى'],
            ['second', 'الثَّانِي', 'الثَّانِيَةُ'],
            ['third', 'الثَّالِثُ', 'الثَّالِثَةُ'],
            ['fourth', 'الرَّابِعُ', 'الرَّابِعَةُ'],
            ['fifth', 'الخَامِسُ', 'الخَامِسَةُ'],
            ['sixth', 'السَّادِسُ', 'السَّادِسَةُ'],
            ['seventh', 'السَّابِعُ', 'السَّابِعَةُ'],
            ['eighth', 'الثَّامِنُ', 'الثَّامِنَةُ'],
            ['ninth', 'التَّاسِعُ', 'التَّاسِعَةُ'],
            ['tenth', 'العَاشِرُ', 'العَاشِرَةُ'],
          ],
        },
        {
          title: 'Maf\'ul Mutlaq with Numbers (Quantity)',
          titleAr: 'المفعول المطلق مع العدد',
          headers: ['Type', 'Function', 'Example'],
          rows: [
            ['On its own', 'Emphasis', 'شَكَرَ الرَّجُلُ شُكْرًا'],
            ['With na\'t', 'Description', 'شَكَرَ الرَّجُلُ شُكْرًا كَثِيرًا'],
            ['With mudaf ilayhi', 'Comparison', 'شَكَرَ الرَّجُلُ شُكْرَ الأنبياء'],
            ['With \'adad', 'Quantity', 'شَكَرَ الرَّجُلُ ثَلَاثَ مَرَّاتٍ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 3, pp. 195-240',
    },
  ],
  relatedTopicIds: ['mudaf-ilayhi', 'na-t', 'atf'],
  tags: ['numbers', 'adad', 'ma\'dud', 'tamyiz', 'chiastic concord', 'cardinal', 'ordinal', 'counting', 'idafa', 'verb agreement', 'definite numbers', 'bidc'],
};
