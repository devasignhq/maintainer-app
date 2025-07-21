const preset = {
    USER: "/users",
    INSTALLATION: "/installations",
    TASK: "/tasks",
    WALLET: "/wallet",
};

export const ENDPOINTS = {
    USER: {
        GET: preset.USER + "",
        CREATE: preset.USER + "",
        UPDATE_USERNAME: preset.USER + "/username",
        ADDRESS_BOOK: preset.USER + "/address-book",
    },
    INSTALLATION: {
        GET_ALL: preset.INSTALLATION + "",
        GET_BY_ID: preset.INSTALLATION + "/{installationId}",
        CREATE: preset.INSTALLATION + "",
        UPDATE: preset.INSTALLATION + "/{installationId}",
        DELETE: preset.INSTALLATION + "/{installationId}",

        ADD_TEAM_MEMBER: preset.INSTALLATION + "/{installationId}/team",
        UPDATE_TEAM_MEMBER: preset.INSTALLATION + "/{installationId}/team/{userId}",
        REMOVE_TEAM_MEMBER: preset.INSTALLATION + "/{installationId}/team/{userId}",
    },
    TASK: {
        GET_ALL: preset.TASK + "",
        GET_INSTALLATION_TASKS: preset.TASK + "/installation/{installationId}",
        GET_BY_ID: preset.TASK + "/{taskId}",
        GET_INSTALLATION_TASK_BY_ID: preset.TASK + "/installation/{taskId}",
        GET_ACTIVITIES: preset.TASK + "/activities/{taskId}",
        CREATE: preset.TASK + "",
        CREATE_MANY: preset.TASK + "/batch",
        ADD_BOUNTY_COMMENT_ID: preset.TASK + "/{taskId}/issue-comment",
        UPDATE_TASK_BOUNTY: preset.TASK + "/{taskId}/bounty",
        UPDATE_TASK_TIMELINE: preset.TASK + "/{taskId}/timeline",
        DELETE: preset.TASK + "/{taskId}",
        
        SUBMIT_APPLICATION: preset.TASK + "/{taskId}/apply",
        ACCEPT_APPLICATION: preset.TASK + "/{taskId}/accept/{contributorId}",
        MARK_AS_COMPLETE: preset.TASK + "/{taskId}/complete",
        VALIDATE_COMPLETION: preset.TASK + "/{taskId}/validate",

        REQUEST_TIMELINE_MODIFICATION: preset.TASK + "/{taskId}/timeline",
        REPLY_TIMELINE_MODIFICATION_REQUEST: preset.TASK + "/{taskId}/timeline/reply",
        
        ADD_COMMENT: preset.TASK + "/{taskId}/messages",
        UPDATE_COMMENT: preset.TASK + "/{taskId}/messages/{messageId}",
    },
    WALLET: {
        GET_WALLET: preset.WALLET + "/account",
        WITHDRAW: preset.WALLET + "/withdraw",
        SWAP: preset.WALLET + "/swap",
        TRANSACTIONS: preset.WALLET + "/transactions",
    },
};