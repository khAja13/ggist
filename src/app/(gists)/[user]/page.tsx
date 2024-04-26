// @ts-nocheck
"use client";

import LoadingSpinner from "@/app/loading";
import Header from "@/components/Header";
import { getUser } from "@/util/session";
import { useEffect, useState } from "react";

export default function UserPage({ params, user }: { params: { user: string }, user: UserWithGistType }) {
  const [loading, setLoading] = useState(true);
  const [gistUser, setGistUser] = useState<UserWithGistType>();
  
    useEffect(() => {
      async function fetchUser() {
        const resp = await getUser();
        setGistUser(resp);
        setLoading(false);
      }

      fetchUser();
    }, [])

    return (
      <>
        {loading ? <LoadingSpinner /> : 
          <> 
            <Header user={gistUser}/>
            <div>My Post: {params.user}</div>
            {JSON.stringify(gistUser)} 
          </>
        }
      </>
    )
}