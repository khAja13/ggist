'use client';

import { signUpSchema } from "@/validations";
import FormPage from "../components/FormPage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/loading";
import { toast } from "@/components/ui/use-toast";

export default function SignUp() {
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    async function onSubmit(user: FormData) {
        
        try {
            setLoading(true);
            await axios.post("/api/signup", user);
            router.push("/");
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

        return {};
    }

    return(
        <>
            {
                loading ? <LoadingSpinner /> : <FormPage authType="signup" onSubmit={onSubmit} formSchema={signUpSchema}/>
            }
        </>
    )
}