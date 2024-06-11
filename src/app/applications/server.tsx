"use server"

import { host } from "@/shared/server";
import { ClustersResponse, SettingsResponse, VersionResponse } from "./types";
import { ResponseError } from "@/shared/types";
import { ApplicationList, ProjectList } from "@/shared/argocd";

export async function fetchSettings(token: string): Promise<ResponseError | SettingsResponse> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/v1/settings`, {
      "headers": {
        "accept": "*/*",
        "cookie": `argocd.token=${token}`,
      },
      "body": null,
      "method": "GET"
    });
    let result = await response.json()
    return result as SettingsResponse
  } catch (error) {
    return error as ResponseError
  }
}

export async function fetchVersion(token: string): Promise<ResponseError | VersionResponse> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/version`, {
      headers: {
        accept: "*/*",
        cookie: `argocd.token=${token}`,
      },
      method: "GET"
    });

    let result = await response.json()

    return result as VersionResponse
  } catch (error) {
    console.error(error)
    return error as ResponseError
  }
}

export async function fetchClusters(token: string): Promise<ResponseError | ClustersResponse> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/v1/clusters`, {
      "headers": {
        "accept": "*/*",
        "cookie": `argocd.token=${token}`,
      },
      "body": null,
      "method": "GET"
    });
    let result = await response.json()
    return result as ClustersResponse
  } catch (error) {
    return error as ResponseError
  }
}

export async function listApplications(token: string): Promise<ResponseError | ApplicationList> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/v1/applications?fields=metadata.resourceVersion%2Citems.metadata.name%2Citems.metadata.namespace%2Citems.metadata.annotations%2Citems.metadata.labels%2Citems.metadata.creationTimestamp%2Citems.metadata.deletionTimestamp%2Citems.spec%2Citems.operation.sync%2Citems.status.sync.status%2Citems.status.sync.revision%2Citems.status.health%2Citems.status.operationState.phase%2Citems.status.operationState.finishedAt%2Citems.status.operationState.operation.sync%2Citems.status.summary%2Citems.status.resources&selector=&appNamespace=`, {
      "headers": {
        "accept": "*/*",
        "cookie": `argocd.token=${token}`,
      },
      "body": null,
      "method": "GET"
    });
    let result = await response.json()
    return result as ApplicationList
  } catch (error) {
    return error as ResponseError
  }
}

export async function listProjects(token: string): Promise<ResponseError | ProjectList> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let response = await fetch(
      `${host}/api/v1/projects?fields=items.metadata.name`, {
      "headers": {
        "accept": "*/*",
        "cookie": `argocd.token=${token}`,
      },
      "body": null,
      "method": "GET"
    });
    let result = await response.json()
    return result as ProjectList
  } catch (error) {
    return error as ResponseError
  }
}