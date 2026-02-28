export { linearDataStructures, array, linkedList, stack, queue } from './linear';
export { treeDataStructures, binaryTree, bst, heap } from './trees';
export { graphDataStructures, adjacencyList, adjacencyMatrix } from './graphs';
export { hashDataStructures, hashTable } from './hash';

import { linearDataStructures } from './linear';
import { treeDataStructures } from './trees';
import { graphDataStructures } from './graphs';
import { hashDataStructures } from './hash';

export const allDataStructures = [
  ...linearDataStructures,
  ...treeDataStructures,
  ...graphDataStructures,
  ...hashDataStructures,
];
