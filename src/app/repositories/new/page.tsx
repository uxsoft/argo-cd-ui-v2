"use client"

import { authAtom } from "@/shared/state"
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Server from "../server"
import { useRouter } from "next/navigation"
import { isResponseError } from "@/shared/types"
import { CreateGitRepositoryRequest } from "../types"

function GitForm() {
    const auth = useAtomValue(authAtom)
    const form = useForm({
        defaultValues: {
            type: "git",
            project: "default"
        } as CreateGitRepositoryRequest
    });
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const selectedType = form.watch("type")

    async function onCreateGit(form: CreateGitRepositoryRequest) {
        setLoading(true)
        setError("")

        const response = await Server.createRepository(auth.token, form)
        if (isResponseError(response)) {
            setLoading(false)
            setError(response.message)
        } else {
            setLoading(true)
            setError("")
            router.push("/repositories")
        }
    }

    return (<Card>
        <CardHeader>
            Connect to a repository using HTTPS
        </CardHeader>
        <CardBody>

            <form onSubmit={form.handleSubmit(onCreateGit)} className="flex flex-col gap-3">
                <Select {...form.register("type")}
                    label="Type"
                    placeholder="Git or Helm">
                    <SelectItem key="git">Git</SelectItem>
                    <SelectItem key="helm">Helm</SelectItem>
                </Select>
                {selectedType === "helm" &&
                    <Input {...form.register("name", { required: "For Helm name is required" })}
                        isInvalid={!!form.formState.errors.name}
                        errorMessage={form.formState.errors.name?.message}
                        label="Name"
                        placeholder="" />
                }
                <Select {...form.register("project")}
                    label="Project"
                    placeholder="">
                    <SelectItem key="default">Default</SelectItem>
                </Select>
                <Input {...form.register("repo", { required: "Repository URL is required" })}
                    isInvalid={!!form.formState.errors.repo}
                    errorMessage={form.formState.errors.repo?.message}
                    label="Repository URL"
                    placeholder="https://" />

                <Input {...form.register("username")}
                    label="Username"
                    placeholder="(optional)" />

                <Input {...form.register("password")}
                    label="Password"
                    placeholder="(optional)" />
                <div className="text-danger">{error}</div>
                <div className="flex flex-row justify-end">
                    <Button type="submit" color="primary" isLoading={loading}>Create</Button>
                </div>
            </form>

        </CardBody>
    </Card>)
}

export default function NewRepositoryPage() {
    const [method, setMethod] = useState("git")

    console.log(method)

    return (<div className="flex flex-col gap-4 m-4">
        <Select
            label="Connection Method"
            placeholder="choose your connection method"
            selectedKeys={[method]}
            onChange={(e) => setMethod(e.target.value)}>
            <SelectItem key="ssh">SSH</SelectItem>
            <SelectItem key="git">HTTPS</SelectItem>
            <SelectItem key="github">GitHub App</SelectItem>
            <SelectItem key="gcloud">Google Cloud</SelectItem>
        </Select>

        {method === "git" &&
            <GitForm />
        }

    </div>)
}