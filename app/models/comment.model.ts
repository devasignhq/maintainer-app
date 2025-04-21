export type CommentDto = {
    id: string;
    userId: string;
    taskId: string;
    type: CommentType;
    message: string;
    metadata?: CommentMetadata;
    attachments: string[];
    createdAt: string;
    updatedAt: string;
}

export type CommentMetadata = {
    requestedTimeline?: number;
    newTimeline?: number;
}

export enum CommentType {
    GENERAL,
    TIMELINE_MODIFICATION
}

export type AddCommentDto = {
    message: string;
    attachments?: string[];
}

export type UpdateCommentDto = Partial<AddCommentDto>;