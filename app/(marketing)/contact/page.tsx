import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Appilico team. We'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
