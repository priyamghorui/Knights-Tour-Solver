"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Zap, Info, MessageSquare, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navber from "@/components/myComponents/universalComponents/Navber";
import Footer from "@/components/myComponents/universalComponents/Footer";

const MOVES = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

const BOARD_SIZE = 8;
const DELAY = 400;

export default function KnightTourWarnsdorff() {
  const [board, setBoard] = useState<number[][]>(createEmptyBoard());
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [startPos, setStartPos] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function createEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
  }

  function isValid(x: number, y: number, b: number[][]) {
    return (
      x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE && b[x][y] === 0
    );
  }

  function degree(x: number, y: number, b: number[][]) {
    let count = 0;
    for (const [dx, dy] of MOVES) {
      if (isValid(x + dx, y + dy, b)) count++;
    }
    return count;
  }

  function getNextMove(x: number, y: number, b: number[][]) {
    let minDeg = 9;
    let next: [number, number] | null = null;

    const shuffledMoves = [...MOVES].sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledMoves) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValid(nx, ny, b)) {
        const d = degree(nx, ny, b);
        if (d < minDeg) {
          minDeg = d;
          next = [nx, ny];
        }
      }
    }
    return next;
  }

  function startTour() {
    if (!startPos) return alert("Select a starting square first!");

    reset(false);

    const [startX, startY] = startPos;
    const newBoard = createEmptyBoard();
    newBoard[startX][startY] = 1;

    setBoard(newBoard);
    setPos([startX, startY]);
    setStep(2);
    setRunning(true);
  }

  function reset(clearStart = true) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBoard(createEmptyBoard());
    setPos(null);
    setStep(1);
    setRunning(false);
    if (clearStart) setStartPos(null);
  }

  useEffect(() => {
    if (!running || !pos || step > BOARD_SIZE * BOARD_SIZE) {
      if (step > BOARD_SIZE * BOARD_SIZE) setRunning(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      const [currX, currY] = pos;
      const next = getNextMove(currX, currY, board);

      if (next) {
        const [nx, ny] = next;
        const newBoard = board.map((row) => [...row]);
        newBoard[nx][ny] = step;

        setBoard(newBoard);
        setPos([nx, ny]);
        setStep((s) => s + 1);
      } else {
        setRunning(false);
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running, pos, step, board]);

  function handleCellClick(i: number, j: number) {
    if (running) return;
    setStartPos([i, j]);
  }
  const [delay, setDelay] = useState(400);
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navber />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-8 flex flex-col items-center gap-6">
        {/* Algorithm Detail Card */}
        <Card className="w-full max-w-2xl border-indigo-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
          <CardHeader className="bg-indigo-50 dark:bg-neutral-800/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              About Warnsdorff's Rule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
            <p>
              Warnsdorff's rule is a <strong>heuristic</strong> for finding a
              Knight's Tour. The knight is moved so that it always proceeds to
              the square from which it will have the{" "}
              <strong>fewest onward moves</strong>.
            </p>
            <p>
              By prioritizing squares with low "degrees" (fewer exits), the
              algorithm avoids creating "islands" or dead ends on the board,
              making it significantly faster than standard backtracking.
            </p>
            <div className="flex justify-center flex-col">
              <p className="text-xl"><strong>Pseudocode</strong></p>
              <p>place knight at start </p>
              <p> for step = 1 to N*N:</p>
              <p className="ml-5"> mark current as visited</p>
              <p className="ml-5">for each legal next move: </p>
              <p className="ml-10">compute degree (onward moves)</p>
              <p className="ml-5">choose move with minimum degree</p>
              <p className="ml-5">go to that move</p>
            </div>

           <div className="pt-2">
  <a
    href="https://colab.research.google.com/drive/1WEO0vN26VLEvEKwF19_ki0pn_HjU2g7j?usp=sharing" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline group"
  >
    <Code2 className="w-4 h-4" /> 
    <span>View Python Implementation on Google Colab</span>
    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
  </a>
  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 ml-6">
    (Includes Warnsdorff's Rule)
  </p>
</div>
            <div className="pt-2">
              <a
                href="/#feedback"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                <MessageSquare className="w-4 h-4" /> Click here for feedback
                (Report if any glitch is occur)
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-2xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h1 className="text-xl dark:text-white font-bold  flex items-center gap-2">
                <Zap className="text-yellow-400" />
                Knight's Tour (Warnsdorff's Algorithm)
              </h1>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="cursor-pointer"
                  onClick={startTour}
                  disabled={running}
                >
                  <Play className="mr-2 h-4 w-4" /> Start
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setRunning(!running)}
                >
                  {running ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {running ? "Pause" : "Resume"}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => reset(true)}
                  className="cursor-pointer"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-1 dark:bg-neutral-800 p-1 rounded-lg">
              {board.map((row, i) =>
                row.map((cell, j) => {
                  const isDark = (i + j) % 2 === 1;
                  const isCurrent = pos && pos[0] === i && pos[1] === j;
                  const isStart =
                    startPos && startPos[0] === i && startPos[1] === j;

                  return (
                    <div
                      key={`${i}-${j}`}
                      onClick={() => handleCellClick(i, j)}
                      className={`cursor-pointer aspect-square flex items-center justify-center text-xs sm:text-base font-bold rounded-sm transition-all duration-200
                      ${
                        isDark
                          ? "bg-[#b58863] dark:bg-neutral-700 text-[#f0d9b5]"
                          : "bg-[#f0d9b5] dark:bg-neutral-500 text-[#b58863]"
                      }
                      ${
                        cell
                          ? "dark:text-emerald-400 dark:bg-neutral-800 shadow-inner"
                          : ""
                      }
                      ${
                        isCurrent
                          ? "dark:bg-emerald-500 bg-[#ff9c4b] text-white scale-105 z-10"
                          : ""
                      }
                      ${
                        isStart && !running
                          ? "ring-4 dark:ring-yellow-400 ring-yellow-900"
                          : ""
                      }
                    `}
                    >
                      {/* {cell !== 0 ? cell : ""} */}
                      {
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Step number if visited */}
                          {cell !== 0 && (
                            <span className="text-emerald-400 font-bold z-10 text-[30px]">
                              {cell}
                            </span>
                          )}

                          {/* Degree number if empty */}
                          {cell === 0 && (
                            <span className="absolute bottom-1 right-1 text-[15px] dark:text-white text-emerald-900">
                              {degree(i, j, board)}
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 flex justify-between items-center text-sm dark:text-neutral-400">
              <p>Click any square to choose start position.</p>
              <p className="font-mono dark:bg-neutral-800 px-2 py-1 rounded">
                Step: {step - 1}/64
              </p>
            </div>
            {/* Speed Control */}
            <div className="mb-4">
              <div className="flex justify-between text-xs dark:text-neutral-400 mb-1">
                <span>Fast</span>
                <span>Animation Speed</span>
                <span>Slow</span>
              </div>

              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full dark:accent-yellow-400 cursor-pointer"
              />

              <p className="text-center text-xs dark:text-neutral-500 mt-1">
                Delay: {delay} ms
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
