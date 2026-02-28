/**
 * Resource Links Section
 *
 * Quick access links to external Arabic learning resources.
 */

import { useState } from 'react';
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react';

interface ResourceLink {
  name: string;
  nameAr: string;
  description: string;
  url: string;
}

const DEFAULT_RESOURCES: ResourceLink[] = [
  {
    name: 'Ejtaal Dictionary',
    nameAr: 'قاموس إجتعال',
    description: 'Arabic Lexicon',
    url: 'https://ejtaal.net/aa/#hw4=150,ll=431,ls=5,la=569,sg=242,ha=97,br=182,pr=35,aan=105,mgf=161,vi=99,kz=275,mr=118,mn=175,uqw=243,umr=195,ums=146,umj=115,ulq=480,uqa=78,uqq=51,bdw=h169,amr=h116,asb=h125,auh=h308,dhq=h95,mht=h101,msb=h43,tla=h35,amj=h103,ens=h1,mis=h288',
  },
  {
    name: 'Tafsir.app',
    nameAr: 'تفسير.app',
    description: 'Quranic Tafsir',
    url: 'https://tafsir.app',
  },
  {
    name: 'Quran Corpus',
    nameAr: 'قرآن كوربس',
    description: 'Grammar Analysis',
    url: 'https://corpus.quran.com',
  },
];

interface ResourceLinksProps {
  resources?: ResourceLink[];
  defaultExpanded?: boolean;
  className?: string;
}

export function ResourceLinks({
  resources = DEFAULT_RESOURCES,
  defaultExpanded = false,
  className = '',
}: ResourceLinksProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={`backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl ${className}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group cursor-pointer -m-2 p-2 rounded-xl hover:bg-accent/5 transition-all duration-300 active:scale-[0.99]"
      >
        <h3 className="text-primary flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
          <BookOpen className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
          Quick Links to Resources
        </h3>
        <ChevronDown
          className="w-5 h-5 text-accent transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-primary"
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        className="grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          marginTop: isExpanded ? '16px' : '0px',
        }}
      >
        <div className="overflow-hidden">
          <div
            className="transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] delay-100"
            style={{
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <div className="grid sm:grid-cols-3 gap-3">
              {resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border-2 border-accent/20 hover:border-accent hover:bg-accent/5 transition-all"
                >
                  <div className="flex-1">
                    <div className="text-sm text-primary group-hover:text-accent transition-colors">
                      {resource.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{resource.description}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
