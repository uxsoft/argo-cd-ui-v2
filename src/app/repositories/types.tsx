export interface RepositoriesResponse {
    metadata: {},
    items: [
        {
            repo: string,
            username: string,
            connectionState: {
                status: "Successful",
                message: string,
                attemptedAt: "2024-06-10T14:54:11Z"
            },
            type: string,
            project: string
        }
    ]
}

export interface RepositoryCredentialsResponse { "metadata": {}, "items": null }