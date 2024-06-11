"use client"

import { CreateGitRepositoryRequest } from "@/app/repositories/types";
import { authAtom } from "@/shared/state";
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewApplicationPage() {
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

    return (<div className="m-4">
        <Card>
            <CardHeader>
                Create an application
            </CardHeader>
            <CardBody>
                
            </CardBody>
        </Card>
    </div>)
}