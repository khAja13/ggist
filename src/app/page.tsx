'use client';

import Header from "@/components/Header";
import { getUser } from "@/util/session";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserWithGistType>();

  useEffect(() => {
    async function fetch() {
      const aa = await getUser();
      // @ts-ignore
      setUser(aa);
      setLoading(false);
    }
    
    fetch();
  }, [])
  
  return (
    <>
      {loading ? <h1>Loading..</h1> : <Header user={user} />}
    </>
  );
}
