"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ServiceItem, ServiceSection } from "@/lib/types";
import ImagePicker from "./ImagePicker";

interface Props {
  slug: string;
  initial: ServiceSection;
}

function newItem(): ServiceItem {
  return { id: cryptoRandomId(), name: "", url: "", image: "", order: 0, enabled: true };
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2, 10);
}

export default function ServiceEditor({ slug, initial }: Props) {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState(initial.pageTitle);
  const [pageDescription, setPageDescription] = useState(initial.pageDescription);
  const [items, setItems] = useState<ServiceItem[]>(() =>
    initial.items.map((item, idx) => ({
      ...item,
      order: item.order ?? idx,
      enabled: item.enabled ?? true,
    })),
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function reindexItems(nextItems: ServiceItem[]): ServiceItem[] {
    return nextItems.map((item, idx) => ({ ...item, order: idx }));
  }

  function updateItem(idx: number, patch: Partial<ServiceItem>) {
    setItems((cur) => cur.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }

  function updateOrder(idx: number, value: string) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return;
    setItems((cur) => {
      const target = Math.max(1, Math.min(parsed, cur.length)) - 1;
      if (target === idx) return cur;
      const next = [...cur];
      const [moved] = next.splice(idx, 1);
      next.splice(target, 0, moved);
      return reindexItems(next);
    });
  }

  function moveItem(idx: number, direction: -1 | 1) {
    setItems((cur) => {
      const target = idx + direction;
      if (target < 0 || target >= cur.length) return cur;
      const next = [...cur];
      const [moved] = next.splice(idx, 1);
      next.splice(target, 0, moved);
      return reindexItems(next);
    });
  }

  function removeItem(idx: number) {
    setItems((cur) => reindexItems(cur.filter((_, i) => i !== idx)));
  }

  function addItem() {
    setItems((cur) => [...cur, { ...newItem(), order: cur.length }]);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await fetch(`/api/services/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageTitle, pageDescription, items }),
    });
    if (res.ok) {
      setMsg({ kind: "ok", text: "Saved." });
      router.refresh();
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setMsg({ kind: "err", text: data.error ?? "Save failed" });
    }
    setBusy(false);
  }

  return (
    <form onSubmit={save}>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}

      <div className="admin-field">
        <label>Page title</label>
        <input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} required />
      </div>
      <div className="admin-field">
        <label>Page description</label>
        <textarea value={pageDescription} onChange={(e) => setPageDescription(e.target.value)} />
      </div>

      <h3>Items ({items.length})</h3>
      {items.map((it, idx) => (
        <div key={it.id} className="admin-item">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => moveItem(idx, -1)} disabled={idx === 0}>
                ↑
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => moveItem(idx, 1)}
                disabled={idx === items.length - 1}
              >
                ↓
              </button>
            </div>
            <button type="button" className="admin-item__remove" onClick={() => removeItem(idx)}>
              Remove
            </button>
          </div>
          <div className="admin-field">
            <label>Order</label>
            <input
              type="number"
              min={1}
              max={items.length}
              value={(it.order ?? idx) + 1}
              onChange={(e) => updateOrder(idx, e.target.value)}
            />
            <div className="admin-field__hint">You can drag with arrows or type the position number.</div>
          </div>
          <div className="admin-field">
            <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={it.enabled ?? true}
                onChange={(e) => updateItem(idx, { enabled: e.target.checked })}
              />
              Enabled
            </label>
          </div>
          <div className="admin-field">
            <label>Name</label>
            <input type="text" value={it.name} onChange={(e) => updateItem(idx, { name: e.target.value })} required />
          </div>
          <div className="admin-field">
            <label>URL</label>
            <input type="text" value={it.url} onChange={(e) => updateItem(idx, { url: e.target.value })} required />
            <div className="admin-field__hint">Full URL including https://</div>
          </div>
          <div className="admin-field">
            <label>Image</label>
            <ImagePicker value={it.image} onChange={(url) => updateItem(idx, { image: url })} />
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn--ghost" onClick={addItem}>
        + Add item
      </button>

      <div style={{ marginTop: 24 }}>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
