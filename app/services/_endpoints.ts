const preset = {
    USER: "/users",
    PROJECT: "/projects",
    TASK: "/tasks",
    WALLET: "/wallet",
};

export const ENDPOINTS = {
    USER: {
        GET: preset.USER + "/",
        CREATE: preset.USER + "/",
        UPDATE: preset.USER + "/",
        ADDRESS_BOOK: preset.USER + "/address-book",
    },
    PROJECT: {
        GET_ALL: preset.PROJECT + "/",
        GET_BY_ID: preset.PROJECT + "/{projectId}",
        CREATE: preset.PROJECT + "/",
        UPDATE: preset.PROJECT + "/{projectId}",
        DELETE: preset.PROJECT + "/{projectId}",
        ADD_TEAM_MEMBER: preset.PROJECT + "/{projectId}/team",
        ISSUES: preset.PROJECT + "/issues",
        MILESTONES: preset.PROJECT + "/milestones",
        LABELS: preset.PROJECT + "/labels",
    },
    TASK: {
        GET_ALL: preset.TASK + "/",
        GET_BY_ID: preset.TASK + "/{taskId}",
        CREATE: preset.TASK + "/",
        CREATE_MANY: preset.TASK + "/batch",
        UPDATE_TASK_BOUNTY: preset.TASK + "/{taskId}/bounty",
        DELETE: preset.TASK + "/{taskId}",
        ACCEPT: preset.TASK + "/{taskId}/accept",
        MARK_AS_COMPLETE: preset.TASK + "/{taskId}/complete",
        VALIDATE_COMPLETION: preset.TASK + "/{taskId}/validate",
        REQUEST_TIMELINE_MODIFICATION: preset.TASK + "/{taskId}/timeline",
        REPLY_TIMELINE_MODIFICATION: preset.TASK + "/{taskId}/timeline/reply",
        ADD_COMMENT: preset.TASK + "/{taskId}/comments",
        UPDATE_COMMENT: preset.TASK + "/{taskId}/comments/{commentId}",
    },
    WALLET: {
        GET_WALLET: preset.WALLET + "/wallet",
        WITHDRAW: preset.WALLET + "/withdraw",
        SWAP: preset.WALLET + "/swap",
    },
};