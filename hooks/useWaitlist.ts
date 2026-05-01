"use client";

import { useState, useCallback } from "react";
import api from "@/lib/api";
import type { WaitlistRequest, WaitlistResponse, ApiResponse } from "@/types";

export function useWaitlist() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (data: WaitlistRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.post<ApiResponse<WaitlistResponse>>(
        "/api/waitlist/subscribe",
        data
      );
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.message ?? "Something went wrong");
      }
      return response.data;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to join waitlist. Please try again.";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  return { subscribe, loading, success, error, reset };
}
