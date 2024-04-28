import Link from "next/link";

export default function GistHeader({ user }: { user: UserWithGistType }) {
  return (
    <>
      <div className="container p-6">
        <Link
          className="block text-center md:mr-32 font-semibold text-blue-500"
          href={user.name}
        >
          View your gists
        </Link>
      </div>
    </>
  );
}
