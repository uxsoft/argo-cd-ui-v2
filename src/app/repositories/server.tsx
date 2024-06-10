"use server"

import { host } from "@/shared/server";
import { ResponseError, isResponseError } from "@/shared/types";
import { CreateGitRepositoryRequest, RepositoriesResponse, RepositoryCredentialsResponse } from "./types";

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


export async function createRepository(token: string, payload: CreateGitRepositoryRequest): Promise<ResponseError | {}> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/v1/repositories`, {
      "headers": {
        "accept": "*/*",
        "content-type": "application/json",
        "cookie": `argocd.token=${token}`,
      },
      "body": JSON.stringify(payload),
      "method": "POST"
    });
    let result = await response.json()
    return result as {}
  } catch (error) {
    console.error(error)
    if (isResponseError(error as object)) {
      return error as ResponseError
    } else {
      return { error: JSON.stringify(error), message: JSON.stringify(error) }
    }
  }
}

export async function deleteRepository(token: string, name: string): Promise<ResponseError | {}> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/v1/repositories/${encodeURIComponent(name)}`, {
      "headers": {
        "accept": "*/*",
        "content-type": "application/json",
        "cookie": `argocd.token=${token}`,
      },
      "method": "DELETE"
    });
    let result = await response.text()
    console.log(result)
    return result as {}
  } catch (error) {
    if (isResponseError(error as object)) {
      return error as ResponseError
    } else {
      return { error: JSON.stringify(error), message: JSON.stringify(error) }
    }
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
