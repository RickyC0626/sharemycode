import { PayloadAction } from "@reduxjs/toolkit";
import { FileExplorerState } from "../fileExplorerSlice";
import { findNodeByPath } from "../utils";

export type DeleteNodePayload = {
  /**
   * Path to the folder to delete
   */
  path: string;
};

export function deleteNodeReducer(
  state: FileExplorerState,
  action: PayloadAction<DeleteNodePayload>
) {
  const { path } = action.payload;
  const root = state.rootNode;

  const paths = path.split("/");
  const pathsToNodeParent = paths.slice(0, -1);
  const parent = findNodeByPath(root, pathsToNodeParent);
  const nodeName = paths[paths.length - 1];

  parent.children = parent.children.filter(node => node.name !== nodeName);
  state.rootNode = root;
}
