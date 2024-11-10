"use client";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { usersSelector, userState } from "@/lib/store1";
import LoadingSpinner from "./loading";
import Header from "@/components/Header";
import Gist from "@/components/gist/Gist";

export default function App({ user }: { user: UserWithGistType }) {
    //@ts-ignore
    const setUsers = useSetRecoilState(userState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //@ts-ignore
        setUsers(user);
        setLoading(false);
    }, [user, setUsers]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Header user={user} />
                    <Gist user={user} />
                </>
            )}
        </>
    );
}
