import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const authAtom = atomWithStorage("auth", {
    token: ""
})

export const userInfoAtom = atomWithStorage("userInfo", {
    loggedIn: false,
    username: "",
    iss: ""
})