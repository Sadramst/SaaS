import apiClient from "./client";
import type { ApiResponse, BlogPostDto, PagedResult } from "@/types";

interface BlogParams {
  category?: string;
  page?: number;
  pageSize?: number;
}

export const blogApi = {
  getPosts: (params?: BlogParams) =>
    apiClient.get<ApiResponse<PagedResult<BlogPostDto>>>("/blog/posts", { params }).then((r) => r.data),

  getPost: (slug: string) =>
    apiClient.get<ApiResponse<BlogPostDto>>(`/blog/posts/${slug}`).then((r) => r.data),
};
