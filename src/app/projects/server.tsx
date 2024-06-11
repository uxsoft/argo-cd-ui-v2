"use server"
import { ProjectList } from "@/shared/argocd";
import { host } from "@/shared/server";
import { ResponseError } from "@/shared/types";
import { metadata } from "../layout";

export async function listProjects(token: string): Promise<ProjectList> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    let response = await fetch(
        `${host}/api/v1/projects`, {
        "headers": {
            "accept": "*/*",
            "cookie": `argocd.token=${token}`,
        },
        "body": null,
        "method": "GET"
    });
    let result = await response.json()
    return result as ProjectList
}


export async function createProject(token: string, payload: { name: string, description: string }): Promise<{}> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    let response = await fetch(
        `${host}/api/v1/projects`, {
        "headers": {
            "accept": "*/*",
            "content-type": "application/json",
            "cookie": `argocd.token=${token}`,
        },
        "body": JSON.stringify({ project: { metadata: { name: payload.name }, spec: { description: payload.description } } }),
        "method": "POST"
    });
    let result = await response.json()
    return result as {}
}

export async function deleteProject(token: string, name: string): Promise<{}> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    let response = await fetch(
        `${host}/api/v1/projects/${name}`, {
        "headers": {
            "accept": "*/*",
            "content-type": "application/json",
            "cookie": `argocd.token=${token}`,
        },
        "method": "DELETE"
    });
    let result = await response.json()
    return result as {}
}