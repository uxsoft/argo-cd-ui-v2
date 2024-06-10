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

export interface IApplication {
    metadata: {
        annotations: null,
        creationTimestamp: "2024-05-25T19:13:55Z",
        deletionTimestamp: null,
        labels: null,
        name: string,
        namespace: string
    },
    spec: {
        source: {
            repoURL: string,
            path: string,
            targetRevision: "HEAD",
            helm: {
                valueFiles: string[]
            }
        },
        destination: {
            server: string,
            namespace: string
        },
        project: string,
        syncPolicy: {
            "automated": {
                "prune": true,
                "selfHeal": true
            },
            "retry": {
                "limit": 2,
                "backoff": {
                    "duration": "5s",
                    "factor": 2,
                    "maxDuration": "3m0s"
                }
            }
        }
    },
    status: {
        health: {
            status: "Healthy"
        },
        operationState: {
            finishedAt: "2024-05-31T18:38:02Z",
            operation: {
                sync: {
                    resources: [
                        {
                            group: string,
                            version: string,
                            kind: string,
                            namespace: string,
                            name: string,
                            status: string,
                            message: string,
                            hookPhase: string,
                            syncPhase: string
                        },
                    ],
                    "revision": string,
                    "source": {
                        repoURL: string,
                        path: string,
                        targetRevision: "HEAD",
                        helm: {
                            "valueFiles": string[]
                        }
                    }
                }
            },
            phase: "Succeeded"
        },
        resources: [
            {
                group: string,
                version: string,
                kind: string,
                namespace: string,
                name: string,
                status: "Synced",
                health: {
                    status: "Healthy",
                    message: string
                }
            }
        ],
        summary: {
            externalURLs: string[],
            images: [string]
        },
        sync: {
            status: "Synced"
        }
    }
}

export interface ApplicationsResponse {
    items: IApplication[],
    metadata: {
        resourceVersion: string
    }
}

export interface ProjectsResponse {
    items: [{ "metadata": { "name": "default" } }]
}