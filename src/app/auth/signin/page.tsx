'use client';

import { signInSchema } from "@/validations";
import FormPage from "../components/FormPage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/loading";

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
            console.log("Signin failed", error.message);
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