import { ProjectDto } from "./project.model";
import { UserDto } from "./user.model";

export type TaskDto = {
    id: string;
    creatorId: string;
    contributorId: string | null;
    projectId: string;
    issue: Issue;
    timeline: number | null;
    timelineType: TimelineType | null;
    bounty: number;
    acceptedAt: Date | null;
    completedAt: Date | null;
    status: TaskStatus;
    settled: boolean;
    pullRequests: string[];
    createdAt: string;
    updatedAt: string;

    project?: ProjectDto;
    creator?: UserDto;
    contributor?: UserDto | null;
}

export enum TaskStatus {
    OPEN,
    IN_PROGRESS,
    MARKED_AS_COMPLETED,
    COMPLETED
}
  
export enum TimelineType {
    WEEK,
    DAY
}

export type IssueLabel = {
    id: number;
    name: string;
    color: string;
}

export type Issue = {
    url: string;
    number: number;
    title: string;
    label?: IssueLabel;
}

export type CreateTaskDto = {
    projectId: string;
    issue: Issue;
    bounty: string;
    timeline?: number;
    timelineType?: TimelineType;
}

export type UpdateTaskBounty = {
    newBounty: string;
}

export type RequestTimelineModification = {
    newTimeline: number;
    reason: string;
    attachments: string[];
}

export type ReplyTimelineModification = {
    reason?: string;
    attachments?: string[];
} & ({
    accepted: "TRUE";
    newTimeline: number;
} | {
    accepted: "FALSE";
});

export type MarkAsCompleteDto = {
    pullRequests: string[];
}

export type QueryTaskDto = {
    projectId: string;
    status?: TaskStatus;
    role?: "creator" | "contributor";
    page?: number;
    limit?: number;
}