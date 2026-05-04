import apiClient from "./client";
import type { ApiResponse, ContactRequest } from "@/types";

export const contactApi = {
  submit: (data: ContactRequest) =>
    apiClient.post<ApiResponse<boolean>>("/contact", data).then((r) => r.data),
};
