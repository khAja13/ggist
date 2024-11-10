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
import { useRecoilState, useRecoilValue } from "recoil";
import { usersSelector, userState } from "@/lib/store1";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function UserPage({ params }: { params: { user: string } }) {
    const [loading, setLoading] = useState(true);
    const gistUser = useRecoilValue(usersSelector);
    const router = useRouter();

    useEffect(() => {
        if (gistUser === undefined) {
        router.push("/auth/signin");
    } else {
            setLoading(false);
        }
    }, [gistUser, router]);

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
            .map(
                (line, i) =>
                    `<span class='editorLineNumber'>${i + 1}</span>${line}`
            )
            .join("\n");

    const copyToClipboard = (gistId: string) => {
        const url = `${window.location.origin}/${user.name}/${gistId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast({
                    title: "URL Copied!",
                    description: "Gist URL has been copied to clipboard",
                });
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Failed to copy",
                    description: "Could not copy URL to clipboard",
                });
            });
    };

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
                                                <AvatarImage
                                                    src={user.picture}
                                                />
                                                <AvatarFallback>
                                                    {name}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Link
                                                    href={`/${user.name}/${gist.id}`}
                                                    className="text-blue-500 font-semibold"
                                                >
                                                    {user.name}/{gist.id}
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        copyToClipboard(gist.id)
                                                    }
                                                    className="p-1 h-6 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <p className="text-sm text-slate-500 font-medium">
                                                    Created{" "}
                                                    {timeAgo(
                                                        new Date(gist.createdAt)
                                                    )}
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
                                                hightlightWithLineNumbers(
                                                    code,
                                                    languages.js
                                                )
                                            }
                                            padding={10}
                                            style={{
                                                fontFamily:
                                                    '"Fira code", "Fira Mono", monospace',
                                                fontSize: 12,
                                                outline: 0,
                                                background:
                                                    theme === "light"
                                                        ? "#fff"
                                                        : "#0d1117",
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
