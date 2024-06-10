"use client"

import { useEffect, useState } from "react"
import * as Server from "./server"
import { useAtomValue } from "jotai"
import { authAtom } from "@/shared/state"
import { ApplicationsResponse, IApplication } from "./types"
import { ResponseError, isResponseError } from "@/shared/types"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Spinner } from "@nextui-org/react"
import { ArrowSyncCheckmark20Filled, Heart16Filled } from "@fluentui/react-icons"

function AppHealthStatus(props: { app: IApplication }) {
    switch (props.app.status.health.status) {
        case "Healthy":
            return (<span>
                <Heart16Filled className="text-success mr-1" />
                Healthy
            </span>)
        default:
            return (<span className="text-warning">
                {props.app.status.health.status}
            </span>)
    }
}

function AppSyncStatus(props: { app: IApplication }) {
    switch (props.app.status.sync.status) {
        case "Synced":
            return (<span>
                <ArrowSyncCheckmark20Filled className="text-success mr-1" />
                Synced
            </span>)
        default:
            return (<span className="text-warning">
                {props.app.status.sync.status}
            </span>)
    }
}

function Application(props: { app: IApplication }) {
    return (<Card key={props.app.metadata.name} className="">
        <CardHeader>
            {/* <Avatar color="success" /> */}
            <div className="flex flex-col ml-4">
                <p className="text-md">{props.app.metadata.name}</p>
                <div className="text-small text-default-500 flex flex-row gap-2">
                    <AppHealthStatus app={props.app} />
                    <AppSyncStatus app={props.app} />
                </div>
            </div>
        </CardHeader>
        <Divider />
        <CardBody className="text-sm">
            <table>
                <tr>
                    <th>External URLs:</th>
                    <td>{props.app.status.summary.externalURLs.map((url) => (<Link className="text-sm" showAnchorIcon isExternal underline="hover" href={url}>{url}</Link>))}</td>
                </tr>
                <tr>
                    <th>Images:</th>
                    <td>{props.app.status.summary.images.join(",")}</td>
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
                    <td>{new Date(Date.parse(props.app.metadata.creationTimestamp)).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Last Sync:</th>
                    <td>{new Date(Date.parse(props.app.status.operationState.finishedAt)).toLocaleString()}</td>
                </tr>

            </table>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-row justify-end">
            <Button size="sm" color="primary" as={Link} href="/">Open</Button>
        </CardFooter>
    </Card>)
}

export default function ApplicationsPage() {
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
                    <Application app={item} />
                ))}
            </div>
        )
    } else {
        return (<div className="h-[200px] grid content-center">
            <Spinner />
        </div>)
    }

}