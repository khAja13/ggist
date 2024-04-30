"use client";

import { useEffect, useState } from "react";
import App from "./App";
import { fetchInitialUserData } from "@/lib/store";
import { useDispatch } from "react-redux";
import LoadingSpinner from "./loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        //@ts-ignore
        dispatch(fetchInitialUserData());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  return <>{loading ? <LoadingSpinner /> : <App />}</>;
}
