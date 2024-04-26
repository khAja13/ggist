'use client';

import Header from "@/components/Header";
import { getUser } from "@/util/session";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loading";

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
      {loading ? <LoadingSpinner /> : <Header user={user} />}
    </>
  );
}
