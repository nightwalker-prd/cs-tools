export interface TreeNode<T = number> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

export interface GraphNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export function createTreeNode<T>(value: T, left?: TreeNode<T>, right?: TreeNode<T>): TreeNode<T> {
  return { value, left, right };
}

export function insertBST(root: TreeNode | undefined, value: number): TreeNode {
  if (!root) return createTreeNode(value);
  if (value < root.value) return { ...root, left: insertBST(root.left, value) };
  if (value > root.value) return { ...root, right: insertBST(root.right, value) };
  return root;
}

export function arrayToBST(values: number[]): TreeNode | undefined {
  let root: TreeNode | undefined;
  for (const v of values) root = insertBST(root, v);
  return root;
}
