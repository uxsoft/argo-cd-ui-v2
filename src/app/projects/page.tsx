"use client"

import { authAtom } from "@/shared/state";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import * as Server from "./server"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add20Filled, Delete20Filled, Edit20Filled, Eye20Filled } from "@fluentui/react-icons";
import { ProjectList, Project } from "@/shared/argocd";

function ConnectionStatus(props: { status: string }) {
    return (<span>
        {props.status === "Successful" ?
            <span className="rounded-full bg-success mr-2">&nbsp;&nbsp;</span> :
            <span className="rounded-full bg-danger mr-2">&nbsp;&nbsp;</span>}
        {props.status}
    </span>)
}

function Actions(props: { item: Project }) {
    const auth = useAtomValue(authAtom)
    const router = useRouter()

    async function onDelete(item: Project) {
        const response = await Server.deleteProject(auth.token, item?.metadata?.name ?? "")
        router.refresh()
    }

    return (<div className="relative flex items-center gap-2">
        {/* <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Eye20Filled />
            </span>
        </Tooltip>
        <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Edit20Filled />
            </span>
        </Tooltip> */}
        <Tooltip color="danger" content="Delete Project">
            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => onDelete(props.item)}>
                <Delete20Filled />
            </span>
        </Tooltip>
    </div>)
}

export default function ProjectsPage() {
    const auth = useAtomValue(authAtom)
    const [projects, setProjects] = useState({} as ProjectList)
    useEffect(() => {
        if (auth.token) {
            Server.listProjects(auth.token)
                .then(setProjects)
                .catch(console.error)
        }
    }, [auth.token]);

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "description",
            label: "DESCRIPTION",
        },
        {
            key: "actions",
            label: "ACTIONS",
        },
    ];

    return (<div className="flex flex-col gap-4 m-4">
        <div className="flex justify-end gap-3">
            <Button
                href="/projects/new"
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
            <TableBody items={projects?.items ?? []}>
                {(item) => (
                    <TableRow key={item.metadata.name}>
                        {(columnKey) =>
                            <TableCell>
                                {
                                    columnKey === "name" ?
                                        <>{item.metadata.name}</> :
                                        columnKey === "description" ?
                                            <>{item.spec.description}</> :
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