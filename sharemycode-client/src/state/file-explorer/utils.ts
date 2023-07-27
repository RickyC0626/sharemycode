import { Node } from "./fileExplorerSlice";

export const createUniqueName = (parent: Node, name: string): string => {
  const existingNames = parent.children.map((child) => child.name);

  let count = 0;
  let newName = `${name}`

  while (existingNames.includes(newName)) {
    newName = `${name} (${++count})`
  }

  return newName;
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
  const bName = b.name;

  // Lexicographical order
  return aName.localeCompare(bName);
}
