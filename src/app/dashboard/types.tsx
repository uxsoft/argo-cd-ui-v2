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

export interface ApplicationsResponse {
    items: [
        {
            metadata: {
                annotations: null,
                creationTimestamp: "2024-05-25T19:13:55Z",
                deletionTimestamp: null,
                labels: null,
                name: string,
                namespace: string
            },
            spec: {
                "source": {
                    "repoURL": "https://github.com/uxsoft-rs/infra-helm-charts",
                    "path": "docker-storage-web",
                    "targetRevision": "HEAD",
                    "helm": {
                        "valueFiles": [
                            "values.aladin-prod.yaml"
                        ]
                    }
                },
                "destination": {
                    "server": "https://kubernetes.default.svc",
                    "namespace": "uxsoft-aladin-prod"
                },
                "project": "default",
                "syncPolicy": {
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
                "health": {
                    "status": "Healthy"
                },
                "operationState": {
                    "finishedAt": "2024-05-31T18:38:02Z",
                    "operation": {
                        "sync": {
                            "resources": [
                                {
                                    "group": "apps",
                                    "version": "v1",
                                    "kind": "Deployment",
                                    "namespace": "uxsoft-aladin-prod",
                                    "name": "aladin-prod",
                                    "status": "Pruned",
                                    "message": "pruned",
                                    "hookPhase": "Succeeded",
                                    "syncPhase": "Sync"
                                },
                                {
                                    "group": "",
                                    "version": "v1",
                                    "kind": "PersistentVolumeClaim",
                                    "namespace": "uxsoft-aladin-prod",
                                    "name": "aladin-prod-pvc",
                                    "status": "Pruned",
                                    "message": "pruned",
                                    "hookPhase": "Succeeded",
                                    "syncPhase": "Sync"
                                },
                                {
                                    "group": "",
                                    "version": "v1",
                                    "kind": "Service",
                                    "namespace": "uxsoft-aladin-prod",
                                    "name": "aladin-prod-service",
                                    "status": "Synced",
                                    "message": "service/aladin-prod-service configured. Warning: resource services/aladin-prod-service is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by  apply.  apply should only be used on resources created declaratively by either  create --save-config or  apply. The missing annotation will be patched automatically.",
                                    "hookPhase": "Running",
                                    "syncPhase": "Sync"
                                },
                                {
                                    "group": "apps",
                                    "version": "v1",
                                    "kind": "StatefulSet",
                                    "namespace": "uxsoft-aladin-prod",
                                    "name": "aladin-prod",
                                    "status": "Synced",
                                    "message": "statefulset.apps/aladin-prod configured. Warning: resource statefulsets/aladin-prod is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by  apply.  apply should only be used on resources created declaratively by either  create --save-config or  apply. The missing annotation will be patched automatically.",
                                    "hookPhase": "Running",
                                    "syncPhase": "Sync"
                                },
                                {
                                    "group": "networking.k8s.io",
                                    "version": "v1",
                                    "kind": "Ingress",
                                    "namespace": "uxsoft-aladin-prod",
                                    "name": "aladin-prod",
                                    "status": "Synced",
                                    "message": "ingress.networking.k8s.io/aladin-prod configured. Warning: resource ingresses/aladin-prod is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by  apply.  apply should only be used on resources created declaratively by either  create --save-config or  apply. The missing annotation will be patched automatically.",
                                    "hookPhase": "Running",
                                    "syncPhase": "Sync"
                                }
                            ],
                            "revision": "b9526b6641ea13f5ba5715e566fef664d3216dd2",
                            "source": {
                                "repoURL": "https://github.com/uxsoft-rs/infra-helm-charts",
                                "path": "docker-storage-web",
                                "targetRevision": "HEAD",
                                "helm": {
                                    "valueFiles": [
                                        "values.aladin-prod.yaml"
                                    ]
                                }
                            }
                        }
                    },
                    "phase": "Succeeded"
                },
                "resources": [
                    {
                        "version": "v1",
                        "kind": "Service",
                        "namespace": "uxsoft-aladin-prod",
                        "name": "aladin-prod-service",
                        "status": "Synced",
                        "health": {
                            "status": "Healthy"
                        }
                    },
                    {
                        "group": "apps",
                        "version": "v1",
                        "kind": "StatefulSet",
                        "namespace": "uxsoft-aladin-prod",
                        "name": "aladin-prod",
                        "status": "Synced",
                        "health": {
                            "status": "Healthy",
                            "message": "partitioned roll out complete: 1 new pods have been updated..."
                        }
                    },
                    {
                        "group": "networking.k8s.io",
                        "version": "v1",
                        "kind": "Ingress",
                        "namespace": "uxsoft-aladin-prod",
                        "name": "aladin-prod",
                        "status": "Synced",
                        "health": {
                            "status": "Healthy"
                        }
                    }
                ],
                "summary": {
                    "externalURLs": [
                        "http://aladin.uxsoft.cz/"
                    ],
                    "images": [
                        "ghcr.io/uxsoft/aladin:2"
                    ]
                },
                "sync": {
                    "status": "Synced"
                }
            }
        }
    ],
    metadata: {
        resourceVersion: string
    }
}

export interface ProjectsResponse { 
    items: [{ "metadata": { "name": "default" } }] }