"use client";

import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1F3864] via-[#162d52] to-[#0d1b33] p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mb-6 text-center">
          <span className="text-2xl font-bold text-[#1F3864] dark:text-white">Appilico</span>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
