'use client';

import { getUser } from "@/util/session";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loading";
import App from "./App";
import Header from "@/components/Header";

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
      {loading ? <LoadingSpinner /> : 
        <>
          <Header user={user}/>
          <App user={user} />
        </>
      }
    </>
  );
}
