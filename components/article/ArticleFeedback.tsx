"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ArticleFeedback() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 800);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-12 p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-center space-y-3 no-print"
      >
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Terima Kasih!</h3>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-xs mx-auto">
          Masukan Anda sangat berarti bagi kami untuk terus meningkatkan kualitas konten edukasi Nuansa.
        </p>
      </motion.div>
    );
  }

  return (
    <section className="my-12 p-8 rounded-[2rem] bg-stone-100/50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 no-print">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Apakah artikel ini membantu?</h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Bantu kami meningkatkan kualitas konten dengan memberikan masukan singkat.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setFeedback("up")}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${
              feedback === "up"
                ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : "bg-white dark:bg-[#1a1a19] border-stone-200 dark:border-stone-800 text-stone-500 hover:border-emerald-200 hover:text-emerald-600"
            }`}
          >
            <ThumbsUp className={`h-6 w-6 ${feedback === "up" ? "fill-emerald-500/20" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Ya, Membantu</span>
          </button>

          <button
            onClick={() => setFeedback("down")}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${
              feedback === "down"
                ? "bg-rose-50 dark:bg-rose-900/30 border-rose-500 text-rose-700 dark:text-rose-400"
                : "bg-white dark:bg-[#1a1a19] border-stone-200 dark:border-stone-800 text-stone-500 hover:border-rose-200 hover:text-rose-600"
            }`}
          >
            <ThumbsDown className={`h-6 w-6 ${feedback === "down" ? "fill-rose-500/20" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Kurang Membantu</span>
          </button>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 overflow-hidden"
            >
              <div className="space-y-2">
                <label htmlFor="feedback-comment" className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest ml-1">
                  Komentar Tambahan (Opsional)
                </label>
                <textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tuliskan saran atau masukan Anda di sini..."
                  className="w-full min-h-[100px] p-4 rounded-xl bg-white dark:bg-[#1a1a19] text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-stone-400 border border-stone-200 dark:border-stone-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Kirim Masukan
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
