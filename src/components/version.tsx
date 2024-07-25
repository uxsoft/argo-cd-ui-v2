"use client"

import { VersionResponse } from "@/app/applications/types";
import { authAtom } from "@/shared/state";
import { ResponseError, isResponseError } from "@/shared/types";
import { useAtomValue } from "jotai";
import * as Server from "../app/applications/server";
import { useState, useEffect } from "react";
import { atomWithQuery } from "jotai-tanstack-query";

const todosAtom = atomWithQuery(() => ({
    queryKey: ['todos'],
}))


export function Version() {
    const auth = useAtomValue(authAtom)
    const [version, setVersion] = useState({} as VersionResponse | ResponseError)
    useEffect(() => {
        if (auth.token) {
            Server.fetchVersion(auth.token)
                .then(setVersion)
                .catch(console.error)
        }
    }, [auth.token]);

    if (isResponseError(version)) {
        return <></>
    }

    return (<div className="mt-2">
        <img alt="argo" src="/images/argologo.svg" width={60} height={24} className="invert mb-[-6px]" />
        <span className="text-xs text-gray-500">
            {version.Version}&nbsp;
        </span>
    </div>)
}