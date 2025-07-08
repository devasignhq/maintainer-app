import { MessageDto } from "./message.model"
import { IssueDto } from "./github.model"
import { InstallationDto } from "./installation.model"
import { UserDto } from "./user.model"
import { TransactionDto } from "./wallet.model"

export const TASK_STATUS = {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN_PROGRESS',
    MARKED_AS_COMPLETED: 'MARKED_AS_COMPLETED',
    COMPLETED: 'COMPLETED'
}

export type TaskStatus = keyof typeof TASK_STATUS

export const TIMELINE_TYPE = {
  WEEK: 'WEEK',
  DAY: 'DAY'
}

export type TimelineType = keyof typeof TIMELINE_TYPE

export type TaskDto = {
    id: string
    number: number
    issue: TaskIssue
    timeline: number | null
    timelineType: TimelineType | null
    bounty: number
    status: TaskStatus
    settled: boolean
    acceptedAt: string | null
    completedAt: string | null
    creatorId: string
    contributorId: string | null
    installationId: string
    createdAt: string
    updatedAt: string
    
    applications?: UserDto[]
    creator?: UserDto
    contributor?: UserDto | null
    installation?: InstallationDto
    transactions?: TransactionDto[]
    taskSubmissions?: TaskSubmission[]
    taskActivities?: TaskActivity[]
}

export type TaskIssue = Pick<IssueDto, "id" | "number" | "title" | "url" | "labels" | "locked" | "state" | "repository_url" | "created_at" | "updated_at"> & {
    html_url?: string;
    body?: string;
}

export type TaskSubmission = {
    id: string
    userId: string
    taskId: string
    installationId: string
    pullRequest: string
    attachmentUrl: string | null
    createdAt: string
    updatedAt: string
    
    user?: UserDto
    task?: TaskDto
    installation?: InstallationDto
}

export type TaskActivity = {
    id: string
    taskId: string
    userId: string | null
    taskSubmissionId: string | null
    createdAt: string
    updatedAt: string
    
    task?: TaskDto
    user?: UserDto | null
    taskSubmission?: TaskSubmission | null
}

export type CreateTaskDto = {
    installationId: string
    issue: TaskIssue
    timeline?: number
    timelineType?: TimelineType
    bounty: string
}

export type UpdateTaskBountyDto = {
    newBounty: string
}

export type RequestTimelineExtensionDto = {
    requestedTimeline: number 
    timelineType: TimelineType
    reason: string 
    attachments?: string[]
}

export type ReplyTimelineExtensionRequestDto = {
    accept: boolean
    requestedTimeline: number 
    timelineType: TimelineType
}

export type MarkAsCompleteDto = {
    pullRequest: string
    attachmentUrl: string
}

export type QueryTaskDto = {
    status?: TaskStatus
    installationId?: string
    role?: 'creator' | 'contributor'
    detailed?: boolean
    page?: number
    limit?: number
    sort?: "asc" | "desc"
}

export type QueryTaskActivityDto = {
    page?: number
    limit?: number
    sort?: "asc" | "desc"
}

export type FilterTasks = {
    repoUrl?: string;
    issueTitle?: string;
    issueLabels?: string[];
    issueMilestone?: string;
}

export type TimelineExtensionResponse = {
    comment: MessageDto;
    task?: Pick<TaskDto, "timeline" | "timelineType" | "status" | "updatedAt">;
}