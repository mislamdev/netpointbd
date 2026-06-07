"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CoverageArea } from "@/lib/types";

function newArea(order: number): CoverageArea {
  return { id: crypto.randomUUID(), name: "", coords: "", order };
}

export default function CoverageEditor({ initial }: { initial: CoverageArea[] }) {
  const router = useRouter();
  const [items, setItems] = useState<CoverageArea[]>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function update(idx: number, patch: Partial<CoverageArea>) {
    setItems((cur) => cur.map((a, i) => (i === idx ? { ...a, ...patch } : a)));
  }
  function remove(idx: number) {
    setItems((cur) => cur.filter((_, i) => i !== idx));
  }
  function add() {
    setItems((cur) => [...cur, newArea(cur.length + 1)]);
  }
  async function save() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/coverage");
    const current = res.ok ? (((await res.json()) as { areas: CoverageArea[] }).areas) : [];
    const currentIds = new Set(current.map((a) => a.id));
    for (const a of items) {
      if (currentIds.has(a.id)) {
        await fetch(`/api/coverage/${a.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a),
        });
      } else {
        await fetch("/api/coverage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a),
        });
      }
    }
    for (const a of current) {
      if (!items.find((i) => i.id === a.id)) {
        await fetch(`/api/coverage/${a.id}`, { method: "DELETE" });
      }
    }
    setMsg({ kind: "ok", text: "Saved." });
    router.refresh();
    setBusy(false);
  }

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}
      {items.map((a, idx) => (
        <div key={a.id} className="admin-item">
          <button type="button" className="admin-item__remove" onClick={() => remove(idx)}>
            Remove
          </button>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Name</label>
              <input type="text" value={a.name} onChange={(e) => update(idx, { name: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Coords</label>
              <input
                type="text"
                value={a.coords}
                onChange={(e) => update(idx, { coords: e.target.value })}
                placeholder="24.8323,89.3738"
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn--ghost" onClick={add}>
        + Add area
      </button>
      <div style={{ marginTop: 24 }}>
        <button type="button" className="admin-btn admin-btn--primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : "Save coverage"}
        </button>
      </div>
    </div>
  );
}
