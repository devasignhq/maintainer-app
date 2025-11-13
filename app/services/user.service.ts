import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import {
    AddressBook,
    QueryUserDto,
    UserDto,
    CreateUserPayloadDto, 
    UpdateUserPayloadDto
} from "../models/user.model";

export class UserAPI {
    static async getUser(query?: QueryUserDto) {
        return HttpClient.get<UserDto>(ENDPOINTS.USER.GET, { params: query });
    }

    static async createUser(data: CreateUserPayloadDto) {
        return HttpClient.post<UserDto>(
            ENDPOINTS.USER.CREATE, data, { params: { skipWallet: "true" } });
    }

    static async updateUsername(data: UpdateUserPayloadDto) {
        return HttpClient.patch<Pick<UserDto, "userId" | "username" | "updatedAt">>(
            ENDPOINTS.USER.UPDATE_USERNAME, data);
    }

    static async addToAddressBook(data: AddressBook) {
        return HttpClient.patch<Pick<UserDto, "userId" | "addressBook" | "updatedAt">>(
            ENDPOINTS.USER.ADDRESS_BOOK, data);
    }
}