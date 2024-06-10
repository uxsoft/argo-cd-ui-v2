"use server"

import { LoginError, LoginResponse } from "./types";

export async function onLogin(form: { username: string, password: string }): Promise<LoginError | LoginResponse> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    try {
        let response = await fetch(
            "https://localhost:35921/api/v1/session", {
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
        return error as LoginError
    }
}