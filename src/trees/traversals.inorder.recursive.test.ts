// traversals.inorder.recursive.test.ts
import { TreeNode } from "./TreeNode";
import { inOrderRecursive } from "./traversals";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Quick node factory. */
const n = (val: number) => new TreeNode(val);

/** Capture the visit order produced by the traversal. */
function collect(root: TreeNode<number> | null): number[] {
  const out: number[] = [];
  inOrderRecursive(root, (node) => out.push(node.val));
  return out;
}

/* ------------------------------------------------------------------ */
/* Re-usable miniature test trees                                     */
/* ------------------------------------------------------------------ */
function sampleTrees() {
  /* 1. Single node */
  const single = n(42);

  /* 2. Left-only chain: 1 ← 2 ← 3                        */
  const leftOnly = n(1);
  leftOnly.children[0] = n(2);
  leftOnly.children[0]!.children[0] = n(3);

  /* 3. Right-only chain: 1 → 2 → 3                       */
  const rightOnly = n(1);
  rightOnly.children[1] = n(2); // index 1 = “right”
  rightOnly.children[1]!.children[1] = n(3); // right child of 2

  /* 4. Balanced:      1
   *                   / \
   *                  2   3                              */
  const balanced = n(1);
  balanced.children[0] = n(2); // left
  balanced.children[1] = n(3); // right

  /* 5. Unbalanced:    1
   *                     \
   *                      2
   *                     /
   *                    3                               */
  const unbalanced = n(1);
  unbalanced.children[1] = n(2); // right child
  unbalanced.children[1]!.children[0] = n(3); // left child of 2

  return { single, leftOnly, rightOnly, balanced, unbalanced };
}

/* ------------------------------------------------------------------ */
/* Test cases                                                         */
/* ------------------------------------------------------------------ */
describe("inOrderRecursive (Left → Root → Right)", () => {
  it("empty tree → []", () => {
    const spy = jest.fn();
    inOrderRecursive(null, spy);
    expect(spy).not.toHaveBeenCalled();
  });

  const { single, leftOnly, rightOnly, balanced, unbalanced } = sampleTrees();

  it("single node", () => expect(collect(single)).toEqual([42]));
  it("left-only chain", () => expect(collect(leftOnly)).toEqual([3, 2, 1]));
  it("right-only chain", () => expect(collect(rightOnly)).toEqual([1, 2, 3]));
  it("balanced tree", () => expect(collect(balanced)).toEqual([2, 1, 3]));
  it("unbalanced tree", () => expect(collect(unbalanced)).toEqual([1, 3, 2]));
});
