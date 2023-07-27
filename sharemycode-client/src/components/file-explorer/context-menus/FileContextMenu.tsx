import { Node, deleteNode } from "@/state/file-explorer/fileExplorerSlice";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../../ui/context-menu";
import { useAppDispatch } from "@/state/hooks";

export function FileContextMenu({
  node,
  trigger
}: {
  node: Node,
  trigger: React.ReactNode
}) {
  const dispatch = useAppDispatch();

  const handleClickDelete = () => {
    dispatch(deleteNode({ path: node.path }));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Open</ContextMenuItem>
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
