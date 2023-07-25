"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { PiCaretRightBold } from "react-icons/pi";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import LiveAvatars, { defaultAvatarProps } from "@/components/avatar/LiveAvatars";
import { RoomProvider } from "../../liveblocks.config";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { Node, NodeType, createFile, createFolder, selectFileExplorerTree } from "@/state/file-explorer/fileExplorerSlice";

const editors = [
  {
    tabName: "HTML",
    codemirror: {
      value: `<!DOCTYPE html>
<html>
  <head>
    <title>Page contents</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
`,
      extensions: [html()],
    },
  },
  {
    tabName: "CSS",
    codemirror: {
      value: `html, body {
  margin: 0;
  padding: 0;
}
`,
      extensions: [css()],
    }
  },
  {
    tabName: "JavaScript",
    codemirror: {
      value: `console.log("Hello World!");\n`,
      extensions: [javascript({ jsx: true })],
    },
  },
];

export default function Home() {
  const [currEditor, setCurrEditor] = React.useState(0);
  const [isFileExplorerOpen, setFileExplorerOpen] = React.useState(true);

  const toggleFileExplorer = () => {
    setFileExplorerOpen(!isFileExplorerOpen);
  };

  return (
    <RoomProvider id="sharemycode" initialPresence={{}}>
      <main className="min-h-screen bg-[#111111]">
        {/* Whole screen */}
        <div className="h-screen flex flex-col">
          <Navbar />
          {/* Main content */}
          <div className="grow flex">
            {/* Sidebar & menu */}
            <div className="flex">
              <SideMenu
                toggleFileExplorer={toggleFileExplorer}
                isFileExplorerOpen={isFileExplorerOpen}
              />
              <FileExplorer isOpen={isFileExplorerOpen} />
            </div>
            {/* Editor and tabs */}
            <div className="grow flex flex-col">
              <div className="flex gap-1">
                {editors.map((editor, idx) => (
                  <button
                    key={idx}
                    className={`
                      w-fit px-3 py-2 ${currEditor === idx ? "bg-[#1e1e1e]" : "bg-[#353535]"}
                    `}
                    onClick={() => setCurrEditor(idx)}
                  >
                    <span className="text-zinc-300 font-bold">{editor.tabName}</span>
                  </button>
                ))}
              </div>
              <CodeMirror
                value={editors[currEditor].codemirror.value}
                height="100%"
                theme={vscodeDark}
                extensions={editors[currEditor].codemirror.extensions}
                autoFocus
                className="grow h-0"
                onStatistics={(data) => data.tabSize = 2}
              />
            </div>
          </div>
          <StatusBar />
        </div>
      </main>
    </RoomProvider>
  );
}

