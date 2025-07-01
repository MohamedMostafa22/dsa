import { TreeNode } from "./TreeNode";

export function preOrderIterative<T>(
  node: TreeNode<T> | null,
  visit: (node: TreeNode<T>) => void
) {
  if (node === null) return;
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop();
    if (current) {
      visit(current);
      for (let i = current.children.length - 1; i >= 0; i--) {
        stack.push(current.children[i]);
      }
    }
  }
}

export function preOrderRecursive<T>(
  node: TreeNode<T> | null,
  visit: (node: TreeNode<T>) => void
) {
  if (node === null) return;
  visit(node);
  for (let i = 0; i < node.children.length; i++) {
    preOrderRecursive(node.children[i], visit);
  }
}

export function inOrderRecursive<T>(
  node: TreeNode<T> | null,
  visit: (node: TreeNode<T>) => void
) {
  if (node === null) return;
  const left = node.children[0];
  const right = node.children[1];
  if (left) inOrderRecursive(left, visit);
  visit(node);
  if (right) inOrderRecursive(right, visit);
}

export function inOrderIterative<T>(
  node: TreeNode<T> | null,
  visit: (node: TreeNode<T>) => void
) {}
