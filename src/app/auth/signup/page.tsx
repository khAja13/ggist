'use client';

import { signUpSchema } from "@/validations";
import FormPage from "../components/FormPage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    async function onSubmit(user: FormData) {
        
        try {
            setLoading(true);
            await axios.post("/api/signup", user);
            router.push("/");
        } catch (error:any) {
            console.log("Signup failed", error.message);
        }finally {
            setLoading(false);
        }

        return {};
    }

    return(
        <>
            {
                loading ? <h1>Signup page is loading..</h1> : <FormPage authType="signup" onSubmit={onSubmit} formSchema={signUpSchema}/>
            }
        </>
    )
}