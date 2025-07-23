import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import {
    AddressBook,
    QueryUserDto,
    UserDto,
    UserPayloadDto 
} from "../models/user.model";
import { PartialSuccessResponse } from "../models/_global";

export class UserAPI {
    static async getUser(query?: QueryUserDto) {
        return HttpClient.get<UserDto>(ENDPOINTS.USER.GET, { params: query });
    }

    static async createUser(data: UserPayloadDto) {
        return HttpClient.post<UserDto | PartialSuccessResponse<"user", UserDto>>(ENDPOINTS.USER.CREATE, data);
    }

    static async updateUsername(data: UserPayloadDto) {
        return HttpClient.patch<Pick<UserDto, "userId" | "username" | "updatedAt">>(
            ENDPOINTS.USER.UPDATE_USERNAME, data);
    }

    static async addToAddressBook(data: AddressBook) {
        return HttpClient.patch<Pick<UserDto, "userId" | "addressBook" | "updatedAt">>(
            ENDPOINTS.USER.ADDRESS_BOOK, data);
    }
}