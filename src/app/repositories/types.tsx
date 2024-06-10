export interface IRepository         {
    repo: string,
    username: string,
    connectionState: {
        status: "Successful" | "Failed",
        message: string,
        attemptedAt: "2024-06-10T14:54:11Z"
    },
    type: string,
    project: string
}

export interface RepositoriesResponse {
    metadata: {},
    items: IRepository[]
}

export interface RepositoryCredentialsResponse { "metadata": {}, "items": null }

export interface CreateGitRepositoryRequest
{
    type: string,
    name: string,
    repo: string,
    username: string,
    password: string,
    tlsClientCertData: string,
    tlsClientCertKey: string,
    insecure: boolean,
    enableLfs: boolean,
    proxy: string,
    project: string,
    forceHttpBasicAuth: boolean,
    enableOCI: boolean
}

export interface RepositoryStatus
{
    type: string
    name: string
    project: string
    repositoryURL: string
    username: string
    password: string
}