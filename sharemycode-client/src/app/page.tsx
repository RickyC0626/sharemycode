"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { IoMdDocument } from "react-icons/io";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { PiCaretRightBold } from "react-icons/pi";

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
    <main className="min-h-screen bg-[#111111]">
      <div className="flex">
        <div className="flex">
          <SideMenu
            toggleFileExplorer={toggleFileExplorer}
            isFileExplorerOpen={isFileExplorerOpen}
          />
          <FileExplorer isOpen={isFileExplorerOpen} />
        </div>
        <div className="grow h-screen flex flex-col">
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
            className="grow"
            onStatistics={(data) => data.tabSize = 2}
          />
        </div>
      </div>
    </main>
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
    <div className="h-screen w-fit bg-[#1e1e1e]">
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

type FileType = {
  fileName: string;
};

type FolderType = {
  folderName: string;
};

function FileExplorer({ isOpen }: { isOpen: boolean }) {
  const [files, setFiles] = React.useState<FileType[]>([]);
  const [folders, setFolders] = React.useState<FolderType[]>([]);

  const handleCreateNewFile = (e: React.MouseEvent) => {
    setFiles([...files, { fileName: "New File" }].sort());
  };

  const handleCreateNewFolder = (e: React.MouseEvent) => {
    setFolders([...folders, { folderName: "New Folder" }].sort());
  };

  return (
    <div className={`h-screen ${isOpen ? "w-[16rem]" : "w-0"} overflow-auto whitespace-nowrap`}>
      {/* Header */}
      <div className="flex border-b-2 border-b-[#1e1e1e] place-items-center justify-between">
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
      {/* List of folders and files */}
      <ul>
        {folders.map((folder, idx) => (
          <li key={`folder-${idx}`} className="flex gap-1 place-items-center py-0.5 px-2 hover:bg-zinc-500/20 cursor-pointer">
            <PiCaretRightBold className="w-4 h-4 text-zinc-500" />
            <span className="text-zinc-300 text-sm select-none">
              {folder.folderName}
            </span>
          </li>
        ))}
        {files.map((file, idx) => (
          <li key={`file-${idx}`} className="py-0.5 px-2 hover:bg-zinc-500/20 cursor-pointer">
            <span className="text-zinc-300 text-sm select-none">{file.fileName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
