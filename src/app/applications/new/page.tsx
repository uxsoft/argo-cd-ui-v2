"use client"

import { authAtom } from "@/shared/state"
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Server from "../server"
import { useRouter } from "next/navigation"
import { isResponseError } from "@/shared/types"

interface IAppForm {
    name: string
    namespace: string
    project: string
    repoURL: string
    targetRevision: string
    path: string
    server: string
}

export default function NewApplicationPage() {
    const auth = useAtomValue(authAtom)
    const form = useForm({
        defaultValues: {
            name: "",
            namespace: "",
            project: "default",
            repoURL: "",
            targetRevision: "HEAD",
            path: "",
            server: ""
        } as IAppForm
    });
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function onCreate(form: IAppForm) {
        setLoading(true)
        setError("")

        let payload = {
            "apiVersion": "argoproj.io/v1alpha1",
            "kind": "Application",
            "metadata": {
                "name": form.name,
                "finalizers": [
                    "resources-finalizer.argocd.argoproj.io"
                ]
            },
            "spec": {
                "destination": {
                    "name": "",
                    "namespace": form.namespace,
                    "server": form.server
                },
                "source": {
                    "path": form.path,
                    "repoURL": form.repoURL,
                    "targetRevision": form.targetRevision
                },
                "sources": [],
                "project": "default",
                "syncPolicy": {
                    "automated": {
                        "prune": true,
                        "selfHeal": true
                    },
                    "syncOptions": [
                        "Validate=false",
                        "CreateNamespace=true",
                        "PruneLast=true",
                        "ApplyOutOfSyncOnly=true",
                        "RespectIgnoreDifferences=true",
                        "ServerSideApply=true",
                        "Replace=true"
                    ],
                    "retry": {
                        "limit": 2,
                        "backoff": {
                            "duration": "5s",
                            "maxDuration": "3m0s",
                            "factor": 2
                        }
                    }
                }
            }
        }

        const response = await Server.createApplication(auth.token, payload)
        if (isResponseError(response)) {
            setLoading(false)
            setError(response.message)
        } else {
            setLoading(true)
            setError("")
            router.push("/projects")
        }
    }

    return (<div className="flex flex-col gap-4 p-4">
        <form onSubmit={form.handleSubmit(onCreate)} className="flex flex-col gap-3">
            <Card>
                <CardHeader>General</CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input {...form.register("name", { required: "The application name is required" })}
                        label="Application Name"
                        isInvalid={!!form.formState.errors.name}
                        errorMessage={form.formState.errors.name?.message}
                    />
                    {/* TODO Autocomplete existing projects, select the first one */}
                    <Select
                        {...form.register("project", { required: "A project is required" })}
                        isInvalid={!!form.formState.errors.project}
                        errorMessage={form.formState.errors.project?.message}
                        label="Project Name">
                        <SelectItem key="default">default</SelectItem>
                    </Select>



                </CardBody>
            </Card>
            <Card>
                <CardHeader>Source</CardHeader>
                <CardBody className="flex flex-col gap-4">
                    {/* TODO autocomplete existing repositories, pre-select the first one */}
                    <Select
                        {...form.register("repoURL", { required: "Repository URL is required" })}
                        isInvalid={!!form.formState.errors.repoURL}
                        errorMessage={form.formState.errors.repoURL?.message}
                        label="Repository URL"
                    >
                        <SelectItem key="repo1">repo1</SelectItem>
                    </Select>
                    {/* TODO Autocomplete existing branches */}
                    <Input {...form.register("targetRevision")}
                        label="Revision"
                        isInvalid={!!form.formState.errors.targetRevision}
                        errorMessage={form.formState.errors.targetRevision?.message}
                    />
                    {/* Autocomplete existing paths */}
                    <Input {...form.register("path")}
                        label="Path"
                        isInvalid={!!form.formState.errors.path}
                        errorMessage={form.formState.errors.path?.message}
                    />
                </CardBody>

            </Card>
            <Card>
                <CardHeader>Destination</CardHeader>
                <CardBody className="flex flex-col gap-4">
                    {/* TODO autocomplete existing servers, pre-select the first one */}
                    <Select
                        {...form.register("server", { required: "Cluster URL is required" })}
                        isInvalid={!!form.formState.errors.server}
                        errorMessage={form.formState.errors.server?.message}
                        label="Cluster URL"
                    >
                        <SelectItem key="cluster1">cluster1</SelectItem>
                    </Select>
                    <Input {...form.register("namespace")}
                        label="Namespace"
                        isInvalid={!!form.formState.errors.namespace}
                        errorMessage={form.formState.errors.namespace?.message}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader>Helm</CardHeader>
                <CardBody className="flex flex-col gap-4">
                    {/* TODO autocomplete existing repositories, pre-select the first one */}
                    <Select
                        {...form.register("server", { required: "Cluster URL is required" })}
                        isInvalid={!!form.formState.errors.server}
                        errorMessage={form.formState.errors.server?.message}
                        label="Cluster URL"
                    >
                        <SelectItem key="cluster1">cluster1</SelectItem>
                    </Select>
                    {/* TODO Autocomplete existing branches */}
                    <Input {...form.register("namespace")}
                        label="Namespace"
                        isInvalid={!!form.formState.errors.namespace}
                        errorMessage={form.formState.errors.namespace?.message}
                    />
                </CardBody>
            </Card>


            <div className="text-danger">{error}</div>
            <div className="flex flex-row justify-end">
                <Button type="submit" color="primary" isLoading={loading}>Create</Button>
            </div>
        </form>
    </div>)
}



