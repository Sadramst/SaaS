"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Loader2 } from "lucide-react";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    company: z.string().min(1, "Company is required"),
    phone: z.string().min(1, "Phone is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.literal(true, { error: "You must accept the terms" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPageClient() {
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        phone: data.phone,
        password: data.password,
      });
      if (!result.success) {
        setServerError(result.message ?? "Registration failed");
      }
    } catch {
      setServerError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-16 pb-16">
      <div className="mx-4 w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
            <p className="mt-2 text-sm text-gray-500">Join Appilico and start your analytics journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} className={errors.firstName ? "border-red-500" : ""} />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} className={errors.lastName ? "border-red-500" : ""} />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...register("company")} className={errors.company ? "border-red-500" : ""} />
                {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Min. 8 characters" {...register("password")} className={errors.password ? "border-red-500" : ""} />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword")} className={errors.confirmPassword ? "border-red-500" : ""} />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" {...register("terms")} className="mt-1 rounded border-gray-300" />
              <Label htmlFor="terms" className="text-sm font-normal text-gray-500">
                I agree to the{" "}
                <Link href="/terms" className="text-[#0070C0] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#0070C0] hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#0070C0] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
