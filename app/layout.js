import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach – Build Your Dream Resume & Career Path",
  description: "Empower your career with AI-powered resume building, interview prep, and professional development tools.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-gradient-to-br from-green-500 via-yellow-500 to-red-500  py-10 border-t border-gray-700">
              <div className="container mx-auto px-4 flex flex-col items-center gap-4">
                <p className="text-sm text-black">
                  Made with 💗 by MOHD JUBAIR ALAM & AI Career Trainer Team
                </p>
                <div className="flex items-center gap-6 text-xl text-gray-300">
                  <a
                    href="https://instagram.com/__Jubair_786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition text-red-500"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.youtube.com/@MZ-Motiv0786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition text-red-500"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://wa.me/918448454299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition text-red-500"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://maps.app.goo.gl/kpTtnVXoAGh6CJBw6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition text-red-500"
                  >
                    <FaMapMarkerAlt />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition text-red-500"
                  >
                    <FaTwitter />
                  </a>
                </div>
                <div className="text-sm">
                <Link
                  href="/terms"
                  className="hover:underline hover:text-green-700 transition"
                >
                  Terms & Conditions
                </Link>{" "}
                |{" "}
                <Link
                  href="/privacy"
                  className="hover:underline hover:text-green-700 transition"
                >
                  Privacy Policy
                </Link>{" "}
                |{" "}
                <Link
                  href="/contact"
                  className="hover:underline hover:text-green-700 transition"
                >
                  Contact
                </Link>
              </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
