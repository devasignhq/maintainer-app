import { CommentDto } from "./comment.model"
import { IssueDto } from "./github.model"
import { UserProjectPermissionDto } from "./permission.model"
import { ProjectDto } from "./project.model"
import { UserDto } from "./user.model"

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
    pullRequests: string[]
    acceptedAt: string | null
    completedAt: string | null
    creatorId: string
    contributorId: string | null
    projectId: string
    createdAt: string
    updatedAt: string
    
    applications?: UserDto[]
    creator?: UserDto
    contributor?: UserDto | null
    project?: ProjectDto
    transactions?: UserProjectPermissionDto[]
    taskSubmissions: TaskSubmission[]
}

export type TaskIssue = Pick<IssueDto, "id" | "number" | "title" | "body" | "url" | "labels" | "locked" | "state" | "created_at" | "updated_at" | "pull_request">

export type TaskSubmission = {
    id: string
    userId: string
    taskId: string
    projectId: string
    pullRequest: string
    videoUrl?: string
    createdAt: string
    updatedAt: string
    
    user?: UserDto
    task?: TaskDto
    project?: ProjectDto
}

export type CreateTaskDto = {
    repoUrl: string
    projectId: string
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
    videoUrl: string
}

export type QueryTaskDto = {
    status?: TaskStatus
    projectId?: string
    role?: 'creator' | 'contributor'
    detailed?: boolean
    page?: number
    limit?: number
    orderBy?: "asc" | "desc"
}

export type TimelineExtensionesponse = {
    comment: CommentDto;
    task?: Pick<TaskDto, "timeline" | "timelineType" | "status" | "updatedAt">;
}