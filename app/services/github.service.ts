import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import {
    GetRepositoryIssuesResponse,
    GetRepositoryResourcesResponse,
    QueryRepositoryIssues,
    RepositoryDto,
    SetBountyLabelResponse
} from "../models/github.model";

export class GitHubAPI {
    static async getInstallationRepositories(installationId: string) {
        return HttpClient.get<RepositoryDto[]>(ENDPOINTS.GITHUB.GET_INSTALLATION_REPOSITORIES
            .replace("{installationId}", installationId));
    }

    static async getRepositoryIssues(installationId: string, query: QueryRepositoryIssues) {
        return HttpClient.get<GetRepositoryIssuesResponse>(ENDPOINTS.GITHUB.GET_REPOSITORY_ISSUES
            .replace("{installationId}", installationId), { params: query });
    }

    static async getRepositoryResources(installationId: string, repoUrl: string) {
        return HttpClient.get<GetRepositoryResourcesResponse>(ENDPOINTS.GITHUB.GET_REPOSITORY_RESOURCES
            .replace("{installationId}", installationId), { params: { repoUrl } });
    }

    static async setBountyLabel(installationId: string, repoUrl: string) {
        return HttpClient.get<SetBountyLabelResponse>(ENDPOINTS.GITHUB.SET_BOUNTY_LABEL
            .replace("{installationId}", installationId), { params: { repoUrl } });
    }
}