"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900">
      <CodeMirror
        value={`console.log("Hello World!");`}
        minHeight="100vh"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
      />
    </main>
  );
}
