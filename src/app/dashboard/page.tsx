"use client"

import { Suspense, useEffect, useState } from "react"
import * as Server from "./server"
import { useAtomValue } from "jotai"
import { authAtom } from "@/shared/state"
import { ApplicationsResponse } from "./types"
import { ResponseError, isResponseError } from "@/shared/types"
import { Card, CardBody, CardHeader } from "@nextui-org/react"

function Applications() {
    const auth = useAtomValue(authAtom)
    const [apps, setApps] = useState({} as ApplicationsResponse | ResponseError)
    useEffect(() => {
        if (auth.token) {
            Server.fetchApplications(auth.token)
                .then(setApps)
                .catch(console.error)
        }
    }, [auth.token]);

    if (isResponseError(apps)) {
        return <>Response Error</>
    }

    return (
        <div className="grid grid-cols-3 gap-4 m-4">
            {apps?.items?.map((item) => (
                <Card key={item.metadata.name} className="">
                    <CardHeader>{item.metadata.name}</CardHeader>
                    <CardBody>

                    </CardBody>
                
                
                </Card>
            ))}
        </div>
    )
}

export default function HomePage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Applications />
            </Suspense>
        </main>)
}