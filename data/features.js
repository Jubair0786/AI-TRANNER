import {
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
  FileText,
  PenBox,
  GraduationCap,
  Bot
} from "lucide-react";
import Link from "next/link";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-green-600 animate-pulse" />,
    title: "AI-Powered Career Guidance",
    description:
      "Get personalized career advice and insights powered by advanced AI technology.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-red-600 animate-bounce" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-black animate-spin" />,
    title: "Industry Insights",
    description:
      "Stay ahead with real-time industry trends, salary data, and market analysis.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-green-700 animate-pulse" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
  },
  {
    icon: (
      <Link href="/resume" className="flex items-center gap-2 text-red-600 hover:scale-105 transition-transform duration-300">
        <FileText className="h-6 w-6" />
      </Link>
    ),
    title: "Build Resume",
    description: "Create professional resumes tailored to your goals.",
  },
  {
    icon: (
      <Link href="/ai-cover-letter" className="flex items-center gap-2 text-black hover:scale-105 transition-transform duration-300">
        <PenBox className="h-6 w-6" />
      </Link>
    ),
    title: "Cover Letter",
    description: "Craft smart AI-generated cover letters for every application.",
  },
  {
    icon: (
      <Link href="/interview" className="flex items-center gap-2 text-green-600 hover:scale-105 transition-transform duration-300">
        <GraduationCap className="h-6 w-6" />
      </Link>
    ),
    title: "Interview Prep",
    description: "Get ready for interviews with AI-generated practice sessions.",
  },
  {
    icon: (
      <Link href="/chat" className="flex items-center gap-2 text-blue-600 hover:rotate-12 transition-transform duration-300">
        <Bot className="h-6 w-6" />
      </Link>
    ),
    title: "AI ChatBot",
    description: "Chat with our intelligent assistant for instant help & guidance.",
  },
];
