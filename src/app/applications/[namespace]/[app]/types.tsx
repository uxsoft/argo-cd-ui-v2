export type NodeKind = "Endpoints" | "PersistentVolumeClaim" | "Service" | "StatefulSet" | "Pod" | "ControllerRevision" | "Ingress" | "EndpointSlice" | "Application"

export interface ResourceTreeResponse {
    nodes: [
        {
            version: string,
            kind: NodeKind,
            namespace: string,
            name: string,
            uid: string,
            parentRefs: [
                {
                    kind: NodeKind,
                    namespace: string,
                    name: string,
                    uid: string
                }
            ],
            resourceVersion: string,
            health: {
                status: "Healthy"
            },
            createdAt: string
            info: [
                {
                    name: string
                    value: string
                },
            ]
        },

    ],
    hosts: [
        {
            name: string,
            "resourcesInfo": [
                {
                    "resourceName": "cpu",
                    "requestedByApp": 250,
                    "requestedByNeighbors": 1640,
                    "capacity": 4000
                },
                {
                    "resourceName": "memory",
                    "requestedByApp": 134217728000,
                    "requestedByNeighbors": 977272832000,
                    "capacity": 8443609088000
                }
            ],
            "systemInfo": {
                "machineID": "48e2596a7a11469291b77587ea8add21",
                "systemUUID": "48e2596a7a11469291b77587ea8add21",
                "bootID": "0094c6d5-9a2b-449d-9c38-bb433d332f0d",
                "kernelVersion": "6.6.28+rpt-rpi-2712",
                "osImage": "Debian GNU/Linux 12 (bookworm)",
                "containerRuntimeVersion": "containerd://1.7.15-k3s1",
                "kubeletVersion": "v1.29.4+k3s1",
                "kubeProxyVersion": "v1.29.4+k3s1",
                "operatingSystem": "linux",
                "architecture": "arm64"
            }
        }
    ]
}

