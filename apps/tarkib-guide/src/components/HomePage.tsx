import { contentFiles } from '../data/content';
import { ContentRenderer } from './ContentRenderer';

interface HomePageProps {
  onNavigate: (slug: string) => void;
}

const navCards = [
  {
    title: 'Phrases',
    titleAr: 'العبارات',
    description: 'Descriptive, demonstrative, conjunctive, possessive, number, and prepositional phrases.',
    slug: 'phrases-overview',
    tags: ['Wasfi', 'Ishari', 'Atfi', 'Idafa', 'Adad'],
  },
  {
    title: 'Sentences',
    titleAr: 'الجمل',
    description: 'Nominal and verbal sentence structure, subordinate clauses, and sentence analysis.',
    slug: 'sentences-overview',
    tags: ['Ismiyya', 'Fi\'liyya', 'Sughra'],
  },
  {
    title: 'Pronouns',
    titleAr: 'الضمائر',
    description: 'Complete overview of Arabic pronouns: separate, attached, and demonstrative.',
    slug: 'pronouns-overview',
    tags: ['Munfasil', 'Muttasil', 'Ishara'],
  },
  {
    title: 'Advanced',
    titleAr: 'متقدم',
    description: 'Emphasis, interrogatives, conditionals, joining sentences, and advanced rules.',
    slug: 'advanced-rules',
    tags: ['Ta\'kid', 'Istifham', 'Shart'],
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const homeContent = contentFiles['home'];

  return (
    <div className="home-page animate-fade-in">
      <div className="hero">
        <h1 className="hero-title">Tarkib Guide</h1>
        <p className="hero-subtitle font-arabic" dir="rtl">دليل التركيب</p>
        <p className="hero-description">
          A comprehensive Arabic grammar reference based on the FSTU Nahw curriculum.
          Explore phrase structures, sentence types, and workbook answers.
        </p>
      </div>

      <div className="nav-cards">
        {navCards.map(card => (
          <button
            key={card.slug}
            className="nav-card"
            onClick={() => onNavigate(card.slug)}
          >
            <div className="nav-card-header">
              <h2>{card.title}</h2>
              <span className="font-arabic" dir="rtl">{card.titleAr}</span>
            </div>
            <p className="nav-card-desc">{card.description}</p>
            <div className="nav-card-tags">
              {card.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {homeContent && (
        <article className="prose-content home-content">
          <ContentRenderer markdown={homeContent} />
        </article>
      )}
    </div>
  );
}
