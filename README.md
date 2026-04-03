# ♞ Knight’s Tour & Traversal Visualizer

A comprehensive pathfinding and state-space exploration tool built with **Next.js 14**. This application visualizes how a knight navigates a chessboard using three distinct algorithmic strategies: **Warnsdorff's Rule**, **DFS Backtracking**, and **BFS Shortest Path**.

---
## 🌐 Live Link
### Please visit : https://knights-tour-solver-aucse.vercel.app/
---
## 🚀 Features

* **Interactive Start:** Click any square on the 8x8 grid to set a custom starting position.
* **Real-time Visualization:** Watch the algorithm "think" as it labels the board step-by-step.
* **Dynamic Speed Control:** Adjust the visualization delay from 1ms to 500ms using a smooth slider.
* **Responsive UI:** Optimized for both desktop and mobile viewing with a sleek dark-mode aesthetic.
* **Execution Safety:** Built with React `useRef` to ensure the recursive logic stays synced with the UI without "glitching" or memory leaks.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Components:** [Shadcn/UI](https://ui.shadcn.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Language:** TypeScript

---

## 🧠 Algorithms Explained

### 1. Warnsdorff’s Heuristic (Greedy Search)
The most efficient approach for solving the Knight's Tour.

* **The Strategy:** At each step, the knight evaluates all legal moves and chooses the square that has the **minimum number of onward moves** (the lowest "degree").
* **Why it works:** By visiting highly restricted squares (like corners and edges) first, the knight leaves the most "accessible" squares for the end of the tour, usually finding a solution in linear time without any backtracking.



### 2. DFS & Backtracking (Exhaustive Search)
A classic "brute-force" depth-first exploration used in computer science to find all possible solutions.

* **The Strategy:** The knight explores a path as deep as possible. If it hits a dead end where no unvisited squares are reachable, the algorithm **backtracks** (undoes the last move) and tries the next available branch.
* **The Visual:** You will see numbers appear and then disappear as the knight "realizes" a path is a dead end and tries a different route.



### 3. BFS Distance Mapping (Shortest Path)
A breadth-first expansion to map the board's reachability.

* **The Strategy:** Starting from a single point, the knight explores the board in "waves." Every square is marked with the **minimum number of moves** required to reach it from the start.
* **The Visual:** The "frontier" of the search expands outward, showing how quickly a knight can cover a board when it isn't restricted to visiting every square only once.

---

## 🏃 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/priyamghorui/Knights-Tour-Solver.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Open the app:**
    Navigate to `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```text
├── components/
│   ├── ui/                      # Shadcn UI components
│   └── myComponents/            # Navbar, Footer, and Global Layout
├── app/
│   ├── warnsdorff-greedy/        # warnsdorff-greedy Visualizer Engine
│   |     ├── page.tsx        
│   ├── dfs-backtracking/         # dfs-backtracking Visualizer Engine
│   |     ├── page.tsx          
│   └── bfs-frontier/             # bfs-frontier Visualizer Engine
│   |     ├── page.tsx           
│   └── page.tsx                  # Home page
│   └── layout.tsx                # Global layout
│   └── globals.css               # Global Styles & Providers
└── public/                       # Static assets & Icons
```
---
  # THANK YOU 