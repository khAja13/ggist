"use client";

import { signInSchema } from "@/validations";
import FormPage from "../components/FormPage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { useSetRecoilState } from "recoil";
import { userState } from "@/lib/store1";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const setUser = useSetRecoilState(userState);

    async function onSubmit(user: FormData) {
        try {
            setLoading(true);
            const userState = await axios.post("/api/signin", user);
            console.log(userState.data.user);
            
            setUser(userState.data.user);

            router.push("/");
            router.refresh();
            return;
        } catch (error: any) {
            // Need to show the in form validations
            toast({
                variant: "destructive",
                title: "Signin Error",
                description: error.response.data.error,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <FormPage
                    authType="signin"
                    onSubmit={onSubmit}
                    formSchema={signInSchema}
                />
            )}
        </>
    );
}
