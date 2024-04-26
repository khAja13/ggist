import GistEditorHeader from "./GistEditorHeader";

export default function GistEditor({ user }: { user: UserWithGistType }) {
    return(
        <>
            <div className="container p-6 flex flex-col items-center">
                <GistEditorHeader />
            </div>
        </>
    )
}