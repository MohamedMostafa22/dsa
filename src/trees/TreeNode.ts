export class TreeNode<T> {
  val: T;
  children: TreeNode<T>[] = [];

  constructor(val: T) {
    this.val = val;
  }
}
