"use client";

import LiveAvatars, { defaultAvatarProps } from "@/components/avatar/LiveAvatars";
import { FileExplorer } from "@/components/file-explorer/FileExplorer";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { IoMdDocument } from "react-icons/io";
import { RoomProvider } from "../../liveblocks.config";

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
