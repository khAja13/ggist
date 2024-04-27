import GistEditor from "@/components/gist/GistEditor";
import GistHeader from "@/components/gist/GistHeader";

export default function Gist({ user }: { user?: UserWithGistType }) {
  if (!user) return;
  return (
    <>
      <div className="border-b border-black-500 mt-16">
        <div className="container">
          <GistHeader user={user} />
        </div>
      </div>
      <GistEditor user={user} />
    </>
  );
}
