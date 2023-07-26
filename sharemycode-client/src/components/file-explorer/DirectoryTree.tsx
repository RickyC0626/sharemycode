import { Node, NodeType, selectFileExplorerTree } from "@/state/file-explorer/fileExplorerSlice";
import { useAppSelector } from "@/state/hooks";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";

export function DirectoryTree() {
  const rootNode = useAppSelector(selectFileExplorerTree);

  return (
    <div className="overflow-y-auto p-2">
      {rootNode.children.map((child, idx) => {
        if (child.metadata.type === "FILE") {
          return <FileEntry node={child} key={`file-${child.level}-${idx}`} />
        }
        return <DirectoryEntry node={child} key={`directory-${child.level}-${idx}`} />
      })}
    </div>
  );
}

export function DirectoryEntry({ node, className }: { node: Node, className?: string }) {
  const children = node.children;

  return (
    <>
      <li className={`group flex ${className}`}>
        <button className="flex place-items-center w-full py-1.5 px-2 justify-between hover:bg-zinc-500/20 rounded-md">
          <div className="flex gap-2 place-items-center">
            <FaFolder className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-all duration-100" />
            <span className="text-zinc-400 text-sm select-none group-hover:text-zinc-100 transition-all duration-100">
              {node.metadata.name}
            </span>
          </div>
          <PiCaretRightBold className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-all duration-100" />
        </button>
      </li>
      {children.length > 0 ? (
        <ul>
          {children.map((child, idx) => {
            if (child.metadata.type === "FILE") {
              return <FileEntry
                node={child}
                key={`file-${child.level}-${idx}`}
                className="pl-4"
              />
            }
            return <DirectoryEntry
              node={child}
              key={`directory-${child.level}-${idx}`}
              className="pl-4"
            />
          })}
        </ul>
      ) : null}
    </>
  );
}

export function FileEntry({ node, className }: { node: Node, className?: string }) {
  return (
    <li className={`group flex ${className}`}>
      <button className="flex gap-2 place-items-center w-full py-1.5 px-2 hover:bg-zinc-500/20 rounded-md">
        <FaFile className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-all duration-100" />
        <span className="text-zinc-400 text-sm select-none group-hover:text-zinc-100 transition-all duration-100">
          {node.metadata.name}
        </span>
      </button>
    </li>
  );
}

export function DirectoryList() {
  return (
    <ul></ul>
  )
}
