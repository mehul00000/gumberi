"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Crown, RotateCcw, Timer, Trophy } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { GAME_TILES } from "@catalog";
import { useAuthUser } from "@/components/providers/auth-provider";
import { useConvexClient, useConvexEnabled, useLiveQuery } from "@/lib/backend";
import { localScores, submitScore, type ScoreRecord } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tile = { key: string; pairId: string; image: string; label: string };

function shuffled(): Tile[] {
  const pairs = GAME_TILES.flatMap((t) => [
    { pairId: t.id, image: t.image, label: t.label },
    { pairId: t.id, image: t.image, label: t.label },
  ]);
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((t, i) => ({ ...t, key: `${t.pairId}-${i}` }));
}

export function MatchGame() {
  const { user } = useAuthUser();
  const convex = useConvexClient();
  const convexEnabled = useConvexEnabled();

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [lock, setLock] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [demoTop, setDemoTop] = useState<ScoreRecord[]>([]);

  // Leaderboard — live from Convex, local otherwise.
  const serverTop = useLiveQuery(api.scores.top as never, {}, [] as ScoreRecord[]);
  const leaderboard = convexEnabled ? serverTop : demoTop;

  const refreshDemo = useCallback(() => setDemoTop(localScores()), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!convexEnabled) refreshDemo();
  }, [convexEnabled, refreshDemo]);

  // Deal
  const deal = useCallback(() => {
    setTiles(shuffled());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setStarted(false);
    setWon(false);
    setLock(false);
    setSaved(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    deal();
  }, [deal]);

  // Timer
  useEffect(() => {
    if (!started || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started, won]);

  const flip = useCallback(
    (tile: Tile) => {
      if (lock || won) return;
      if (flipped.includes(tile.key) || matched.includes(tile.pairId)) return;
      if (!started) setStarted(true);

      const next = [...flipped, tile.key];
      setFlipped(next);

      if (next.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = next.map((k) => tiles.find((t) => t.key === k)!);
        if (a.pairId === b.pairId) {
          const nextMatched = [...matched, a.pairId];
          setMatched(nextMatched);
          setFlipped([]);
          if (nextMatched.length === GAME_TILES.length) {
            setWon(true);
          }
        } else {
          setLock(true);
          setTimeout(() => {
            setFlipped([]);
            setLock(false);
          }, 750);
        }
      }
    },
    [flipped, matched, started, tiles, won, lock]
  );

  async function saveScore() {
    const finalName = (name || user?.name || "Guest").trim().slice(0, 24);
    await submitScore(finalName, moves, seconds, convex);
    setSaved(true);
    if (!convexEnabled) refreshDemo();
  }

  const mmss = useMemo(
    () => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`,
    [seconds]
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
      {/* Board */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6">
            <Stat icon={Trophy} label="Moves" value={String(moves)} />
            <Stat icon={Timer} label="Time" value={mmss} />
            <Stat
              icon={Crown}
              label="Pairs"
              value={`${matched.length}/${GAME_TILES.length}`}
            />
          </div>
          <Button variant="outline" size="sm" onClick={deal}>
            <RotateCcw className="h-3.5 w-3.5" /> Restart
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {tiles.map((tile) => {
            const isUp = flipped.includes(tile.key) || matched.includes(tile.pairId);
            return (
              <button
                key={tile.key}
                onClick={() => flip(tile)}
                className="relative aspect-[3/4] [perspective:800px]"
                aria-label={isUp ? tile.label : "Hidden tile"}
              >
                <div className={cn("tile-3d relative h-full w-full", isUp && "is-flipped")}>
                  {/* Back (hidden state) */}
                  <div className="tile-face absolute inset-0 flex flex-col items-center justify-center border border-line bg-surface">
                    <span className="font-display text-3xl text-accent">G</span>
                    <span className="label-micro mt-2 text-[0.55rem] text-ink-soft">
                      Gumberi
                    </span>
                  </div>
                  {/* Front (photo) */}
                  <div className="tile-face tile-face--back absolute inset-0 overflow-hidden border border-line bg-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tile.image}
                      alt={tile.label}
                      loading="lazy"
                      className={cn(
                        "h-full w-full object-cover transition-opacity",
                        matched.includes(tile.pairId) && "opacity-80"
                      )}
                    />
                    {matched.includes(tile.pairId) ? (
                      <span className="label-micro absolute bottom-1.5 left-1.5 bg-bg/85 px-1.5 py-0.5 text-[0.5rem] text-ink">
                        {tile.label}
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-soft">
          Flip two tiles. Find all six garment pairs in the fewest moves — the
          clock starts on your first flip.
        </p>
      </div>

      {/* Leaderboard */}
      <aside id="leaderboard">
        <h2 className="label-micro text-ink">Leaderboard — fewest moves</h2>
        <ol className="mt-5 divide-y divide-line border-y border-line">
          {leaderboard.length === 0 ? (
            <li className="py-6 text-sm text-ink-soft">
              No scores yet. Be the first name on the board.
            </li>
          ) : (
            leaderboard.map((s, i) => (
              <li key={i} className="flex items-center gap-4 py-3.5">
                <span
                  className={cn(
                    "label-micro flex h-7 w-7 items-center justify-center",
                    i === 0 ? "bg-gold text-white" : "text-ink-soft"
                  )}
                >
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-sm font-medium text-ink">
                  {s.name}
                </span>
                <span className="text-sm tabular-nums text-ink-soft">
                  {s.moves} moves
                </span>
                <span className="w-12 text-right text-xs tabular-nums text-ink-soft">
                  {String(Math.floor(s.seconds / 60)).padStart(2, "0")}:
                  {String(s.seconds % 60).padStart(2, "0")}
                </span>
              </li>
            ))
          )}
        </ol>
        {!convexEnabled ? (
          <p className="mt-3 text-xs text-ink-soft">
            Scores are stored locally in demo mode — connect Convex to compete
            globally.
          </p>
        ) : null}
      </aside>

      {/* Win modal */}
      <AnimatePresence>
        {won ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md border border-line bg-card p-8 text-center"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <Crown className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-3xl text-ink">
                Every pair matched
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                {moves} moves · {mmss} on the clock
              </p>

              {saved ? (
                <p className="mt-6 text-sm text-sage">
                  On the board. Refresh to see the ranks settle.
                </p>
              ) : (
                <div className="mt-6 flex gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={user?.name ?? "Your name"}
                    className="h-11 w-full border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
                  />
                  <Button onClick={saveScore}>Save</Button>
                </div>
              )}

              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" onClick={deal}>
                  <RotateCcw className="h-3.5 w-3.5" /> Play again
                </Button>
                <Button variant="ghost" onClick={() => setWon(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-accent" strokeWidth={1.6} />
      <div>
        <p className="label-micro text-[0.55rem] text-ink-soft">{label}</p>
        <p className="text-sm font-semibold tabular-nums text-ink">{value}</p>
      </div>
    </div>
  );
}
