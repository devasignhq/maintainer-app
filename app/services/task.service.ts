import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { 
    CreateTaskDto,
    MarkAsCompleteDto,
    QueryTaskDto,
    ReplyTimelineExtensionRequestDto,
    RequestTimelineExtensionDto,
    TaskDto,
    TimelineExtensionesponse,
    UpdateTaskBountyDto,
} from "../models/task.model";
import { AddCommentDto, CommentDto, UpdateCommentDto } from "../models/comment.model";
import { MessageResponse, MessageWithDataResponse } from "../models/_global";

export class TaskAPI {
    static async getTasks(query?: QueryTaskDto) {
        return HttpClient.get<TaskDto[]>(ENDPOINTS.TASK.GET_ALL, { params: query });
    }

    static async getTaskById(taskId: string) {
        return HttpClient.get<TaskDto>(ENDPOINTS.TASK.GET_BY_ID.replace("{taskId}", taskId));
    }

    static async createTask(data: { payload: CreateTaskDto }) {
        return HttpClient.post<TaskDto>(ENDPOINTS.TASK.CREATE, data);
    }

    static async updateTaskBounty(taskId: string, data: UpdateTaskBountyDto) {
        return HttpClient.patch<Pick<TaskDto, "bounty" | "updatedAt">>(
            ENDPOINTS.TASK.UPDATE_TASK_BOUNTY.replace("{taskId}", taskId), data);
    }

    static async submitTaskApplication(taskId: string) {
        return HttpClient.post<MessageResponse>(ENDPOINTS.TASK.SUBMIT_APPLICATION.replace("{taskId}", taskId), {});
    }

    static async acceptTaskApplication(taskId: string, userId: string) {
        return HttpClient.post<MessageResponse>(ENDPOINTS.TASK.ACCEPT_APPLICATION
            .replace("{taskId}", taskId)
            .replace("{userId}", userId), {});
    }

    static async markAsComplete(taskId: string, data: MarkAsCompleteDto) {
        return HttpClient.post<Pick<TaskDto, "status" | "taskSubmissions" | "updatedAt">>(
            ENDPOINTS.TASK.MARK_AS_COMPLETE.replace("{taskId}", taskId), data);
    }

    static async validateCompletion(taskId: string) {
        return HttpClient.post<Pick<TaskDto, "status" | "completedAt" | "settled" | "updatedAt">>(
            ENDPOINTS.TASK.VALIDATE_COMPLETION.replace("{taskId}", taskId), {});
    }

    static async requestTimelineModification(taskId: string, data: RequestTimelineExtensionDto) {
        return HttpClient.post<TimelineExtensionesponse>(ENDPOINTS.TASK.REQUEST_TIMELINE_MODIFICATION.replace("{taskId}", taskId), data);
    }

    static async replyTimelineModification(taskId: string, data: ReplyTimelineExtensionRequestDto) {
        return HttpClient.post<TimelineExtensionesponse>(ENDPOINTS.TASK.REPLY_TIMELINE_MODIFICATION.replace("{taskId}", taskId), data);
    }

    static async addTaskComment(taskId: string, data: AddCommentDto) {
        return HttpClient.post<CommentDto>(ENDPOINTS.TASK.ADD_COMMENT.replace("{taskId}", taskId), data);
    }

    static async updateTaskComment(taskId: string, commentId: string, data: UpdateCommentDto) {
        return HttpClient.patch<CommentDto>(ENDPOINTS.TASK.UPDATE_COMMENT
                .replace("{taskId}", taskId)
                .replace("{commentId}", commentId), 
                data
        );
    }

    static async deleteTask(taskId: string) {
        return HttpClient.delete<MessageWithDataResponse<"refunded", string>>(
            ENDPOINTS.TASK.DELETE.replace("{taskId}", taskId));
    }
}