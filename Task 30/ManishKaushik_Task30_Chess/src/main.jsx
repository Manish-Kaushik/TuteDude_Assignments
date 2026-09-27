import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const PIECES = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" }
};

const FILES = ["a","b","c","d","e","f","g","h"];

function initialBoard() {
  const empty = Array.from({ length: 8 }, () => Array(8).fill(null));
  const back = ["r","n","b","q","k","b","n","r"];
  back.forEach((p, c) => {
    empty[0][c] = { color: "b", type: p };
    empty[1][c] = { color: "b", type: "p" };
    empty[6][c] = { color: "w", type: "p" };
    empty[7][c] = { color: "w", type: p };
  });
  return empty;
}

const cloneBoard = (board) => board.map(row => row.map(p => p ? { ...p } : null));

const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

function squareName(r, c) {
  return `${FILES[c]}${8-r}`;
}

function opposite(color) {
  return color === "w" ? "b" : "w";
}

function isSquareAttacked(board, targetR, targetC, byColor) {
  // Pawn attacks
  const pawnRow = byColor === "w" ? targetR + 1 : targetR - 1;
  for (const dc of [-1, 1]) {
    const c = targetC + dc;
    if (inBounds(pawnRow, c) && board[pawnRow][c]?.color === byColor && board[pawnRow][c]?.type === "p") {
      return true;
    }
  }

  // Knight attacks
  const knightOffsets = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  for (const [dr, dc] of knightOffsets) {
    const r = targetR + dr, c = targetC + dc;
    if (inBounds(r,c) && board[r][c]?.color === byColor && board[r][c]?.type === "n") return true;
  }

  // King attacks
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const r = targetR + dr, c = targetC + dc;
      if (inBounds(r,c) && board[r][c]?.color === byColor && board[r][c]?.type === "k") return true;
    }
  }

  const lines = [
    [[1,0],[-1,0],[0,1],[0,-1], ["r","q"]],
    [[1,1],[1,-1],[-1,1],[-1,-1], ["b","q"]]
  ];

  for (const group of lines) {
    const directions = group.slice(0,4);
    const attackers = group[4];
    for (const [dr, dc] of directions) {
      let r = targetR + dr, c = targetC + dc;
      while (inBounds(r,c)) {
        const p = board[r][c];
        if (p) {
          if (p.color === byColor && attackers.includes(p.type)) return true;
          break;
        }
        r += dr; c += dc;
      }
    }
  }

  return false;
}

function findKing(board, color) {
  for (let r=0; r<8; r++) {
    for (let c=0; c<8; c++) {
      if (board[r][c]?.color === color && board[r][c]?.type === "k") return [r,c];
    }
  }
  return null;
}

function isInCheck(board, color) {
  const king = findKing(board, color);
  return king ? isSquareAttacked(board, king[0], king[1], opposite(color)) : true;
}

function pseudoMoves(board, r, c, attackOnly=false) {
  const piece = board[r][c];
  if (!piece) return [];
  const moves = [];

  const add = (nr, nc) => {
    if (!inBounds(nr,nc)) return false;
    const target = board[nr][nc];
    if (!target) {
      moves.push([nr,nc]);
      return true;
    }
    if (target.color !== piece.color && target.type !== "k") moves.push([nr,nc]);
    return false;
  };

  if (piece.type === "p") {
    const dir = piece.color === "w" ? -1 : 1;
    const start = piece.color === "w" ? 6 : 1;
    if (attackOnly) {
      for (const dc of [-1,1]) {
        const nr=r+dir, nc=c+dc;
        if (inBounds(nr,nc)) moves.push([nr,nc]);
      }
      return moves;
    }
    if (inBounds(r+dir,c) && !board[r+dir][c]) {
      moves.push([r+dir,c]);
      if (r === start && !board[r+2*dir][c]) moves.push([r+2*dir,c]);
    }
    for (const dc of [-1,1]) {
      const nr=r+dir,nc=c+dc;
      if (inBounds(nr,nc) && board[nr][nc] && board[nr][nc].color !== piece.color && board[nr][nc].type !== "k") {
        moves.push([nr,nc]);
      }
    }
    return moves;
  }

  if (piece.type === "n") {
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
      .forEach(([dr,dc]) => add(r+dr,c+dc));
    return moves;
  }

  if (piece.type === "k") {
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
      if (dr || dc) add(r+dr,c+dc);
    }
    return moves;
  }

  const dirs = [];
  if (piece.type === "r" || piece.type === "q") dirs.push([1,0],[-1,0],[0,1],[0,-1]);
  if (piece.type === "b" || piece.type === "q") dirs.push([1,1],[1,-1],[-1,1],[-1,-1]);

  for (const [dr,dc] of dirs) {
    let nr=r+dr,nc=c+dc;
    while (inBounds(nr,nc)) {
      if (!add(nr,nc)) break;
      nr += dr; nc += dc;
    }
  }
  return moves;
}

