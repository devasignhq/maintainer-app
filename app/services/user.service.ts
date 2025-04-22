import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { QueryUserDto, UpdateAddressBookDto, UpdateUserDto, UserDto } from "../models/user.model";

export class UserAPI {
    static async getUser(query?: QueryUserDto) {
        return HttpClient.get<UserDto>(ENDPOINTS.USER.GET, { params: query });
    }

    static async createUser(user: UpdateUserDto) {
        return HttpClient.post<UserDto>(ENDPOINTS.USER.CREATE, user);
    }

    static async updateUser(updates: UpdateUserDto) {
        return HttpClient.put<Partial<UserDto>>(ENDPOINTS.USER.UPDATE, updates);
    }

    static async addToAddressBook(entry: UpdateAddressBookDto) {
        return HttpClient.post<Partial<UserDto>>(ENDPOINTS.USER.ADDRESS_BOOK, entry);
    }
}