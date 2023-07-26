import React from "react";
import { IconType } from "react-icons/lib";

interface DirectoryListItemProps {
  /**
   * Name of the list item
   */
  label: string;
  /**
   * How long the list item should be
   */
  width?: "sm" | "md" | "lg" | "full";
  /**
   * Optional icon that displays before label
   */
  iconBefore?: IconType;
  /**
   * Optional icon that displays after label
   */
  iconAfter?: IconType;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export function DirectoryListItem({
  label = "List Item",
  width = "md",
  iconBefore,
  iconAfter,
}: DirectoryListItemProps): React.ReactNode {
  const IconBefore = iconBefore!;
  const IconAfter = iconAfter!;

  const getWidth = () => {
    switch (width) {
      case "sm": return "w-48";
      case "md": return "w-64";
      case "lg": return "w-80";
      case "full": return "w-full";
    }
  };

  return (
    <li className={`group flex ${getWidth()}`}>
      <button className="flex place-items-center w-full py-1.5 px-2 justify-between hover:bg-zinc-500/20 rounded-md">
        <div className="flex gap-2 place-items-center">
          {iconBefore ? (
            <IconBefore className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-all duration-100" />
          ) : null}
          <span className="text-zinc-400 text-sm select-none group-hover:text-zinc-100 transition-all duration-100">
            {label}
          </span>
        </div>
        {iconAfter ? (
          <IconAfter className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-all duration-100" />
        ) : null}
      </button>
    </li>
  );
}
