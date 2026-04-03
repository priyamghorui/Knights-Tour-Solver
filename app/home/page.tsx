"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
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
  Moon,GraduationCap
} from 'lucide-react';
import { useRouter } from 'next/navigation'
const mentor = {
  name: "Dr. Faculty Name",
  designation: "Assistant Professor, Dept. of CSE"
};
export default function KnightsTourLanding() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => setMounted(true), []);
  const router = useRouter()
  const contributors = [
    { name: "Contributor One", roll: "10001", reg: "R100012022" },
    { name: "Contributor Two", roll: "10002", reg: "R100022022" },
    { name: "Contributor Three", roll: "10003", reg: "R100032022" },
    { name: "Contributor Four", roll: "10004", reg: "R100042022" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-15 w-15  rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              {/* UNIV */}
              <img src="/images.png" alt="" />
            </div>
            <ChessKnight className="w-15 h-15 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://www.priyamghorui.com" 
              target="_blank" 
              className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Maintainer: www.priyamghorui.com <ExternalLink className="w-4 h-4" />
            </a>

            {/* Light/Dark Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:ring-2 ring-indigo-500/50 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {mounted && (theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              ))}
            </button>
          </div>
        </div>
        <div className='items-center md:hidden gap-2 text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex flex-row-reverse mr-5 mb-4'>

            <a 
              href="https://www.priyamghorui.com" 
              target="_blank" 
              className="flex"
              >
              Maintainer: www.priyamghorui.com <ExternalLink className="w-4 h-4" />
            </a>
                </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm mb-4">
            <ShieldCheck className="w-4 h-4" />
            Algorithm Visualizer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome to <br /> 
            <span className="text-indigo-600 dark:text-indigo-400">Knight's Tour Solver</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Explore the classic mathematical challenge of moving a knight across a chessboard to visit every square exactly once.
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          {[
            { title: "Warnsdorff / Greedy",desc: "Heuristic-based optimization for rapid pathfinding.", icon: Cpu, color: "hover:border-emerald-500/50" },
            { title: "BFS Frontier",desc: "Level-order exploration to find the shortest path.", icon: Network, color: "hover:border-blue-500/50" },
            { title: "DFS / Backtracking",desc: "Exhaustive recursive search through the board state.", icon: GitBranch, color: "hover:border-purple-500/50" }
          ].map((algo, idx) => (
            <button 
              key={idx}
              className={`group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-left transition-all hover:shadow-xl cursor-pointer hover:border-2 ${algo.color}`}
              onClick={()=>{router.push("/warnsdorff-greedy")}}
            >
              <algo.icon className="w-10 h-10 mb-6 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <h3 className="text-xl font-bold mb-2">{algo.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{algo.desc}</p>
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
      <div 
        key={i} 
        className="group p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-indigo-500/50 transition-all shadow-sm"
      >
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
    ))}
  </div>
</section>

        {/* Feedback */}
        <section className="max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">Feedback Form</h2>
          <form action="https://formsubmit.co/ajax/priyamghorui2004@gmail.com" method="POST" className="space-y-4">
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
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-900 py-12 text-center text-slate-500 text-sm">
        @2026 all rights reserved.
      </footer>
    </div>
  );
}