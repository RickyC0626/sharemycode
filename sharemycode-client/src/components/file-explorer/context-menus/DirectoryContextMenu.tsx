import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../../ui/context-menu";
import { useAppDispatch } from "@/state/hooks";
import { Node, createFile, createFolder, deleteNode } from "@/state/file-explorer/fileExplorerSlice";

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
          <ContextMenuItem onClick={handleClickNewFile}>New File</ContextMenuItem>
          <ContextMenuItem onClick={handleClickNewDirectory}>New Directory</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Move To</ContextMenuItem>
          <ContextMenuItem onClick={handleClickDelete}>Delete</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
