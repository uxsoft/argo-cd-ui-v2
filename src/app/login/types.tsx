import { ResponseError } from "@/shared/server";

export interface LoginResponse {
    token: string
}

export interface UserInfoResponse {
    loggedIn: boolean,
    username: string,
    iss: string
}