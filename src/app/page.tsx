import App from "./App";
import { getUser } from "@/util/session";

export default async function Home() {
  const user = await getUser();

  //@ts-ignore
  return <App user={user} />;
}
  