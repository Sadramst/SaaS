"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import apiClient from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loader2, Lock } from "lucide-react";
import type { ApiResponse, UserDto } from "@/types";

const profileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  company: z.string().optional(),
  email: z.string().email(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      company: user?.company ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const res = await apiClient.put<ApiResponse<UserDto>>("/user/profile", {
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
      });
      if (res.data.success && res.data.data) {
        setUser(res.data.data);
      }
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} className={errors.firstName ? "border-red-500" : ""} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} className={errors.lastName ? "border-red-500" : ""} />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input id="email" type="email" {...register("email")} disabled className="pr-10" />
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-400">Email cannot be changed.</p>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" {...register("company")} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
