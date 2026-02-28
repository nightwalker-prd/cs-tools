export interface Principle {
  id: string;
  name: string;
  acronym?: string;
  description: string;
  keyPoints: string[];
  violations?: string[];
}

export const solidPrinciples: Principle[] = [
  {
    id: 'srp',
    name: 'Single Responsibility Principle',
    acronym: 'S',
    description: 'A class should have one, and only one, reason to change.',
    keyPoints: [
      'Each class/module should do one thing well',
      'Separate concerns into distinct classes',
      'Easier to test, maintain, and reason about',
    ],
    violations: [
      'God class that handles UI, data, and business logic',
      'Utility class with dozens of unrelated methods',
    ],
  },
  {
    id: 'ocp',
    name: 'Open/Closed Principle',
    acronym: 'O',
    description: 'Software entities should be open for extension, but closed for modification.',
    keyPoints: [
      'Extend behavior without modifying existing code',
      'Use interfaces, abstract classes, and polymorphism',
      'Strategy and decorator patterns embody this principle',
    ],
    violations: [
      'Giant switch/case that grows with each new type',
      'Modifying a class every time a new requirement appears',
    ],
  },
  {
    id: 'lsp',
    name: 'Liskov Substitution Principle',
    acronym: 'L',
    description: 'Objects of a superclass should be replaceable with objects of a subclass without breaking the application.',
    keyPoints: [
      'Subtypes must be substitutable for their base types',
      'Preconditions cannot be strengthened in a subtype',
      'Postconditions cannot be weakened in a subtype',
    ],
    violations: [
      'Square extending Rectangle but breaking setWidth/setHeight',
      'Subclass throwing unexpected exceptions',
    ],
  },
  {
    id: 'isp',
    name: 'Interface Segregation Principle',
    acronym: 'I',
    description: 'No client should be forced to depend on interfaces it does not use.',
    keyPoints: [
      'Many small, specific interfaces over one large interface',
      'Clients depend only on what they need',
      'Reduces impact of changes',
    ],
    violations: [
      'Implementing a "fat" interface with many no-op methods',
      'Forcing all implementations to handle unrelated functionality',
    ],
  },
  {
    id: 'dip',
    name: 'Dependency Inversion Principle',
    acronym: 'D',
    description: 'High-level modules should not depend on low-level modules. Both should depend on abstractions.',
    keyPoints: [
      'Depend on abstractions, not concretions',
      'Use dependency injection to provide implementations',
      'Decouples modules for easier testing and flexibility',
    ],
    violations: [
      'Directly instantiating database driver in business logic',
      'Hard-coding HTTP client in service layer',
    ],
  },
];

export const generalPrinciples: Principle[] = [
  {
    id: 'dry',
    name: "DRY — Don't Repeat Yourself",
    description: 'Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.',
    keyPoints: [
      'Eliminate duplication of logic, not just code',
      'Extract common patterns into shared functions or modules',
      'Duplication increases maintenance burden and bug surface',
    ],
    violations: [
      'Copy-pasting code blocks with minor variations',
      'Multiple sources of truth for the same data',
    ],
  },
  {
    id: 'kiss',
    name: 'KISS — Keep It Simple, Stupid',
    description: 'Most systems work best if they are kept simple rather than made complex. Simplicity should be a key goal in design.',
    keyPoints: [
      'Prefer simple solutions over clever ones',
      'Avoid over-engineering and premature optimization',
      'Simple code is easier to understand, test, and maintain',
    ],
    violations: [
      'Using design patterns where a simple function would suffice',
      'Building abstractions for one-time operations',
    ],
  },
  {
    id: 'yagni',
    name: "YAGNI — You Aren't Gonna Need It",
    description: 'Do not add functionality until it is necessary. Build only what you need right now.',
    keyPoints: [
      'Implement things when you actually need them',
      'Speculative features add complexity and maintenance cost',
      'Easier to add later than remove unnecessary code',
    ],
    violations: [
      'Building a plugin system for an app with no plugins planned',
      'Adding configuration options nobody has requested',
    ],
  },
];
