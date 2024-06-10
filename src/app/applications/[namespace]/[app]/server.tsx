"use server"

import { host } from "@/shared/server";
import { ResponseError } from "@/shared/types";
import { ApplicationDetailResponse, ResourceTreeResponse } from "./types";

export async function getResourceTree(token: string, name: string, namespace: string): Promise<ResponseError | ResourceTreeResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    try {
      let response = await fetch(
        `${host}/api/v1/applications/${name}/resource-tree?appNamespace=${namespace}`, {
        headers: {
          accept: "*/*",
          cookie: `argocd.token=${token}`,
        },
        method: "GET"
      });
  
      let result = await response.json()
  
      return result as ResourceTreeResponse
    } catch (error) {
      console.error(error)
      return error as ResponseError
    }
  }

  export async function getApplicationDetails(token: string, name: string, namespace: string): Promise<ResponseError | ApplicationDetailResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    try {
      let response = await fetch(
        `${host}/api/v1/applications/${name}?appNamespace=${namespace}`, {
        headers: {
          accept: "*/*",
          cookie: `argocd.token=${token}`,
        },
        method: "GET"
      });
  
      let result = await response.json()
  
      return result as ApplicationDetailResponse
    } catch (error) {
      console.error(error)
      return error as ResponseError
    }
  }
