"use client"

import { authAtom } from "@/shared/state";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import * as Server from "./server"
import { IRepository, RepositoriesResponse } from "./types";
import { ResponseError, isResponseError } from "@/shared/types";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add20Filled, Delete20Filled, Edit20Filled, Eye20Filled } from "@fluentui/react-icons";

function ConnectionStatus(props: { status: string }) {
    return (<span>
        {props.status === "Successful" ?
            <span className="rounded-full bg-success mr-2">&nbsp;&nbsp;</span> :
            <span className="rounded-full bg-danger mr-2">&nbsp;&nbsp;</span>}
        {props.status}
    </span>)
}

function Actions(props: {item: IRepository}) {
    const auth = useAtomValue(authAtom)
    const router = useRouter()

    async function onDelete(item: IRepository) {
        const response = await Server.deleteRepository(auth.token, item.repo)
        router.refresh()
        console.log(response)

    }

    return (<div className="relative flex items-center gap-2">
        <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Eye20Filled />
            </span>
        </Tooltip>
        <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Edit20Filled />
            </span>
        </Tooltip>
        <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={()=>onDelete(props.item)}>
                <Delete20Filled />
            </span>
        </Tooltip>
    </div>)
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
        },
        {
            key: "actions",
            label: "ACTIONS"
        }
    ];

    return (<div className="flex flex-col gap-4 m-4">
        <div className="flex justify-end gap-3">
            <Button
                href="/repositories/new"
                as={Link}
                color="primary"
                endContent={<Add20Filled />}
                size="sm">
                Add New
            </Button>
        </div>
        <Table>
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
                                    columnKey === "actions" ?
                                        <Actions item={item} /> :
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