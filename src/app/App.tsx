import React from "react";
import Gist from "../components/gist/Gist";
import Header from "@/components/Header";
import { useSelector } from "react-redux";

export default async function App() {
  ///@ts-ignore
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header user={user} />
      <Gist user={user} />
    </>
  );
}
