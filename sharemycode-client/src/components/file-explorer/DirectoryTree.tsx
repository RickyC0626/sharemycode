import { selectFileExplorerTree } from "@/state/file-explorer/fileExplorerSlice";
import { useAppSelector } from "@/state/hooks";
import { DirectoryList } from "./DirectoryList";

export function DirectoryTree() {
  const rootNode = useAppSelector(selectFileExplorerTree);

  return (
    <div className="overflow-y-auto p-2">
      <DirectoryList nodes={rootNode.children} level={0} />
    </div>
  );
}
