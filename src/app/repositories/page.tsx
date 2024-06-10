"use client"

import { authAtom } from "@/shared/state";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import * as Server from "./server"
import { RepositoriesResponse } from "./types";
import { ResponseError, isResponseError } from "@/shared/types";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/plus";

function ConnectionStatus(props: { status: string }) {
    return (<span>
        {props.status === "Successful" ?
            <span className="rounded-full bg-success mr-2">&nbsp;&nbsp;</span> :
            <span className="rounded-full bg-danger mr-2">&nbsp;&nbsp;</span>}
        {props.status}
    </span>)

}

function RepositoryList() {
    const auth = useAtomValue(authAtom)
    const [repositories, setRepositories] = useState({} as RepositoriesResponse | ResponseError)
    useEffect(() => {
        if (auth.token) {
            Server.getRepositories(auth.token)
                .then(setRepositories)
                .catch(console.error)
        }
    }, [auth.token]);

    if (isResponseError(repositories)) {
        return <></>
    }

    const columns = [
        {
            key: "type",
            label: "TYPE",
        },
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "repo",
            label: "REPOSITORY",
        },
        {
            key: "status",
            label: "CONNECTION STATUS"
        }
    ];

    return (<div className="flex flex-col gap-4 m-4">
        <div className="flex justify-end">
            <Button
                className="bg-foreground text-background"
                endContent={<PlusIcon />}
                size="sm"
            >
                Add New
            </Button>
        </div>
        <Table selectionMode="single">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={repositories?.items ?? []}>
                {(item) => (
                    <TableRow key={item.repo}>
                        {(columnKey) =>
                            <TableCell>
                                {
                                    columnKey === "status" ?
                                        <ConnectionStatus status={item.connectionState.status} /> :
                                        <>{getKeyValue(item, columnKey)}</>

                                }
                            </TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>)
}

export default function RepositoriesPage() {

    return (<div>
        <RepositoryList />

    </div>)
}