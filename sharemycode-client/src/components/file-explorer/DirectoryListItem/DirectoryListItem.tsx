import { IconType } from "react-icons/lib";

export function DirectoryListItem({
  nodeText = "List Item",
  iconBefore,
  iconAfter
}: {
  nodeText?: string;
  iconBefore?: IconType;
  iconAfter?: IconType;
}) {
  const IconBefore = iconBefore!;
  const IconAfter = iconAfter!;

  return (
    <li className="group flex">
      <button className="flex place-items-center w-full py-1.5 px-2 justify-between hover:bg-zinc-500/20 rounded-md">
        <div className="flex gap-2 place-items-center">
          {iconBefore ? (
            <IconBefore className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-all duration-100" />
          ) : null}
          <span className="text-zinc-400 text-sm select-none group-hover:text-zinc-100 transition-all duration-100">
            {nodeText}
          </span>
        </div>
        {iconAfter ? (
          <IconAfter className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-all duration-100" />
        ) : null}
      </button>
    </li>
  );
}
