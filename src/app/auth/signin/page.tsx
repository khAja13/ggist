'use client';

import { signInSchema } from "@/validations";
import FormPage from "../components/FormPage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/loading";
import { toast } from "@/components/ui/use-toast";

export default function SignIn() {
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    async function onSubmit(user: FormData) {
        try {
            setLoading(true);
            await axios.post("/api/signin", user);
            
            router.push("/");
            router.refresh();
            return;
        } catch (error:any) {
            // Need to show the in form validations
            toast({
                variant: "destructive",
                title: "Signup Error",
                description: error.response.data.error,
            })
        }finally {
            setLoading(false);
        }
    }

    return(
        <>
            {
                loading ? <LoadingSpinner /> : <FormPage authType="signin" onSubmit={onSubmit} formSchema={signInSchema}/>
            }
        </>
    )
}