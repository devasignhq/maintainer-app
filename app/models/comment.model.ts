import { TimelineType } from "./task.model";

export type CommentDto = {
    id: string;
    userId: string;
    taskId: string;
    type: CommentType;
    message: string;
    metadata?: CommentMetadata;
    attachments: string[];
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export type CommentMetadata = {
    requestedTimeline: number;
    timelineType: TimelineType;
    reason?: string
}

export enum CommentType {
    GENERAL,
    TIMELINE_MODIFICATION
}

export type CreateCommentDto = {
    userId: string;
    taskId: string;
    type: CommentType;
    message: string;
    metadata?: CommentMetadata;
    attachments?: string[];
}