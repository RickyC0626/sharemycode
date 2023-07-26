import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { DirectoryTree } from "./DirectoryTree";
import { useAppDispatch } from "@/state/hooks";
import { createFile, createFolder } from "@/state/file-explorer/fileExplorerSlice";

/**
 * Given a directory tree, display a list of directories and files
 * and their children. Visualize the nesting of each node with styling.
 * Each node is a button that takes in the appropriate click handler.
 * When folders are clicked, toggle the expansion of their contents.
 * When a file is clicked once, set it as active (use it to display in
 * editor temporarily).
 * When a file is clicked twice, set it as opened tab in editor. 
 */
export function FileExplorer({ isOpen }: { isOpen: boolean }) {
  const dispatch = useAppDispatch();

  const handleCreateNewFile = (e: React.MouseEvent) => {
    dispatch(createFile({ fileName: "New File" }));
  };

  const handleCreateNewFolder = (e: React.MouseEvent) => {
    dispatch(createFolder({ folderName: "New Folder" }));
  };

  return (
    <div className={`${isOpen ? "w-[17rem]" : "w-0"} relative h-0 min-h-full overflow-y-auto whitespace-nowrap`}>
      {/* Header */}
      <div className="sticky top-0 flex bg-[#111111] border-b-2 border-b-[#1e1e1e] place-items-center justify-between">
        <span className="p-2 text-zinc-300 uppercase font-bold text-sm select-none">
          File Explorer
        </span>
        <div className="flex gap-1 p-2">
          <button className="hover:bg-zinc-500/40 rounded" onClick={handleCreateNewFile}>
            <VscNewFile className="w-4 h-4 m-1 text-zinc-300" />
          </button>
          <button className="hover:bg-zinc-500/40 rounded" onClick={handleCreateNewFolder}>
            <VscNewFolder className="w-4 h-4 m-1 text-zinc-300" />
          </button>
        </div>
      </div>
      <DirectoryTree />
    </div>
  );
}
