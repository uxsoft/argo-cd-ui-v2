"use server"

import { host } from "@/shared/server";
import { ResponseError } from "@/shared/types";
import { Application, ApplicationTree } from "@/shared/argocd";

export async function getResourceTree(token: string, name: string, namespace: string): Promise<ResponseError | ApplicationTree> {
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
  
      return result as ApplicationTree
    } catch (error) {
      console.error(error)
      return error as ResponseError
    }
  }

  export async function getApplicationDetails(token: string, name: string, namespace: string): Promise<ResponseError | Application> {
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
  
      return result as Application
    } catch (error) {
      console.error(error)
      return error as ResponseError
    }
  }
