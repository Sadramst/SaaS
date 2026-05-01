"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      await api.post("/api/contact", data);
      setSubmitted(true);
    } catch {
      setServerError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-b from-[#1F3864] to-[#162d52] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Whether you have a question about our platform, pricing, or just want to chat about
                mining analytics — we&apos;re here to help.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0070C0]/10">
                    <Mail className="h-5 w-5 text-[#0070C0]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-sm text-gray-500">info@appilico.com.au</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0070C0]/10">
                    <MapPin className="h-5 w-5 text-[#0070C0]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-sm text-gray-500">Perth, Western Australia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0070C0]/10">
                    <Phone className="h-5 w-5 text-[#0070C0]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Consulting</p>
                    <a
                      href="https://www.appilico.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#0070C0] hover:underline"
                    >
                      appilico.com.au
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 p-12 text-center dark:border-gray-800">
                  <CheckCircle className="h-16 w-16 text-[#00B050]" />
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" {...register("company")} />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" {...register("subject")} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" rows={5} {...register("message")} className={errors.message ? "border-red-500" : ""} />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                  </div>
                  {serverError && <p className="text-sm text-red-500">{serverError}</p>}
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
