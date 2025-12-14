import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { 
    AddTeamMemberDto,
    AddTeamMemberResponseDto,
    CreateInstallationDto,
    InstallationDto,
    QueryInstallationDto,
    UpdateInstallationDto,
    UpdateTeamMemberDto
} from "../models/installation.model";
import { MessageResponse, MessageWithDataResponse, PartialSuccessResponse } from "../models/_global";
import { PaginatedResponse } from "../models/_global";
import {
    RepositoryDto,
    QueryRepositoryIssues,
    GetRepositoryIssuesResponse,
    GetRepositoryResourcesResponse,
    GetOrCreateBountyLabelResponse
} from "../models/github.model";

export class InstallationAPI {
    static async getInstallations(query?: QueryInstallationDto) {
        return HttpClient.get<PaginatedResponse<InstallationDto>>(ENDPOINTS.INSTALLATION.GET_ALL, { params: query });
    }

    static async getInstallationById(installationId: string) {
        return HttpClient.get<InstallationDto>(ENDPOINTS.INSTALLATION.GET_BY_ID.replace("{installationId}", installationId));
    }

    static async createInstallation(installation: CreateInstallationDto) {
        return HttpClient.post<InstallationDto | PartialSuccessResponse<"installation", InstallationDto>>(
            ENDPOINTS.INSTALLATION.CREATE, installation);
    }

    static async updateInstallation(installationId: string, data: UpdateInstallationDto) {
        return HttpClient.patch<Pick<InstallationDto, "htmlUrl" | "targetId" | "account" | "updatedAt">>(
            ENDPOINTS.INSTALLATION.UPDATE.replace("{installationId}", installationId), data);
    }
    
    static async deleteInstallation(installationId: string) {
        return HttpClient.delete<MessageWithDataResponse<"refunded", string>>(
            ENDPOINTS.INSTALLATION.DELETE.replace("{installationId}", installationId));
    }

    // ==========================================================
    // ==========================================================

    static async addTeamMember(installationId: string, data: AddTeamMemberDto) {
        return HttpClient.post<AddTeamMemberResponseDto>(
            ENDPOINTS.INSTALLATION.ADD_TEAM_MEMBER.replace("{installationId}", installationId),
            data
        );
    }

    static async updateTeamMember(installationId: string, userId: string, data: UpdateTeamMemberDto) {
        return HttpClient.patch<MessageResponse>(
            ENDPOINTS.INSTALLATION.UPDATE_TEAM_MEMBER
                .replace("{installationId}", installationId)
                .replace("{userId}", userId),
            data
        );
    }

    static async removeTeamMember(installationId: string, userId: string) {
        return HttpClient.delete<MessageResponse>(
            ENDPOINTS.INSTALLATION.REMOVE_TEAM_MEMBER
                .replace("{installationId}", installationId)
                .replace("{userId}", userId)
        );
    }

    // ==========================================================
    // ==========================================================\

    static async getInstallationRepositories(installationId: string) {
        return HttpClient.get<RepositoryDto[]>(ENDPOINTS.INSTALLATION.GET_INSTALLATION_REPOSITORIES
            .replace("{installationId}", installationId));
    }

    static async getRepositoryIssues(installationId: string, query: QueryRepositoryIssues) {
        return HttpClient.get<GetRepositoryIssuesResponse>(ENDPOINTS.INSTALLATION.GET_REPOSITORY_ISSUES
            .replace("{installationId}", installationId), { params: query });
    }

    static async getRepositoryResources(installationId: string, repoUrl: string) {
        return HttpClient.get<GetRepositoryResourcesResponse>(ENDPOINTS.INSTALLATION.GET_REPOSITORY_RESOURCES
            .replace("{installationId}", installationId), { params: { repoUrl } });
    }

    static async getOrCreateBountyLabel(installationId: string, repositoryId: string) {
        return HttpClient.get<GetOrCreateBountyLabelResponse>(ENDPOINTS.INSTALLATION.SET_BOUNTY_LABEL
            .replace("{installationId}", installationId), { params: { repositoryId } });
    }
}
