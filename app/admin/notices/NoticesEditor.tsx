"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Notice } from "@/lib/types";
import ImagePicker from "../services/[slug]/ImagePicker";

function newNotice(): Notice {
  return { id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10), title: "", fileUrl: "" };
}

export default function NoticesEditor({ initial }: { initial: Notice[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Notice[]>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function update(idx: number, patch: Partial<Notice>) {
    setItems((cur) => cur.map((n, i) => (i === idx ? { ...n, ...patch } : n)));
  }
  function remove(idx: number) {
    setItems((cur) => cur.filter((_, i) => i !== idx));
  }
  function add() {
    setItems((cur) => [newNotice(), ...cur]);
  }
  async function save() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/notices");
    const current = res.ok ? (((await res.json()) as { notices: Notice[] }).notices) : [];
    const currentIds = new Set(current.map((n) => n.id));
    for (const n of items) {
      if (currentIds.has(n.id)) {
        await fetch(`/api/notices/${n.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(n),
        });
      } else {
        await fetch("/api/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(n),
        });
      }
    }
    for (const n of current) {
      if (!items.find((i) => i.id === n.id)) {
        await fetch(`/api/notices/${n.id}`, { method: "DELETE" });
      }
    }
    setMsg({ kind: "ok", text: "Saved." });
    router.refresh();
    setBusy(false);
  }

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}
      <button type="button" className="admin-btn admin-btn--ghost" onClick={add}>
        + Add notice
      </button>
      <div style={{ height: 12 }} />
      {items.length === 0 && <p style={{ color: "#718096", fontSize: 14 }}>No notices yet.</p>}
      {items.map((n, idx) => (
        <div key={n.id} className="admin-item">
          <button type="button" className="admin-item__remove" onClick={() => remove(idx)}>
            Remove
          </button>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Date</label>
              <input type="date" value={n.date} onChange={(e) => update(idx, { date: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input type="text" value={n.title} onChange={(e) => update(idx, { title: e.target.value })} />
            </div>
          </div>
          <div className="admin-field">
            <label>File / attachment</label>
            <ImagePicker value={n.fileUrl} onChange={(url) => update(idx, { fileUrl: url })} />
            <div className="admin-field__hint">Upload a PDF or image, or paste a URL.</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 24 }}>
        <button type="button" className="admin-btn admin-btn--primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : "Save notices"}
        </button>
      </div>
    </div>
  );
}
