import apiClient from "./client";
import type { ApiResponse, Visual, VisualDetailDto } from "@/types";

interface VisualsParams {
  category?: string;
  search?: string;
}

export const visualsApi = {
  getVisuals: (params?: VisualsParams) =>
    apiClient.get<ApiResponse<Visual[]>>("/visuals", { params }).then((r) => r.data),

  getVisual: (id: string) =>
    apiClient.get<ApiResponse<VisualDetailDto>>(`/visuals/${id}`).then((r) => r.data),

  downloadVisual: (id: string) =>
    apiClient.post<ApiResponse<{ downloadUrl: string }>>(`/visuals/${id}/download`).then((r) => r.data),
};
