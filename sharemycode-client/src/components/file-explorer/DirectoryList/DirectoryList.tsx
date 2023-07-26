import React from "react";
import { Node } from "@/state/file-explorer/fileExplorerSlice"
import { DirectoryListItem } from "../DirectoryListItem";
import { FaFile, FaFolder } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";

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
    <ul className={`overflow-hidden ${level > 0 ? "ml-4" : null}`}>
      {nodes.map((node) => (
        <DirectoryListItemWrapper key={node.id} node={node} />
      ))}
    </ul>
  );
}

function DirectoryListItemWrapper({ node }: { node: Node }) {
  const type = node.metadata.type;

  const [isActive, setActive] = React.useState(false);
  const toggleActive = () => setActive(!isActive);

  return type === "DIRECTORY" ? (
    <>
      <DirectoryListItem
        key={`dir-${node.id}`}
        active={isActive}
        width="full"
        label={node.metadata.name}
        iconBefore={FaFolder}
        iconAfter={PiCaretRightBold}
        onClick={toggleActive}
      />
      <li
        className={`
          grid ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          transition-all duration-300
        `}
      >
        <DirectoryList
          key={`list-${node.id}`}
          nodes={node.children}
          level={node.level + 1}
        />
      </li>
    </>
  ) : (
    <DirectoryListItem
      key={`file-${node.id}`}
      width="full"
      label={node.metadata.name}
      iconBefore={FaFile}
    />
  );
}
