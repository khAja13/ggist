// @ts-nocheck

import Editor from "react-simple-code-editor";
import GistEditorHeader from "./GistEditorHeader";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "../ui/button";

export default function GistEditor({ user }: { user: UserWithGistType }) {
  const { theme } = useTheme();
  const [content, setContent] = useState("");

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  return (
    <>
      <div className="container p-6 flex flex-col items-center">
        <GistEditorHeader />
        <div className="w-7/12">
          <Editor
            value={content}
            className="border border-black-500 rounded mt-2 editor w-full"
            onValueChange={(e) => {
              setContent(e);
            }}
            textareaId="codeArea"
            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: 0,
              background: theme === "light" ? "#fff" : "#0d1117",
            }}
          />
          <Button
            className="mt-4"
            onClick={async () => {
              const resp = await fetch("/api/gist", {
                method: "POST",
                body: JSON.stringify({
                  gistDescription: "this is the gist description",
                  gistContet: content,
                }),
              });
              const data = await resp.json();
              window.location.href = user.name + "/" + data.newGist.id;
            }}
          >
            Create Gist
          </Button>
        </div>
      </div>
    </>
  );
}
