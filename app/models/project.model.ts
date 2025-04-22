import { TaskDto } from "./task.model";
import { UserDto } from "./user.model";

export type ProjectDto = {
    id: string;
    name: string;
    description: string;
    repoUrl: string;
    escrowAddress: string | null;
    createdAt: string;
    updatedAt: string;
    
    tasks?: TaskDto[];
    users?: UserDto[];
    stats?: ProjectStats;
}

export type ProjectStats = {
    totalBounty: number;
    openTasks: number;
    completedTasks: number;
    totalTasks: number;
    totalMembers: number;
}

export type CreateProjectDto = {
    repoUrl: string;
}

export type UpdateProjectDto = {
    repoUrl: string;
}

export type AddTeamMembersDto = {
    githubUsernames: string[];
}

export type AddTeamMembersResponseDto = {
    username: string;
    status: string;
}

export type GetProjectIssues = {
    repoUrl: string;
}

export type QueryProjectIssues = {
    page?: number;
    limit?: number;
    labels?: string;
    milestone?: string;
    sort?: "created" | "updated" | "comments";
    direction?: "asc" | "desc";
}

export type QueryProjectDto = {
    searchTerm?: string;
    page?: number;
    limit?: number;
}