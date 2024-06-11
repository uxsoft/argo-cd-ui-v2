export interface SettingsResponse {
    appLabelKey: string,
    resourceOverrides: {
        "apiextensions.k8s.io/CustomResourceDefinition": {
            ignoreDifferences: string,
            ignoreResourceUpdates: string
        }
    },
    googleAnalytics: {
        anonymizeUsers: boolean
    },
    kustomizeOptions: {
        BuildOptions: string,
        BinaryPath: string
    },
    help: {},
    passwordPattern: string,
    controllerNamespace: string
}

export interface VersionResponse {
    Version: string
    BuildDate: string
    GitCommit: string
    GitTreeState: string
    GoVersion: string
    Compiler: string
    Platform: string
    KustomizeVersion: string
    HelmVersion: string
    KubectlVersion: string
    JsonnetVersion: string
}

export interface ClustersResponse {
    metadata: {},
    items: [
        {
            server: string
            name: string
            config: {
                tlsClientConfig: {
                    insecure: boolean
                }
            },
            connectionState: {
                status: "Successful",
                message: string,
                attemptedAt: "2024-06-10T09:07:16Z"
            },
            serverVersion: string,
            info: {
                connectionState: {
                    status: "Successful",
                    message: string,
                    attemptedAt: "2024-06-10T09:07:16Z"
                },
                serverVersion: string,
                cacheInfo: {
                    resourcesCount: number,
                    apisCount: number,
                    lastCacheSyncTime: "2024-06-10T08:18:13Z"
                },
                applicationsCount: number,
                apiVersions: string[]
            }
        }
    ]
}

export interface ProjectsResponse {
    items: [{ "metadata": { "name": "default" } }]
}