"use client"

import { Suspense, useEffect, useState } from "react"
import * as Server from "./server"
import { useAtomValue } from "jotai"
import { authAtom } from "@/shared/state"
import { ApplicationsResponse } from "./types"
import { ResponseError, isResponseError } from "@/shared/types"
import { Badge, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react"

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

    if (!isResponseError(apps) && apps?.items) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                {apps?.items?.map((item) => (
                    <Card key={item.metadata.name} className="">
                        <CardHeader>
                            {item.status.health.status === "Healthy" ? 
                                <span className="rounded-full w-3 h-3 bg-success mr-2"></span> : 
                                <span className="rounded-full w-3 h-3 bg-danger mr-2"></span>
                            }

                            <span>{item.metadata.name}</span>
                        </CardHeader>
                        <CardBody>

                        </CardBody>


                    </Card>
                ))}
            </div>
        )
    } else {
        return (<div className="h-[200px] grid content-center">
            <Spinner />
        </div>)
    }

}

export default function HomePage() {
    return (
        <main>
            <Applications />
        </main>)
}