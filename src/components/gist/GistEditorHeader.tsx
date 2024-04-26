import { Input } from "../ui/input";

export default function GistEditorHeader() {
    return(
        <>
            <div className="w-7/12">
                <Input type="text" width="100%" placeholder="Enter gist description..." className="py-5" />
            </div>
        </>
    )
}