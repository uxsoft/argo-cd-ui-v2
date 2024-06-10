"use server"

import { ResponseError, host } from "@/shared/server";
import { LoginResponse, UserInfoResponse } from "./types";

export async function postSession(form: { username: string, password: string }): Promise<ResponseError | LoginResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    try {
        let response = await fetch(
            `${host}/api/v1/session`, {
            "headers": {
                "accept": "*/*",
                "content-type": "application/json",
            },
            "body": JSON.stringify(form),
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        })
        let result = await response.json()
        return result as LoginResponse
    } catch (error) {
        return error as ResponseError
    }
}

export async function getUserInfo(token: string): Promise<ResponseError | UserInfoResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    try {
        let response = await fetch(
            `${host}/api/v1/session/userinfo`, {
            "headers": {
              "accept": "*/*",
              "cookie": `argocd.token=${token}`,
            },
            "body": null,
            "method": "GET"
          });
        let result = await response.json()
        return result as UserInfoResponse
    } catch (error) {
        return error as ResponseError
    }
}
