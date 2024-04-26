import React from "react";
import Gist from "../components/gist/Gist";

export default async function App({ user, children }: {user?: UserWithGistType | undefined, children?: React.ReactNode}) {
    return(
        <>
            <Gist user={user}/>
        </>
    )
}