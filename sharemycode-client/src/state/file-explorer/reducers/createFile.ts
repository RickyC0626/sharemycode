import { PayloadAction } from "@reduxjs/toolkit";
import { FileExplorerState, Node } from "../fileExplorerSlice";
import { v4 as uuid } from "uuid";
import { byDirectoryAndLexicographical, createUniqueName, findNodeByPath } from "../utils";

export type CreateFilePayload = {
  /**
   * Path to the node
   */
  path?: string;
  /**
   * Name of the file, defaults to "New File"
   */
  fileName?: string;
};

export function createFileReducer(
  state: FileExplorerState,
  action: PayloadAction<CreateFilePayload>
) {
  const { path, fileName } = action.payload;
  const root = state.rootNode;

  // Find starting node by path & ID
  const startNode = path ? findNodeByPath(root, path.split("/")) : root;

  // Create new file node as a child of starting node
  const fileNode = createFileNode(startNode, fileName || "New File");

  startNode.children = [
    ...startNode.children,
    fileNode,
  ].sort(byDirectoryAndLexicographical);

  state.rootNode = root;
}

function createFileNode(parent: Node, fileName: string): Node {
  const uniqueName = createUniqueName(parent, fileName);

  return {
    id: uuid(),
    parentId: parent.id,
    level: parent.level + 1,
    name: uniqueName,
    path: `${parent.path}/${uniqueName}`,
    type: "FILE",
    children: [],
  };
}
