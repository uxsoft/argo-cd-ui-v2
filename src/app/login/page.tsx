"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { useAtom, useSetAtom } from "jotai"
import * as Server from "./server"
import { authAtom, userInfoAtom } from "../../shared/state"
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { isResponseError } from "@/shared/types";

export default function LoginPage() {

    const loginForm = useForm()
    const setAuth = useSetAtom(authAtom)
    const setUserInfo = useSetAtom(userInfoAtom)

    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function onLogin(form: { username: string, password: string }) {
        try {
            setError("")
            setLoading(true)

            let sessionResponse = await Server.postSession(form)

            if (isResponseError(sessionResponse)) {
                throw sessionResponse
            }

            setAuth(sessionResponse)

            let userInfoResponse = await Server.getUserInfo(sessionResponse.token);
            if (isResponseError(userInfoResponse)) {
                throw userInfoResponse
            }

            setUserInfo(userInfoResponse)

            // TODO Save session info to local storage
            router.push("/")

            setLoading(false)

        } catch (error) {
            console.error(error)
            setError(error.message)
            setLoading(false)
        }
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
