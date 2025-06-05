import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { 
    AddTeamMemberDto,
    AddTeamMemberResponseDto,
    ConnectRepositoryDto,
    CreateProjectDto,
    GetRepoAttachments,
    ProjectDto,
    QueryProjectDto,
    QueryProjectIssues,
    UpdateProjectDto,
    UpdateTeamMemberDto
} from "../models/project.model";
import { MessageResponse, MessageWithDataResponse } from "../models/_global";
import { IssueDto, IssueLabel, IssueMilestone } from "../models/github.model";
import { PaginatedResponse } from "../models/_global";

export class ProjectAPI {
    static async getProjects(query?: QueryProjectDto) {
        return HttpClient.get<PaginatedResponse<ProjectDto>>(ENDPOINTS.PROJECT.GET_ALL, { params: query });
    }

    static async getProjectById(projectId: string) {
        return HttpClient.get<ProjectDto>(ENDPOINTS.PROJECT.GET_BY_ID.replace("{projectId}", projectId));
    }

    static async createProject(project: CreateProjectDto) {
        return HttpClient.post<ProjectDto>(ENDPOINTS.PROJECT.CREATE, project);
    }

    static async connectRepository(projectId: string, data: ConnectRepositoryDto) {
        return HttpClient.post<MessageWithDataResponse<"repoUrls", string[]>>(
            ENDPOINTS.PROJECT.CONNECT_REPO.replace("{projectId}", projectId), data);
    }

    static async updateProject(projectId: string, data: UpdateProjectDto) {
        return HttpClient.patch<Pick<ProjectDto, "name" | "description" | "updatedAt">>(
            ENDPOINTS.PROJECT.UPDATE.replace("{projectId}", projectId), data);
    }

    static async addTeamMember(projectId: string, data: AddTeamMemberDto) {
        return HttpClient.post<AddTeamMemberResponseDto>(
            ENDPOINTS.PROJECT.ADD_TEAM_MEMBER.replace("{projectId}", projectId),
            data
        );
    }

    static async updateTeamMember(projectId: string, userId: string, data: UpdateTeamMemberDto) {
        return HttpClient.patch<MessageResponse>(
            ENDPOINTS.PROJECT.UPDATE_TEAM_MEMBER
                .replace("{projectId}", projectId)
                .replace("{userId}", userId),
            data
        );
    }

    static async removeTeamMember(projectId: string, userId: string) {
        return HttpClient.delete<MessageResponse>(
            ENDPOINTS.PROJECT.REMOVE_TEAM_MEMBER
                .replace("{projectId}", projectId)
                .replace("{userId}", userId)
        );
    }

    static async getProjectIssues(data: GetRepoAttachments, query?: QueryProjectIssues) {
        return HttpClient.get<IssueDto[]>(ENDPOINTS.PROJECT.ISSUES, { data, params: query });
    }

    static async getProjectLabels(data: GetRepoAttachments) {
        return HttpClient.get<IssueLabel[]>(ENDPOINTS.PROJECT.LABELS, { data });
    }

    static async getProjectMilestones(data: GetRepoAttachments) {
        return HttpClient.get<IssueMilestone[]>(ENDPOINTS.PROJECT.MILESTONES, { data });
    }
    
    static async deleteProject(projectId: string) {
        return HttpClient.delete<MessageWithDataResponse<"refunded", string>>(
            ENDPOINTS.PROJECT.DELETE.replace("{projectId}", projectId));
    }
}