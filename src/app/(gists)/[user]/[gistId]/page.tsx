// @ts-nocheck
"use client";

import LoadingSpinner from "@/app/loading";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { timeAgo } from "@/util/util";
import { useRecoilValue } from "recoil";
import { usersSelector } from "@/lib/store1";

export default function UserPage({
  params,
}: {
  params: { user: string; gistId: string };
}) {
  const [loading, setLoading] = useState(true);
  const [gist, setGist] = useState<any>();
  const gistUser = useRecoilValue(usersSelector);

  useEffect(() => {
    async function fetchGist() {
      const resp = await fetch("/api/user/gist", {
        method: "POST",
        body: JSON.stringify({
          username: decodeURIComponent(params.user),
          gistId: params.gistId,
        }),
      });
      const data = await resp.json();

      if (resp.status > 200) {
        console.error("Failed to fetch gist:", data);
        return;
      } else {
        setGist(data.newGist);
        setLoading(false);
      }
    }

    fetchGist();
  }, [params.user, params.gistId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header user={gistUser} />
      <AvatarWithContent user={gist} />
    </>
  );
}

function AvatarWithContent({ user }) {
  const { theme } = useTheme();
  const name = user?.name ? `${user.name[0]}${user.name[1]}` : "Unknown User";

  const highlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  return (
    <div className="px-2 md:px-0 md:container mt-16 py-8">
      <div className="w-full md:w-3/4 m-auto">
        <div className="col-span-8">
          <div>
            {user?.gists.length === 0 && (
              <h1 className="text-lg">This gist doesn't exist or has no content.</h1>
            )}
            {user?.gists?.map((gist) => (
              <div className="mb-6" key={gist.id}>
                <div className="flex gap-2">
                  <Avatar className="rounded-2xl">
                    <AvatarImage src={user.picture || "/default-avatar.jpg"} />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link
                      href={`/${user.name}/${gist.id}`}
                      className="text-blue-500 font-semibold"
                    >
                      {user.name}/{gist.id}
                    </Link>
                    <p className="text-sm text-slate-500 font-medium">
                      Created {timeAgo(new Date(gist.createdAt))}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">
                      {gist.title}
                    </p>
                  </div>
                </div>
                <Editor
                  className="border border-black-500 rounded mt-2 editor"
                  value={gist.content}
                  onValueChange={() => {}}
                  textareaId="codeArea"
                  highlight={(code) =>
                    highlightWithLineNumbers(code, languages.js)
                  }
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    outline: 0,
                    background: theme === "light" ? "#fff" : "#0d1117",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
