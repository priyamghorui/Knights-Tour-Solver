"use client"
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
  Moon,GraduationCap
} from 'lucide-react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
export default function Navber() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const router = useRouter()

return(
    <>
       {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div onClick={()=>{router.push("/")}} className="h-15 w-15 hover:p-0.5 cursor-pointer  rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              {/* UNIV */}
              <img src="/images.png" alt="" />
            </div>
            <ChessKnight onClick={()=>{router.push("/")}} className="w-15 h-15 cursor-pointer text-indigo-600 hover:p-0.5 dark:text-indigo-400" />
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
    </>

)
}
