"use client";

import { useEffect, useRef } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

// code, onChange, language
export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // simplified code editor for demonstration: integrate Monaco Editor or CodeMirror

  useEffect(() => {
    if (editorRef.current) {
      // initialise editor (simplified)
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.className =
        "w-full h-full min-h-[400px] font-mono text-sm p-4 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
      textarea.spellcheck = false;

      textarea.addEventListener("input", (e) => {
        onChange((e.target as HTMLTextAreaElement).value);
      });

      editorRef.current.innerHTML = "";
      editorRef.current.appendChild(textarea);

      return () => {
        textarea.remove();
      };
    }
  }, [code, onChange]);

  return <div ref={editorRef} className="h-full min-h-[400px]" />;
}
