"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ChessKnight,
  Send,
  ExternalLink,
  Cpu,
  Network,
  GitBranch,
  Users,
  ShieldCheck,
  Sun,
  Moon,
  GraduationCap,
  Loader2,
  Star,
  FolderGit,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navber from "@/components/myComponents/universalComponents/Navber";
import Link from "next/link";
import Footer from "@/components/myComponents/universalComponents/Footer";
const mentor = {
  name: "Dr. Tamal Ghosh",
  designation: "Associate Professor, Dept. of CSE",
};
export default function KnightsTourLanding() {
  // const { theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  // useEffect(() => setMounted(true), []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const contributors = [
    {
      name: "Sanchita Ghosh",
      roll: "UG/SOET/30/24/019",
      reg: "AU/2024/0000040",
      url: "/",
    },
    {
      name: "Bipasha Routh",
      roll: "UG/SOET/30/24/041",
      reg: "AU/2024/0000185 ",
      url: "/",
    },
    {
      name: "Brajesh Kayal",
      roll: "UG/SOET/30/24/081",
      reg: "AU/2024/0000318",
      url: "/",
    },
    {
      name: "Priyam Ghorui",
      roll: "UG/SOET/30/24/135",
      reg: "AU/2024/0000525",
      url: "https://www.priyamghorui.com",
    },
  ];
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stop the default redirect to formsubmit.co
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/priyamghorui2004@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // SUCCESS: Reload the page to clear state and show a fresh board
        alert("Feedback successfully submitted.");
        window.location.reload();
      } else {
        alert("Submission failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Form error:", err);
      alert("An error occurred.");
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navber />

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm mb-4">
            <ShieldCheck className="w-4 h-4" />
            Algorithm Visualizer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome to <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Knight's Tour Solver
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Explore the classic mathematical challenge of moving a knight across
            a chessboard to visit every square exactly once.
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          {[
            {
              title: "Warnsdorff / Greedy  [Tour Finder]",
              url: "warnsdorff-greedy",
              desc: "Heuristic-based optimization for rapid pathfinding.",
              icon: Cpu,
              color: "hover:border-emerald-500/50",
            },
            {
              title: "DFS / Backtracking  [Tour Finder]",
              url: "dfs-backtracking",
              desc: "Exhaustive recursive search through the board state.",
              icon: GitBranch,
              color: "hover:border-purple-500/50",
            },
            {
              title: "BFS Frontier [Traverse The Board]",
              url: "bfs-frontier",
              desc: "Level-order exploration to find the shortest path. This is more like Traverse the board efficiently. It not provide the knight's tour",
              icon: Network,
              color: "hover:border-blue-500/50",
            },
          ].map((algo, idx) => (
            <button
              key={idx}
              className={`group p-8 rounded-2xl border-2 border-indigo-500/20 bg-white dark:bg-slate-900/40 hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl cursor-pointer  ${algo.color}`}
              onClick={() => {
                router.push(`/${algo.url}`);
              }}
            >
              <algo.icon className="w-10 h-10 mb-6 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <h3 className="text-xl font-bold mb-2">{algo.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {algo.desc}
              </p>
            </button>
          ))}
        </div>
        {/* Mentor Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
            <h2 className="text-2xl font-bold">Project Mentor</h2>
          </div>
          <div className="max-w-md">
            <Link
              href="https://drtamal.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group p-6 rounded-2xl border-2 border-indigo-500/20 bg-white dark:bg-slate-900/40 hover:border-indigo-500/50 transition-all shadow-sm">
                <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {mentor.name}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {mentor.designation}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
        {/* Contributors Section */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-10">
            <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
            <h2 className="text-2xl font-bold">Project Contributors</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributors.map((person, i) => (
              <Link
                key={i}
                href={person.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="group p-6 rounded-2xl border-2 border-indigo-500/20 bg-white dark:bg-slate-900/40 hover:border-indigo-500/50 transition-all shadow-sm">
                  <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {person.name}
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Roll: {person.roll}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-400 transition-colors"></span>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
                        Reg: {person.reg}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Project Repository Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <FolderGit className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
            <h2 className="text-2xl font-bold">Project Repository</h2>
          </div>
          <div className="max-w-md">
            <Link
              href="https://github.com/priyamghorui/Knights-Tour-Solver.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group p-6 rounded-2xl border-2 border-indigo-500/20 bg-white dark:bg-slate-900/40 hover:border-indigo-500/50 transition-all shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    view-source-code
                  </p>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />{" "}
                      Open Source
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" /> Main Branch
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
        {/* Feedback */}
        <section
          id="feedback"
          className="max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Feedback Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
            <textarea
              name="message"
              placeholder="Comments..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            ></textarea>
            <button
              disabled={isSubmitting}
              className="w-full py-3 bg-indigo-600 cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
