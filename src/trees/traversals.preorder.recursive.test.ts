import { TreeNode } from "./TreeNode";
import { preOrderRecursive } from "./traversals";

/* ---------- helpers ---------- */
const n = (v: number) => new TreeNode(v);
function collect(root: TreeNode<number> | null): number[] {
  const out: number[] = [];
  preOrderRecursive(root, (node) => out.push(node.val));
  return out;
}

/* ---------- reusable trees ---------- */
function sampleTrees() {
  const single = n(42);

  const leftOnly = n(1);
  leftOnly.children = [n(2)];
  leftOnly.children[0].children = [n(3)];

  const rightOnly = n(1);
  rightOnly.children = [n(2)];
  rightOnly.children[0].children = [n(3)];

  const balanced = n(1);
  balanced.children = [n(2), n(3)];

  const unbalanced = n(1);
  const r = n(2);
  r.children = [n(3)];
  unbalanced.children = [r];

  return { single, leftOnly, rightOnly, balanced, unbalanced };
}

/* ---------- test cases ---------- */
describe("preOrderRecursive", () => {
  it("empty tree → []", () => {
    const spy = jest.fn();
    preOrderRecursive(null, spy);
    expect(spy).not.toHaveBeenCalled();
  });

  const trees = sampleTrees();

  it("single node", () => expect(collect(trees.single)).toEqual([42]));
  it("left-only chain", () =>
    expect(collect(trees.leftOnly)).toEqual([1, 2, 3]));
  it("right-only chain", () =>
    expect(collect(trees.rightOnly)).toEqual([1, 2, 3]));
  it("balanced tree", () => expect(collect(trees.balanced)).toEqual([1, 2, 3]));
  it("unbalanced tree", () =>
    expect(collect(trees.unbalanced)).toEqual([1, 2, 3]));
});
