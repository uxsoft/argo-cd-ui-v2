"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { useSetAtom } from "jotai"
import * as Server from "./server"
import { authState } from "../state"
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { isLoginSuccess } from "./types";

export default function Home() {

    const loginForm = useForm()
    const setAuthState = useSetAtom(authState)
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    function onLogin(form: { username: string, password: string }) {
        setError("")
        setLoading(true)
        Server.onLogin(form).then((r) => {
            if (isLoginSuccess(r)) {
                setAuthState(r)
                router.push("/")
            } else {
                setError(r.message)
            }
            setLoading(false)
        }).catch((e) => console.error(e));
    }

    return (
        <main className="grid content-center justify-center">
            <Card className="w-[400px] p-4 mt-40">
                <CardHeader>
                    Argo CD
                </CardHeader>
                <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={loginForm.handleSubmit(onLogin)}>
                        <Input {...loginForm.register("username")} placeholder="Username" />
                        <Input {...loginForm.register("password")} placeholder="Password" type="password" />
                        <div className="text-red-500">
                            {error}
                        </div>
                        <Button isLoading={loading} type="submit">Sign in</Button>
                    </form>
                </CardBody>
            </Card>
        </main>
    );
}
