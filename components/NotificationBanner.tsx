"use client";

import { useState } from "react";
import type { NotificationSettings } from "@/lib/types";

const COLORS: Record<NotificationSettings["type"], { bg: string; fg: string; icon: string }> = {
  info:    { bg: "#dbeafe", fg: "#1e40af", icon: "ℹ" },
  warning: { bg: "#fef3c7", fg: "#92400e", icon: "⚠" },
  success: { bg: "#dcfce7", fg: "#166534", icon: "✓" },
  danger:  { bg: "#fee2e2", fg: "#991b1b", icon: "✕" },
};

export default function NotificationBanner({ value }: { value: NotificationSettings }) {
  const [hidden, setHidden] = useState(false);
  if (!value.enabled || !value.text || hidden) return null;
  const c = COLORS[value.type];
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "10px 16px",
        background: c.bg,
        color: c.fg,
        fontSize: 14,
        textAlign: "center",
      }}
    >
      <span aria-hidden style={{ fontSize: 16 }}>{c.icon}</span>
      <span>{value.text}</span>
      {value.link && (
        <a
          href={value.link}
          style={{ color: c.fg, fontWeight: 700, textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      )}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setHidden(true)}
        style={{
          background: "transparent",
          border: "none",
          color: c.fg,
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1,
          marginLeft: 8,
        }}
      >
        ×
      </button>
    </div>
  );
  return inner;
}
