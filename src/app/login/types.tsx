export interface LoginError {
    error: string
    code: number
    message: string
}

export interface LoginResponse {
    token: string
}

export function isLoginSuccess(obj: LoginError | LoginResponse): obj is LoginResponse {    
    return 'token' in obj;
}