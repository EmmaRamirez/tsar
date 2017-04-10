export interface BinaryTreeNode<T> {
  key: T;
  parent: BinaryTreeNode<T>;
  left: BinaryTreeNode<T> | undefined;
  right: BinaryTreeNode<T> | undefined;
}

export class BinaryTreeNode<T> implements BinaryTreeNode<T> {
  constructor(key:T, parent: BinaryTreeNode<T>) {
    this.key = key;
    this.parent = parent;
    this.left = undefined;
    this.right = undefined;
  }
}