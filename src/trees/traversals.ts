import { TreeNode } from "./TreeNode";

export function preOrderIterative<T>(
  node: TreeNode<T> | null,
  visit: (node?: TreeNode<T>) => void
) {
  if (node === null) return;
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop();
    visit(current);
    if (current) {
      for (let i = current.children.length - 1; i >= 0; i--) {
        stack.push(current.children[i]);
      }
    }
  }
}
