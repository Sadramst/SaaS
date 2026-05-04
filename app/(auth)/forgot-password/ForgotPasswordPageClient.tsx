"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/lib/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CheckCircle, Loader2, ArrowLeft } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("Valid email is required"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setServerError(null);
    try {
      await authApi.forgotPassword(data.email);
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Always show success to prevent email enumeration
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-[#00B050]" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Check your email</h1>
        <p className="mt-2 text-sm text-gray-500">
          If an account with that email exists, we&apos;ve sent a password reset link.
        </p>
        <Link href="/login">
          <Button variant="outline" className="mt-6">Back to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
        <p className="mt-1 text-sm text-gray-500">Enter your email and we&apos;ll send you a reset link</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send Reset Link
        </Button>
      </form>

      <div className="mt-5 text-center">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0070C0]">
          <ArrowLeft className="h-4 w-4" /> Back to Sign In
        </Link>
      </div>
    </>
  );
}
