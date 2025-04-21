import { ProjectDto } from "./project.model";
import { TaskDto } from "./task.model";

export type UserDto = {
    userId: string;
    username: string;
    walletAddress: string;
    addressBook: AddressBook[];
    createdAt: string;
    updatedAt: string;
    
    contributionSummary?: ContributionSummaryDto;
    createdTasks?: TaskDto[];
    contributedTasks?: TaskDto[];
    projects?: ProjectDto[];
}

export type AddressBook = {
    name: string;
    address: string;
}

export type ContributionSummaryDto = {
    id: string;
    tasksTaken: number;
    tasksCompleted: number;
    averageRating: number;
    totalEarnings: number;
    userId: string;

    user?: UserDto;
}

export type UpdateUserDto = {
    username: string;
}

export type UpdateAddressBookDto = {
    name: string;
    address: string;
}

export type QueryUserDto = {
    view?: "basic" | "full" | "profile";
}