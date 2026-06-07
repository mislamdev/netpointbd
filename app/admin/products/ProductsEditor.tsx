"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import ImagePicker from "../services/[slug]/ImagePicker";

function newProduct(order: number): Product {
  return { id: crypto.randomUUID(), name: "", price: 0, image: "", alt: "", order };
}

export default function ProductsEditor({ initial }: { initial: Product[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Product[]>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function update(idx: number, patch: Partial<Product>) {
    setItems((cur) => cur.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  }
  function remove(idx: number) {
    setItems((cur) => cur.filter((_, i) => i !== idx));
  }
  function add() {
    setItems((cur) => [...cur, newProduct(cur.length + 1)]);
  }
  function moveUp(idx: number) {
    if (idx === 0) return;
    setItems((cur) => {
      const next = [...cur];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }
  function moveDown(idx: number) {
    if (idx === items.length - 1) return;
    setItems((cur) => {
      const next = [...cur];
      [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
      return next;
    });
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/products", { method: "GET" });
    if (!res.ok) {
      setMsg({ kind: "err", text: "Failed to load existing products" });
      setBusy(false);
      return;
    }
    const current = ((await res.json()) as { products: Product[] }).products;
    const currentIds = new Set(current.map((p) => p.id));
    const newOnes = items.filter((p) => !currentIds.has(p.id));

    for (const p of items) {
      if (currentIds.has(p.id)) {
        await fetch(`/api/products/${p.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
      }
    }
    for (const p of newOnes) {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
    }
    const removed = current.filter((p) => !items.find((i) => i.id === p.id));
    for (const p of removed) {
      await fetch(`/api/products/${p.id}`, { method: "DELETE" });
    }

    setMsg({ kind: "ok", text: "Saved." });
    router.refresh();
    setBusy(false);
  }

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}
      {items.map((p, idx) => (
        <div key={p.id} className="admin-item">
          <div style={{ position: "absolute", top: 8, right: 90, display: "flex", gap: 4 }}>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => moveUp(idx)} disabled={idx === 0}>
              ↑
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={() => moveDown(idx)}
              disabled={idx === items.length - 1}
            >
              ↓
            </button>
          </div>
          <button type="button" className="admin-item__remove" onClick={() => remove(idx)}>
            Remove
          </button>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Name</label>
              <input type="text" value={p.name} onChange={(e) => update(idx, { name: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Price (taka)</label>
              <input type="number" value={p.price} onChange={(e) => update(idx, { price: Number(e.target.value) })} />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Alt text</label>
              <input type="text" value={p.alt} onChange={(e) => update(idx, { alt: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Order</label>
              <input type="number" value={p.order} onChange={(e) => update(idx, { order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="admin-field">
            <label>Image</label>
            <ImagePicker value={p.image} onChange={(url) => update(idx, { image: url })} />
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn--ghost" onClick={add}>
        + Add product
      </button>
      <div style={{ marginTop: 24 }}>
        <button type="button" className="admin-btn admin-btn--primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : "Save products"}
        </button>
      </div>
    </div>
  );
}
