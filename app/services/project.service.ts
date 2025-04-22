import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { AddTeamMembersDto, AddTeamMembersResponseDto, CreateProjectDto, GetProjectIssues, ProjectDto, QueryProjectDto, QueryProjectIssues, UpdateProjectDto } from "../models/project.model";

export class ProjectAPI {
    static async getProjects(query?: QueryProjectDto) {
        return HttpClient.get<ProjectDto[]>(ENDPOINTS.PROJECT.GET_ALL, { params: query });
    }

    static async getProjectById(projectId: string) {
        return HttpClient.get<ProjectDto>(ENDPOINTS.PROJECT.GET_BY_ID.replace("{projectId}", projectId));
    }

    static async createProject(project: CreateProjectDto) {
        return HttpClient.post<ProjectDto>(ENDPOINTS.PROJECT.CREATE, project);
    }

    static async updateProject(projectId: string, updates: UpdateProjectDto) {
        return HttpClient.put<ProjectDto>(ENDPOINTS.PROJECT.UPDATE.replace("{projectId}", projectId), updates);
    }

    static async deleteProject(projectId: string) {
        return HttpClient.delete(ENDPOINTS.PROJECT.DELETE.replace("{projectId}", projectId));
    }

    static async addTeamMembers(projectId: string, members: AddTeamMembersDto) {
        return HttpClient.post<AddTeamMembersResponseDto[]>(ENDPOINTS.PROJECT.ADD_TEAM_MEMBER.replace("{projectId}", projectId), members);
    }

    static async getIssues(repoDetails: GetProjectIssues, query?: QueryProjectIssues) {
        return HttpClient.get(ENDPOINTS.PROJECT.ISSUES, { 
            params: { 
                ...repoDetails,
                ...query
            }
        });
    }

    static async getMilestones(repoUrl: string) {
        return HttpClient.get(ENDPOINTS.PROJECT.MILESTONES, { 
            params: { repoUrl } 
        });
    }

    static async getLabels(repoUrl: string) {
        return HttpClient.get(ENDPOINTS.PROJECT.LABELS, { 
            params: { repoUrl } 
        });
    }
}