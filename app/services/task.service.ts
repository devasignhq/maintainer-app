import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import {
    AddBountyCommentId,
    CreateTaskDto,
    MarkAsCompleteDto,
    QueryTaskActivityDto,
    QueryTaskDto,
    ReplyTimelineExtensionRequestDto,
    RequestTimelineExtensionDto,
    TaskActivity,
    TaskDto,
    TimelineExtensionResponse,
    UpdateTaskBountyDto,
    UpdateTaskTimelineDto,
} from "../models/task.model";
import {
    MessageResponse,
    MessageWithDataResponse,
    PaginatedResponse,
    PartialSuccessResponse
} from "../models/_global";

export class TaskAPI {
    static async getTasks(query?: Omit<QueryTaskDto, "status">) {
        return HttpClient.get<PaginatedResponse<TaskDto>>(ENDPOINTS.TASK.GET_ALL, { params: query });
    }

    static async getInstallationTasks(
        installationId: string,
        query?: Omit<QueryTaskDto, "installationId">
    ) {
        return HttpClient.get<PaginatedResponse<TaskDto>>(ENDPOINTS.TASK.GET_INSTALLATION_TASKS
            .replace("{installationId}", installationId), { params: query });
    }

    static async getTaskById(taskId: string) {
        return HttpClient.get<TaskDto>(ENDPOINTS.TASK.GET_BY_ID.replace("{taskId}", taskId));
    }

    static async getInstallationTaskById(installationId: string, taskId: string) {
        return HttpClient.get<TaskDto>(ENDPOINTS.TASK.GET_INSTALLATION_TASK_BY_ID
            .replace("{installationId}", installationId)
            .replace("{taskId}", taskId));
    }

    static async getTaskActivities(taskId: string, query?: QueryTaskActivityDto) {
        return HttpClient.get<PaginatedResponse<TaskActivity>>(
            ENDPOINTS.TASK.GET_ACTIVITIES.replace("{taskId}", taskId), { params: query });
    }

    static async createTask(data: { payload: CreateTaskDto }) {
        return HttpClient.post<TaskDto | PartialSuccessResponse<"task", TaskDto>>(ENDPOINTS.TASK.CREATE, data);
    }

    static async addBountyCommentId(taskId: string, data: AddBountyCommentId) {
        return HttpClient.patch<Pick<TaskDto, "id">>(
            ENDPOINTS.TASK.ADD_BOUNTY_COMMENT_ID.replace("{taskId}", taskId), data);
    }

    static async updateTaskBounty(taskId: string, data: UpdateTaskBountyDto) {
        return HttpClient.patch<Pick<TaskDto, "bounty" | "updatedAt"> | PartialSuccessResponse<"task", Pick<TaskDto, "bounty" | "updatedAt">>>(
            ENDPOINTS.TASK.UPDATE_TASK_BOUNTY.replace("{taskId}", taskId), data);
    }

    static async updateTaskTimeline(taskId: string, data: UpdateTaskTimelineDto) {
        return HttpClient.patch<Pick<TaskDto, "timeline" | "timelineType" | "updatedAt">>(
            ENDPOINTS.TASK.UPDATE_TASK_TIMELINE.replace("{taskId}", taskId), data);
    }

    static async submitTaskApplication(taskId: string) {
        return HttpClient.post<MessageResponse>(ENDPOINTS.TASK.SUBMIT_APPLICATION.replace("{taskId}", taskId), {});
    }

    static async acceptTaskApplication(taskId: string, contributorId: string) {
        return HttpClient.post<Pick<TaskDto, "status" | "contributor" | "acceptedAt">>(ENDPOINTS.TASK.ACCEPT_APPLICATION
            .replace("{taskId}", taskId)
            .replace("{contributorId}", contributorId), {});
    }

    static async markAsComplete(taskId: string, data: MarkAsCompleteDto) {
        return HttpClient.post<Pick<TaskDto, "status" | "taskSubmissions" | "updatedAt">>(
            ENDPOINTS.TASK.MARK_AS_COMPLETE.replace("{taskId}", taskId), data);
    }

    static async validateCompletion(taskId: string) {
        return HttpClient.post<Pick<TaskDto, "status" | "completedAt" | "settled" | "updatedAt"> | PartialSuccessResponse<"task", Pick<TaskDto, "status" | "completedAt" | "settled" | "updatedAt">>>(
            ENDPOINTS.TASK.VALIDATE_COMPLETION.replace("{taskId}", taskId), {});
    }

    static async requestTimelineModification(taskId: string, data: RequestTimelineExtensionDto) {
        return HttpClient.post<TimelineExtensionResponse>(ENDPOINTS.TASK.REQUEST_TIMELINE_MODIFICATION
            .replace("{taskId}", taskId), data);
    }

    static async replyTimelineModificationRequest(taskId: string, data: ReplyTimelineExtensionRequestDto) {
        return HttpClient.post<TimelineExtensionResponse>(ENDPOINTS.TASK.REPLY_TIMELINE_MODIFICATION_REQUEST
            .replace("{taskId}", taskId), data);
    }

    static async markActivityAsViewed(taskActivityId: string) {
        return HttpClient.patch<Pick<TaskActivity, "id" | "viewed" | "updatedAt">>(
            ENDPOINTS.TASK.MARK_ACTIVITY_AS_VIEWED.replace("{taskActivityId}", taskActivityId), {});
    }

    static async deleteTask(taskId: string) {
        return HttpClient.delete<MessageWithDataResponse<"refunded", string> | PartialSuccessResponse<"data", MessageWithDataResponse<"refunded", string>>>(
            ENDPOINTS.TASK.DELETE.replace("{taskId}", taskId));
    }
}