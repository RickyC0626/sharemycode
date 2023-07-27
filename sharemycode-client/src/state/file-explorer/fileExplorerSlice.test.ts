import { FileExplorerState, Node, createFile } from "./fileExplorerSlice";
import reducer from "./fileExplorerSlice";

const mockRoot: Node = {
  id: "c1c8f5cc-5004-4422-976b-45406cb23113",
  parentId: null,
  level: 0,
  name: "root",
  path: "/",
  type: "DIRECTORY",
  children: [],
};

describe("File Explorer State", () => {
  describe("createFile", () => {
    test("when no path is given, a new file should be created at root path", () => {
      const initialState: FileExplorerState = {
        rootNode: mockRoot,
      };

      expect(initialState.rootNode.children.length).toEqual(0);

      const actual = reducer(initialState, createFile({}));

      expect(actual.rootNode.children.length).toEqual(1);
    });

    test("when no file name is given, file name will default to 'New File'", () => {
      const initalState: FileExplorerState = {
        rootNode: mockRoot,
      };

      const actual = reducer(initalState, createFile({}));

      expect(actual.rootNode.children[0].name).toEqual("New File");
    });

    test.todo("when path is given, new file should be created at that path");
  });
});
