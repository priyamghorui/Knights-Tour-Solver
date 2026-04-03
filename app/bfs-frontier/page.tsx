"use client";

import { useState, useRef } from "react";
import { Play, RotateCcw, Network, MessageSquare, Info } from "lucide-react";
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

export default function KnightBFS() {
  const [visualBoard, setVisualBoard] = useState<number[][]>(
    createEmptyBoard()
  );
  const [running, setRunning] = useState(false);
  const [delay, setDelay] = useState(400);
  const [startPos, setStartPos] = useState<[number, number] | null>(null);

  const boardRef = useRef<number[][]>(createEmptyBoard());
  const queueRef = useRef<[number, number, number][]>([]);
  const isRunningRef = useRef(false);

  function createEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(-1));
  }

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function runBFS() {
    while (queueRef.current.length > 0 && isRunningRef.current) {
      const [x, y, dist] = queueRef.current.shift()!;

      for (const [dx, dy] of MOVES) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < BOARD_SIZE &&
          ny < BOARD_SIZE &&
          boardRef.current[nx][ny] === -1
        ) {
          boardRef.current[nx][ny] = dist + 1;
          queueRef.current.push([nx, ny, dist + 1]);
        }
      }

      setVisualBoard(boardRef.current.map((r) => [...r]));
      await sleep(delay);
    }

    setRunning(false);
    isRunningRef.current = false;
  }

  function startBFS() {
    if (!startPos) return;

    reset();

    const [sx, sy] = startPos;
    boardRef.current[sx][sy] = 0;
    queueRef.current.push([sx, sy, 0]);

    setVisualBoard(boardRef.current.map((r) => [...r]));
    setRunning(true);
    isRunningRef.current = true;

    runBFS();
  }

  function reset() {
    isRunningRef.current = false;
    boardRef.current = createEmptyBoard();
    queueRef.current = [];
    setVisualBoard(createEmptyBoard());
    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navber />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-8 flex flex-col items-center gap-6">
        {/* Algorithm Detail Card */}
        <Card className="w-full max-w-2xl border-indigo-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
          <CardHeader className="bg-indigo-50 dark:bg-neutral-800/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              About BFS Rule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
            <p>
              In the Knight’s Tour problem, the goal is to construct a single
              continuous path that visits every square of the chessboard exactly
              once. This requires remembering visited squares and carefully
              choosing the next move to avoid getting stuck.
            </p>
            <p>
              BFS (Breadth-First Search), however, explores the board level by
              level, expanding to all reachable positions at each step. BFS is
              ideal for finding the minimum number of moves from a start square
              to all other squares. It focuses on reachability and distance, not
              on building one valid tour. Therefore, BFS explores the board
              efficiently, but it cannot produce a Knight’s Tour path.
            </p>
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
        <Card className="w-full max-w-2xl dark:bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                  <Network className="text-purple-400" /> Knight BFS Frontier
                </h1>
                <p className="text-xs dark:text-white">
                  Shortest moves from selected square
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="cursor-pointer" onClick={startBFS} disabled={running}>
                  <Play className="w-4 h-4 mr-1" /> Start BFS
                </Button>
                <Button className="cursor-pointer" size="sm" variant="destructive" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            </div>

            {/* Speed Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs dark:text-zinc-400 mb-1">
                <span>Fast</span>
                <span>BFS Animation Speed</span>
                <span>Slow</span>
              </div>

              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full dark:accent-purple-500 cursor-pointer"
              />

              <p className="text-center text-xs dark:text-zinc-500 mt-1">
                Delay: {delay} ms
              </p>

              {!startPos && (
                <p className="text-center text-yellow-400 text-xs mt-2">
                  Click any square to choose starting position
                </p>
              )}

              {startPos && (
                <p className="text-center dark:text-green-400 text-xs mt-2">
                  Start Position: ({startPos[0]}, {startPos[1]})
                </p>
              )}
            </div>

            {/* Board */}
            <div className="grid grid-cols-8 gap-1 dark:bg-zinc-800 p-1 rounded">
              {visualBoard.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    onClick={() => {
                      if (!running) setStartPos([i, j]);
                    }}
                    className={`aspect-square flex items-center justify-center text-xl font-bold rounded-sm transition-all cursor-pointer
                    ${
                      (i + j) % 2 === 0
                        ? "bg-[#b58863] dark:bg-neutral-700 text-[#f0d9b5]"
                        : "bg-[#f0d9b5] dark:bg-neutral-500 text-[#b58863]"
                    }
                    ${
                      cell !== -1
                        ? "bg-purple-900 text-purple-200"
                        : "text-transparent"
                    }
                    ${
                      startPos && startPos[0] === i && startPos[1] === j
                        ? "ring-4 dark:ring-yellow-400 ring-yellow-900"
                        : ""
                    }
                  `}
                  >
                    {cell !== -1 ? cell : ""}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
