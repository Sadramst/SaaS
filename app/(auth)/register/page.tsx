import type { Metadata } from "next";
import RegisterPageClient from "./RegisterPageClient";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Appilico account.",
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
