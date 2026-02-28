import type { Lesson } from '../types';

export const lesson17: Lesson = {
  id: 'lesson-17',
  number: 17,
  titleAr: 'تدريبات على الترقيم',
  titleEn: 'Punctuation Practice',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'Practice inserting punctuation marks by reading the story of the Gold Jar (قصّة جرّة الذهب). This story about an honest merchant teaches both punctuation skills and moral values.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'The Story of the Gold Jar',
        titleAr: 'قصّة جرّة الذهب',
        paragraphs: [
          {
            arabic: 'في قديم الزمان، كان تاجر أمين يتقي الله. أراد أن يستقرّ بعد سنوات من الترحال. لمّا كبر في السنّ، وضعف جسمه، وانتشر الشيب في رأسه، اشترى داراً واسعة من رجل.',
            translation: 'In ancient times, there was an honest, God-fearing merchant. He wanted to settle down after years of traveling. When he grew old, his body weakened, and gray hair spread, he bought a spacious house from a man.',
          },
          {
            arabic: 'وبينما كان يسكن في داره الجديدة، لاحظ حائطاً وفكّر: "لو هدمته لاتّسع المكان." فأخذ الفأس وبدأ يهدم الحائط؛ فوجد جرّة مملوءة بالذهب — كنزاً مدفوناً!',
            translation: 'While living in his new house, he noticed a wall and thought: "If I demolished it, the space would expand." So he took an axe and began demolishing the wall; he found a jar filled with gold — a buried treasure!',
          },
          {
            arabic: 'قال التاجر الأمين: "المال الحرام يضرّ ولا ينفع." فحمل جرّة الذهب إلى صاحب الدار السابق. فرفض الرجل وقال: "بعتك الدار وما فيها."',
            translation: 'The honest merchant said: "Unlawful wealth harms and does not benefit." So he carried the gold jar to the previous owner. The man refused and said: "I sold you the house and everything in it."',
          },
          {
            arabic: 'تحاكما إلى قاضي المدينة. فأُعجب القاضي بأمانتهما، وسأل: "هل لكما أولاد؟" قال التاجر: "لي بنت." وقال الرجل: "لي ابن." فحكم القاضي بزواج الابن من البنت، ويُنفق الذهب عليهما. فاستصوب الرجلان.',
            translation: 'They took their dispute to the city judge. Impressed by their honesty, the judge asked: "Do you have children?" The merchant said: "I have a daughter." The man said: "I have a son." The judge ruled that the son marry the daughter, and the gold be spent on them. Both men approved.',
          },
        ],
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Story Vocabulary',
        titleAr: 'مفردات القصّة',
        items: [
          { arabic: 'تاجر أمين', transliteration: 'taajir ameen', english: 'honest merchant' },
          { arabic: 'يتقي الله', transliteration: 'yattaqil-laah', english: 'fears God' },
          { arabic: 'الترحال', transliteration: 'at-tirhaal', english: 'traveling' },
          { arabic: 'الشيب', transliteration: 'ash-shayb', english: 'gray hair' },
          { arabic: 'الفأس', transliteration: 'al-fa\'s', english: 'axe' },
          { arabic: 'جرّة', transliteration: 'jarrah', english: 'jar/pot' },
          { arabic: 'كنز مدفون', transliteration: 'kanz madfoon', english: 'buried treasure' },
          { arabic: 'المال الحرام', transliteration: 'al-maal al-haraam', english: 'unlawful wealth' },
          { arabic: 'تحاكما', transliteration: 'tahaakamaa', english: 'they went to court' },
          { arabic: 'قاضي المدينة', transliteration: 'qaadil-madeenah', english: 'city judge' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-17-1',
      title: 'Punctuation in the Story',
      titleAr: 'الترقيم في القصّة',
      instruction: 'Choose the correct punctuation mark for each position in the story.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-17-1-1',
            question: 'قال التاجر___ "المال الحرام يضرّ ولا ينفع" — What goes after قال?',
            options: ['. (period)', ': (colon)', '، (comma)', '؛ (semicolon)'],
            correctIndex: 1,
            explanation: 'A colon (:) comes before direct speech.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-17-1-2',
            question: '"هل لكما أولاد___" — What ends this question?',
            options: ['. (period)', '؟ (question mark)', '! (exclamation)', '؛ (semicolon)'],
            correctIndex: 1,
            explanation: 'A question mark (؟) ends an interrogative sentence.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-17-1-3',
            question: 'كنزاً مدفوناً___ — After discovering a treasure, what punctuation conveys surprise?',
            options: ['. (period)', '؟ (question mark)', '! (exclamation)', '، (comma)'],
            correctIndex: 2,
            explanation: 'An exclamation mark (!) conveys surprise and strong emotion.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-17-1-4',
            question: 'فأخذ الفأس وبدأ يهدم الحائط___ فوجد جرّة — What separates cause from result?',
            options: ['. (period)', '، (comma)', '؛ (semicolon)', ': (colon)'],
            correctIndex: 2,
            explanation: 'A semicolon (؛) connects causally related clauses.',
          },
        },
      ],
    },
    {
      id: 'ex-17-2',
      title: 'Story Comprehension',
      titleAr: 'فهم القصّة',
      instruction: 'Answer questions about the Gold Jar story.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-17-2-1',
            question: 'Why did the merchant return the gold to the previous owner?',
            options: ['He didn\'t need the money', 'He feared unlawful wealth', 'The judge ordered him to', 'The man threatened him'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-17-2-2',
            question: 'What was the judge\'s ruling?',
            options: ['Split the gold equally', 'Give it all to the merchant', 'Marry their children and spend the gold on them', 'Return it where it was found'],
            correctIndex: 2,
          },
        },
      ],
    },
  ],
};
