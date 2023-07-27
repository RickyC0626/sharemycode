import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "../store";
import { createFileReducer, createFolderReducer } from "./reducers";

export type NodeType = "DIRECTORY" | "FILE";

export type Node = {
  id: string;
  parentId: string | null;
  level: number;
  name: string;
  path: string;
  description?: string;
  type: NodeType;
  children: Node[];
};

export interface FileExplorerState {
  rootNode: Node;
}

const initialState: FileExplorerState = {
  rootNode: {
    id: uuid(),
    parentId: null,
    level: 0,
    name: "root",
    path: "/root",
    description: "Start of the directory",
    type: "DIRECTORY",
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
    createFile: createFileReducer,
    // Create a new folder in database
    createFolder: createFolderReducer,
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
