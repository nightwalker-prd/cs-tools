import { useState, useEffect, useMemo } from 'react';
import type {
  ConjugationsData,
  VerbEntry,
  PronounForms,
  PresentConjugation,
  ParticipleInflections,
} from './types/conjugation';
import { PRONOUNS, TENSE_CATEGORIES } from './types/conjugation';

const VERB_FORMS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const;

function App() {
  const [data, setData] = useState<ConjugationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerbId, setSelectedVerbId] = useState<string>('');
  const [formFilter, setFormFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/data/conjugations.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: ConjugationsData) => {
        setData(json);
        if (json.verbs.length > 0) {
          setSelectedVerbId(json.verbs[0].id);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredVerbs = useMemo(() => {
    if (!data) return [];
    return data.verbs.filter(v => {
      if (formFilter !== 'all' && v.verb_form !== formFilter) return false;
      if (typeFilter !== 'all' && v.verb_type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          v.lemma.includes(searchQuery) ||
          v.root.includes(searchQuery) ||
          v.meaning.toLowerCase().includes(q) ||
          v.masdar.includes(searchQuery)
        );
      }
      return true;
    });
  }, [data, formFilter, typeFilter, searchQuery]);

  const verbTypes = useMemo(() => {
    if (!data) return [];
    const types = new Set(data.verbs.map(v => v.verb_type));
    return Array.from(types).sort();
  }, [data]);

  const selectedVerb = useMemo(() => {
    if (!data) return null;
    return data.verbs.find(v => v.id === selectedVerbId) ?? null;
  }, [data, selectedVerbId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading conjugation data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-destructive mb-2">Data Not Available</h2>
          <p className="text-muted-foreground mb-4">
            The conjugation data has not been generated yet. Run the pipeline first:
          </p>
          <pre className="bg-secondary p-4 rounded-lg text-sm text-left">
            cd utils/scripts/sarf{'\n'}
            python -m venv .venv{'\n'}
            source .venv/bin/activate{'\n'}
            pip install -r requirements.txt{'\n'}
            python run_pipeline.py
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sarf Platform</h1>
            <p className="text-sm opacity-80">
              Verified Arabic Conjugation Tables
              {data && ` — ${data.verb_count} verbs`}
            </p>
          </div>
          <div className="text-right text-sm opacity-70">
            <span className="font-arabic text-lg">منصّة الصرف</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar: Verb Selector */}
        <aside className="w-72 shrink-0">
          <div className="bg-card rounded-xl shadow-sm border p-4 sticky top-4">
            <h2 className="font-semibold mb-3">Select Verb</h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search verbs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm mb-3"
            />

            {/* Form filter */}
            <select
              value={formFilter}
              onChange={e => setFormFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm mb-3"
            >
              <option value="all">All Forms</option>
              {VERB_FORMS.map(f => (
                <option key={f} value={f}>Form {f}</option>
              ))}
            </select>

            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm mb-3"
            >
              <option value="all">All Types</option>
              {verbTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Verb list */}
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto space-y-1">
              {filteredVerbs.map(verb => (
                <button
                  key={verb.id}
                  onClick={() => setSelectedVerbId(verb.id)}
                  className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                    verb.id === selectedVerbId
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <span className="font-arabic text-base" dir="rtl">{verb.lemma}</span>
                  <span className="block text-xs opacity-70">
                    {verb.meaning} — Form {verb.verb_form}
                  </span>
                </button>
              ))}
              {filteredVerbs.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No verbs match your filter
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Main: Conjugation Table */}
        <main className="flex-1 min-w-0">
          {selectedVerb ? (
            <VerbDisplay verb={selectedVerb} />
          ) : (
            <div className="bg-card rounded-xl shadow-sm border p-8 text-center text-muted-foreground">
              Select a verb from the sidebar
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function VerbDisplay({ verb }: { verb: VerbEntry }) {
  const [activeTab, setActiveTab] = useState<string>('past_active');

  return (
    <div className="space-y-4">
      {/* Verb header */}
      <div className="bg-card rounded-xl shadow-sm border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-arabic text-3xl mb-1" dir="rtl">{verb.lemma}</h2>
            <p className="text-muted-foreground">{verb.meaning}</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Form {verb.verb_form}
            </span>
            <p className="text-sm text-muted-foreground mt-1">{verb.verb_type}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Root: </span>
            <span className="font-arabic" dir="rtl">{verb.root}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Masdar: </span>
            <span className="font-arabic" dir="rtl">{verb.masdar}</span>
          </div>
          {verb.validation && (
            <div className="ml-auto">
              <span className="text-muted-foreground">Validation: </span>
              <span className="text-green-600">{verb.validation.exact_match} exact</span>
              {verb.validation.disagreement_count > 0 && (
                <span className="text-amber-600 ml-2">
                  {verb.validation.disagreement_count} flagged
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-card rounded-xl shadow-sm border">
        <div className="flex border-b overflow-x-auto">
          {TENSE_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === cat.key
                  ? 'border-accent text-accent font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="font-arabic" dir="rtl">{cat.label}</span>
              <span className="block text-xs">{cat.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4">
          <ConjugationTable verb={verb} category={activeTab} />
        </div>
      </div>
    </div>
  );
}

function ConjugationTable({ verb, category }: { verb: VerbEntry; category: string }) {
  const conj = verb.conjugation;

  // Participles have a different structure
  if (category === 'active_participle' || category === 'passive_participle') {
    const participle: ParticipleInflections =
      category === 'active_participle' ? conj.active_participle : conj.passive_participle;

    if (!participle || Object.keys(participle).length === 0) {
      return <EmptyState />;
    }

    const labels: Record<string, string> = {
      ms: 'مُذَكَّر مُفْرَد (Masc. Sing.)',
      md: 'مُذَكَّر مُثَنَّى (Masc. Dual)',
      mp: 'مُذَكَّر جَمْع (Masc. Pl.)',
      fs: 'مُؤَنَّث مُفْرَد (Fem. Sing.)',
      fd: 'مُؤَنَّث مُثَنَّى (Fem. Dual)',
      fp: 'مُؤَنَّث جَمْع (Fem. Pl.)',
    };

    return (
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3 text-sm text-muted-foreground">Form</th>
            <th className="text-right py-2 px-3 text-sm text-muted-foreground font-arabic">الصيغة</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(labels).map(([key, label]) => (
            <tr key={key} className="border-b last:border-0 hover:bg-secondary/50">
              <td className="py-2 px-3 text-sm">{label}</td>
              <td className="py-2 px-3 text-right font-arabic text-lg" dir="rtl">
                {participle[key as keyof ParticipleInflections] || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // Present tenses have mood sub-categories
  if (category === 'present_active' || category === 'present_passive') {
    const present: PresentConjugation =
      category === 'present_active' ? conj.present_active : conj.present_passive;

    if (!present) return <EmptyState />;

    const moods = [
      { key: 'indicative' as const, label: 'مرفوع (Indicative)' },
      { key: 'subjunctive' as const, label: 'منصوب (Subjunctive)' },
      { key: 'jussive' as const, label: 'مجزوم (Jussive)' },
    ];

    return (
      <div className="space-y-6">
        {moods.map(mood => {
          const forms = present[mood.key];
          if (!forms || Object.keys(forms).length === 0) return null;
          return (
            <div key={mood.key}>
              <h3 className="font-arabic text-lg mb-2 text-primary" dir="rtl">{mood.label}</h3>
              <PronounTable forms={forms} />
            </div>
          );
        })}
      </div>
    );
  }

  // Simple pronoun-keyed tables
  const forms: PronounForms | undefined =
    category === 'past_active' ? conj.past_active :
    category === 'past_passive' ? conj.past_passive :
    category === 'imperative' ? conj.imperative :
    category === 'prohibition' ? conj.prohibition :
    undefined;

  if (!forms || Object.keys(forms).length === 0) return <EmptyState />;

  return <PronounTable forms={forms} />;
}

function PronounTable({ forms }: { forms: PronounForms }) {
  // Filter to only pronouns that have values
  const activePronouns = PRONOUNS.filter(p => forms[p.id]);

  if (activePronouns.length === 0) return <EmptyState />;

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-right py-2 px-3 text-sm text-muted-foreground font-arabic">الضمير</th>
          <th className="text-left py-2 px-3 text-sm text-muted-foreground">Pronoun</th>
          <th className="text-right py-2 px-3 text-sm text-muted-foreground font-arabic">الصيغة</th>
        </tr>
      </thead>
      <tbody>
        {activePronouns.map(pronoun => (
          <tr key={pronoun.id} className="border-b last:border-0 hover:bg-secondary/50">
            <td className="py-2 px-3 text-right font-arabic" dir="rtl">{pronoun.arabic}</td>
            <td className="py-2 px-3 text-sm text-muted-foreground">{pronoun.english}</td>
            <td className="py-2 px-3 text-right font-arabic text-lg" dir="rtl">
              {forms[pronoun.id] || '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmptyState() {
  return (
    <p className="text-center text-muted-foreground py-8">
      No forms available for this category
    </p>
  );
}

export default App;
