import type { Metadata } from "next";
import ForgotPasswordPageClient from "./ForgotPasswordPageClient";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Appilico account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordPageClient />;
}
