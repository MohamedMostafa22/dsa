// src/trees/traversals.preorder.test.ts
import { TreeNode } from "./TreeNode";
import { preOrderIterative } from "./traversals";

/**
 * Utility: run the traversal and capture the visiting order.
 */
function collect<T>(root: TreeNode<T> | null): T[] {
  const visited: T[] = [];
  preOrderIterative(root, (node) => {
    if (node) visited.push(node.val as T);
  });
  return visited;
}

/**
 * Helper: build a node quickly.
 */
const n = (val: number) => new TreeNode(val);

describe("preOrderIterative (callback form)", () => {
  /* 1 ── empty tree */
  it("handles null root", () => {
    const spy = jest.fn();
    preOrderIterative(null, spy);
    expect(spy).not.toHaveBeenCalled();
  });

  /* 2 ── single node */
  it("visits a single node", () => {
    expect(collect<number>(n(42))).toEqual([42]);
  });

  /* 3 ── left-only chain */
  it("handles a left-only chain", () => {
    // 1 -> 2 -> 3  (each node has its only child in .children[0])
    const root = n(1);
    root.children = [n(2)];
    root.children[0].children = [n(3)];

    expect(collect<number>(root)).toEqual([1, 2, 3]);
  });

  /* 4 ── right-only chain */
  it("handles a right-only chain", () => {
    // 1 -> 2 -> 3  (but we put each sole child at the *end* to mimic “right”)
    const root = n(1);
    root.children = [n(2)];
    root.children[0].children = [n(3)];

    // Because there’s only one child at every level, the order is identical
    expect(collect<number>(root)).toEqual([1, 2, 3]);
  });

  /* 5 ── balanced tree */
  it("visits children left-to-right for a balanced tree", () => {
    //     1
    //    / \
    //   2   3
    const root = n(1);
    root.children = [n(2), n(3)];

    expect(collect<number>(root)).toEqual([1, 2, 3]);
  });

  /* 6 ── unbalanced tree */
  it("handles an unbalanced tree", () => {
    //     1
    //      \
    //       2
    //      /
    //     3
    const root = n(1);
    const right = n(2);
    right.children = [n(3)];
    root.children = [right]; // single “right” child

    expect(collect<number>(root)).toEqual([1, 2, 3]);
  });
});
