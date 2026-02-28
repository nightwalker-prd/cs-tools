import type { DesignPattern } from '../types';

export const singleton: DesignPattern = {
  id: 'singleton',
  name: 'Singleton',
  category: 'creational',
  description: 'Ensures a class has only one instance and provides a global point of access to it.',
  useCases: [
    'Database connection pool',
    'Logger instance',
    'Configuration manager',
    'Thread pool',
  ],
  codeExample: `class Singleton {
  private static instance: Singleton;
  private constructor() {}
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}`,
};

export const factory: DesignPattern = {
  id: 'factory',
  name: 'Factory Method',
  category: 'creational',
  description: 'Defines an interface for creating objects but lets subclasses decide which class to instantiate. Delegates instantiation to subclasses.',
  useCases: [
    'Creating UI components based on platform',
    'Document parsers (JSON, XML, CSV)',
    'Database driver selection',
    'Notification services (email, SMS, push)',
  ],
  codeExample: `interface Shape { draw(): void; }
class Circle implements Shape { draw() { /* ... */ } }
class Square implements Shape { draw() { /* ... */ } }

function createShape(type: string): Shape {
  switch (type) {
    case 'circle': return new Circle();
    case 'square': return new Square();
    default: throw new Error('Unknown shape');
  }
}`,
};

export const observer: DesignPattern = {
  id: 'observer',
  name: 'Observer',
  category: 'behavioral',
  description: 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
  useCases: [
    'Event handling systems',
    'React state management (pub/sub)',
    'Stock price notifications',
    'MVC pattern (model notifies views)',
  ],
  codeExample: `type Listener<T> = (data: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];
  subscribe(fn: Listener<T>) { this.listeners.push(fn); }
  emit(data: T) { this.listeners.forEach(fn => fn(data)); }
}`,
};

export const strategy: DesignPattern = {
  id: 'strategy',
  name: 'Strategy',
  category: 'behavioral',
  description: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Lets the algorithm vary independently from clients that use it.',
  useCases: [
    'Sorting algorithms (swap at runtime)',
    'Payment processing (credit card, PayPal, crypto)',
    'Compression algorithms',
    'Validation strategies',
  ],
  codeExample: `interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]) { /* quicksort impl */ return data; }
}

class MergeSort implements SortStrategy {
  sort(data: number[]) { /* mergesort impl */ return data; }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}
  sort(data: number[]) { return this.strategy.sort(data); }
}`,
};

export const designPatterns: DesignPattern[] = [
  singleton,
  factory,
  observer,
  strategy,
];
