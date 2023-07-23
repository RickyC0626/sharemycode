import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum NodeType {
  DIRECTORY,
  FILE,
}

export type Node = {
  name: string;
  path: string;
  parent: Node | undefined;
  type: NodeType;
  children: Node[];
}

export interface FileExplorerState {
  rootNode: Node;
}

const initialState: FileExplorerState = {
  rootNode: {
    name: "root",
    path: "/root",
    parent: undefined,
    type: NodeType.DIRECTORY,
    children: [],
  },
};

export const fileExplorerSlice = createSlice({
  name: "file-explorer",
  initialState,
  reducers: {
    // Only fetches the names and paths of nodes and not their data
    fetchNodesFast: (state) => {

    },
    // Fetches a single node with its entire data
    fetchNode: (state) => {

    },
    // Create a new file in database
    createFile: (state, action: PayloadAction<{ fileName: string }>) => {
      const { fileName } = action.payload;
    },
    // Create a new folder in database
    createFolder: (state, action: PayloadAction<{ folderName: string }>) => {
      const { folderName } = action.payload;
    },
    // Delete an existing node
    deleteNode: (state) => {

    },
    // Updates the name and path of the node
    updateNodeName: (state) => {

    },
  },
});

export const selectFileExplorerTree = (state: RootState) => state.fileExplorer.rootNode;

export const {
  fetchNodesFast,
  fetchNode,
  createFile,
  createFolder,
  deleteNode,
  updateNodeName,
} = fileExplorerSlice.actions;

export default fileExplorerSlice.reducer;
