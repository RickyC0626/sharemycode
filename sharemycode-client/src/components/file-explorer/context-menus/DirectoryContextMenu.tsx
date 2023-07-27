import { Node, createFile, createFolder, deleteNode } from "@/state/file-explorer/fileExplorerSlice";
import { useAppDispatch } from "@/state/hooks";
import { FilePlus, FolderOutput, FolderPlus, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../../ui/context-menu";

export function DirectoryContextMenu({
  node,
  trigger
}: {
  node: Node;
  trigger: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const handleClickNewFile = () => {
    dispatch(createFile({ path: node.path }));
  };

  const handleClickNewDirectory = () => {
    dispatch(createFolder({ path: node.path }))
  };

  const handleClickDelete = () => {
    dispatch(deleteNode({ path: node.path }));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem onClick={handleClickNewFile} className="flex gap-3">
            <FilePlus className="w-4 h-4" />
            <span>New File</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={handleClickNewDirectory} className="flex gap-3">
            <FolderPlus className="w-4 h-4" />
            <span>New Directory</span>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem className="flex gap-3">
            <Pencil className="w-4 h-4" />
            <span>Rename</span>
          </ContextMenuItem>
          <ContextMenuItem className="flex gap-3">
            <FolderOutput className="w-4 h-4" />
            <span>Move To</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={handleClickDelete} className="flex gap-3">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
