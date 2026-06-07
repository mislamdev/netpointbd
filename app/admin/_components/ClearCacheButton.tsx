"use client";

import { useState } from "react";

export default function ClearCacheButton() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function clear() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/revalidate", { method: "POST" });
      if (res.ok) {
        setMsg("Cache cleared.");
        setTimeout(() => setMsg(null), 2000);
      } else {
        setMsg("Failed.");
      }
    } catch {
      setMsg("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" className="admin-btn admin-btn--ghost" style={{ width: "100%" }} onClick={clear} disabled={busy}>
        {busy ? "Clearing…" : "Clear cache"}
      </button>
      {msg && <div style={{ fontSize: 11, color: "#a0aec0", marginTop: 4 }}>{msg}</div>}
    </div>
  );
}
