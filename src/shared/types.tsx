export interface ResponseError {
    error: string
    code: number
    message: string
}

export function isResponseError<T extends object>(obj: ResponseError | T): obj is ResponseError {
    return 'error' in obj;
}
