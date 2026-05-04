import apiClient from "./client";
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserDto,
  ChangePasswordRequest,
} from "@/types";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/login", data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/register", data).then((r) => r.data),

  refreshToken: (token: string) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/refresh-token", { refreshToken: token }).then((r) => r.data),

  forgotPassword: (email: string) =>
    apiClient.post<ApiResponse<boolean>>("/auth/forgot-password", { email }).then((r) => r.data),

  resetPassword: (token: string, newPassword: string, confirmPassword: string) =>
    apiClient.post<ApiResponse<boolean>>("/auth/reset-password", { token, newPassword, confirmPassword }).then((r) => r.data),

  changePassword: (data: ChangePasswordRequest) =>
    apiClient.put<ApiResponse<boolean>>("/auth/change-password", data).then((r) => r.data),

  getMe: () =>
    apiClient.get<ApiResponse<UserDto>>("/auth/me").then((r) => r.data),
};
