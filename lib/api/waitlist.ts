import apiClient from "./client";
import type { ApiResponse, WaitlistRequest, WaitlistResponse } from "@/types";

export const waitlistApi = {
  subscribe: (data: WaitlistRequest) =>
    apiClient.post<ApiResponse<WaitlistResponse>>("/waitlist/subscribe", data).then((r) => r.data),

  getCount: () =>
    apiClient.get<ApiResponse<number>>("/waitlist/count").then((r) => r.data),
};
