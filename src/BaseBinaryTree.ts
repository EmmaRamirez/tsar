import { BinaryTreeNode } from './BinaryTreeNode';

export interface BaseBinaryTree<T> {
  root: BinaryTreeNode<T> | undefined;
}

type visitorFunction<T> = (v: T | undefined) => any;

export class BaseBinaryTree<T> implements BaseBinaryTree<T> {
  constructor() {
    this.root = undefined;
  }

  public traversePreOrder (visit: visitorFunction<T>) {
    if (!this.root) return;
    const parentStack = [];
    parentStack.push(this.root);
    do {
      const top:BinaryTreeNode<T> = parentStack.pop();
      visit(top.key);
      if (top.right) {
        parentStack.push(top.right);
      }
      if (top.left) {
        parentStack.push(top.left);
      }
    } while (parentStack.length);
  }

  public traverseInOrder(visit: visitorFunction<T>) {
    const parentStack = [];
    let node = this.root;
    while (parentStack.length || node) {
      if (node) {
        parentStack.push(node);
        node = node.left;
      } else {
        node = parentStack.pop();
        visit(node.key);
        node = node.right;
      }
    }
  }

  public traversePostOrder(visit: visitorFunction<T>) {
    const parentStack = [];
    let node = this.root;
    let lastVisitedNode;
    while (parentStack.length || node) {
      if (node) {
        parentStack.push(node);
        node = node.left;
      } else {
        const nextNode = parentStack[parentStack.length - 1];
        if (nextNode.right && lastVisitedNode !== nextNode.right) {
          node = nextNode.right;
        } else {
          parentStack.pop();
          visit(nextNode.key);
          lastVisitedNode = nextNode;
        }
      }
    }
  }
}