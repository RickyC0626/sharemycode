import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { v4 as uuid } from "uuid";

export type NodeType = "DIRECTORY" | "FILE";

export type Node = {
  id: string;
  parentId: string | null;
  level: number;
  metadata: {
    name: string;
    path: string;
    description?: string;
    type: NodeType;
  };
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
    metadata: {
      name: "root",
      path: "/root",
      description: "Start of the directory",
      type: "DIRECTORY",
    },
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

      const fileNode: Node = {
        id: uuid(),
        parentId: state.rootNode.id,
        level: state.rootNode.level + 1,
        metadata: {
          name: fileName,
          path: `${state.rootNode.metadata.path}/${fileName}`,
          description: "",
          type: "FILE",
        },
        children: [],
      };

      state.rootNode.children = [
        ...state.rootNode.children,
        fileNode,
      ].sort(byDirectoryAndLexicographical);
    },
    // Create a new folder in database
    createFolder: (state, action: PayloadAction<{ folderName: string }>) => {
      const { folderName } = action.payload;

      const folderNode: Node = {
        id: uuid(),
        parentId: state.rootNode.id,
        level: state.rootNode.level + 1,
        metadata: {
          name: folderName,
          path: `${state.rootNode.metadata.path}/${folderName}`,
          description: "",
          type: "DIRECTORY",
        },
        children: [],
      };

      state.rootNode.children = [
        ...state.rootNode.children,
        folderNode,
      ].sort(byDirectoryAndLexicographical);
    },
    // Delete an existing node
    deleteNode: (state) => {

    },
    // Updates the name and path of the node
    updateNodeName: (state) => {

    },
  },
});

export function byDirectoryAndLexicographical(a: Node, b: Node) {
  const aType = a.metadata.type;
  const bType = b.metadata.type;

  // Directories first
  if (aType !== bType) return aType === "DIRECTORY" ? -1 : 1;

  const aName = a.metadata.name;
  const bName = a.metadata.name;

  // Lexicographical order
  return aName > bName ? -1 : aName < bName ? 1 : 0;
}

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
