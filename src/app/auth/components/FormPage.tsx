import Link from "next/link";
import { CustomForm } from "./Form";

export default async function FormPage({
  authType,
  onSubmit,
  formSchema,
}: {
  authType: string;
  onSubmit: any;
  formSchema: any;
}) {
  return (
    <div className="m-auto w-fit min-h-screen flex items-center">
      <div className="border border-smoke-300 p-12 flex flex-col justify-center m-auto">
        <h2 className="text-3xl font-bold mb-4">
          {authType === "signup" ? "Create an account" : "Welcome back..."}
        </h2>
        <CustomForm
          onSubmit={onSubmit}
          authType={authType}
          formSchema={formSchema}
        />
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        <Link
          href={"/auth/google"}
          className="flex items-center justify-center w-full mb-4 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Google
        </Link>
        <Link
          href={"/auth/github"}
          className="flex items-center justify-center w-full mb-4 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Github
        </Link>
        <p className="text-xs text-gray-500 mt-4">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
