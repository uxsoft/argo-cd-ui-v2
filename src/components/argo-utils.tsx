import { ArrowCircleUp20Filled, ArrowSync20Filled, CheckmarkCircle20Filled, Delete20Filled, Heart20Filled, PauseCircle20Filled, PlugDisconnected20Filled, QuestionCircle20Filled } from "@fluentui/react-icons";
import * as appModels from "../shared/argocd"

export const OperationPhaseIcon = ({ app }: { app: appModels.Application }) => {
    const operationState = getAppOperationState(app);
    if (operationState === undefined) {
        return <></>;
    }
    let className = '';
    let color = '';
    switch (operationState.phase) {
        case appModels.OperationPhases.Succeeded:
            className = 'fa fa-check-circle';
            color = COLORS.operation.success;
            break;
        case appModels.OperationPhases.Error:
            className = 'fa fa-times-circle';
            color = COLORS.operation.error;
            break;
        case appModels.OperationPhases.Failed:
            className = 'fa fa-times-circle';
            color = COLORS.operation.failed;
            break;
        default:
            className = 'fa fa-circle-notch fa-spin';
            color = COLORS.operation.running;
            break;
    }
    return <i title={getOperationStateTitle(app)} qe-id='utils-operations-status-title' className={className} style={{ color }} />;
};

export const ComparisonStatusIcon = ({
    status,
    resource,
    label,
    noSpin
}: {
    status: appModels.SyncStatusCode;
    resource?: { requiresPruning?: boolean };
    label?: boolean;
    noSpin?: boolean;
}) => {
    switch (status) {
        case appModels.SyncStatuses.Synced:
            return (<><CheckmarkCircle20Filled className="text-success mr-1" />{label && "Synced"}</>)
        case appModels.SyncStatuses.OutOfSync:
            const requiresPruning = resource && resource.requiresPruning;
            return requiresPruning ?
                (<><Delete20Filled className="text-warning mr-1" />{label && "Unknown"}</>) :
                (<><ArrowCircleUp20Filled className="text-warning mr-1" />{label && "Unknown"}</>)
        case appModels.SyncStatuses.Unknown:
            return (<><QuestionCircle20Filled className="text-danger mr-1" />{label && "Unknown"}</>)
        default:
            return (<><QuestionCircle20Filled className="text-danger mr-1" />{label && "Unknown"}</>)
    }
};

export const HealthStatusIcon = ({ state, noSpin }: { state: appModels.HealthStatus; noSpin?: boolean }) => {
    switch (state?.status) {
        case appModels.HealthStatuses.Healthy:
            return (<Heart20Filled className="text-success mr-1" />)
        case appModels.HealthStatuses.Suspended:
            return (<PauseCircle20Filled className="text-warning mr-1" />)
        case appModels.HealthStatuses.Degraded:
            return (<PlugDisconnected20Filled className="text-danger mr-1" />)
        case appModels.HealthStatuses.Progressing:
            return (<ArrowSync20Filled className="text-blue-600 animate-spin mr-1" />)
        case appModels.HealthStatuses.Missing:
            return (<PlugDisconnected20Filled className="text-danger mr-1" />)
        default:
            return (<QuestionCircle20Filled className="text-blue-600 mr-1" />)
    }
};

export const PodHealthIcon = ({ state }: { state: appModels.HealthStatus }) => {
    let icon = 'fa-question-circle';

    switch (state.status) {
        case appModels.HealthStatuses.Healthy:
            icon = 'fa-check';
            break;
        case appModels.HealthStatuses.Suspended:
            icon = 'fa-check';
            break;
        case appModels.HealthStatuses.Degraded:
            icon = 'fa-times';
            break;
        case appModels.HealthStatuses.Progressing:
            icon = 'fa fa-circle-notch fa-spin';
            break;
    }
    let title: string = state.status;
    if (state.message) {
        title = `${state.status}: ${state.message}`;
    }
    return <i qe-id='utils-health-status-title' title={title} className={'fa ' + icon} />;
};

export const PodPhaseIcon = ({ state }: { state: appModels.PodPhase }) => {
    let className = '';
    switch (state) {
        case appModels.PodPhase.PodSucceeded:
            className = 'fa fa-check';
            break;
        case appModels.PodPhase.PodRunning:
            className = 'fa fa-circle-notch fa-spin';
            break;
        case appModels.PodPhase.PodPending:
            className = 'fa fa-circle-notch fa-spin';
            break;
        case appModels.PodPhase.PodFailed:
            className = 'fa fa-times';
            break;
        default:
            className = 'fa fa-question-circle';
            break;
    }
    return <i qe-id='utils-pod-phase-icon' className={className} />;
};

export const ResourceResultIcon = ({ resource }: { resource: appModels.ResourceResult }) => {
    let color = COLORS.sync_result.unknown;
    let icon = 'fas fa-question-circle';

    if (!resource.hookType && resource.status) {
        switch (resource.status) {
            case appModels.ResultCodes.Synced:
                color = COLORS.sync_result.synced;
                icon = 'fa-heart';
                break;
            case appModels.ResultCodes.Pruned:
                color = COLORS.sync_result.pruned;
                icon = 'fa-heart';
                break;
            case appModels.ResultCodes.SyncFailed:
                color = COLORS.sync_result.failed;
                icon = 'fa-heart-broken';
                break;
            case appModels.ResultCodes.PruneSkipped:
                icon = 'fa-heart';
                break;
        }
        let title: string = resource.message;
        if (resource.message) {
            title = `${resource.status}: ${resource.message}`;
        }
        return <i title={title} className={'fa ' + icon} style={{ color }} />;
    }
    if (resource.hookType && resource.hookPhase) {
        let className = '';
        switch (resource.hookPhase) {
            case appModels.OperationPhases.Running:
                color = COLORS.operation.running;
                className = 'fa fa-circle-notch fa-spin';
                break;
            case appModels.OperationPhases.Failed:
                color = COLORS.operation.failed;
                className = 'fa fa-heart-broken';
                break;
            case appModels.OperationPhases.Error:
                color = COLORS.operation.error;
                className = 'fa fa-heart-broken';
                break;
            case appModels.OperationPhases.Succeeded:
                color = COLORS.operation.success;
                className = 'fa fa-heart';
                break;
            case appModels.OperationPhases.Terminating:
                color = COLORS.operation.terminating;
                className = 'fa fa-circle-notch fa-spin';
                break;
        }
        let title: string = resource.message;
        if (resource.message) {
            title = `${resource.hookPhase}: ${resource.message}`;
        }
        return <i title={title} className={className} style={{ color }} />;
    }
    return null;
};