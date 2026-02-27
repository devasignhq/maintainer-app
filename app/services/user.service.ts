import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { AddressBook, UserDto, CreateUserPayloadDto } from "../models/user.model";
import { ApiResponse } from "../models/_global";

export class UserAPI {
    static async getUser() {
        return HttpClient.get<ApiResponse<UserDto>>(ENDPOINTS.USER.GET);
    }

    static async createUser(data: CreateUserPayloadDto) {
        return HttpClient.post<ApiResponse<UserDto>>(
            ENDPOINTS.USER.CREATE,
            data,
            { params: { skipWallet: "true" } }
        );
    }

    static async addToAddressBook(data: AddressBook) {
        return HttpClient.patch<
            ApiResponse<Pick<UserDto, "userId" | "addressBook" | "updatedAt">>
        >(ENDPOINTS.USER.ADDRESS_BOOK, data);
    }
}