function Navbar() {
  return (
    <div className="
      w-full h-12 bg-[#111111] grid grid-cols-3 gap-2 p-2 overflow-hidden
    ">
      <div className="flex gap-2 justify-start place-items-center">
        <span className="font-bold text-zinc-200">Menu</span>
      </div>
      <div className="grid place-items-center">
        <span className="font-bold text-zinc-200">Organization/Project</span>
      </div>
      <div className="flex gap-2 justify-end place-items-center">
        <LiveAvatars
          avatarProps={{
            ...defaultAvatarProps,
            style: { marginLeft: "-0.3rem" },
            size: 32,
            outlineColor: "#353535"
          }}
        />
      </div>
    </div>
  );
}

function SideMenu({
  toggleFileExplorer,
  isFileExplorerOpen
}: {
  toggleFileExplorer: () => void;
  isFileExplorerOpen: boolean;
}) {
  return (
    <div className="w-fit bg-[#1e1e1e]">
      <button
        className={`
          p-3 relative before:content-[''] before:absolute before:top-0
          before:left-0 before:inset-y-0 before:w-0.5 active:before:bg-zinc-500
          ${isFileExplorerOpen ? "before:bg-zinc-200" : "before:bg-transparent"}
        `}
        onClick={toggleFileExplorer}
      >
        <IoMdDocument className={`
          w-8 h-8 hover:text-zinc-300
          ${isFileExplorerOpen ? "text-zinc-200" : "text-zinc-500"}
        `} />
      </button>
    </div>
  );
}

function FileExplorer({ isOpen }: { isOpen: boolean }) {
  const dispatch = useAppDispatch();

  const handleCreateNewFile = (e: React.MouseEvent) => {
    dispatch(createFile({ fileName: "New File" }));
  };

  const handleCreateNewFolder = (e: React.MouseEvent) => {
    dispatch(createFolder({ folderName: "New Folder" }));
  };

  return (
    <div className={`${isOpen ? "w-[16rem]" : "w-0"} relative h-0 min-h-full overflow-y-auto whitespace-nowrap`}>
      {/* Header */}
      <div className="sticky top-0 flex bg-[#111111] border-b-2 border-b-[#1e1e1e] place-items-center justify-between">
        <span className="p-2 text-zinc-300 uppercase font-bold text-sm select-none">
          File Explorer
        </span>
        <div className="flex gap-1 p-2">
          <button className="hover:bg-zinc-500/40 rounded" onClick={handleCreateNewFile}>
            <VscNewFile className="w-4 h-4 m-1 text-zinc-300" />
          </button>
          <button className="hover:bg-zinc-500/40 rounded" onClick={handleCreateNewFolder}>
            <VscNewFolder className="w-4 h-4 m-1 text-zinc-300" />
          </button>
        </div>
      </div>
      <DirectoryTree />
    </div>
  );
}

function DirectoryTree() {
  const rootNode = useAppSelector(selectFileExplorerTree);

  return (
    <div className="overflow-y-auto p-2">
      {rootNode.children.map((child, idx) => {
        if (child.metadata.type === NodeType.FILE) {
          return <FileEntry node={child} key={`file-${child.level}-${idx}`} />
        }
        return <DirectoryEntry node={child} key={`directory-${child.level}-${idx}`} />
      })}
    </div>
  );
}

function DirectoryEntry({ node, className }: { node: Node, className?: string }) {
  const children = node.children;

  return (
    <>
      <li className={`group flex ${className}`}>
        <button className="flex place-items-center w-full py-1.5 px-2 justify-between hover:bg-zinc-500/20 rounded-md">
          <div className="flex gap-2 place-items-center">
            <FaFolder className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-all duration-100" />
            <span className="text-zinc-400 text-sm select-none group-hover:text-zinc-100 transition-all duration-100">
              {node.metadata.name}
            </span>
          </div>
          <PiCaretRightBold className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-all duration-100" />
        </button>
      </li>
      {children.length > 0 ? (
        <ul>
          {children.map((child, idx) => {
            if (child.metadata.type === NodeType.FILE) {
              return <FileEntry
                node={child}
                key={`file-${child.level}-${idx}`}
                className="pl-4"
              />
            }
            return <DirectoryEntry
              node={child}
              key={`directory-${child.level}-${idx}`}
              className="pl-4"
            />
          })}
        </ul>
      ) : null}
    </>
  );
}

function FileEntry({ node, className }: { node: Node, className?: string }) {
  return (
    <li className={`group flex ${className}`}>
      <button className="flex gap-2 place-items-center w-full py-1.5 px-2 hover:bg-zinc-500/20 rounded-md">
        <FaFile className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-all duration-100" />
        <span className="text-zinc-400 text-sm select-none group-hover:text-zinc-100 transition-all duration-100">
          {node.metadata.name}
        </span>
      </button>
    </li>
  );
}

function StatusBar() {
  return (
    <section className="
      w-full h-8 bg-[#353535] flex gap-2 justify-end place-items-center
    ">
      <Select>
        <SelectTrigger className="
          h-full w-fit hover:bg-zinc-600/60 text-zinc-300 border-none
          rounded-none focus:ring-0 focus:ring-offset-0
        ">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HTML">HTML</SelectItem>
          <SelectItem value="CSS">CSS</SelectItem>
          <SelectItem value="JavaScript">JavaScript</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
}
