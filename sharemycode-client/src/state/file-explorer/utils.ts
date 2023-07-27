import { Node } from "./fileExplorerSlice";

export const createUniqueName = (parent: Node, name: string): string => {
  const existingNames = parent.children.map((child) => child.name);

  const getHighestDuplicateCount = (names: string[], name: string): number => {
    // Pattern to find existing duplicates like "New Folder (1)", "New Folder (2)"
    const pattern = new RegExp(`${name} \\((\\d+)\\)`);

    const numDupes = names.reduce((acc, currName) => {
      const match = currName.match(pattern);

      return match ? acc + 1 : acc;
    }, 0);

    return numDupes;
  };

  const count = getHighestDuplicateCount(existingNames, name);

  return existingNames.length === 0 ? name : `${name} (${count + 1})`;
};

export function findNodeByPath(node: Node, paths: string[]): Node {
  // Base case: if no more paths left to traverse, return current node
  if (paths.length === 0) return node;

  // Get next path to traverse
  const nextPath = paths[0];

  // Handle empty paths or root path
  if (nextPath.length === 0 || nextPath.match("root"))
    return findNodeByPath(node, paths.slice(1));

  // Find node that matches current path
  const nextNode = node.children.find(n => n.name === paths[0]);

  if (!nextNode) throw new Error("Node not found");

  // Continue traversing remaining paths
  return findNodeByPath(nextNode, paths.slice(1));
}

export function byDirectoryAndLexicographical(a: Node, b: Node) {
  const aType = a.type;
  const bType = b.type;

  // Directories first
  if (aType !== bType) return aType === "DIRECTORY" ? -1 : 1;

  const aName = a.name;
  const bName = a.name;

  // Lexicographical order
  return aName > bName ? -1 : aName < bName ? 1 : 0;
}
