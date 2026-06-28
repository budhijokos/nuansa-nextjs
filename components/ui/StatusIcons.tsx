import React from "react";
import { motion } from "motion/react";
import { 
  Star,
  Brain,
  Activity,
  Heart,
  Smile,
  Shield as ShieldIcon,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

export function renderComplaintIcon(iconName: string, className?: string) {
  switch (iconName) {
    case "Brain": return <Brain className={className} />;
    case "Activity": return <Activity className={className} />;
    case "Heart": return <Heart className={className} />;
    case "Smile": return <Smile className={className} />;
    case "Shield": return <ShieldIcon className={className} />;
    default: return <Brain className={className} />;
  }
}

export function SuccessIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <CheckCircle className={`${className} text-emerald-600 dark:text-emerald-400`} />;
}

export function ErrorIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <AlertCircle className={`${className} text-red-600 dark:text-red-400`} />;
}

export function InfoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <Info className={`${className} text-stone-500 dark:text-stone-400`} />;
}

export function SIPPBadge() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.8 }}
      className="absolute -bottom-1.5 -right-1.5 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 shadow-xl border-2 border-white ring-2 ring-emerald-50 pointer-events-none group-hover:scale-110 transition-transform duration-300"
    >
      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-400 font-mono text-[7px] font-black text-white p-0.5 leading-none">
        SIPP
      </div>
    </motion.div>
  );
}

export function AnimatedCheckmark() {
  return (
    <div className="flex items-center justify-center h-20 w-20 mx-auto mb-6">
      <div className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="absolute inset-0 bg-emerald-100 rounded-full"
        />
        <svg
          className="relative z-10 w-20 h-20 text-emerald-600"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="25"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M14 27l8 8 16-16"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

export function RatingStars({ count = 5, className = "h-3 w-3", delay = 0 }: { count?: number, className?: string, delay?: number }) {
  return (
    <div className="flex space-x-0.5">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -25 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 18, 
            delay: delay + (i * 0.08) 
          }}
        >
          <Star className={`${className} fill-amber-400 text-amber-400`} />
        </motion.div>
      ))}
    </div>
  );
}
