"use client"

import { useEffect, useState } from "react"
import * as Server from "./server"
import { useAtomValue } from "jotai"
import { authAtom } from "@/shared/state"
import { ResponseError, isResponseError } from "@/shared/types"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Spinner } from "@nextui-org/react"
import { ComparisonStatusIcon, HealthStatusIcon } from "@/components/argo-utils"
import { Application, ApplicationList } from "@/shared/argocd"
import { Add20Filled } from "@fluentui/react-icons"

function ApplicationCard(props: { app: Application }) {
    return (<Card key={props.app.metadata.name} className="">
        <CardHeader>
            <div className="flex flex-col">
                <p className="text-lg">{props.app.metadata.name}</p>
                <div className="text-small text-default-500 flex flex-row gap-2">
                    <HealthStatusIcon state={props.app.status.health} />
                    <ComparisonStatusIcon status={props.app.status.sync.status} />
                </div>
            </div>
        </CardHeader>
        <Divider />
        <CardBody className="text-sm">
            <table>
                <tr>
                    <th>External URLs:</th>
                    <td>{props.app.status.summary?.externalURLs?.map((url) => (<Link className="text-sm" showAnchorIcon isExternal underline="hover" href={url}>{url}</Link>))}</td>
                </tr>
                <tr>
                    <th>Images:</th>
                    <td>{props.app.status.summary?.images?.join(",")}</td>
                </tr>
                <tr>
                    <th>Namespace:</th>
                    <td>{props.app.spec.destination.namespace}</td>
                </tr>
                <tr>
                    <th>Repository:</th>
                    <td><Link className="text-sm" isExternal showAnchorIcon underline="hover" href={props.app.spec.source.repoURL}>{props.app.spec.source.repoURL}</Link></td>
                </tr>
                <tr>
                    <th>Created At:</th>
                    <td>{new Date(Date.parse(props.app.metadata.creationTimestamp ?? "")).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Last Sync:</th>
                    <td>{new Date(Date.parse(props.app.status.operationState?.finishedAt ?? "")).toLocaleString()}</td>
                </tr>

            </table>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-row justify-end">
            <Button
                size="sm"
                color="secondary"
                as={Link}
                href={`/applications/${props.app.metadata.namespace}/${props.app.metadata.name}`}>
                Open
            </Button>
        </CardFooter>
    </Card>)
}

export default function ApplicationsPage() {
    const auth = useAtomValue(authAtom)
    const [apps, setApps] = useState({} as ApplicationList | ResponseError)
    useEffect(() => {
        if (auth.token) {
            Server.listApplications(auth.token)
                .then(setApps)
                .catch(console.error)
        }
    }, [auth.token]);

    if (!isResponseError(apps) && apps?.items) {
        return (<div className="flex flex-col gap-4 m-4">
            <div className="flex justify-end gap-3">
                <Button
                    href="/applications/new"
                    as={Link}
                    color="primary"
                    endContent={<Add20Filled />}
                    size="sm">
                    Add New
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {apps?.items?.map((item) => (
                    <ApplicationCard app={item} />
                ))}
            </div>
        </div>
        )
    } else {
        return (<div className="h-[200px] grid content-center">
            <Spinner />
        </div>)
    }

}