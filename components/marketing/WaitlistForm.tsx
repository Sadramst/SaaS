"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { waitlistApi } from "@/lib/api/waitlist";
import { CheckCircle, Loader2 } from "lucide-react";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function WaitlistForm({ onClose, isModal = false }: WaitlistFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setLoading(true);
    setError(null);
    try {
      await waitlistApi.subscribe({ email: data.email });
      setSuccess(true);
    } catch {
      setError("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        className="flex flex-col items-center gap-4 py-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle className="h-16 w-16 text-[#00B050]" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">You&apos;re on the list!</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We&apos;ll be in touch when we&apos;re ready to onboard founding members.
        </p>
        {isModal && onClose && (
          <Button variant="outline" onClick={() => { setSuccess(false); onClose(); }}>
            Close
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <Input
          placeholder="Enter your work email"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Join Waitlist
      </Button>
    </form>
  );
}
