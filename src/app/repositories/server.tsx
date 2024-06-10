"use server"

import { host } from "@/shared/server";
import { ResponseError } from "@/shared/types";
import { RepositoriesResponse, RepositoryCredentialsResponse } from "./types";

export async function getRepositories(token: string): Promise<ResponseError | RepositoriesResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    try {
        let response = await fetch(
            `${host}/api/v1/repositories`, {
            "headers": {
              "accept": "*/*",
              "cookie": `argocd.token=${token}`,
            },
            "body": null,
            "method": "GET"
          });
        let result = await response.json()
        return result as RepositoriesResponse
    } catch (error) {
        return error as ResponseError
    }
}

export async function getRepositoryCredentials(token: string): Promise<ResponseError | RepositoryCredentialsResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    try {
        let response = await fetch(
            `${host}/api/v1/repocreds`, {
            "headers": {
              "accept": "*/*",
              "cookie": `argocd.token=${token}`,
            },
            "body": null,
            "method": "GET"
          });
        let result = await response.json()
        return result as RepositoryCredentialsResponse
    } catch (error) {
        return error as ResponseError
    }
}
