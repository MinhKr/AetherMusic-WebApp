"use client";

import { useToast, Toast, ToastType } from "@/context/ToastContext";
import { AnimatePresence, motion } from "framer-motion";

const TOAST_CONFIG: Record<
  ToastType,
  { iconColor: string; glow: string; bgAccent: string; defaultIcon: string }
> = {
  success: {
    iconColor: "text-primary",
    glow: "shadow-[0_8px_40px_rgba(0,255,255,0.25)]",
    bgAccent: "border-primary/20",
    defaultIcon: "check_circle",
  },
  error: {
    iconColor: "text-error",
    glow: "shadow-[0_8px_40px_rgba(255,110,132,0.25)]",
    bgAccent: "border-error/20",
    defaultIcon: "cancel",
  },
  warning: {
    iconColor: "text-[#f5c518]",
    glow: "shadow-[0_8px_40px_rgba(245,197,24,0.2)]",
    bgAccent: "border-[#f5c518]/20",
    defaultIcon: "warning",
  },
  info: {
    iconColor: "text-secondary",
    glow: "shadow-[0_8px_40px_rgba(188,135,254,0.2)]",
    bgAccent: "border-secondary/20",
    defaultIcon: "info",
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const cfg = TOAST_CONFIG[toast.type];
  const icon = toast.icon ?? cfg.defaultIcon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.9 }}
      transition={{ type: "spring", damping: 26, stiffness: 320 }}
      className={`
        flex items-center gap-3 px-5 py-3.5 rounded-full
        bg-[#16132a]/90 backdrop-blur-2xl border ${cfg.bgAccent} ${cfg.glow}
        pointer-events-none select-none
      `}
    >
      {/* Icon */}
      <span
        className={`material-symbols-outlined text-lg flex-shrink-0 ${cfg.iconColor}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>

      {/* Message */}
      <p className="text-sm font-bold font-headline text-white/90 whitespace-nowrap">
        {toast.message}
      </p>
    </motion.div>
  );
}

export default function ToastNotifications() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-6 left-0 right-0 z-[9999] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
