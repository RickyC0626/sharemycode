import React from "react";
import { IconType } from "react-icons/lib";

type ElementWidth = "sm" | "md" | "lg" | "full" | "fit";

interface DirectoryListItemProps {
  /**
   * Name of the list item
   */
  label: string;
  /**
   * If the list item is active
   */
  active?: boolean;
  /**
   * How long the list item should be
   */
  width?: ElementWidth;
  /**
   * Optional icon that displays before label
   */
  iconBefore?: IconType;
  /**
   * Optional icon that displays after label
   */
  iconAfter?: IconType;
  /**
   * Optional left click handler
   */
  onLeftClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  /**
   * Optional right click handler
   */
  onRightClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export function DirectoryListItem({
  label = "List Item",
  active = false,
  width = "md",
  iconBefore,
  iconAfter,
  onLeftClick = () => {},
  onRightClick = () => {}
}: DirectoryListItemProps): React.ReactNode {
  const IconBefore = iconBefore!;
  const IconAfter = iconAfter!;

  const widthClass = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
    full: "w-full",
    fit: "w-fit",
  } satisfies { [K in ElementWidth]: string };

  return (
    <li
      className={`my-0.5 group flex ${widthClass[width]}`}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      <button
        className={`
          flex place-items-center w-full py-1.5 px-2 justify-between rounded-md
          hover:bg-zinc-500/20 ${active ? "bg-zinc-500/20" : "bg-[#111111]"}
          transition-colors duration-150
        `}
      >
        <div className="flex gap-2 place-items-center">
          {iconBefore ? (
            <IconBefore
              className={`
                w-4 h-4 ${active ? "text-zinc-100" : "text-zinc-400"}
                group-hover:text-zinc-100 transition-colors duration-150
              `}
            />
          ) : null}
          <span
            className={`
            text-sm select-none ${active ? "text-zinc-100" : "text-zinc-400"}
            group-hover:text-zinc-100 transition-colors duration-150
            `}
          >
            {label}
          </span>
        </div>
        {iconAfter ? (
          <IconAfter
            className={`
              w-4 h-4 ${active ? "text-zinc-100 rotate-90" : "text-zinc-400"}
              group-hover:text-zinc-100 transition-all duration-150
            `}
          />
        ) : null}
      </button>
    </li>
  );
}
