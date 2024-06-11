"use client"

import { authAtom } from "@/shared/state"
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Server from "../server"
import { useRouter } from "next/navigation"
import { isResponseError } from "@/shared/types"

export default function NewProjectPage() {
    const auth = useAtomValue(authAtom)
    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    });
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function onCreateGit(form: { name: string, description: string }) {
        setLoading(true)
        setError("")

        const response = await Server.createProject(auth.token, form)
        if (isResponseError(response)) {
            setLoading(false)
            setError(response.message)
        } else {
            setLoading(true)
            setError("")
            router.push("/projects")
        }
    }

    return (<Card>
        <CardHeader>
            Connect to a repository using HTTPS
        </CardHeader>
        <CardBody>

            <form onSubmit={form.handleSubmit(onCreateGit)} className="flex flex-col gap-3">

                <Input {...form.register("name", { required: "Project Name is required" })}
                    label="Project Name"
                    isInvalid={!!form.formState.errors.name}
                    errorMessage={form.formState.errors.name?.message}
                />

                <Input {...form.register("description")}
                    label="Description"
                    isInvalid={!!form.formState.errors.description}
                    errorMessage={form.formState.errors.description?.message}
                />
                <div className="text-danger">{error}</div>
                <div className="flex flex-row justify-end">
                    <Button type="submit" color="primary" isLoading={loading}>Create</Button>
                </div>
            </form>

        </CardBody>
    </Card>)
}
