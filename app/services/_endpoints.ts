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
        UPDATE_USERNAME: preset.USER + "/username",
        ADDRESS_BOOK: preset.USER + "/address-book",
    },
    PROJECT: {
        GET_ALL: preset.PROJECT + "/",
        GET_BY_ID: preset.PROJECT + "/{projectId}",
        CREATE: preset.PROJECT + "/",
        UPDATE: preset.PROJECT + "/{projectId}",
        CONNECT_REPO: preset.PROJECT + "/{projectId}/connect-repo",
        DELETE: preset.PROJECT + "/{projectId}",

        ADD_TEAM_MEMBER: preset.PROJECT + "/{projectId}/team",
        UPDATE_TEAM_MEMBER: preset.PROJECT + "/{projectId}/team/{userId}",
        REMOVE_TEAM_MEMBER: preset.PROJECT + "/{projectId}/team/{userId}",

        ISSUES: preset.PROJECT + "/issues",
        LABELS: preset.PROJECT + "/labels",
        MILESTONES: preset.PROJECT + "/milestones",
    },
    TASK: {
        GET_ALL: preset.TASK + "/",
        GET_BY_ID: preset.TASK + "/{taskId}",
        CREATE: preset.TASK + "/",
        CREATE_MANY: preset.TASK + "/batch",
        UPDATE_TASK_BOUNTY: preset.TASK + "/{taskId}/bounty",
        DELETE: preset.TASK + "/{taskId}",
        
        SUBMIT_APPLICATION: preset.TASK + "/{taskId}/apply",
        ACCEPT_APPLICATION: preset.TASK + "/{taskId}/accept/{userId}",
        MARK_AS_COMPLETE: preset.TASK + "/{taskId}/complete",
        VALIDATE_COMPLETION: preset.TASK + "/{taskId}/validate",

        REQUEST_TIMELINE_MODIFICATION: preset.TASK + "/{taskId}/timeline",
        REPLY_TIMELINE_MODIFICATION: preset.TASK + "/{taskId}/timeline/reply",
        
        ADD_COMMENT: preset.TASK + "/{taskId}/comments",
        UPDATE_COMMENT: preset.TASK + "/{taskId}/comments/{commentId}",
    },
    WALLET: {
        GET_WALLET: preset.WALLET + "/account",
        WITHDRAW: preset.WALLET + "/withdraw",
        SWAP: preset.WALLET + "/swap",
        TRANSACTIONS: preset.WALLET + "/transactions/{projectId}",
    },
};