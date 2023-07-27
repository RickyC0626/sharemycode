import { Node, deleteNode } from "@/state/file-explorer/fileExplorerSlice";
import { useAppDispatch } from "@/state/hooks";
import { BookOpen, FileOutput, Pencil, Trash2 } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../../ui/context-menu";

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
          <ContextMenuItem className="flex gap-3">
            <BookOpen className="w-4 h-4" />
            <span>Open</span>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem className="flex gap-3">
            <Pencil className="w-4 h-4" />
            <span>Rename</span>
          </ContextMenuItem>
          <ContextMenuItem className="flex gap-3">
            <FileOutput className="w-4 h-4" />
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