export interface ApplicationDetailResponse {
    metadata: {
        "name": string,
        "namespace": string,
        "uid": string,
        "resourceVersion": "1799427",
        "generation": 7778,
        "creationTimestamp": "2024-05-25T19:13:55Z",
        "managedFields": [
            {
                "manager": "argocd-server",
                "operation": "Update",
                "apiVersion": "argoproj.io/v1alpha1",
                "time": "2024-06-10T20:00:51Z",
                "fieldsType": "FieldsV1",
                "fieldsV1": {
                    "f:spec": {
                        ".": {},
                        "f:destination": {
                            ".": {},
                            "f:namespace": {},
                            "f:server": {}
                        },
                        "f:project": {},
                        "f:source": {
                            ".": {},
                            "f:helm": {
                                ".": {},
                                "f:valueFiles": {}
                            },
                            "f:path": {},
                            "f:repoURL": {},
                            "f:targetRevision": {}
                        },
                        "f:syncPolicy": {
                            ".": {},
                            "f:automated": {
                                ".": {},
                                "f:prune": {},
                                "f:selfHeal": {}
                            },
                            "f:retry": {
                                ".": {},
                                "f:backoff": {
                                    ".": {},
                                    "f:duration": {},
                                    "f:factor": {},
                                    "f:maxDuration": {}
                                },
                                "f:limit": {}
                            }
                        }
                    },
                    "f:status": {
                        ".": {},
                        "f:health": {},
                        "f:summary": {},
                        "f:sync": {
                            ".": {},
                            "f:comparedTo": {
                                ".": {},
                                "f:destination": {},
                                "f:source": {}
                            }
                        }
                    }
                }
            },
            {
                "manager": "argocd-application-controller",
                "operation": "Update",
                "apiVersion": "argoproj.io/v1alpha1",
                "time": "2024-06-10T20:39:12Z",
                "fieldsType": "FieldsV1",
                "fieldsV1": {
                    "f:status": {
                        "f:controllerNamespace": {},
                        "f:health": {
                            "f:status": {}
                        },
                        "f:history": {},
                        "f:operationState": {
                            ".": {},
                            "f:finishedAt": {},
                            "f:message": {},
                            "f:operation": {
                                ".": {},
                                "f:initiatedBy": {
                                    ".": {},
                                    "f:automated": {}
                                },
                                "f:retry": {
                                    ".": {},
                                    "f:backoff": {
                                        ".": {},
                                        "f:duration": {},
                                        "f:factor": {},
                                        "f:maxDuration": {}
                                    },
                                    "f:limit": {}
                                },
                                "f:sync": {
                                    ".": {},
                                    "f:prune": {},
                                    "f:revision": {}
                                }
                            },
                            "f:phase": {},
                            "f:startedAt": {},
                            "f:syncResult": {
                                ".": {},
                                "f:resources": {},
                                "f:revision": {},
                                "f:source": {
                                    ".": {},
                                    "f:helm": {
                                        ".": {},
                                        "f:valueFiles": {}
                                    },
                                    "f:path": {},
                                    "f:repoURL": {},
                                    "f:targetRevision": {}
                                }
                            }
                        },
                        "f:reconciledAt": {},
                        "f:resources": {},
                        "f:sourceType": {},
                        "f:summary": {
                            "f:externalURLs": {},
                            "f:images": {}
                        },
                        "f:sync": {
                            "f:comparedTo": {
                                "f:destination": {
                                    "f:namespace": {},
                                    "f:server": {}
                                },
                                "f:source": {
                                    "f:helm": {
                                        ".": {},
                                        "f:valueFiles": {}
                                    },
                                    "f:path": {},
                                    "f:repoURL": {},
                                    "f:targetRevision": {}
                                }
                            },
                            "f:revision": {},
                            "f:status": {}
                        }
                    }
                }
            }
        ]
    },
    "spec": {
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
    "status": {
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
        "sync": {
            "status": "Synced",
            "comparedTo": {
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
                }
            },
            "revision": "b9526b6641ea13f5ba5715e566fef664d3216dd2"
        },
        "health": {
            "status": "Healthy"
        },
        "history": [
            {
                "revision": "e2be3479bb46086832a484f28ca4bb171d657f91",
                "deployedAt": "2024-05-25T19:13:59Z",
                "id": 0,
                "source": {
                    "repoURL": "https://github.com/uxsoft/infra-helm-charts",
                    "path": "docker-storage-web",
                    "targetRevision": "HEAD",
                    "helm": {
                        "valueFiles": [
                            "values.aladin-prod.yaml"
                        ]
                    }
                },
                "deployStartedAt": "2024-05-25T19:13:58Z",
                "initiatedBy": {
                    "automated": true
                }
            },
            {
                "revision": "db195fef5463c7e3f70c3167ea1880d027937175",
                "deployedAt": "2024-05-31T17:52:48Z",
                "id": 1,
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
                "deployStartedAt": "2024-05-31T17:52:45Z",
                "initiatedBy": {
                    "username": "admin"
                }
            },
            {
                "revision": "995737f96c59e53e9f60e2a45d1eae1c60646ecd",
                "deployedAt": "2024-05-31T17:56:46Z",
                "id": 2,
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
                "deployStartedAt": "2024-05-31T17:56:46Z",
                "initiatedBy": {
                    "automated": true
                }
            },
            {
                "revision": "cfc9e326222a84697e578b374b89d160264f3afd",
                "deployedAt": "2024-05-31T18:22:51Z",
                "id": 3,
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
                "deployStartedAt": "2024-05-31T18:22:49Z",
                "initiatedBy": {
                    "automated": true
                }
            },
            {
                "revision": "cfc9e326222a84697e578b374b89d160264f3afd",
                "deployedAt": "2024-05-31T18:38:00Z",
                "id": 4,
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
                "deployStartedAt": "2024-05-31T18:32:49Z",
                "initiatedBy": {
                    "username": "admin"
                }
            },
            {
                "revision": "b9526b6641ea13f5ba5715e566fef664d3216dd2",
                "deployedAt": "2024-05-31T18:38:02Z",
                "id": 5,
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
                "deployStartedAt": "2024-05-31T18:38:01Z",
                "initiatedBy": {
                    "automated": true
                }
            }
        ],
        "reconciledAt": "2024-06-10T20:39:11Z",
        "operationState": {
            "operation": {
                "sync": {
                    "revision": "b9526b6641ea13f5ba5715e566fef664d3216dd2",
                    "prune": true
                },
                "initiatedBy": {
                    "automated": true
                },
                "retry": {
                    "limit": 2,
                    "backoff": {
                        "duration": "5s",
                        "factor": 2,
                        "maxDuration": "3m0s"
                    }
                }
            },
            "phase": "Succeeded",
            "message": "successfully synced (all tasks run)",
            "syncResult": {
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
            },
            "startedAt": "2024-05-31T18:38:01Z",
            "finishedAt": "2024-05-31T18:38:02Z"
        },
        "sourceType": "Helm",
        "summary": {
            "externalURLs": [
                "http://aladin.uxsoft.cz/"
            ],
            "images": [
                "ghcr.io/uxsoft/aladin:2"
            ]
        },
        "controllerNamespace": "argocd"
    }
}