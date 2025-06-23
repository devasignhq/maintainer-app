import { TimelineType } from "./task.model";

export type MessageDto = {
    id: string;
    userId: string;
    taskId: string;
    type: MessageType;
    body: string;
    metadata?: MessageMetadata;
    attachments: string[];
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export type MessageMetadata = {
    requestedTimeline: number;
    timelineType: TimelineType;
    reason?: string
}

export enum MessageType {
    GENERAL,
    TIMELINE_MODIFICATION
}

export type CreateMessageDto = {
    userId: string;
    taskId: string;
    type: MessageType;
    body: string;
    metadata?: MessageMetadata;
    attachments?: string[];
}