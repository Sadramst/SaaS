import apiClient from "./client";
import type { ApiResponse, SubscriptionInfo, PlanDto } from "@/types";

export const subscriptionsApi = {
  getPlans: () =>
    apiClient.get<ApiResponse<PlanDto[]>>("/subscription/plans").then((r) => r.data),

  getCurrent: () =>
    apiClient.get<ApiResponse<SubscriptionInfo>>("/subscription/current").then((r) => r.data),

  upgrade: (plan: string) =>
    apiClient.post<ApiResponse<SubscriptionInfo>>("/subscription/upgrade", { plan }).then((r) => r.data),
};
