"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PackagePlan, PackageTab, PackagesFile } from "@/lib/types";

type TabKey = keyof PackagesFile;

const TABS: { key: TabKey; label: string }[] = [
  { key: "home", label: "Home Internet" },
  { key: "corporate", label: "Corporate" },
  { key: "government", label: "Government" },
];

function newPlan(order: number): PackagePlan {
  return {
    id: crypto.randomUUID(),
    name: "",
    price: 0,
    currency: "৳",
    unit: "/Month",
    features: [""],
    order,
  };
}

export default function PackagesEditor({ initial }: { initial: PackagesFile }) {
  const router = useRouter();
  const [data, setData] = useState<PackagesFile>(initial);
  const [active, setActive] = useState<TabKey>("home");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function setTab(key: TabKey, updater: (tab: PackageTab) => PackageTab) {
    setData((cur) => ({ ...cur, [key]: updater(cur[key]) }));
  }
  function updatePlan(idx: number, patch: Partial<PackagePlan>) {
    setTab(active, (tab) => ({
      ...tab,
      plans: tab.plans.map((p, i) => (i === idx ? { ...p, ...patch } : p)),
    }));
  }
  function removePlan(idx: number) {
    setTab(active, (tab) => ({ ...tab, plans: tab.plans.filter((_, i) => i !== idx) }));
  }
  function addPlan() {
    setTab(active, (tab) => ({ ...tab, plans: [...tab.plans, newPlan(tab.plans.length + 1)] }));
  }
  function updateFeature(planIdx: number, featIdx: number, value: string) {
    setTab(active, (tab) => ({
      ...tab,
      plans: tab.plans.map((p, i) =>
        i === planIdx ? { ...p, features: p.features.map((f, j) => (j === featIdx ? value : f)) } : p,
      ),
    }));
  }
  function addFeature(planIdx: number) {
    setTab(active, (tab) => ({
      ...tab,
      plans: tab.plans.map((p, i) => (i === planIdx ? { ...p, features: [...p.features, ""] } : p)),
    }));
  }
  function removeFeature(planIdx: number, featIdx: number) {
    setTab(active, (tab) => ({
      ...tab,
      plans: tab.plans.map((p, i) =>
        i === planIdx ? { ...p, features: p.features.filter((_, j) => j !== featIdx) } : p,
      ),
    }));
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/packages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMsg({ kind: "ok", text: "Saved." });
      router.refresh();
    } else {
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      setMsg({ kind: "err", text: d.error ?? "Save failed" });
    }
    setBusy(false);
  }

  const tab = data[active];

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className="admin-btn"
            style={{
              background: active === t.key ? "#0f1c3a" : "transparent",
              color: active === t.key ? "#fff" : "#0f1c3a",
              border: "1px solid #cbd5e0",
            }}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-field">
        <label>Tab title</label>
        <input
          type="text"
          value={tab.title}
          onChange={(e) => setTab(active, (cur) => ({ ...cur, title: e.target.value }))}
        />
      </div>

      {tab.plans.map((plan, idx) => (
        <div key={plan.id} className="admin-item">
          <button type="button" className="admin-item__remove" onClick={() => removePlan(idx)}>
            Remove plan
          </button>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Plan name</label>
              <input type="text" value={plan.name} onChange={(e) => updatePlan(idx, { name: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Order</label>
              <input
                type="number"
                value={plan.order}
                onChange={(e) => updatePlan(idx, { order: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Price (taka)</label>
              <input
                type="number"
                value={plan.price}
                onChange={(e) => updatePlan(idx, { price: Number(e.target.value) })}
              />
            </div>
            <div className="admin-field">
              <label>Unit</label>
              <input type="text" value={plan.unit} onChange={(e) => updatePlan(idx, { unit: e.target.value })} />
            </div>
          </div>
          <div className="admin-field">
            <label>Features</label>
            {plan.features.map((f, j) => (
              <div key={j} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <input type="text" value={f} onChange={(e) => updateFeature(idx, j, e.target.value)} />
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => removeFeature(idx, j)}
                  disabled={plan.features.length <= 1}
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => addFeature(idx)}>
              + Add feature
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn--ghost" onClick={addPlan}>
        + Add plan
      </button>

      <div style={{ marginTop: 24 }}>
        <button type="button" className="admin-btn admin-btn--primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : "Save all packages"}
        </button>
      </div>
    </div>
  );
}
