'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ShieldCheck, Mail, Lock, Info } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function TermsPage() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gradient-to-br from-green-500 via-yellow-500 to-red-500 shadow-lg rounded-xl py-20 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-red-700 mb-8 text-center"
      >
        Terms & Conditions
      </motion.h1>

      {/* Section 1 */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 "
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-700 mb-2">
          <ShieldCheck className="text-red-500" />
          1. User Responsibilities
        </h2>
        <p className="text-gray-800 leading-relaxed">
          By accessing our platform, you agree to act responsibly, ethically, and professionally.
          Users must not:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
          <li>Upload illegal or malicious content</li>
          <li>Attempt to hack, abuse, or harm the system</li>
          <li>Disrupt other users or misuse AI tools</li>
        </ul>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-700 mb-2">
          <Lock className="text-red-500" />
          2. Privacy Policy
        </h2>
        <p className="text-gray-800 leading-relaxed">
          We value your privacy. All personal data is securely stored and used in accordance with our policies. For more details, visit our{" "}
          <Link href="/privacy" className="text-green-600 underline">Privacy Policy</Link>.
        </p>
      </motion.section>

      {/* Section 3: Expandable */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-700">
            <ShieldCheck className="text-red-500" />
            3. Account Suspension
          </h2>
          {expanded ? <ChevronUp className="text-red-700" /> : <ChevronDown className="text-red-700" />}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-gray-800 leading-relaxed mt-2 overflow-hidden"
            >
              Violating any of our policies may result in temporary or permanent suspension. 
              Actions may be taken without notice to protect our platform and users. Common violations include:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Spamming or phishing attempts</li>
                <li>Using fake or misleading information</li>
                <li>Repeated misuse of AI tools</li>
              </ul>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Section 4 */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-700 mb-2">
          <Info className="text-red-500" />
          4. Policy Changes
        </h2>
        <p className="text-gray-800 leading-relaxed">
          We may revise these terms occasionally. Continued use of the platform means you accept the latest terms. Stay updated by visiting this page regularly.
        </p>
      </motion.section>

      {/* Section 5 */}
      <motion.section
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-700 mb-2">
          <Mail className="text-red-500" />
          5. Contact & Support
        </h2>
        <p className="text-gray-800 leading-relaxed">
          If you have questions or concerns about our Terms, please{" "}
          <Link href="/contact" className="text-green-600 underline">Contact Us</Link>. We’re here to help!
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
        © {new Date().getFullYear()} AI Resume Trainer. All rights reserved.
      </footer>
    </div>
  );
}
