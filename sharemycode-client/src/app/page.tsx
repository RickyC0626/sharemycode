"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

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

  return (
    <main className="min-h-screen bg-[#111111]">
      <div className="h-screen flex flex-col">
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
    </main>
  );
}
