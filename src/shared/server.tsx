export const host = "https://localhost:35921"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | number
        }
    }
}