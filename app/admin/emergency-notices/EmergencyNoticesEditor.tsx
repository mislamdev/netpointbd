"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SettingsFile } from "@/lib/types";

type EmergencyNotice = SettingsFile["home"]["emergencyNotices"][number];

type NoticeStatus = "active" | "scheduled" | "expired" | "disabled" | "always";

function toLocalInput(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInput(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString();
}

function getNoticeStatus(notice: EmergencyNotice, now: number): NoticeStatus {
  if (!notice.enabled) return "disabled";
  const start = notice.startAt ? Date.parse(notice.startAt) : NaN;
  const end = notice.endAt ? Date.parse(notice.endAt) : NaN;
  if (!Number.isNaN(end) && end <= now) return "expired";
  if (!Number.isNaN(start) && start > now) return "scheduled";
  if (Number.isNaN(start) && Number.isNaN(end)) return "always";
  return "active";
}

const STATUS_LABEL: Record<NoticeStatus, string> = {
  active: "Live now",
  scheduled: "Scheduled",
  expired: "Expired",
  disabled: "Disabled",
  always: "Always",
};

const STATUS_COLOR: Record<NoticeStatus, string> = {
  active: "#166534",
  scheduled: "#1e40af",
  expired: "#991b1b",
  disabled: "#4a5568",
  always: "#92400e",
};

function blankNotice(): EmergencyNotice {
  return { text: "", link: "", enabled: true, startAt: "", endAt: "" };
}

function normalize(notice: Partial<EmergencyNotice>): EmergencyNotice {
  return {
    text: notice.text ?? "",
    link: notice.link ?? "",
    enabled: notice.enabled ?? true,
    startAt: notice.startAt ?? "",
    endAt: notice.endAt ?? "",
  };
}

export default function EmergencyNoticesEditor({
  initial,
  current,
}: {
  initial: EmergencyNotice[];
  current: SettingsFile;
}) {
  const router = useRouter();
  const [items, setItems] = useState<EmergencyNotice[]>(
    initial.length > 0 ? initial.map(normalize) : [blankNotice()],
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  function update(idx: number, patch: Partial<EmergencyNotice>) {
    setItems((cur) => cur.map((n, i) => (i === idx ? { ...n, ...patch } : n)));
  }

  function move(idx: number, direction: -1 | 1) {
    const target = idx + direction;
    if (target < 0 || target >= items.length) return;
    setItems((cur) => {
      const next = [...cur];
      const [moved] = next.splice(idx, 1);
      next.splice(target, 0, moved);
      return next;
    });
  }

  function remove(idx: number) {
    if (items.length <= 1) return;
    setItems((cur) => cur.filter((_, i) => i !== idx));
  }

  function add() {
    setItems((cur) => [...cur, blankNotice()]);
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const next: SettingsFile = {
        ...current,
        home: {
          ...current.home,
          emergencyNotices: items.map(normalize),
        },
      };
      const putRes = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(err?.message || `Save failed (HTTP ${putRes.status}).`);
      }
      setMsg({ kind: "ok", text: "Saved. The public site updates within a minute." });
      router.refresh();
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Save failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}

      <p style={{ color: "#4a5568", marginTop: 0, fontSize: 14 }}>
        The red banner that scrolls across the top of every page. Each notice can be enabled / disabled on demand and
        scheduled with a start and end time. Leave both date fields blank to keep the notice always visible while
        enabled.
      </p>

      <button type="button" className="admin-btn admin-btn--ghost" onClick={add}>
        + Add emergency notice
      </button>
      <div style={{ height: 12 }} />

      {items.map((notice, index) => {
        const status = getNoticeStatus(notice, now);
        return (
          <div key={index} className="admin-item">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <strong>Notice {index + 1}</strong>
                <span
                  title={`Now: ${new Date(now).toLocaleString()}`}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 999,
                    color: "#fff",
                    background: STATUS_COLOR[status],
                  }}
                >
                  {STATUS_LABEL[status]}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="admin-btn admin-btn--ghost" onClick={() => move(index, -1)} disabled={index === 0}>
                  ↑
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="admin-item__remove"
                  onClick={() => remove(index)}
                  disabled={items.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="admin-field">
              <label>Text</label>
              <textarea value={notice.text} onChange={(e) => update(index, { text: e.target.value })} />
            </div>

            <div className="admin-field-row">
              <div className="admin-field">
                <label>Link (optional)</label>
                <input type="text" value={notice.link} onChange={(e) => update(index, { link: e.target.value })} />
              </div>
              <div className="admin-field" style={{ alignSelf: "end" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={notice.enabled}
                    onChange={(e) => update(index, { enabled: e.target.checked })}
                  />{" "}
                  Enabled
                </label>
              </div>
            </div>

            <div className="admin-field-row">
              <div className="admin-field">
                <label>Show from (optional)</label>
                <input
                  type="datetime-local"
                  value={toLocalInput(notice.startAt)}
                  onChange={(e) => update(index, { startAt: fromLocalInput(e.target.value) })}
                />
              </div>
              <div className="admin-field">
                <label>Hide after (optional)</label>
                <input
                  type="datetime-local"
                  value={toLocalInput(notice.endAt)}
                  onChange={(e) => update(index, { endAt: fromLocalInput(e.target.value) })}
                />
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: 24 }}>
        <button type="button" className="admin-btn admin-btn--primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : "Save emergency notices"}
        </button>
      </div>
    </div>
  );
}