"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CheckCircle, Loader2 } from "lucide-react";

const resetSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    setServerError(null);
    try {
      const result = await authApi.resetPassword(params.token, data.newPassword, data.confirmPassword);
      if (result.success) {
        setSuccess(true);
        toast.success("Password updated successfully");
      } else {
        setServerError(result.message ?? "Failed to reset password");
      }
    } catch {
      setServerError("This reset link may have expired. Please request a new one.");
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-[#00B050]" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Password updated</h1>
        <p className="mt-2 text-sm text-gray-500">Your password has been reset successfully.</p>
        <Link href="/login">
          <Button className="mt-6">Sign In →</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Set new password</h1>
        <p className="mt-1 text-sm text-gray-500">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" placeholder="Min. 8 characters" {...register("newPassword")} className={errors.newPassword ? "border-red-500" : ""} />
          {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} className={errors.confirmPassword ? "border-red-500" : ""} />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Reset Password
        </Button>
      </form>
    </>
  );
}
