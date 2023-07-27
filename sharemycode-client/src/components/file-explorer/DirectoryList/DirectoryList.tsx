import { Node } from "@/state/file-explorer/fileExplorerSlice";
import React from "react";
import { FaFile, FaFolder } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";
import { DirectoryListItem } from "../DirectoryListItem";
import { DirectoryContextMenu, FileContextMenu } from "../context-menus";

interface DirectoryListProps {
  /**
   * The nodes to render in a directory list
   */
  nodes?: Node[];
  /**
   * The level of nesting for this directory list
   */
  level?: number;
}

export function DirectoryList({
  nodes = [],
  level = 0,
}: DirectoryListProps): React.ReactNode {
  return (
    <ul className={`flex flex-col gap-1 overflow-hidden ${level > 0 ? "ml-4" : ""}`}>
      {nodes.map((node) => (
        <DirectoryListItemWrapper key={node.id} node={node} />
      ))}
    </ul>
  );
}

function DirectoryListItemWrapper({ node }: { node: Node }) {
  const type = node.type;

  const [isActive, setActive] = React.useState(false);
  const toggleActive = () => setActive(!isActive);

  return type === "DIRECTORY" ? (
    <div className={`flex flex-col ${isActive && node.children.length > 0 ? "space-y-1" : ""}`}>
      <DirectoryContextMenu
        node={node}
        trigger={
          <DirectoryListItem
            key={`dir-${node.id}`}
            active={isActive}
            width="full"
            label={node.name}
            iconBefore={FaFolder}
            iconAfter={PiCaretRightBold}
            onLeftClick={toggleActive}
          />
        }
      />
      <li
        className={`
          relative grid ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          transition-all duration-300
        `}
      >
        <div className="absolute w-[1px] h-full translate-x-2 bg-zinc-500/20" />
        <DirectoryList
          key={`list-${node.id}`}
          nodes={node.children}
          level={node.level + 1}
        />
      </li>
    </div>
  ) : (
    <FileContextMenu
      node={node}
      trigger={
        <DirectoryListItem
          key={`file-${node.id}`}
          width="full"
          label={node.name}
          iconBefore={FaFile}
        />
      }
    />
  );
}
