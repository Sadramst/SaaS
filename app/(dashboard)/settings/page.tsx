"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loader2, CheckCircle } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  company: z.string().optional(),
  email: z.string().email(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
    setServerError(null);
    setSaved(false);
    try {
      await api.put("/api/user/profile", {
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
      });
      setSaved(true);
    } catch {
      setServerError("Failed to update profile.");
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
              <Input id="email" type="email" {...register("email")} disabled />
              <p className="mt-1 text-xs text-gray-400">Email cannot be changed.</p>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" {...register("company")} />
            </div>

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}
            {saved && (
              <p className="flex items-center gap-2 text-sm text-[#00B050]">
                <CheckCircle className="h-4 w-4" /> Profile updated successfully
              </p>
            )}

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
