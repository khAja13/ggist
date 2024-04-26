// @ts-nocheck
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function CustomForm({ onSubmit, authType, formSchema }: {onSubmit: any, authType: string, formSchema: any}) {
  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password: ""
        },
  })
  
  return (
    <Form {...form}>
      <form action={form.handleSubmit(onSubmit)} className="space-y-8">
        {authType == "signup" ? <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> : "" }
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {authType === 'signup' ? 
          <p className="mt-4">
            Already have an account? <Link className="text-red-500 underline" href="/auth/signin">Login here</Link> 
          </p>
            : 
            <p className="mt-4">
              Don't have an account? <Link className="text-blue-500 underline" href="/auth/signup">Register here</Link>
            </p>
          }
          <br />
        <Button className="!-mt-12" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
