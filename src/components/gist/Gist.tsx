import GistEditor from "@/components/gist/GistEditor";
import GistHeader from "@/components/gist/GistHeader";
import { Button } from "@/components/ui/button";

export default function Gist({ user }: {user?: UserWithGistType}) {
    if (!user) return;
    return(
        <>
            <div className="border-b border-black-500 mt-16">
                <div className="container">
                    <GistHeader user={user} />
                </div>
            </div>
            <GistEditor user={user} />
            <Button onClick={async () => {
                const resp = await fetch("/api/gist", {
                    method: 'POST',
                    body: JSON.stringify({
                        gistDescription: "this is the gist description",
                        gistContet: "this is the gist content...."
                    })
                });
                const data = await resp.json();
                console.log(data);
                
            }}>Create Gist</Button>
        </>
    )
}