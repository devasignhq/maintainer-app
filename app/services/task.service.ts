import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { CreateTaskDto, MarkAsCompleteDto, QueryTaskDto, ReplyTimelineModification, RequestTimelineModification, TaskDto, UpdateTaskBounty } from "../models/task.model";
import { CommentDto } from "../models/comment.model";

export class TaskAPI {
    static async getTasks(query?: QueryTaskDto) {
        return HttpClient.get<TaskDto[]>(ENDPOINTS.TASK.GET_ALL, { params: query });
    }

    static async getTaskById(taskId: string) {
        return HttpClient.get<TaskDto>(ENDPOINTS.TASK.GET_BY_ID.replace("{taskId}", taskId));
    }

    static async createTask(task: CreateTaskDto) {
        return HttpClient.post<TaskDto>(ENDPOINTS.TASK.CREATE, task);
    }

    static async createManyTasks(tasks: CreateTaskDto[]) {
        return HttpClient.post<TaskDto[]>(ENDPOINTS.TASK.CREATE_MANY, tasks);
    }

    static async updateTaskBounty(taskId: string, bounty: UpdateTaskBounty) {
        return HttpClient.patch<Partial<TaskDto>>(ENDPOINTS.TASK.UPDATE_TASK_BOUNTY.replace("{taskId}", taskId), bounty);
    }

    static async deleteTask(taskId: string) {
        return HttpClient.delete(ENDPOINTS.TASK.DELETE.replace("{taskId}", taskId));
    }

    static async acceptTask(taskId: string) {
        return HttpClient.post<Partial<TaskDto>>(ENDPOINTS.TASK.ACCEPT.replace("{taskId}", taskId), {});
    }

    static async markAsComplete(taskId: string, data: MarkAsCompleteDto) {
        return HttpClient.post<Partial<TaskDto>>(ENDPOINTS.TASK.MARK_AS_COMPLETE.replace("{taskId}", taskId), data);
    }

    static async validateCompletion(taskId: string) {
        return HttpClient.post<Partial<TaskDto>>(ENDPOINTS.TASK.VALIDATE_COMPLETION.replace("{taskId}", taskId), {});
    }

    static async requestTimelineModification(taskId: string, request: RequestTimelineModification) {
        return HttpClient.post<CommentDto>(ENDPOINTS.TASK.REQUEST_TIMELINE_MODIFICATION.replace("{taskId}", taskId), request);
    }

    static async replyTimelineModification(taskId: string, reply: ReplyTimelineModification) {
        return HttpClient.post<CommentDto>(ENDPOINTS.TASK.REPLY_TIMELINE_MODIFICATION.replace("{taskId}", taskId), reply);
    }

    static async addComment(taskId: string, comment: string) {
        return HttpClient.post<CommentDto>(ENDPOINTS.TASK.ADD_COMMENT.replace("{taskId}", taskId), { comment });
    }

    static async updateComment(taskId: string, commentId: string, comment: string) {
        return HttpClient.patch<CommentDto>(
            ENDPOINTS.TASK.UPDATE_COMMENT
                .replace("{taskId}", taskId)
                .replace("{commentId}", commentId), 
            { comment }
        );
    }
}