function legalMoves(board, r, c) {
  const piece = board[r][c];
  if (!piece) return [];
  const pseudo = pseudoMoves(board,r,c);
  return pseudo.filter(([nr,nc]) => {
    const next = cloneBoard(board);
    next[nr][nc] = { ...piece };
    next[r][c] = null;
    if (piece.type === "p" && (nr === 0 || nr === 7)) next[nr][nc].type = "q";
    return !isInCheck(next, piece.color);
  });
}

function allLegalMoves(board, color) {
  const result = [];
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
    if (board[r][c]?.color === color) {
      legalMoves(board,r,c).forEach(to => result.push({ from:[r,c], to }));
    }
  }
  return result;
}

function notation(piece, from, to, captured) {
  const letter = piece.type === "p" ? "" : piece.type.toUpperCase();
  const capture = captured ? (piece.type === "p" ? FILES[from[1]] : "") + "x" : "";
  return `${letter}${capture}${squareName(to[0],to[1])}`;
}

function ChessApp() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("w");
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState([]);
  const [captured, setCaptured] = useState({ w: [], b: [] });
  const [status, setStatus] = useState("White to move");
  const [gameOver, setGameOver] = useState(false);
  const [clocks, setClocks] = useState({ w: 600, b: 600 });

  const currentLegal = useMemo(() => {
    if (!selected || gameOver) return [];
    return legalMoves(board, selected[0], selected[1]);
  }, [board, selected, gameOver]);

  const check = isInCheck(board, turn);

  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => {
      setClocks(prev => {
        if (prev[turn] <= 1) {
          setGameOver(true);
          setStatus(`${turn === "w" ? "Black" : "White"} wins on time`);
          return { ...prev, [turn]: 0 };
        }
        return { ...prev, [turn]: prev[turn] - 1 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [turn, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const legal = allLegalMoves(board, turn);
    if (legal.length === 0) {
      setGameOver(true);
      setStatus(check ? `Checkmate — ${turn === "w" ? "Black" : "White"} wins` : "Stalemate — Draw");
    } else {
      setStatus(check ? `${turn === "w" ? "White" : "Black"} is in check` : `${turn === "w" ? "White" : "Black"} to move`);
    }
  }, [board, turn, check, gameOver]);

  const resetGame = () => {
    setBoard(initialBoard());
    setTurn("w");
    setSelected(null);
    setMoves([]);
    setCaptured({w:[],b:[]});
    setClocks({w:600,b:600});
    setStatus("White to move");
    setGameOver(false);
  };

  const makeMove = (from, to) => {
    const piece = board[from[0]][from[1]];
    const target = board[to[0]][to[1]];
    const next = cloneBoard(board);
    next[to[0]][to[1]] = { ...piece };
    next[from[0]][from[1]] = null;

    if (piece.type === "p" && (to[0] === 0 || to[0] === 7)) {
      next[to[0]][to[1]].type = "q";
    }

    setBoard(next);
    setSelected(null);
    setMoves(prev => [...prev, notation(piece, from, to, target)]);
    if (target) {
      setCaptured(prev => ({
        ...prev,
        [target.color]: [...prev[target.color], target]
      }));
    }
    setTurn(opposite(turn));
  };

  const handleSquare = (r,c) => {
    if (gameOver) return;
    const piece = board[r][c];

    if (selected) {
      const valid = currentLegal.some(([nr,nc]) => nr === r && nc === c);
      if (valid) {
        makeMove(selected,[r,c]);
        return;
      }
    }

    if (piece?.color === turn) setSelected([r,c]);
    else setSelected(null);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds/60).toString().padStart(2,"0");
    const s = (seconds%60).toString().padStart(2,"0");
    return `${m}:${s}`;
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <span className="eyebrow">REACT MINI PROJECT</span>
          <h1>♟ Chess Arena</h1>
        </div>
        <button className="reset" onClick={resetGame}>New Game</button>
      </header>

      <main className="layout">
        <section className="game-panel">
          <div className="players">
            <div className={`player ${turn === "b" ? "active" : ""}`}>
              <span className="dot black"></span>
              <div><b>Black</b><small>{formatTime(clocks.b)}</small></div>
            </div>
            <div className="turn-badge">{gameOver ? "GAME OVER" : "TURN"}</div>
            <div className={`player ${turn === "w" ? "active" : ""}`}>
              <span className="dot white"></span>
              <div><b>White</b><small>{formatTime(clocks.w)}</small></div>
            </div>
          </div>

          <div className="status">{status}</div>

          <div className="board">
            {board.map((row,r) => row.map((piece,c) => {
              const isSelected = selected?.[0] === r && selected?.[1] === c;
              const isLegal = currentLegal.some(([nr,nc]) => nr === r && nc === c);
              const isCapture = isLegal && !!piece;
              const dark = (r+c)%2 === 1;

              return (
                <button
                  key={`${r}-${c}`}
                  className={`square ${dark ? "dark" : "light"} ${isSelected ? "selected" : ""} ${isCapture ? "capture" : ""}`}
                  onClick={() => handleSquare(r,c)}
                  aria-label={squareName(r,c)}
                >
                  <span className="piece">{piece ? PIECES[piece.color][piece.type] : ""}</span>
                  {isLegal && !piece && <span className="move-dot"></span>}
                  {c === 0 && <span className="rank">{8-r}</span>}
                  {r === 7 && <span className="file">{FILES[c]}</span>}
                </button>
              );
            }))}
          </div>

          <div className="captured-row">
            <div><b>White captured:</b> {captured.w.map((p,i)=><span key={i}>{PIECES[p.color][p.type]}</span>)}</div>
            <div><b>Black captured:</b> {captured.b.map((p,i)=><span key={i}>{PIECES[p.color][p.type]}</span>)}</div>
          </div>
        </section>

        <aside className="side-panel">
          <div className="card">
            <div className="card-title">
              <h2>Move List</h2>
              <span>{moves.length} moves</span>
            </div>
            <div className="moves">
              {moves.length === 0 ? (
                <p className="empty">No moves yet. White starts the game.</p>
              ) : (
                moves.map((move,i) => (
                  <div className="move" key={i}>
                    <span>{Math.floor(i/2)+1}{i%2===0 ? "." : "..."}</span>
                    <b>{move}</b>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card rules">
            <h2>Game Status</h2>
            <div className="rule"><span>Legal moves</span><b>✓</b></div>
            <div className="rule"><span>Check detection</span><b>✓</b></div>
            <div className="rule"><span>Checkmate</span><b>✓</b></div>
            <div className="rule"><span>Player timers</span><b>✓</b></div>
            <div className="rule"><span>Standard notation</span><b>✓</b></div>
          </div>

          <div className="tip">
            <b>How to play</b>
            <p>Select a piece and then select a highlighted square. Turns alternate automatically.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ChessApp /></React.StrictMode>
);
