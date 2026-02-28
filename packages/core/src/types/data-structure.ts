export type DSCategory = 'linear' | 'tree' | 'graph' | 'hash' | 'heap';

export interface DSOperation {
  name: string;
  average: string;
  worst: string;
}

export interface DataStructure {
  id: string;
  name: string;
  category: DSCategory;
  description: string;
  operations: DSOperation[];
  useCases: string[];
}
