/**
 * A file system can be abstracted as such:
 * - File directory tree
 * - Directories (folders)
 * - Files (blobs)
 *
 * We can use a tree to represent the file directory structure, where
 * the root node is the root directory of the project. Each child node
 * can be a directory or a file.
 *
 * [] = directory
 * () = file
 *
 *              [src]
 *            //     \\
 *    [components]  [state]
 *         ||          ||
 *         \/          \/
 *    (Navbar.tsx)  [counter]
 *                     ||
 *                     \/
 *              (counterSlice.ts)
 *
 * Each directory node can have multiple children, but file nodes cannot.
 * Leaf nodes are usually files, but they can also be empty directories.
 *
 * A directory node can have the following attributes:
 * - name - The name of the directory
 * - parent - Reference to its parent directory node
 * - children - Array of child nodes
 *
 * A file node can have the following attributes:
 * - name - The name of the file, including extension
 * - parent - Reference to its parent directory node
 * - data - Blob of the file's data
 *
 * To keep things simple, a minimal implementation can attribute a string
 * as the file's data.
 */
export class FileSystem {
  private _root: Directory;

  constructor(root: Directory = new Directory({ name: "root" })) {
    this._root = root;
  }

  get root() {
    return this._root;
  }

  /**
   * Given a path string, return a list of file and directory names in
   * lexicographic order. If the path is a file path, return a list that
   * contains only the file's name. If the path is a directory path,
   * return a list of file and directory names in that directory.
   *
   * @param path The directory or file path to start listing from
   */
  public ls(path?: string): string[] {
    // Default listing from root path
    if (!path || path.length < 1) {
      const names: string[] = [];

      const map = this._root.children;
      const iter = map.values();

      let i = 0;
      while (i < map.size) {
        const node: Node = iter.next().value;
        names.push(node.name);
        i++;
      }

      return names;
    }
    return [];
  }

  /**
   * Given a directory path that does not exist, create a new directory
   * according to the path. If middle directories don't exist, create those
   * as well.
   *
   * @param path The directory path to start creating a new directory from
   */
  public mkdir(path: string): void {
    const paths = path.split("/").filter((p) => p.length > 0);

    const origRoot = this._root;

    for (const path of paths) {
      const p = `${this._root.path()}/${path}`;
      if (!this._root.children.has(p)) {
        const newDir = new Directory({ name: path });
        this._root.addChild(newDir);
        this._root = newDir;
      } else {
        const dir = this._root.children.get(p) as Directory;
        this._root = dir;
      }
    }
    this._root = origRoot;
  }
}

export enum NodeType {
  DIRECTORY,
  FILE,
}

export abstract class Node {
  readonly name: string;
  protected parent?: Node | undefined;
  readonly type: NodeType;

  constructor({
    name,
    parent,
    type,
  }: {
    name: string;
    parent: Node | undefined;
    type: NodeType;
  }) {
    this.name = name;
    this.parent = parent;
    this.type = type;
  }

  setParent(node: Node) {
    this.parent = node;
  }

  /**
   * The path string from root to current node
   *
   * @returns <parent path>/<node name>
   */
  path(): string {
    return `${this.parent?.path() ?? ""}/${this.name}`;
  }
}

export class Directory extends Node {
  readonly children: Map<string, Node> = new Map();

  constructor({
    name = "New Folder",
    parent,
  }: {
    name?: string;
    parent?: Node | undefined;
  } = {}) {
    super({ name, parent, type: NodeType.DIRECTORY });
  }

  /**
   * Adds a node to the directory
   *
   * @param child Node to add to directory
   */
  addChild(child: Node) {
    child.setParent(this);
    this.children.set(child.path(), child);
  }

  /**
   * Removes a node from the directory
   *
   * @param childPath The path to child node, used as key
   */
  removeChild(childPath: string) {
    this.children.delete(childPath);
  }
}

export class File extends Node {
  data: string;

  constructor({
    name = "New File",
    parent,
    data = "",
  }: {
    name?: string;
    parent?: Node | undefined;
    data?: string;
  } = {}) {
    super({ name, parent, type: NodeType.FILE });
    this.data = data;
  }
}
