"use client";

import { useState, useRef } from "react";
import {
  Play,
  RotateCcw,
  Box,
  FastForward,
  StopCircle,
  Info,
  MessageSquare,
  MousePointer2,
} from "lucide-react";
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

export default function KnightTourBacktrackingFixed() {
  const [visualBoard, setVisualBoard] = useState<number[][]>(
    createEmptyBoard()
  );
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  // Feature: Store the user-selected starting position
  const [startPos, setStartPos] = useState<[number, number]>([0, 0]);

  const boardRef = useRef<number[][]>(createEmptyBoard());
  const isRunningRef = useRef(false);

  function createEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
  }

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function solveDFS(
    x: number,
    y: number,
    moveCount: number
  ): Promise<boolean> {
    if (!isRunningRef.current) return false;

    boardRef.current[x][y] = moveCount;
    setVisualBoard(boardRef.current.map((row) => [...row]));
    await sleep(speed);

    if (moveCount === BOARD_SIZE * BOARD_SIZE) return true;

    for (const [dx, dy] of MOVES) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < BOARD_SIZE &&
        ny < BOARD_SIZE &&
        boardRef.current[nx][ny] === 0
      ) {
        if (await solveDFS(nx, ny, moveCount + 1)) return true;
      }
    }

    if (!isRunningRef.current) return false;
    boardRef.current[x][y] = 0;
    setVisualBoard(boardRef.current.map((row) => [...row]));
    await sleep(speed / 2);

    return false;
  }

  const startTour = async () => {
    // Ensure board is clear before starting
    boardRef.current = createEmptyBoard();
    isRunningRef.current = true;
    setRunning(true);
    // Use the user-selected startPos
    await solveDFS(startPos[0], startPos[1], 1);
    setRunning(false);
  };

  function reset() {
    isRunningRef.current = false;
    boardRef.current = createEmptyBoard();
    setVisualBoard(createEmptyBoard());
    setRunning(false);
  }

  const handleSquareClick = (r: number, c: number) => {
    if (running) return; 
    reset(); 
    setStartPos([r, c]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navber />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-8 flex flex-col items-center gap-6">
        {/* Algorithm Detail Card - DFS Backtracking */}

        <Card className="w-full max-w-2xl border-purple-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
          <CardHeader className="bg-purple-50 dark:bg-neutral-800/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              About DFS & Backtracking
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
            <p>
              <strong>Backtracking</strong> is a classic algorithmic technique
              for solving combinatorial problems by exploring all possible
              paths. It uses a <strong>Depth-First Search (DFS)</strong>{" "}
              strategy to traverse the board.
            </p>

            <p>
              The algorithm makes a move, and if it reaches a dead end where no
              more valid moves exist, it "backtracks" to the previous square and
              tries a different branch. While exhaustive and thorough, it can be
              significantly slower than heuristics for an 8 X 8 board.
            </p>

            <div className="pt-2">
              <a
                href="/#feedback"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:underline"
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
              <h1 className="text-xl font-bold dark:text-white flex items-center gap-2">
                DFS & Backtracking Visualizer
              </h1>
              <div className="flex gap-2">
                {!running ? (
                  <Button
                    size="sm"
                    onClick={startTour}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    <Play className="w-4 h-4 mr-1" /> Start
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => (isRunningRef.current = false)}
                  >
                    <StopCircle className="w-4 h-4 mr-1" /> Stop
                  </Button>
                )}
                <Button
                  size="sm"
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={reset}
                >
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-1 dark:bg-zinc-800 p-1 rounded">
              {visualBoard.map((row, i) =>
                row.map((cell, j) => {
                  const isSelected = startPos[0] === i && startPos[1] === j;
                  const isEmpty = cell === 0;

                  return (
                    <div
                      key={`${i}-${j}`}
                      onClick={() => handleSquareClick(i, j)}
                      className={`aspect-square flex items-center justify-center text-xl font-bold rounded-sm transition-all cursor-pointer
                        ${
                          (i + j) % 2 === 0
                            ? "bg-[#b58863] dark:bg-neutral-700 text-[#f0d9b5]"
                            : "bg-[#f0d9b5] dark:bg-neutral-500 text-[#b58863]"
                        }
                        ${!isEmpty ? "bg-purple-900 text-purple-200" : ""}
                        ${
                          isEmpty && isSelected && !running
                            ? "ring-4 ring-blue-500 ring-inset bg-blue-100 dark:bg-blue-900/30"
                            : ""
                        }
                      `}
                    >
                      {cell !== 0 ? cell : isSelected && !running ? "S" : ""}
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <FastForward size={16} className="dark:text-zinc-500" />
              <input
                type="range"
                min="1"
                max="500"
                step="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-[10px] dark:text-zinc-500 w-12">
                {speed}ms
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
