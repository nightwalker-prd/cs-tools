import { X } from 'lucide-react';
import type { Challenge } from '../types';

interface TheorySlideOverProps {
  challenge: Challenge;
  onClose: () => void;
}

const theoryContent: Record<string, { title: string; sections: { heading: string; text: string; exampleAr?: string; exampleEn?: string }[] }> = {
  nominal: {
    title: 'Nominal Sentences (الجملة الاسمية)',
    sections: [
      {
        heading: 'Structure',
        text: 'A nominal sentence starts with a noun (المبتدأ / mubtada) followed by a predicate (الخبر / khabar). The mubtada is always definite and marfu (nominative).',
        exampleAr: 'الكتابُ جديدٌ',
        exampleEn: 'The book is new.',
      },
      {
        heading: 'Agreement Rules',
        text: 'The predicate must agree with the subject in gender and number. If the subject is feminine, the predicate must also be feminine.',
        exampleAr: 'المدرسةُ كبيرةٌ',
        exampleEn: 'The school is big.',
      },
      {
        heading: 'Adjective Agreement',
        text: 'Adjectives (النعت) follow the noun and must agree in 4 ways: definiteness, gender, number, and case.',
        exampleAr: 'المعلمُ الماهرُ حاضرٌ',
        exampleEn: 'The skilled teacher is present.',
      },
      {
        heading: 'Demonstrative Pronouns (أسماء الإشارة)',
        text: 'Demonstratives point to specific nouns. Near: هذا (masc.), هذه (fem.). Far: ذلك (masc.), تلك (fem.). The noun after a demonstrative must be definite (with ال).',
        exampleAr: 'هذا الكتابُ مفيدٌ',
        exampleEn: 'This book is useful.',
      },
    ],
  },
  possessive: {
    title: 'Possessive Construction (الإضافة)',
    sections: [
      {
        heading: 'Basic Idafa',
        text: 'The first noun (المضاف / mudaf) drops its ال and tanwin. The second noun (المضاف إليه / mudaf ilayh) is in the genitive (majrur).',
        exampleAr: 'بابُ البيتِ',
        exampleEn: 'The door of the house.',
      },
      {
        heading: 'Chain Idafa',
        text: 'Multiple nouns can chain: only the last gets ال. Each intermediate noun drops ال and tanwin.',
        exampleAr: 'مفتاحُ بابِ البيتِ',
        exampleEn: 'The key of the door of the house.',
      },
      {
        heading: 'Idafa + Adjective',
        text: 'Adjectives come after the entire idafa and must agree with the noun they describe.',
        exampleAr: 'بابُ البيتِ الكبيرُ',
        exampleEn: 'The big door of the house.',
      },
    ],
  },
  definiteness: {
    title: 'Definiteness (التعريف والتنكير)',
    sections: [
      {
        heading: 'Definite (المعرفة)',
        text: 'A noun is definite with ال, a pronoun, a proper name, or through idafa. Definite adjectives also carry ال.',
        exampleAr: 'الكتابُ الكبيرُ',
        exampleEn: 'The big book.',
      },
      {
        heading: 'Indefinite (النكرة)',
        text: 'Indefinite nouns have no ال and carry tanwin (ـٌ ـً ـٍ). Indefinite adjectives also carry tanwin.',
        exampleAr: 'كتابٌ جديدٌ',
        exampleEn: 'A new book.',
      },
    ],
  },
  verbal: {
    title: 'Verbal Sentences (الجملة الفعلية)',
    sections: [
      {
        heading: 'Structure',
        text: 'A verbal sentence starts with a verb (الفعل), followed by the subject (الفاعل, marfu), then optionally the object (المفعول به, mansub).',
        exampleAr: 'كتبَ الطالبُ الدرسَ',
        exampleEn: 'The student wrote the lesson.',
      },
      {
        heading: 'Gender Agreement',
        text: 'Past tense verbs add ت (ta) for feminine subjects. The verb always agrees with the subject in gender.',
        exampleAr: 'قرأتِ البنتُ الكتابَ',
        exampleEn: 'The girl read the book.',
      },
      {
        heading: 'Passive Voice (المبني للمجهول)',
        text: 'In the passive, the subject is removed and the object becomes نائب الفاعل (marfu). Past passive: damma on first letter, kasra on second (كَتَبَ → كُتِبَ). Present passive: damma on prefix, fatha before last letter (يَفتَحُ → يُفتَحُ).',
        exampleAr: 'كُتِبَتِ الرسالةُ',
        exampleEn: 'The letter was written.',
      },
      {
        heading: 'Verb Negation (نفي الفعل)',
        text: 'لا negates present tense (verb stays marfu). لم negates past via present-tense verb in jussive (مجزوم). لن negates future via present-tense verb in subjunctive (منصوب).',
        exampleAr: 'لم يذهبْ محمدٌ',
        exampleEn: 'Muhammad did not go.',
      },
      {
        heading: 'Hal — Circumstantial State (الحال)',
        text: 'The hal describes the state/manner of the subject or object during the action. It is always indefinite and mansub. It can be a single word or a full sentence with واو الحالية.',
        exampleAr: 'جاءَ الولدُ مسرعاً',
        exampleEn: 'The boy came hurrying.',
      },
      {
        heading: 'Tamyiz — Specification (التمييز)',
        text: 'Tamyiz clarifies an ambiguous quantity or quality. For numbers 11-99, it is singular, indefinite, and mansub.',
        exampleAr: 'عشرون كتاباً',
        exampleEn: 'Twenty books.',
      },
    ],
  },
  particles: {
    title: 'Particles & Case-Changing Words (الحروف والنواسخ)',
    sections: [
      {
        heading: 'Kana and Sisters',
        text: 'كان enters a nominal sentence: the subject (اسم كان) stays marfu, but the predicate (خبر كان) becomes mansub. Sisters include أصبح (became), ما زال (still), ليس (is not).',
        exampleAr: 'كانَ الجوُّ جميلاً',
        exampleEn: 'The weather was beautiful.',
      },
      {
        heading: 'Inna and Sisters',
        text: 'إنّ is the opposite: the subject (اسم إنّ) becomes mansub, and the predicate (خبر إنّ) stays marfu. Sisters include لعلّ (perhaps), كأنّ (as if), لكنّ (but).',
        exampleAr: 'إنّ الدرسَ سهلٌ',
        exampleEn: 'Indeed, the lesson is easy.',
      },
      {
        heading: 'Prepositions (حروف الجر)',
        text: 'Prepositions like في (in), على (on), إلى (to), من (from), عن (about) make the following noun majrur (genitive), marked by kasra.',
        exampleAr: 'الولدُ في المدرسةِ',
        exampleEn: 'The boy is in the school.',
      },
      {
        heading: 'Vocative (النداء)',
        text: 'يا is the most common vocative particle. A single proper name or common noun after يا is مبني على الضم (built on damma). An idafa-style munada is mansub.',
        exampleAr: 'يا محمدُ ادرسْ',
        exampleEn: 'O Muhammad, study!',
      },
    ],
  },
  complex: {
    title: 'Complex Structures (التراكيب المركّبة)',
    sections: [
      {
        heading: 'Khabar as Sentence',
        text: 'The predicate can be a full sentence (nominal or verbal). It must contain a pronoun (عائد) referring back to the subject.',
        exampleAr: 'البيتُ بابُهُ كبيرٌ',
        exampleEn: 'The house — its door is big.',
      },
      {
        heading: 'Relative Clauses',
        text: 'الذي (masc.) and التي (fem.) introduce relative clauses for definite nouns. The clause must contain a return pronoun (عائد).',
        exampleAr: 'الكتابُ الذي قرأتُهُ',
        exampleEn: 'The book that I read.',
      },
      {
        heading: 'Conditionals',
        text: 'إنْ is a jussive conditional — both verbs are majzum. إذا is non-jussive — both verbs use past tense form.',
        exampleAr: 'إنْ تدرسْ تنجحْ',
        exampleEn: 'If you study, you will succeed.',
      },
      {
        heading: 'Coordination (العطف)',
        text: 'و (and) and فَ (then/so) connect words or sentences. The coordinated word (المعطوف) follows the same case as the word before the conjunction (المعطوف عليه).',
        exampleAr: 'جاءَ محمدٌ وعليٌّ',
        exampleEn: 'Muhammad and Ali came.',
      },
      {
        heading: 'Exception (الاستثناء)',
        text: 'إلا (except) introduces an exception. In a complete affirmative sentence, the exception is mansub. In a negated sentence (استثناء مفرّغ), the noun after إلا takes the case the verb requires.',
        exampleAr: 'جاءَ القومُ إلا زيداً',
        exampleEn: 'The people came except Zayd.',
      },
      {
        heading: 'Cognate Object (المفعول المطلق)',
        text: 'A masdar (verbal noun) from the same root as the verb, used to emphasize or qualify the action. Always mansub.',
        exampleAr: 'ضربَ المعلمُ ضرباً شديداً',
        exampleEn: 'The teacher hit a severe hitting.',
      },
      {
        heading: 'Apposition (البدل)',
        text: 'Badal renames or specifies the noun before it and follows the same case. It provides clarification or detail about the preceding noun.',
        exampleAr: 'زرتُ الخليفةَ عمرَ',
        exampleEn: 'I visited the caliph Umar.',
      },
    ],
  },
};

export function TheorySlideOver({ challenge, onClose }: TheorySlideOverProps) {
  const theory = theoryContent[challenge.category];

  return (
    <>
      <div className="theory-overlay" onClick={onClose} />
      <div className="theory-panel">
        <div className="theory-header">
          <h3 className="theory-title">{theory?.title || 'Grammar Reference'}</h3>
          <button className="theory-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="theory-body">
          {theory ? (
            theory.sections.map((section, i) => (
              <div key={i}>
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
                {section.exampleAr && (
                  <div className="theory-example">
                    <div className="theory-example-ar">{section.exampleAr}</div>
                    {section.exampleEn && (
                      <div className="theory-example-en">{section.exampleEn}</div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--color-muted-foreground)' }}>
              No theory content available for this topic yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
