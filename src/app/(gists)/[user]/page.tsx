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
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialUserData } from "@/lib/store";

export default function UserPage({ params }: { params: { user: string } }) {
  const [loading, setLoading] = useState(true);
  const [gistUser, setGistUser] = useState<any>();
  const sessionGistUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = () => {
    try {
      dispatch(fetchInitialUserData());
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const fetchUser = async () => {
    console.log("fetching user");

    const resp = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        userId: decodeURIComponent(params.user),
      }),
    });
    const data = await resp.json();
    console.log("done with it");

    if (resp.status > 200) {
      // invalid user
    } else {
      setGistUser(data.user);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (sessionGistUser.id) {
      if (sessionGistUser.name !== decodeURIComponent(params.user)) {
        fetchUser();
      } else {
        setGistUser(sessionGistUser);
      }
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header user={gistUser} />
          {gistUser ? (
            <AvatarWithContent user={gistUser} />
          ) : (
            <h1 className="text-lg mt-20">Unable to find user</h1>
          )}
        </>
      )}
    </>
  );
}

function AvatarWithContent({ user }) {
  const { theme } = useTheme();
  const name = user?.name[0] ? user?.name[0] + user?.name[1] : "";

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  return (
    <>
      <div className="px-2 md:px-0 md:container mt-16 py-8">
        <div className="w-full md:w-3/4 m-auto">
          <div className="col-span-8">
            <div>
              {user.gists.length == 0 && (
                <h1 className="text-lg">
                  You don&apos;t have any gists created..
                </h1>
              )}
              {user.gists.map((gist) => {
                return (
                  <div className="mb-6" key={gist.id}>
                    <div className="flex gap-2">
                      <Avatar className="rounded-2xl">
                        <AvatarImage src={user.picture} />
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
                        hightlightWithLineNumbers(code, languages.js)
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
