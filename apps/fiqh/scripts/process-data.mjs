#!/usr/bin/env node
/**
 * Process scraped Mukhtasar al-Quduri markdown into structured JSON data.
 *
 * Usage: node scripts/process-data.mjs [input-dir]
 * Default input: /Users/miftah/projects/utils/output/usul/mukhtasar-4/
 * Output: public/data/
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const INPUT_DIR = process.argv[2] || '/Users/miftah/projects/utils/output/usul/mukhtasar-4';
const OUTPUT_DIR = resolve(import.meta.dirname, '..', 'public', 'data');

// ─── Load English translations ───
const TRANSLATIONS = JSON.parse(readFileSync(resolve(import.meta.dirname, 'translations.json'), 'utf-8'));

// ─── Arabic numeral conversion ───
const AR_DIGITS = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
function arToNum(s) {
  return parseInt(s.replace(/[٠-٩]/g, d => AR_DIGITS[d]), 10);
}

// ─── Transliteration map for kitab IDs ───
const KITAB_ID_MAP = {
  'الطهارة': 'taharah',
  'الصلاة': 'salah',
  'الزكاة': 'zakah',
  'الصوم': 'sawm',
  'الحج': 'hajj',
  'البيوع': 'buyu',
  'الرهن': 'rahn',
  'الحجر': 'hajr',
  'الإقرار': 'iqrar',
  'الإجارة': 'ijarah',
  'الشفعة': 'shufah',
  'الشركة': 'shirkah',
  'المضاربة': 'mudarabah',
  'الوكالة': 'wakalah',
  'الكفالة': 'kafalah',
  'الحوالة': 'hawalah',
  'الصلح': 'sulh',
  'الهبة': 'hibah',
  'الوقف': 'waqf',
  'الغصب': 'ghasb',
  'الوديعة': 'wadiah',
  'العارية': 'ariyah',
  'اللقيط': 'laqit',
  'الخنثى': 'khuntha',
  'المفقود': 'mafqud',
  'الإباق': 'ibaq',
  'إحياء الموات': 'ihya-mawat',
  'المأذون': 'madhun',
  'المزارعة': 'muzaraah',
  'النكاح': 'nikah',
  'الرضاع': 'radaa',
  'الطلاق': 'talaq',
  'الإيلاء': 'ila',
  'الظهار': 'dhihar',
  'النفقات': 'nafaqat',
  'الحضانة': 'hadanah',
  'العتاق': 'itq',
  'المكاتب': 'mukatab',
  'الولاء': 'walaa',
  'الجنايات': 'jinayat',
  'الديات': 'diyat',
  'الحدود': 'hudud',
  'السرقة': 'sariqah',
  'الأشربة': 'ashribah',
  'الصيد والذبائح': 'sayd-dhabaih',
  'الأضحية': 'udhiyah',
  'الأيمان': 'ayman',
  'الدعوى': 'dawa',
  'الشهادات': 'shahadat',
  'أدب القاضي': 'adab-qadi',
  'القسمة': 'qismah',
  'الإكراه': 'ikrah',
  'السير': 'siyar',
  'البغاة': 'bughat',
  'الحظر والإباحة': 'hazr-ibahah',
  'الوصايا': 'wasaya',
  'الفرائض': 'faraid',
};

// English names for each kitab
const KITAB_EN_MAP = {
  'taharah': 'Purification',
  'salah': 'Prayer',
  'zakah': 'Zakat',
  'sawm': 'Fasting',
  'hajj': 'Pilgrimage',
  'buyu': 'Sales',
  'rahn': 'Pledge',
  'hajr': 'Legal Incapacity',
  'iqrar': 'Acknowledgment',
  'ijarah': 'Hiring',
  'shufah': 'Pre-emption',
  'shirkah': 'Partnership',
  'mudarabah': 'Silent Partnership',
  'wakalah': 'Agency',
  'kafalah': 'Guarantee',
  'hawalah': 'Transfer of Debt',
  'sulh': 'Settlement',
  'hibah': 'Gift',
  'waqf': 'Endowment',
  'ghasb': 'Usurpation',
  'wadiah': 'Deposit',
  'ariyah': 'Loan of Property',
  'laqit': 'Foundling',
  'khuntha': 'Ambiguous Gender',
  'mafqud': 'Missing Person',
  'ibaq': 'Runaway Slave',
  'ihya-mawat': 'Revival of Barren Land',
  'madhun': 'Authorized Slave',
  'muzaraah': 'Sharecropping',
  'nikah': 'Marriage',
  'radaa': 'Breastfeeding',
  'talaq': 'Divorce',
  'ila': 'Oath of Abstinence',
  'dhihar': 'Injurious Assimilation',
  'nafaqat': 'Maintenance',
  'hadanah': 'Custody',
  'itq': 'Manumission',
  'mukatab': 'Contractual Emancipation',
  'walaa': 'Clientage',
  'jinayat': 'Criminal Offenses',
  'diyat': 'Blood Money',
  'hudud': 'Fixed Punishments',
  'sariqah': 'Theft',
  'ashribah': 'Beverages',
  'sayd-dhabaih': 'Hunting & Slaughter',
  'udhiyah': 'Sacrifice',
  'ayman': 'Oaths',
  'dawa': 'Claims',
  'shahadat': 'Testimony',
  'adab-qadi': 'Judicial Conduct',
  'qismah': 'Division',
  'ikrah': 'Coercion',
  'siyar': 'Military Expeditions',
  'bughat': 'Rebels',
  'hazr-ibahah': 'Prohibitions & Permissions',
  'wasaya': 'Bequests',
  'faraid': 'Inheritance',
};

// English names for bab titles (strip "باب " prefix before lookup)
const BAB_EN_MAP = {
  'التيمم': 'Dry Ablution (Tayammum)',
  'المسح على الخفين': 'Wiping Over Leather Socks',
  'الحيض': 'Menstruation',
  'الأنجاس': 'Impurities',
  'الأذان': 'The Call to Prayer',
  'شروط الصلاة التي تتقدمها': 'Prerequisites of Prayer',
  'صفة الصلاة': 'Description of Prayer',
  'قضاء الفوائت': 'Making Up Missed Prayers',
  'الأوقات التي تكره فيها الصلاة': 'Disliked Times for Prayer',
  'النوافل': 'Voluntary Prayers',
  'السجود السهو': 'Prostration of Forgetfulness',
  'صلاة المريض': 'Prayer of the Sick',
  'سجود التلاوة': 'Prostration of Recitation',
  'صلاة المسافر': "Traveler's Prayer",
  'صلاة الجمعة': 'Friday Prayer',
  'صلاة العيدين': 'Eid Prayers',
  'صلاة الكسوف': 'Eclipse Prayer',
  'الاستسقاء': 'Prayer for Rain',
  'قيام شهر رمضان': 'Night Prayer in Ramadan',
  'صلاة الخوف': 'Prayer of Fear',
  'صلاة الجنائز': 'Funeral Prayer',
  'الشهيد': 'The Martyr',
  'الصلاة في الكعبة وحولها': 'Prayer in and Around the Kaaba',
  'زكاة الإبل': 'Zakat on Camels',
  'صدقة البقر': 'Zakat on Cattle',
  'صدقة الغنم': 'Zakat on Sheep',
  'زكاة الخيل': 'Zakat on Horses',
  'زكاة الفضة': 'Zakat on Silver',
  'زكاة الذهب': 'Zakat on Gold',
  'زكاة العروض': 'Zakat on Trade Goods',
  'زكاة الزروع والثمار': 'Zakat on Crops and Fruits',
  'من يجوز دفع الصدقة إليه ومن لا يجوز': 'Recipients of Zakat',
  'صدقة الفطر': 'Zakat al-Fitr',
  'الاعتكاف': "Spiritual Retreat (I'tikaf)",
  'تحديد المواقيت': 'Designation of Miqat Stations',
  'القران': 'Qiran (Combined Hajj and Umrah)',
  'التمتع': "Tamattu' (Interrupted Hajj)",
  'جنايات المحرم': 'Violations During Ihram',
  'الإحصار': 'Obstruction from Hajj',
  'الفوات': 'Missing the Hajj Rites',
  'الهدي': 'Sacrificial Animals',
  'خيار الشرط': 'Option of Stipulation',
  'خيار الرؤية': 'Option of Inspection',
  'خيار العيب': 'Option of Defect',
  'البيع الفاسد': 'Defective Sales',
  'الإقالة': 'Rescission of Sale',
  'المرابحة والتولية': 'Cost-Plus and Transfer Sales',
  'الربا': 'Usury (Riba)',
  'السلم': 'Forward Sale (Salam)',
  'الصرف': 'Currency Exchange',
  'الرجعة': 'Revocable Divorce',
  'الخلع': "Divorce by Ransom (Khul')",
  'اللعان': "Mutual Imprecation (Li'an)",
  'العدة': "Waiting Period ('Iddah)",
  'التدبير': 'Conditional Manumission',
  'الاستيلاد': 'Umm al-Walad',
  'اللقطة': 'Found Property',
  'المساقاة': 'Orchard Sharecropping',
  'القسامة': 'Compurgation (Qasamah)',
  'المعاقل': 'Blood-Money Contributions',
  'حد الشرب': 'Punishment for Drinking',
  'حد القذف': 'Punishment for False Accusation',
  'الرجوع عن الشهادة': 'Retraction of Testimony',
  'الحجب': 'Exclusion from Inheritance',
  'الحجب وتحجب الأم من الثلث إلى السدس بالولد أو بأخوين': 'Exclusion from Inheritance',
  'الرد': 'Return of Residue',
  'ذوي الأرحام': 'Distant Kindred',
  'حساب الفرائض': 'Calculation of Inheritance Shares',
};

// Category assignments
const CATEGORY_MAP = {
  'taharah': 'ibadat', 'salah': 'ibadat', 'zakah': 'ibadat', 'sawm': 'ibadat',
  'hajj': 'ibadat', 'udhiyah': 'ibadat', 'sayd-dhabaih': 'ibadat', 'ashribah': 'ibadat',
  'buyu': 'muamalat', 'rahn': 'muamalat', 'hajr': 'muamalat', 'ijarah': 'muamalat',
  'shufah': 'muamalat', 'shirkah': 'muamalat', 'mudarabah': 'muamalat', 'wakalah': 'muamalat',
  'kafalah': 'muamalat', 'hawalah': 'muamalat', 'sulh': 'muamalat', 'hibah': 'muamalat',
  'waqf': 'muamalat', 'ghasb': 'muamalat', 'wadiah': 'muamalat', 'ariyah': 'muamalat',
  'laqit': 'muamalat', 'muzaraah': 'muamalat', 'ihya-mawat': 'muamalat',
  'nikah': 'munakahaat', 'radaa': 'munakahaat', 'talaq': 'munakahaat',
  'ila': 'munakahaat', 'dhihar': 'munakahaat', 'nafaqat': 'munakahaat', 'hadanah': 'munakahaat',
  'jinayat': 'jinayaat', 'diyat': 'jinayaat', 'hudud': 'jinayaat', 'sariqah': 'jinayaat',
  'bughat': 'jinayaat', 'siyar': 'jinayaat',
  'iqrar': 'aqdhiyah', 'dawa': 'aqdhiyah', 'shahadat': 'aqdhiyah', 'adab-qadi': 'aqdhiyah',
  'qismah': 'aqdhiyah',
  'ayman': 'mutafarriqat', 'wasaya': 'mutafarriqat', 'faraid': 'mutafarriqat',
  'walaa': 'mutafarriqat', 'ikrah': 'mutafarriqat', 'madhun': 'mutafarriqat',
  'khuntha': 'mutafarriqat', 'mafqud': 'mutafarriqat', 'ibaq': 'mutafarriqat',
  'itq': 'mutafarriqat', 'mukatab': 'mutafarriqat', 'hazr-ibahah': 'mutafarriqat',
};

// ─── Parse markdown files ───
function parseMarkdownFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');

  // Skip YAML frontmatter
  let start = 0;
  if (lines[0] === '---') {
    const end = lines.indexOf('---', 1);
    start = end + 1;
  }

  // Skip the "# Page N" header
  const bodyLines = [];
  for (let i = start; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# Page')) continue;
    bodyLines.push(line);
  }

  return bodyLines.join('\n').trim();
}

// ─── Detect kitab boundaries ───
const KITAB_REGEX = /^[٠-٩]+ - كتاب (.+)$/;

function detectKitabBoundaries(pages) {
  const boundaries = [];

  for (let i = 0; i < pages.length; i++) {
    const lines = pages[i].text.split('\n');
    for (const line of lines) {
      const match = line.trim().match(KITAB_REGEX);
      if (match) {
        const arName = match[1].trim();
        const numStr = line.trim().split(' - ')[0];
        const num = arToNum(numStr);
        const id = KITAB_ID_MAP[arName];

        if (id) {
          boundaries.push({
            id,
            titleAr: 'كتاب ' + arName,
            titleEn: KITAB_EN_MAP[id] || arName,
            order: boundaries.length + 1,
            bookNum: num,
            startPage: i + 1,
            categoryId: CATEGORY_MAP[id] || 'mutafarriqat',
          });
        } else {
          console.warn(`Unknown kitab: ${arName} (page ${i + 1})`);
        }
      }
    }
  }

  return boundaries;
}

// ─── Detect bab boundaries within text ───
const BAB_REGEX = /^باب (.+)$/;

function detectBabBoundaries(text) {
  const babs = [];
  const lines = text.split('\n');

  for (const line of lines) {
    const match = line.trim().match(BAB_REGEX);
    if (match) {
      babs.push({
        titleAr: 'باب ' + match[1].trim(),
        lineText: line.trim(),
      });
    }
  }

  return babs;
}

// ─── Build kitab content ───
function buildKitab(boundary, nextBoundary, pages) {
  const startIdx = boundary.startPage - 1;
  const endIdx = nextBoundary ? nextBoundary.startPage - 1 : pages.length;

  // Collect all text for this kitab
  let fullText = '';
  for (let i = startIdx; i < endIdx; i++) {
    const pageText = pages[i].text;
    // Remove the kitab header line from first page
    if (i === startIdx) {
      const lines = pageText.split('\n');
      const filtered = lines.filter(l => !KITAB_REGEX.test(l.trim()));
      fullText += filtered.join('\n').trim() + '\n\n';
    } else {
      // Check if this page starts a new kitab (shouldn't happen within range, but safety)
      const lines = pageText.split('\n');
      const filtered = lines.filter(l => !KITAB_REGEX.test(l.trim()));
      fullText += filtered.join('\n').trim() + '\n\n';
    }
  }

  fullText = fullText.trim();

  // Split into bab sections
  const babHeaders = detectBabBoundaries(fullText);
  const abwab = [];

  if (babHeaders.length === 0) {
    // No bab subdivisions — treat entire text as one section
    abwab.push({
      id: `${boundary.id}-main`,
      kitabId: boundary.id,
      titleAr: boundary.titleAr,
      titleEn: boundary.titleEn,
      order: 1,
      sections: [{
        id: `${boundary.id}-main-1`,
        babId: `${boundary.id}-main`,
        kitabId: boundary.id,
        titleAr: boundary.titleAr,
        titleEn: boundary.titleEn,
        order: 1,
        textAr: fullText,
        sourcePage: boundary.startPage,
        masail: [],
      }],
    });
  } else {
    // Split text by bab markers
    const textParts = fullText.split(/^باب /m);

    // First part is text before any bab
    if (textParts[0].trim()) {
      abwab.push({
        id: `${boundary.id}-intro`,
        kitabId: boundary.id,
        titleAr: 'مقدمة ' + boundary.titleAr,
        titleEn: 'Introduction to ' + (KITAB_EN_MAP[boundary.id] || boundary.titleEn),
        order: 0,
        sections: [{
          id: `${boundary.id}-intro-1`,
          babId: `${boundary.id}-intro`,
          kitabId: boundary.id,
          titleAr: 'مقدمة',
          titleEn: 'Introduction',
          order: 1,
          textAr: textParts[0].trim(),
          sourcePage: boundary.startPage,
          masail: [],
        }],
      });
    }

    // Process each bab
    for (let i = 1; i < textParts.length; i++) {
      const part = textParts[i];
      const firstNewline = part.indexOf('\n');
      const babTitle = firstNewline > 0 ? part.substring(0, firstNewline).trim() : part.trim();
      const babBody = firstNewline > 0 ? part.substring(firstNewline).trim() : '';

      const babId = `${boundary.id}-bab-${i}`;

      abwab.push({
        id: babId,
        kitabId: boundary.id,
        titleAr: 'باب ' + babTitle,
        titleEn: BAB_EN_MAP[babTitle] || `Chapter ${i}: ${babTitle}`,
        order: i,
        sections: [{
          id: `${babId}-1`,
          babId,
          kitabId: boundary.id,
          titleAr: 'باب ' + babTitle,
          titleEn: BAB_EN_MAP[babTitle] || `Chapter ${i}`,
          order: 1,
          textAr: babBody || 'باب ' + babTitle,
          sourcePage: boundary.startPage + Math.floor(i / 3),
          masail: [],
        }],
      });
    }
  }

  // Long sections get split into ~500-char chunks for better reading
  for (const bab of abwab) {
    const newSections = [];
    for (const section of bab.sections) {
      if (section.textAr.length > 1500) {
        const paragraphs = section.textAr.split(/\n\n+/);
        let chunk = '';
        let chunkIdx = 1;
        for (const para of paragraphs) {
          if (chunk.length + para.length > 800 && chunk.length > 0) {
            newSections.push({
              ...section,
              id: `${section.id}-${chunkIdx}`,
              order: chunkIdx,
              textAr: chunk.trim(),
            });
            chunkIdx++;
            chunk = para;
          } else {
            chunk += (chunk ? '\n\n' : '') + para;
          }
        }
        if (chunk.trim()) {
          newSections.push({
            ...section,
            id: `${section.id}-${chunkIdx}`,
            order: chunkIdx,
            textAr: chunk.trim(),
          });
        }
      } else {
        newSections.push(section);
      }
    }
    bab.sections = newSections;
  }

  // Apply English translations to sections
  for (const bab of abwab) {
    for (const section of bab.sections) {
      section.textEn = TRANSLATIONS[section.id] || '';
    }
  }

  // Generate masalah for each section that has textAr (after chunking)
  for (const bab of abwab) {
    for (const section of bab.sections) {
      if (section.textAr && section.textAr.length > 10) {
        const masalahId = `masalah-${section.id}`;
        const translationText = section.textEn || '';
        section.masail = [{
          id: masalahId,
          sectionId: section.id,
          kitabId: boundary.id,
          titleAr: section.titleAr || bab.titleAr,
          titleEn: section.titleEn || bab.titleEn,
          rulingAr: section.textAr,
          rulingEn: translationText || (section.titleEn && section.titleEn !== bab.titleEn)
              ? translationText || section.titleEn
              : `Ruling from ${KITAB_EN_MAP[boundary.id] || boundary.titleEn} — ${bab.titleEn || ''}`.trim(),
          difficulty: 'basic',
          conditions: [],
          evidence: [],
        }];
      }
    }
  }

  return {
    id: boundary.id,
    titleAr: boundary.titleAr,
    titleEn: boundary.titleEn,
    order: boundary.order,
    categoryId: boundary.categoryId,
    pageRange: [boundary.startPage, (nextBoundary?.startPage || pages.length + 1) - 1],
    abwab,
  };
}

// ─── Generate terms glossary ───
function generateTerms() {
  return [
    { id: 'fard', termAr: 'فرض', termEn: 'Obligation', transliteration: 'farḍ', definitionAr: 'ما ثبت بدليل قطعي لا شبهة فيه', definitionEn: 'An obligatory act established by definitive evidence', category: 'general' },
    { id: 'wajib', termAr: 'واجب', termEn: 'Necessary', transliteration: 'wājib', definitionAr: 'ما ثبت بدليل ظني فيه شبهة', definitionEn: 'A necessary act established by probable evidence', category: 'general' },
    { id: 'sunnah', termAr: 'سنة', termEn: 'Sunnah', transliteration: 'sunnah', definitionAr: 'ما فعله النبي ﷺ على وجه المداومة', definitionEn: 'An act regularly performed by the Prophet (peace be upon him)', category: 'general' },
    { id: 'mustahabb', termAr: 'مستحب', termEn: 'Recommended', transliteration: 'mustaḥabb', definitionAr: 'ما يثاب فاعله ولا يعاقب تاركه', definitionEn: 'A recommended act; the doer is rewarded but the omitter is not punished', category: 'general' },
    { id: 'mubah', termAr: 'مباح', termEn: 'Permissible', transliteration: 'mubāḥ', definitionAr: 'ما لا ثواب في فعله ولا عقاب في تركه', definitionEn: 'A permissible act; neither rewarded nor punished', category: 'general' },
    { id: 'makruh', termAr: 'مكروه', termEn: 'Disliked', transliteration: 'makrūh', definitionAr: 'ما يثاب تاركه ولا يعاقب فاعله', definitionEn: 'A disliked act; the omitter is rewarded but the doer is not punished', category: 'general' },
    { id: 'haram', termAr: 'حرام', termEn: 'Prohibited', transliteration: 'ḥarām', definitionAr: 'ما ثبت النهي عنه بدليل قطعي', definitionEn: 'A prohibited act established by definitive evidence', category: 'general' },
    { id: 'taharah', termAr: 'طهارة', termEn: 'Purification', transliteration: 'ṭahārah', definitionAr: 'رفع الحدث وزوال النجس', definitionEn: 'Removal of ritual impurity or physical filth', category: 'taharah' },
    { id: 'wudu', termAr: 'وضوء', termEn: 'Ablution', transliteration: 'wuḍūʾ', definitionAr: 'غسل الأعضاء الأربعة المخصوصة', definitionEn: 'Washing the four specified body parts for ritual purity', category: 'taharah' },
    { id: 'ghusl', termAr: 'غسل', termEn: 'Full Ablution', transliteration: 'ghusl', definitionAr: 'غسل جميع البدن بالماء', definitionEn: 'Washing the entire body with water', category: 'taharah' },
    { id: 'tayammum', termAr: 'تيمم', termEn: 'Dry Ablution', transliteration: 'tayammum', definitionAr: 'مسح الوجه واليدين بالصعيد الطاهر', definitionEn: 'Wiping face and hands with clean earth when water is unavailable', category: 'taharah' },
    { id: 'hadath', termAr: 'حدث', termEn: 'Ritual Impurity', transliteration: 'ḥadath', definitionAr: 'وصف شرعي يقوم بالأعضاء يمنع من الصلاة', definitionEn: 'A state of ritual impurity that prevents prayer', category: 'taharah' },
    { id: 'najasah', termAr: 'نجاسة', termEn: 'Filth', transliteration: 'najāsah', definitionAr: 'عين مستقذرة شرعا', definitionEn: 'Substance considered impure in Islamic law', category: 'taharah' },
    { id: 'qiblah', termAr: 'قبلة', termEn: 'Direction of Prayer', transliteration: 'qiblah', definitionAr: 'الجهة التي يستقبلها المصلي', definitionEn: 'The direction faced during prayer (toward the Kaaba)', category: 'salah' },
    { id: 'rakah', termAr: 'ركعة', termEn: 'Unit of Prayer', transliteration: "rak'ah", definitionAr: 'وحدة الصلاة من القيام إلى السجدتين', definitionEn: 'One unit/cycle of prayer from standing to two prostrations', category: 'salah' },
    { id: 'ruku', termAr: 'ركوع', termEn: 'Bowing', transliteration: 'rukūʿ', definitionAr: 'الانحناء في الصلاة', definitionEn: 'Bowing down in prayer', category: 'salah' },
    { id: 'sujud', termAr: 'سجود', termEn: 'Prostration', transliteration: 'sujūd', definitionAr: 'وضع الجبهة على الأرض في الصلاة', definitionEn: 'Placing the forehead on the ground in prayer', category: 'salah' },
    { id: 'khutbah', termAr: 'خطبة', termEn: 'Sermon', transliteration: 'khuṭbah', definitionAr: 'الموعظة التي تلقى قبل صلاة الجمعة والعيدين', definitionEn: 'A sermon delivered before Friday and Eid prayers', category: 'salah' },
    { id: 'janazah', termAr: 'جنازة', termEn: 'Funeral Prayer', transliteration: 'janāzah', definitionAr: 'صلاة على الميت', definitionEn: 'Prayer performed for the deceased', category: 'salah' },
    { id: 'nisab', termAr: 'نصاب', termEn: 'Threshold', transliteration: 'niṣāb', definitionAr: 'المقدار المعين الذي تجب الزكاة فيه', definitionEn: 'The minimum amount of wealth on which zakat becomes obligatory', category: 'zakah' },
    { id: 'sadaqah', termAr: 'صدقة', termEn: 'Charity', transliteration: 'ṣadaqah', definitionAr: 'ما يعطى تطوعا للفقراء', definitionEn: 'Voluntary charity given to the poor', category: 'zakah' },
    { id: 'ihram', termAr: 'إحرام', termEn: 'Sacred State', transliteration: 'iḥrām', definitionAr: 'الدخول في حرمات الحج أو العمرة', definitionEn: 'Entering the state of ritual consecration for Hajj or Umrah', category: 'hajj' },
    { id: 'tawaf', termAr: 'طواف', termEn: 'Circumambulation', transliteration: 'ṭawāf', definitionAr: 'الدوران حول الكعبة', definitionEn: 'Walking around the Kaaba seven times', category: 'hajj' },
    { id: 'nikah-term', termAr: 'نكاح', termEn: 'Marriage Contract', transliteration: 'nikāḥ', definitionAr: 'عقد يفيد ملك المتعة بالأنثى قصدا', definitionEn: 'The marriage contract in Islamic law', category: 'nikah' },
    { id: 'mahr', termAr: 'مهر', termEn: 'Dower', transliteration: 'mahr', definitionAr: 'المال الذي تستحقه المرأة بعقد النكاح', definitionEn: 'The obligatory gift from husband to wife upon marriage', category: 'nikah' },
    { id: 'talaq-term', termAr: 'طلاق', termEn: 'Divorce', transliteration: 'ṭalāq', definitionAr: 'رفع قيد النكاح في الحال أو المآل', definitionEn: 'Dissolution of the marriage contract', category: 'nikah' },
    { id: 'iddah', termAr: 'عدة', termEn: 'Waiting Period', transliteration: "'iddah", definitionAr: 'مدة تتربص فيها المرأة بعد الفراق', definitionEn: 'The mandatory waiting period after divorce or death of husband', category: 'nikah' },
    { id: 'khul-term', termAr: 'خلع', termEn: 'Divorce by Ransom', transliteration: "khul'", definitionAr: 'إزالة ملك النكاح بلفظ الخلع أو ما في معناه بعوض', definitionEn: "Wife-initiated divorce in exchange for returning the dower", category: 'nikah' },
    { id: 'qisas', termAr: 'قصاص', termEn: 'Retribution', transliteration: 'qiṣāṣ', definitionAr: 'أن يفعل بالجاني مثل ما فعل بالمجني عليه', definitionEn: 'Legal retribution; equal punishment for the crime committed', category: 'jinayat' },
    { id: 'diyah', termAr: 'دية', termEn: 'Blood Money', transliteration: 'diyah', definitionAr: 'المال الواجب في النفس أو ما دونها', definitionEn: 'Financial compensation for bodily harm or death', category: 'jinayat' },
    { id: 'hadd', termAr: 'حد', termEn: 'Fixed Punishment', transliteration: 'ḥadd', definitionAr: 'عقوبة مقدرة شرعا', definitionEn: 'A punishment fixed by divine law (e.g., for theft, adultery)', category: 'jinayat' },
    { id: 'bay', termAr: 'بيع', termEn: 'Sale', transliteration: "bay'", definitionAr: 'مبادلة المال بالمال', definitionEn: 'Exchange of property for property (sale contract)', category: 'buyu' },
    { id: 'riba', termAr: 'ربا', termEn: 'Usury', transliteration: 'ribā', definitionAr: 'الزيادة المشروطة في عقد البيع من غير عوض', definitionEn: 'Prohibited increase in transactions (interest/usury)', category: 'buyu' },
    { id: 'fasid', termAr: 'فاسد', termEn: 'Defective', transliteration: 'fāsid', definitionAr: 'ما كان مشروعا بأصله دون وصفه', definitionEn: 'A contract valid in essence but defective in description', category: 'general' },
    { id: 'batil', termAr: 'باطل', termEn: 'Void', transliteration: 'bāṭil', definitionAr: 'ما لم يكن مشروعا بأصله ولا بوصفه', definitionEn: 'A contract void in both essence and description', category: 'general' },
    { id: 'sahih', termAr: 'صحيح', termEn: 'Valid', transliteration: 'ṣaḥīḥ', definitionAr: 'ما كان مشروعا بأصله ووصفه', definitionEn: 'A valid contract, sound in essence and description', category: 'general' },
    { id: 'wasiyah', termAr: 'وصية', termEn: 'Bequest', transliteration: 'waṣiyyah', definitionAr: 'تمليك مضاف إلى ما بعد الموت', definitionEn: 'A bequest; transfer of property after death', category: 'wasaya' },
    { id: 'mirath', termAr: 'ميراث', termEn: 'Inheritance', transliteration: 'mīrāth', definitionAr: 'ما يتركه الميت من مال', definitionEn: 'Estate left by the deceased to be distributed among heirs', category: 'faraid' },

    // ─── Muamalat (Transactions) ───
    { id: 'rahn-term', termAr: 'رهن', termEn: 'Pledge', transliteration: 'rahn', definitionAr: 'حبس شيء بحق يمكن استيفاؤه منه', definitionEn: 'Holding property as security for a debt', category: 'buyu' },
    { id: 'ijarah-term', termAr: 'إجارة', termEn: 'Lease', transliteration: 'ijārah', definitionAr: 'عقد على المنافع بعوض', definitionEn: 'A contract for the use of property or services in exchange for payment', category: 'buyu' },
    { id: 'shufah-term', termAr: 'شفعة', termEn: 'Pre-emption', transliteration: "shuf'ah", definitionAr: 'حق تملك العقار المبيع جبرا على المشتري', definitionEn: "Right of a partner or neighbor to purchase a sold property before others", category: 'buyu' },
    { id: 'shirkah-term', termAr: 'شركة', termEn: 'Partnership', transliteration: 'shirkah', definitionAr: 'عقد بين المتشاركين في الأصل والربح', definitionEn: 'A contract between two or more parties to share capital and profit', category: 'buyu' },
    { id: 'mudarabah-term', termAr: 'مضاربة', termEn: 'Silent Partnership', transliteration: 'muḍārabah', definitionAr: 'عقد على الشركة بمال من أحد الجانبين وعمل من الآخر', definitionEn: 'A partnership where one provides capital and the other provides labor', category: 'buyu' },
    { id: 'wakalah-term', termAr: 'وكالة', termEn: 'Agency', transliteration: 'wakālah', definitionAr: 'تفويض شخص ما له فعله مما يقبل النيابة', definitionEn: 'Appointing another person to act on one\'s behalf', category: 'buyu' },
    { id: 'kafalah-term', termAr: 'كفالة', termEn: 'Guarantee', transliteration: 'kafālah', definitionAr: 'ضم ذمة الكفيل إلى ذمة الأصيل في المطالبة', definitionEn: 'A guarantee where the guarantor joins the debtor in liability', category: 'buyu' },
    { id: 'hawalah-term', termAr: 'حوالة', termEn: 'Debt Transfer', transliteration: 'ḥawālah', definitionAr: 'نقل الدين من ذمة إلى ذمة', definitionEn: 'Transfer of a debt obligation from one person to another', category: 'buyu' },
    { id: 'sulh-term', termAr: 'صلح', termEn: 'Settlement', transliteration: 'ṣulḥ', definitionAr: 'عقد يرفع النزاع بالتراضي', definitionEn: 'A contract that resolves a dispute through mutual agreement', category: 'buyu' },
    { id: 'hibah-term', termAr: 'هبة', termEn: 'Gift', transliteration: 'hibah', definitionAr: 'تمليك العين بلا عوض', definitionEn: 'Gratuitous transfer of property without compensation', category: 'buyu' },
    { id: 'waqf-term', termAr: 'وقف', termEn: 'Endowment', transliteration: 'waqf', definitionAr: 'حبس العين على حكم ملك الله تعالى', definitionEn: 'Dedicating property for charitable or religious purposes in perpetuity', category: 'buyu' },
    { id: 'ghasb-term', termAr: 'غصب', termEn: 'Usurpation', transliteration: 'ghaṣb', definitionAr: 'أخذ مال الغير بلا حق', definitionEn: 'Unlawful seizure of another\'s property', category: 'buyu' },
    { id: 'wadiah-term', termAr: 'وديعة', termEn: 'Deposit', transliteration: "wadī'ah", definitionAr: 'تسليط الغير على حفظ ماله', definitionEn: 'Entrusting property to another for safekeeping', category: 'buyu' },
    { id: 'ariyah-term', termAr: 'عارية', termEn: 'Gratuitous Loan', transliteration: "'āriyah", definitionAr: 'تمليك المنافع بغير عوض', definitionEn: 'Lending property for use without compensation', category: 'buyu' },
    { id: 'ijab-qabul', termAr: 'إيجاب وقبول', termEn: 'Offer and Acceptance', transliteration: 'ījāb wa qabūl', definitionAr: 'ركنا العقد من الإيجاب والقبول', definitionEn: 'The two pillars of a contract: offer and acceptance', category: 'buyu' },
    { id: 'khiyar', termAr: 'خيار', termEn: 'Option', transliteration: 'khiyār', definitionAr: 'حق العاقد في إمضاء العقد أو فسخه', definitionEn: 'The right of a contracting party to confirm or cancel a contract', category: 'buyu' },
    { id: 'salam-term', termAr: 'سلم', termEn: 'Forward Sale', transliteration: 'salam', definitionAr: 'بيع آجل بعاجل', definitionEn: 'A sale where payment is made in advance for goods delivered later', category: 'buyu' },
    { id: 'murabahah-term', termAr: 'مرابحة', termEn: 'Cost-Plus Sale', transliteration: 'murābaḥah', definitionAr: 'بيع بمثل الثمن الأول مع زيادة ربح', definitionEn: 'A sale at original cost plus a disclosed profit margin', category: 'buyu' },
    { id: 'iqalah-term', termAr: 'إقالة', termEn: 'Rescission', transliteration: 'iqālah', definitionAr: 'رفع العقد بالتراضي', definitionEn: 'Mutual cancellation of a contract by both parties', category: 'buyu' },
    { id: 'dayn', termAr: 'دين', termEn: 'Debt', transliteration: 'dayn', definitionAr: 'مال ثابت في الذمة', definitionEn: 'An obligation or liability owed by one party to another', category: 'buyu' },

    // ─── Jinayaat (Criminal Law) ───
    { id: 'sariqah-term', termAr: 'سرقة', termEn: 'Theft', transliteration: 'sariqah', definitionAr: 'أخذ مال الغير خفية من حرز', definitionEn: 'Taking another\'s property secretly from a secure place', category: 'jinayat' },
    { id: 'hirz', termAr: 'حرز', termEn: 'Secure Place', transliteration: 'ḥirz', definitionAr: 'الموضع الذي يحفظ فيه المال عادة', definitionEn: 'A place where property is customarily kept safe', category: 'jinayat' },
    { id: 'qadhf', termAr: 'قذف', termEn: 'False Accusation', transliteration: 'qadhf', definitionAr: 'الرمي بالزنا صريحا', definitionEn: 'Accusing someone of fornication without proof', category: 'jinayat' },
    { id: 'lian-term', termAr: 'لعان', termEn: 'Mutual Imprecation', transliteration: "li'ān", definitionAr: 'شهادات مؤكدة بالأيمان مقرونة باللعن', definitionEn: 'Sworn mutual oaths between spouses in cases of accusation of adultery', category: 'jinayat' },
    { id: 'tazir', termAr: 'تعزير', termEn: 'Discretionary Punishment', transliteration: "ta'zīr", definitionAr: 'عقوبة غير مقدرة شرعا', definitionEn: 'A punishment left to the judge\'s discretion for offenses without fixed penalties', category: 'jinayat' },
    { id: 'shubhah', termAr: 'شبهة', termEn: 'Doubt', transliteration: 'shubhah', definitionAr: 'ما يشبه الثابت وليس بثابت', definitionEn: 'Doubt or ambiguity that may prevent the application of a fixed punishment', category: 'jinayat' },
    { id: 'amd', termAr: 'عمد', termEn: 'Intentional', transliteration: "'amd", definitionAr: 'تعمد الفعل بآلة تقتل غالبا', definitionEn: 'Deliberate commission of an act using means that typically cause death', category: 'jinayat' },
    { id: 'khata', termAr: 'خطأ', termEn: 'Accidental', transliteration: "khaṭa'", definitionAr: 'ما وقع بلا قصد', definitionEn: 'An unintentional act causing harm without deliberation', category: 'jinayat' },
    { id: 'shibh-amd', termAr: 'شبه عمد', termEn: 'Quasi-Intentional', transliteration: "shibh al-'amd", definitionAr: 'تعمد الضرب بما لا يقتل غالبا', definitionEn: 'Intentional act using means not typically lethal', category: 'jinayat' },
    { id: 'aqilah', termAr: 'عاقلة', termEn: 'Blood-Money Group', transliteration: "'āqilah", definitionAr: 'العصبة الذين يتحملون الدية', definitionEn: "The killer's male relatives who share responsibility for blood money", category: 'jinayat' },
    { id: 'qasamah-term', termAr: 'قسامة', termEn: 'Compurgation', transliteration: 'qasāmah', definitionAr: 'أيمان تقسم على أهل المحلة في دعوى القتل', definitionEn: 'Oaths distributed among residents of a locality where a body is found', category: 'jinayat' },
    { id: 'sulh-jinayat', termAr: 'صلح في الجنايات', termEn: 'Criminal Settlement', transliteration: 'ṣulḥ fī al-jināyāt', definitionAr: 'التراضي على بدل الدم', definitionEn: 'Settlement between the victim\'s family and offender in lieu of retribution', category: 'jinayat' },

    // ─── Aqdhiyah (Judiciary) ───
    { id: 'dawa-term', termAr: 'دعوى', termEn: 'Legal Claim', transliteration: "da'wā", definitionAr: 'قول مقبول عند القاضي يطلب به حقا', definitionEn: 'A legal claim brought before a judge to establish a right', category: 'buyu' },
    { id: 'muddai', termAr: 'مدعي', termEn: 'Claimant', transliteration: "mudda'ī", definitionAr: 'من لا يجبر على الخصومة', definitionEn: 'The party who initiates a legal claim', category: 'buyu' },
    { id: 'muddaa-alayh', termAr: 'مدعى عليه', termEn: 'Defendant', transliteration: "mudda'ā 'alayh", definitionAr: 'من يجبر على الخصومة', definitionEn: 'The party against whom a claim is made', category: 'buyu' },
    { id: 'bayyinah', termAr: 'بينة', termEn: 'Evidence', transliteration: 'bayyinah', definitionAr: 'الشهادة لأنها تبين الحق', definitionEn: 'Testimony or proof that establishes a claim', category: 'buyu' },
    { id: 'shahid', termAr: 'شاهد', termEn: 'Witness', transliteration: 'shāhid', definitionAr: 'من يخبر بما رآه أو سمعه', definitionEn: 'A person who testifies about what they witnessed', category: 'buyu' },
    { id: 'yamin', termAr: 'يمين', termEn: 'Oath', transliteration: 'yamīn', definitionAr: 'تأكيد الشيء بذكر اسم الله تعالى', definitionEn: 'A sworn oath invoking the name of God to affirm a statement', category: 'buyu' },
    { id: 'qadi', termAr: 'قاضي', termEn: 'Judge', transliteration: 'qāḍī', definitionAr: 'من نصب للفصل بين الناس في الخصومات', definitionEn: 'A person appointed to adjudicate disputes between people', category: 'buyu' },
    { id: 'hukm', termAr: 'حكم', termEn: 'Judgment', transliteration: 'ḥukm', definitionAr: 'فصل الخصومة بقول ملزم', definitionEn: 'A binding judicial ruling that settles a dispute', category: 'buyu' },
    { id: 'qismah-term', termAr: 'قسمة', termEn: 'Division', transliteration: 'qismah', definitionAr: 'تمييز الأنصباء وإفراز الحقوق', definitionEn: 'Division and distribution of shared property among owners', category: 'buyu' },
    { id: 'ikrah-term', termAr: 'إكراه', termEn: 'Coercion', transliteration: 'ikrāh', definitionAr: 'حمل الغير على ما لا يرضاه', definitionEn: 'Compelling someone to do something against their will', category: 'buyu' },

    // ─── Munakahaat (Family Law) ───
    { id: 'waliy', termAr: 'ولي', termEn: 'Guardian', transliteration: 'walīy', definitionAr: 'من يملك التصرف على غيره جبرا', definitionEn: 'A legal guardian who acts on behalf of another in marriage', category: 'nikah' },
    { id: 'shahid-nikah', termAr: 'شاهد النكاح', termEn: 'Marriage Witness', transliteration: 'shāhid al-nikāḥ', definitionAr: 'الشاهد الذي يحضر عقد النكاح', definitionEn: 'A witness required for the validity of a marriage contract', category: 'nikah' },
    { id: 'nafaqah', termAr: 'نفقة', termEn: 'Maintenance', transliteration: 'nafaqah', definitionAr: 'ما يحتاج إليه الإنسان من طعام وكسوة ومسكن', definitionEn: "Obligatory financial support including food, clothing, and shelter", category: 'nikah' },
    { id: 'hadanah-term', termAr: 'حضانة', termEn: 'Custody', transliteration: 'ḥaḍānah', definitionAr: 'حفظ الصغير عمن يضره', definitionEn: 'Right to physical custody and care of a child', category: 'nikah' },
    { id: 'ridaa', termAr: 'رضاع', termEn: 'Breastfeeding', transliteration: "riḍā'", definitionAr: 'إرضاع الصغير في مدة الرضاع', definitionEn: 'Suckling that establishes kinship and affects marriage prohibitions', category: 'nikah' },
    { id: 'mutah', termAr: 'متعة', termEn: 'Consolation Gift', transliteration: "mut'ah", definitionAr: 'مال يجب للمرأة بالطلاق', definitionEn: 'A gift given to a divorced wife as consolation', category: 'nikah' },
    { id: 'dhihar-term', termAr: 'ظهار', termEn: 'Injurious Assimilation', transliteration: 'ẓihār', definitionAr: 'تشبيه الزوجة بمن تحرم عليه', definitionEn: "A husband likening his wife to a female relative within prohibited degrees", category: 'nikah' },
    { id: 'rajah', termAr: 'رجعة', termEn: 'Revocable Divorce Return', transliteration: "raj'ah", definitionAr: 'إعادة المطلقة إلى النكاح في العدة', definitionEn: 'Taking back a wife during her waiting period after a revocable divorce', category: 'nikah' },

    // ─── Mutafarriqat (Miscellaneous) ───
    { id: 'asabah', termAr: 'عصبة', termEn: 'Agnates', transliteration: "'aṣabah", definitionAr: 'كل ذكر لا تدخل في نسبته إلى الميت أنثى', definitionEn: 'Male relatives through the male line who inherit the residue', category: 'faraid' },
    { id: 'dhawi-arham', termAr: 'ذوو الأرحام', termEn: 'Distant Kindred', transliteration: 'dhawū al-arḥām', definitionAr: 'كل قريب ليس بذي فرض ولا عصبة', definitionEn: 'Relatives who are neither fixed-share heirs nor agnates', category: 'faraid' },
    { id: 'hajb', termAr: 'حجب', termEn: 'Exclusion', transliteration: 'ḥajb', definitionAr: 'منع شخص من ميراثه كله أو بعضه', definitionEn: 'Exclusion of an heir from all or part of their inheritance', category: 'faraid' },
    { id: 'fard-share', termAr: 'فرض', termEn: 'Obligatory Share', transliteration: 'farḍ', definitionAr: 'النصيب المقدر شرعا للوارث', definitionEn: 'A fixed share of inheritance prescribed by Islamic law', category: 'faraid' },
    { id: 'itq-term', termAr: 'عتق', termEn: 'Manumission', transliteration: "'itq", definitionAr: 'تحرير الرقبة من الرق', definitionEn: 'The act of freeing a slave', category: 'faraid' },
    { id: 'tadbir-term', termAr: 'تدبير', termEn: 'Conditional Manumission', transliteration: 'tadbīr', definitionAr: 'تعليق العتق بموت المولى', definitionEn: "Freeing a slave conditional upon the master's death", category: 'faraid' },
    { id: 'mukatab-term', termAr: 'مكاتب', termEn: 'Contractual Emancipation', transliteration: 'mukātab', definitionAr: 'العبد الذي كاتب سيده على مال ليعتق', definitionEn: 'A slave who contracts with their master to buy their freedom', category: 'faraid' },
    { id: 'walaa-term', termAr: 'ولاء', termEn: 'Clientage', transliteration: "walā'", definitionAr: 'عصوبة سببها العتق', definitionEn: 'A bond of loyalty established through manumission, creating inheritance rights', category: 'faraid' },
    { id: 'wasiyah-rules', termAr: 'أحكام الوصايا', termEn: 'Rules of Bequests', transliteration: 'aḥkām al-waṣāyā', definitionAr: 'لا تجوز الوصية لوارث ولا بأكثر من الثلث', definitionEn: 'Bequests cannot exceed one-third of estate nor go to an heir', category: 'wasaya' },
    { id: 'ayman-term', termAr: 'أيمان', termEn: 'Oaths', transliteration: 'aymān', definitionAr: 'الحلف بالله تعالى على فعل شيء أو تركه', definitionEn: 'Swearing by God to do or refrain from something', category: 'general' },

    // ─── Ibadat (Worship) ───
    { id: 'salat-janazah', termAr: 'صلاة الجنازة', termEn: 'Funeral Prayer', transliteration: 'ṣalāt al-janāzah', definitionAr: 'صلاة تؤدى على الميت المسلم بأربع تكبيرات', definitionEn: 'A communal prayer performed for a deceased Muslim with four takbirs', category: 'salah' },
    { id: 'itikaf', termAr: 'اعتكاف', termEn: 'Spiritual Retreat', transliteration: "i'tikāf", definitionAr: 'المكث في المسجد بنية العبادة', definitionEn: 'Secluding oneself in a mosque for devoted worship', category: 'sawm' },
    { id: 'sadaqat-fitr', termAr: 'صدقة الفطر', termEn: 'Eid Charity', transliteration: 'ṣadaqat al-fiṭr', definitionAr: 'صدقة واجبة بسبب الفطر من رمضان', definitionEn: 'Obligatory charity given at the end of Ramadan before Eid prayer', category: 'zakah' },
    { id: 'udhiyah-term', termAr: 'أضحية', termEn: 'Sacrifice', transliteration: 'uḍḥiyah', definitionAr: 'ذبح حيوان مخصوص في أيام النحر', definitionEn: 'Ritual animal sacrifice performed during the days of Eid al-Adha', category: 'hajj' },
    { id: 'tawaf-term', termAr: 'طواف الزيارة', termEn: 'Circumambulation of Visit', transliteration: 'ṭawāf al-ziyārah', definitionAr: 'ركن من أركان الحج يؤدى يوم النحر', definitionEn: 'An essential rite of Hajj performed on the day of sacrifice', category: 'hajj' },
    { id: 'say', termAr: 'سعي', termEn: 'Running Between Safa and Marwa', transliteration: "sa'y", definitionAr: 'المشي بين الصفا والمروة سبعة أشواط', definitionEn: 'Walking seven times between the hills of Safa and Marwa', category: 'hajj' },
    { id: 'wuquf', termAr: 'وقوف', termEn: 'Standing at Arafat', transliteration: 'wuqūf', definitionAr: 'الوقوف بعرفة ركن الحج الأعظم', definitionEn: 'The pillar of Hajj: standing at the plain of Arafat on the 9th of Dhul Hijjah', category: 'hajj' },
    { id: 'fidyah', termAr: 'فدية', termEn: 'Expiation', transliteration: 'fidyah', definitionAr: 'ما يجب بسبب ترك واجب أو فعل محظور في الحج', definitionEn: 'Compensation required for omitting an obligation or violating a prohibition during Hajj', category: 'hajj' },
    { id: 'miqat', termAr: 'ميقات', termEn: 'Miqat Station', transliteration: 'mīqāt', definitionAr: 'الموضع الذي يحرم منه الحاج أو المعتمر', definitionEn: 'Designated boundary points where pilgrims must enter the state of ihram', category: 'hajj' },
    { id: 'hady', termAr: 'هدي', termEn: 'Sacrificial Animal', transliteration: 'hady', definitionAr: 'ما يهدى إلى الحرم من الأنعام', definitionEn: 'An animal brought to the sacred precinct as an offering during Hajj', category: 'hajj' },
    { id: 'qiran', termAr: 'قران', termEn: 'Qiran', transliteration: 'qirān', definitionAr: 'الجمع بين الحج والعمرة بإحرام واحد', definitionEn: 'Performing Hajj and Umrah together with a single ihram', category: 'hajj' },
    { id: 'tamattu', termAr: 'تمتع', termEn: "Tamattu'", transliteration: "tamattu'", definitionAr: 'أداء العمرة في أشهر الحج ثم الحج', definitionEn: 'Performing Umrah during Hajj months, then starting a new ihram for Hajj', category: 'hajj' },
    { id: 'sujud-sahw', termAr: 'سجود السهو', termEn: 'Prostration of Forgetfulness', transliteration: 'sujūd al-sahw', definitionAr: 'سجدتان تجبان بترك واجب أو تأخير ركن', definitionEn: 'Two prostrations required when a prayer obligation is missed or a pillar is delayed', category: 'salah' },
    { id: 'sujud-tilawah', termAr: 'سجود التلاوة', termEn: 'Prostration of Recitation', transliteration: 'sujūd al-tilāwah', definitionAr: 'سجدة تجب عند تلاوة آية سجدة', definitionEn: 'A prostration required when reciting or hearing a verse of prostration', category: 'salah' },
    { id: 'qunut', termAr: 'قنوت', termEn: 'Supplication in Prayer', transliteration: 'qunūt', definitionAr: 'الدعاء في الصلاة في محل مخصوص', definitionEn: 'A supplication recited while standing in prayer, particularly in Witr', category: 'salah' },
    { id: 'adhan', termAr: 'أذان', termEn: 'Call to Prayer', transliteration: 'adhān', definitionAr: 'الإعلام بدخول وقت الصلاة بألفاظ مخصوصة', definitionEn: 'The vocal announcement of prayer time using prescribed words', category: 'salah' },
    { id: 'iqamah', termAr: 'إقامة', termEn: 'Second Call', transliteration: 'iqāmah', definitionAr: 'الإعلام بالقيام إلى الصلاة', definitionEn: 'The call made immediately before the congregational prayer begins', category: 'salah' },
    { id: 'nafl', termAr: 'نفل', termEn: 'Voluntary Prayer', transliteration: 'nafl', definitionAr: 'ما زاد على الفرائض من الصلوات', definitionEn: 'Supererogatory prayers beyond the five obligatory ones', category: 'salah' },
    { id: 'hawl', termAr: 'حول', termEn: 'Lunar Year', transliteration: 'ḥawl', definitionAr: 'مضي سنة قمرية كاملة', definitionEn: 'The passage of one full lunar year, required for zakat eligibility', category: 'zakah' },
    { id: 'ushr', termAr: 'عشر', termEn: 'Tithe', transliteration: "'ushr", definitionAr: 'عشر الخارج من الأرض', definitionEn: 'One-tenth of agricultural produce due as zakat', category: 'zakah' },
    { id: 'khuff', termAr: 'خف', termEn: 'Leather Sock', transliteration: 'khuff', definitionAr: 'ما يلبس في القدم من جلد', definitionEn: 'Leather footwear over which one may wipe during ablution', category: 'taharah' },
    { id: 'istinja', termAr: 'استنجاء', termEn: 'Cleansing After Relieving', transliteration: "istinjā'", definitionAr: 'إزالة ما خرج من السبيلين بماء أو حجر', definitionEn: 'Cleaning oneself with water or stones after using the lavatory', category: 'taharah' },
    { id: 'masah', termAr: 'مسح', termEn: 'Wiping', transliteration: 'masḥ', definitionAr: 'إمرار اليد المبللة على العضو', definitionEn: 'Passing a wet hand over a body part as part of ablution', category: 'taharah' },
  ];
}

// ─── Main processing ───
function main() {
  console.log(`Reading markdown files from: ${INPUT_DIR}`);

  const files = readdirSync(INPUT_DIR)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[0], 10);
      const numB = parseInt(b.split('-')[0], 10);
      return numA - numB;
    });

  console.log(`Found ${files.length} markdown files`);

  // Parse all pages
  const pages = files.map(f => ({
    file: f,
    page: parseInt(f.split('-')[0], 10),
    text: parseMarkdownFile(join(INPUT_DIR, f)),
  }));

  // Detect kitab boundaries
  const boundaries = detectKitabBoundaries(pages);
  console.log(`Found ${boundaries.length} kutub`);

  // Build per-kitab data
  const kutub = [];
  for (let i = 0; i < boundaries.length; i++) {
    const kitab = buildKitab(boundaries[i], boundaries[i + 1], pages);
    kutub.push(kitab);
    console.log(`  ${kitab.order}. ${kitab.titleAr} (${kitab.titleEn}) — ${kitab.abwab.length} abwab, pages ${kitab.pageRange[0]}-${kitab.pageRange[1]}`);
  }

  // Create output directories
  mkdirSync(join(OUTPUT_DIR, 'kitab'), { recursive: true });
  mkdirSync(join(OUTPUT_DIR, 'topics'), { recursive: true });

  // Write index.json
  const index = kutub.map(k => ({
    id: k.id,
    titleAr: k.titleAr,
    titleEn: k.titleEn,
    order: k.order,
    categoryId: k.categoryId,
    pageRange: k.pageRange,
    babCount: k.abwab.length,
    sectionCount: k.abwab.reduce((sum, b) => sum + b.sections.length, 0),
  }));
  writeFileSync(join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`\nWrote index.json (${index.length} kutub)`);

  // Write per-kitab files
  for (const kitab of kutub) {
    writeFileSync(join(OUTPUT_DIR, 'kitab', `${kitab.id}.json`), JSON.stringify(kitab, null, 2));
  }
  console.log(`Wrote ${kutub.length} kitab JSON files`);

  // Write terms.json
  const terms = generateTerms();
  writeFileSync(join(OUTPUT_DIR, 'terms.json'), JSON.stringify(terms, null, 2));
  console.log(`Wrote terms.json (${terms.length} terms)`);

  // Write topics-index.json — link masailIds from sections
  const topics = kutub.flatMap(k =>
    k.abwab.map(b => ({
      id: b.id,
      titleAr: b.titleAr,
      titleEn: b.titleEn,
      categoryId: k.categoryId,
      summaryEn: `${b.titleEn} — from ${k.titleEn} in Mukhtasar al-Quduri`,
      masailIds: b.sections.flatMap(s => s.masail.map(m => m.id)),
      tags: [k.id, k.categoryId],
      relatedTopicIds: [],
    }))
  );
  writeFileSync(join(OUTPUT_DIR, 'topics', 'topics-index.json'), JSON.stringify(topics, null, 2));
  console.log(`Wrote topics-index.json (${topics.length} topics)`);

  // Summary stats
  const totalSections = kutub.reduce((sum, k) => sum + k.abwab.reduce((s, b) => s + b.sections.length, 0), 0);
  const totalAbwab = kutub.reduce((sum, k) => sum + k.abwab.length, 0);
  console.log(`\n--- Summary ---`);
  console.log(`Kutub: ${kutub.length}`);
  console.log(`Abwab: ${totalAbwab}`);
  console.log(`Sections: ${totalSections}`);
  console.log(`Terms: ${terms.length}`);
  console.log(`Topics: ${topics.length}`);
}

main();
