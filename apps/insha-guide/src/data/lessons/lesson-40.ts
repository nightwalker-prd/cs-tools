import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson40: Lesson = {
  id: 'lesson-40',
  number: 40,
  titleAr: 'برقيّة التهنئة',
  titleEn: 'Congratulatory Telegrams',
  unitId: 'correspondence',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson teaches how to write congratulatory telegrams (برقيّات تهنئة) — short, heartfelt messages sent to congratulate someone on their success. The five models below demonstrate how tone and wording vary based on the relationship between sender and recipient.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'Model Telegrams',
        titleAr: 'نماذج البرقيات',
        paragraphs: [
          {
            arabic: 'من رفيق إلى صديقه أحمد: يسعدني ويشرّفني أن أقدّم لشخصكم الكريم بالتهاني، وأمنياتي لكم المزيد من النجاح والتوفيق. — رفيقك حامد',
            translation: 'From a companion to his friend Ahmad: "It pleases me and honors me to present to your esteemed person my congratulations, and my wishes for more success and divine guidance." — Your companion Hamid',
          },
          {
            arabic: 'من صديق عزيز إلى عبد الله: مثابرتك الدائمة وعملك المتواصل يُؤَهِّلك للتفوّق والنجاح المستمرّ، فأنت أهل لذلك. أهنّئك من أعماق قلبي وأقول لك ألف مبروك. — صديقك عيد',
            translation: 'From a dear friend to Abdullah: "Your constant perseverance and continuous work qualify you for excellence. I congratulate you from the depths of my heart and say a thousand congratulations." — Your friend Eid',
          },
          {
            arabic: 'من زميل إلى الأخ حامد: لقد أسعدتنا بنجاحك وتفوّقك، فلك كلّ التهاني والأمنيات لمزيد من النجاح. — زميلك طارق',
            translation: 'From a colleague to brother Hamid: "You have made us happy with your success and excellence. To you go all congratulations and wishes for more success." — Your colleague Tariq',
          },
          {
            arabic: 'من صديق حميم إلى إسحاق: أهنّئك من سويداء قلبي بنجاحك وتفوّقك، فأنت جدير بذلك لما عهدناه فيك من الجهد والاجتهاد. — من لا ينساك سليمان',
            translation: 'From an intimate friend to Ishaq: "I congratulate you from the innermost part of my heart. You are worthy because of the effort and diligence we know in you." — He who never forgets you, Sulaiman',
          },
          {
            arabic: 'من والد إلى ابنه: بني وفلذة كبدي، أبعث إليك وجميع أفراد العائلة بأجمل التهاني بمناسبة نجاحك وتفوّقك، فقد كنت عند حسن ظنّنا بك. — والدك الذي لا يفتر من ذكرك',
            translation: 'From a father to his son: "My son and piece of my liver, I send to you and all family members the most beautiful congratulations on your success. You have lived up to our good expectations." — Your father who never ceases remembering you',
          },
        ],
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Telegram Vocabulary',
        titleAr: 'مفردات البرقيات',
        items: [
          { arabic: 'برقيّة', english: 'telegram' },
          { arabic: 'تهنئة', english: 'congratulation' },
          { arabic: 'نجاح', english: 'success' },
          { arabic: 'تفوّق', english: 'excellence / distinction' },
          { arabic: 'مثابرة', english: 'perseverance' },
          { arabic: 'اجتهاد', english: 'diligence / hard work' },
          { arabic: 'أمنيات', english: 'wishes' },
          { arabic: 'توفيق', english: 'success / divine guidance' },
          { arabic: 'أهنّئك', english: 'I congratulate you' },
          { arabic: 'مبروك', english: 'congratulations (blessed)' },
          { arabic: 'سويداء قلبي', english: 'the innermost part of my heart' },
          { arabic: 'فلذة كبدي', english: 'piece of my liver (= my dear child)' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Useful Expressions by Relationship',
        titleAr: 'تعبيرات مفيدة حسب العلاقة',
        headers: ['Expression', 'Translation', 'Best For'],
        rows: [
          ['يسعدني ويشرّفني', 'It pleases and honors me', 'Formal / Acquaintances'],
          ['أهنّئك من أعماق قلبي', 'I congratulate from the depths of my heart', 'Close friends'],
          ['من سويداء قلبي', 'From the innermost part of my heart', 'Intimate friends'],
          ['ألف مبروك', 'A thousand congratulations', 'Universal'],
          ['كنت عند حسن ظنّنا بك', 'You lived up to our expectations', 'Parents to children'],
          ['فأنت أهل / جدير بذلك', 'You are worthy of that', 'Acknowledging merit'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-40-1',
      title: 'Telegram Quiz',
      titleAr: 'اختبار البرقيات',
      instruction: 'Answer questions about congratulatory telegrams.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-40-1-1',
            question: 'The expression فلذة كبدي is used by:',
            options: ['A friend', 'A teacher', 'A parent', 'A colleague'],
            correctIndex: 2,
            explanation: 'فلذة كبدي (piece of my liver) is a deeply affectionate parental term.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-40-1-2',
            question: 'Which expression is the most formal?',
            options: ['ألف مبروك', 'يسعدني ويشرّفني', 'فلذة كبدي', 'أسعدتنا بنجاحك'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-40-1-3',
            question: 'What does كنت عند حسن ظنّنا بك mean?',
            options: [
              'We are proud of you',
              'You lived up to our expectations',
              'You surprised us',
              'We wish you success',
            ],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-40-1-4',
            question: 'سويداء قلبي literally refers to:',
            options: [
              'The depths of my mind',
              'The innermost (black core) part of the heart',
              'The bottom of my soul',
              'The center of my chest',
            ],
            correctIndex: 1,
            explanation: 'سويداء is the diminutive of سوداء, referring to the black core of the heart — its deepest point.',
          },
        },
      ],
    },
    {
      id: 'ex-40-2',
      title: 'Match Senders to Expressions',
      titleAr: 'طابق المرسلين بالتعبيرات',
      instruction: 'Match each expression with the most appropriate sender type.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-40-2-1',
            pairs: [
              { left: 'بني وفلذة كبدي', right: 'Parent (والد)' },
              { left: 'يسعدني ويشرّفني', right: 'Formal friend (رفيق)' },
              { left: 'من سويداء قلبي', right: 'Intimate friend (صديق حميم)' },
              { left: 'أسعدتنا بنجاحك', right: 'Colleague (زميل)' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-40',
    titleEn: 'Write a Telegram for an Occasion',
    titleAr: 'اكتب برقية لمناسبة',
    prompt: {
      promptEn: 'Write two short telegrams: (1) A congratulatory telegram to a family member who graduated, and (2) A congratulatory telegram to a colleague. Adjust your tone and expressions for each relationship.',
      promptAr: 'اكتب برقيتين: واحدة لأحد أفراد العائلة وأخرى لزميل، مع تعديل الأسلوب لكلّ علاقة.',
      targetLength: { min: 20, max: 50 },
      hints: [
        'Family: use warm expressions like فلذة كبدي, من سويداء قلبي',
        'Colleague: use formal expressions like يسعدني ويشرّفني',
        'Keep telegrams brief — each should be 3-5 sentences',
        'Include sender name with an affectionate sign-off',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Warm Expressions (Family)',
        categoryAr: 'تعبيرات دافئة',
        words: [
          { arabic: 'فلذة كبدي', english: 'piece of my liver (dear child)' },
          { arabic: 'من سويداء قلبي', english: 'from the innermost heart' },
          { arabic: 'كنت عند حسن ظنّنا', english: 'you lived up to expectations' },
        ],
      },
      {
        categoryEn: 'Formal Expressions (Colleagues)',
        categoryAr: 'تعبيرات رسمية',
        words: [
          { arabic: 'يسعدني ويشرّفني', english: 'it pleases and honors me' },
          { arabic: 'لك كلّ التهاني', english: 'all congratulations to you' },
          { arabic: 'ألف مبروك', english: 'a thousand congratulations' },
        ],
      },
      {
        categoryEn: 'Shared Vocabulary',
        categoryAr: 'مفردات مشتركة',
        words: [
          { arabic: 'نجاح', english: 'success' },
          { arabic: 'تفوّق', english: 'excellence' },
          { arabic: 'مثابرة', english: 'perseverance' },
          { arabic: 'أمنيات', english: 'wishes' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-40-1', labelEn: 'Wrote two separate telegrams', labelAr: 'كتابة برقيتين منفصلتين', examples: [], required: true },
      { id: 'gc-40-2', labelEn: 'Used warm language for family', labelAr: 'لغة دافئة للعائلة', examples: ['فلذة كبدي'], required: true },
      { id: 'gc-40-3', labelEn: 'Used formal language for colleague', labelAr: 'لغة رسمية للزميل', examples: ['يسعدني ويشرّفني'], required: true },
      { id: 'gc-40-4', labelEn: 'Both telegrams are concise (3-5 sentences)', labelAr: 'البرقيتان موجزتان', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
