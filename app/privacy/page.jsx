"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ShieldCheck, FileText, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20  text-white min-h-screen">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-emerald-400"
      >
        <ShieldCheck className="inline-block w-8 h-8 mr-2 text-red-800" />
        Privacy Policy
      </motion.h1>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="shadow-lime-500 bg-gradient-to-br from-green-500 via-yellow-500 to-red-500 p-6 rounded-2xl shadow-lg space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-red-700">
            1. Data Collection
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We collect minimal data necessary to provide our services. This includes your name, email, and preferences when creating an account.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-700">
            2. How We Use Your Data
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your data is used to personalize your experience, enhance security, and communicate essential updates.
          </p>
        </div>

        <AnimatePresence>
          {expanded && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-red-700">
                  3. Third-Party Sharing
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not share your personal data with third parties unless required by law or for critical platform operations (e.g., payment gateways).
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-red-700 mt-6">
                  4. Data Retention
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your information as long as your account is active. You can request deletion at any time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-red-700 mt-6">
                  5. Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to access, update, or delete your data. Contact our support team for any such requests.
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <button
          className="mt-4 text-red-700 hover:underline flex items-center"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            href="/terms"
            className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 transition text-white font-medium shadow"
          >
            <FileText className="w-5 h-5" />
            Terms & Conditions
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 hover:bg-sky-700 transition text-white font-medium shadow"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
