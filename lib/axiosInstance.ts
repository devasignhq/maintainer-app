import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUser } from './firebase';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    timeout: 20000,
    timeoutErrorMessage: "Timeout exceeded! Try again.",
});

// Add auth token to requests if user is logged in
axiosInstance.interceptors.request.use(async (config) => {
    const user = await getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export class HttpClient {
    static async get<T>(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await axiosInstance.get<T>(url, config);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async post<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
        try {
            const response = await axiosInstance.post<T>(url, data, config);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async put<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
        try {
            const response = await axiosInstance.put<T>(url, data, config);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async patch<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
        try {
            const response = await axiosInstance.patch<T>(url, data, config);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async delete<T>(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await axiosInstance.delete<T>(url, config);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }
}