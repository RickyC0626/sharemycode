import { PayloadAction } from "@reduxjs/toolkit";
import { FileExplorerState, Node } from "../fileExplorerSlice";
import { v4 as uuid } from "uuid";
import { byDirectoryAndLexicographical, createUniqueName, findNodeByPath } from "../utils";

export type CreateFolderPayload = {
  /**
   * Path to the node
   */
  path?: string;
  /**
   * Name of the folder, defaults to "New Folder"
   */
  folderName?: string;
};

export function createFolderReducer(
  state: FileExplorerState,
  action: PayloadAction<CreateFolderPayload>
) {
  const { path, folderName } = action.payload;
  const root = state.rootNode;

  // Find starting node by path & ID
  const startNode = path ? findNodeByPath(root, path.split("/")) : root;

  // Create new file node as a child of starting node
  const folderNode = createFolderNode(startNode, folderName || "New Folder");

  startNode.children = [
    ...startNode.children,
    folderNode,
  ].sort(byDirectoryAndLexicographical);

  state.rootNode = root;
}

function createFolderNode(parent: Node, folderName: string): Node {
  const uniqueName = createUniqueName(parent, folderName);

  return {
    id: uuid(),
    parentId: parent.id,
    level: parent.level + 1,
    name: uniqueName,
    path: `${parent.path}/${uniqueName}`,
    type: "DIRECTORY",
    children: [],
  };
}
