import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Laugh, Sparkles, Gift, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

const jokes = [
  "I know I waddled into this badly.",
  "My communication skills were on airplane mode.",
  "I owe you at least 37 emotional support penguins.",
  "This apology has been approved by the Antarctic Council of Cuteness.",
  "I was being a silly goose... wrong bird, but still sorry.",
];

const compliments = [
  "You are cuter than every penguin on this page combined.",
  "You make my world feel warmer than a penguin in a tiny scarf.",
  "Even my apology website cannot fully explain how much you mean to me.",
  "You deserve soft days, loud laughs, and someone who treats your heart carefully.",
  "You are 100% the main character and I support that completely.",
];

function FloatingPenguins() {
  const penguins = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
        size: 24 + Math.random() * 26,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {penguins.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.left}%`, fontSize: `${p.size}px` }}
          initial={{ y: "110vh", rotate: -8, opacity: 0 }}
          animate={{
            y: "-10vh",
            rotate: [-8, 8, -6, 6, -8],
            opacity: [0, 1, 1, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          🐧
        </motion.div>
      ))}
    </div>
  );
}

function PenguinButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 font-semibold shadow-lg backdrop-blur border border-white/40 ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default function PenguinApologyWebsite() {
  const [forgiveClicks, setForgiveClicks] = useState(0);
  const [fishCaught, setFishCaught] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [penguinMood, setPenguinMood] = useState("sad");
  const [showLetter, setShowLetter] = useState(false);
  const [fishPosition, setFishPosition] = useState({ x: 50, y: 50 });

  const celebrate = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
    });
  };

  const moveFish = () => {
    setFishCaught((v) => v + 1);
    setPenguinMood("happy");
    setFishPosition({
      x: 10 + Math.random() * 75,
      y: 10 + Math.random() * 70,
    });
    if ((fishCaught + 1) % 3 === 0) celebrate();
  };

  const clickForgive = () => {
    const next = forgiveClicks + 1;
    setForgiveClicks(next);
    setPenguinMood(next > 2 ? "love" : "happy");
    if (next >= 3) celebrate();
  };

  const resetGame = () => {
    setForgiveClicks(0);
    setFishCaught(0);
    setPenguinMood("sad");
    setShowLetter(false);
    setJokeIndex(0);
    setComplimentIndex(0);
    setFishPosition({ x: 50, y: 50 });
  };

  const moodFace = {
    sad: "🥺",
    happy: "😄",
    love: "🥰",
  }[penguinMood];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-cyan-100 to-white text-slate-800 overflow-hidden relative">
      <FloatingPenguins />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-md border border-white/60">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Official Penguin Apology Headquarters</span>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight">
            I’m Sorry, My Love 🐧💙
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-700">
            This website was built with penguins, dramatic regret, and a sincere mission to make you smile again.
          </p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="rounded-3xl bg-white/75 border border-white/70 shadow-2xl p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Main Penguin Spokesperson</p>
                <h2 className="text-2xl font-bold mt-1">Professor Waddles {moodFace}</h2>
              </div>
              <motion.div
                animate={{ rotate: [0, -8, 8, -6, 6, 0], y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2.8 }}
                className="text-7xl"
              >
                🐧
              </motion.div>
            </div>

            <div className="mt-5 rounded-2xl bg-sky-50 p-4 border border-sky-100">
              <p className="text-lg font-semibold">Formal Statement:</p>
              <p className="mt-2 leading-7">
                I messed up and I’m genuinely sorry. You matter so much to me, and I hate that I made you feel upset and this is me trying to show that i do care plus several emergency penguins for emotional support.
              </p>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <PenguinButton
                className="bg-slate-900 text-white"
                onClick={() => setShowLetter((v) => !v)}
              >
                <Heart className="inline-block mr-2 h-4 w-4" />
                {showLetter ? "Hide apology letter" : "Open apology letter"}
              </PenguinButton>

              <PenguinButton
                className="bg-pink-100"
                onClick={() => setJokeIndex((j) => (j + 1) % jokes.length)}
              >
                <Laugh className="inline-block mr-2 h-4 w-4" />
                New silly line
              </PenguinButton>

              <PenguinButton
                className="bg-emerald-100"
                onClick={() => setComplimentIndex((j) => (j + 1) % compliments.length)}
              >
                <Gift className="inline-block mr-2 h-4 w-4" />
                Give her a compliment
              </PenguinButton>

              <PenguinButton className="bg-amber-100" onClick={resetGame}>
                <RotateCcw className="inline-block mr-2 h-4 w-4" />
                Reset penguin chaos
              </PenguinButton>
            </div>

            <AnimatePresence>
              {showLetter && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 rounded-2xl bg-white p-5 border border-slate-200 shadow-sm leading-7">
                    <p>Hi love,</p>
                    <p className="mt-3">
                      I know I upset you, and I’m really sorry. You mean so much to me, and I want to do better, not just by saying sorry but by showing you through my actions too.
                    </p>
                    <p className="mt-3">
                      I made this tiny penguin world because i didnt wanna apologize in the same way again when you deserve something that makes you smile. I hope this reminds you how special you are to me, even on days when I mess up.
                    </p>
                    <p className="mt-3">
                      Thank you for being you. I’m sorry, and I really hope I can make it up to you.
                    </p>
                    <p className="mt-3 font-semibold">Love, your very sorry penguin 🐧</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="rounded-3xl bg-white/75 border border-white/70 shadow-2xl p-6 backdrop-blur"
          >
            <h2 className="text-2xl font-bold">Interactive Penguin Recovery Center</h2>
            <p className="mt-2 text-slate-600">
              Catch fish, collect smiles, and help this apology reach elite penguin status.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-sky-50 p-4 border border-sky-100">
                <p className="text-sm text-slate-500">Fish collected</p>
                <p className="text-3xl font-black">{fishCaught}</p>
              </div>
              <div className="rounded-2xl bg-pink-50 p-4 border border-pink-100">
                <p className="text-sm text-slate-500">Forgive button taps</p>
                <p className="text-3xl font-black">{forgiveClicks}</p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border-2 border-dashed border-sky-200 bg-gradient-to-b from-cyan-50 to-sky-100 h-72 relative overflow-hidden">
              <motion.div
                className="absolute text-7xl left-6 bottom-4"
                animate={{ x: [0, 8, 0], rotate: [0, -4, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                🐧
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={moveFish}
                className="absolute text-4xl"
                style={{ left: `${fishPosition.x}%`, top: `${fishPosition.y}%` }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                🐟
              </motion.button>

              <div className="absolute right-4 top-4 rounded-2xl bg-white/80 px-3 py-2 text-sm shadow">
                Tap the fish!
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <PenguinButton className="bg-rose-500 text-white" onClick={clickForgive}>
                💗 Forgive this penguin?
              </PenguinButton>
              <PenguinButton
                className="bg-violet-100"
                onClick={() => {
                  setPenguinMood("love");
                  celebrate();
                }}
              >
                🫶 Emergency mood boost
              </PenguinButton>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-4">
                <p className="font-semibold">Current silly line:</p>
                <p className="mt-1">{jokes[jokeIndex]}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="font-semibold">Penguin-certified compliment:</p>
                <p className="mt-1">{compliments[complimentIndex]}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
