import { Directory, File, FileSystem, NodeType } from "./FileSystem";

describe("FileSystem", () => {
  describe("instantiation", () => {
    it("should create a root directory node with path '/root' and no child nodes", () => {
      const fs = new FileSystem();
      const root = fs.root;

      expect(root).toBeDefined();
      expect(root.type).toBe(NodeType.DIRECTORY);
      expect(root.path()).toBe("/root");
      expect((root as Directory).children.size).toBe(0);
    });
  });

  describe("ls()", () => {
    it("should list files and directories for root path by default", () => {
      const dir = new Directory({ name: "root" });
      dir.addChild(new File({ name: "newFile.txt" }));
      dir.addChild(new Directory({ name: "stuff" }));

      const fs = new FileSystem(dir);

      expect(fs.ls).toBeDefined();

      const names = fs.ls();

      expect(names.length).toBe(2);
      expect(names.includes("newFile.txt")).toBeTruthy();
      expect(names.includes("stuff")).toBeTruthy();
    });
  });

  describe("mkdir()", () => {
    it("should exist", () => {
      const fs = new FileSystem();

      expect(fs.mkdir).toBeDefined();
    });

    it("should create a new directory in root path by default", () => {
      const fs = new FileSystem();

      expect(fs.root.children.size).toBe(0);

      fs.mkdir("src");

      const root = fs.root;

      expect(root.children.size).toBe(1);
      expect(root.children.has("/root/src")).toBeTruthy();
    });

    it("should create nested directories if they don't already exist", () => {
      const fs = new FileSystem();

      expect(fs.root.children.size).toBe(0);

      fs.mkdir("src/state");

      const root = fs.root;

      expect(root.children.size).toBe(1);
      expect(root.children.has("/root/src")).toBeTruthy();

      const src = root.children.get("/root/src") as Directory;

      expect(src.children.size).toBe(1);
      expect(src.children.has("/root/src/state")).toBeTruthy();

      expect(fs.root.name).toBe("root");
    });
  });
});

describe("Directory", () => {
  it.todo("should be able to change its name");

  it("should be able to contain a directory", () => {
    const dir = new Directory({
      name: "newDir",
    });

    expect(dir.addChild).toBeDefined();

    const newDir = new Directory({
      name: "nested-dir",
    });

    expect(dir.children.size).toBe(0);

    dir.addChild(newDir);

    expect(dir.children.size).toBe(1);
    expect(dir.children.get(newDir.path())).toEqual(newDir);
    expect(dir.children.get(newDir.path())?.path()).toBe("/newDir/nested-dir");
  });

  it("should be able to contain a file", () => {
    const dir = new Directory();

    expect(dir.addChild).toBeDefined();

    const newFile = new File({
      name: "nestedFile.txt",
    });

    expect(dir.children.size).toBe(0);

    dir.addChild(newFile);

    expect(dir.children.size).toBe(1);
    expect(dir.children.get(newFile.path())).toEqual(newFile);
  });

  it("should be able to delete a directory and its contents", () => {
    const nestedDir = new Directory({
      name: "nested-dir",
    });
    nestedDir.addChild(
      new File({
        name: "nestedFile.txt",
      }),
    );
    nestedDir.addChild(
      new Directory({
        name: "deep-nested-dir",
      }),
    );

    const dir = new Directory();
    dir.addChild(nestedDir);

    expect(dir.removeChild).toBeDefined();
    expect(dir.children.size).toBe(1);

    dir.removeChild(nestedDir.path());

    expect(dir.children.size).toBe(0);
  });

  it("should be able to delete a file", () => {
    const newFile = new File({
      name: "newFile.txt",
    });

    const dir = new Directory();
    dir.addChild(newFile);

    expect(dir.removeChild).toBeDefined();
    expect(dir.children.size).toBe(1);

    dir.removeChild(newFile.path());

    expect(dir.children.size).toBe(0);
  });
});
