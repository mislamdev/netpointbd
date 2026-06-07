"use client";

import { useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImagePicker({ value, onChange }: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const data = (await res.json()) as { url: string };
      onChange(data.url);
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setErr(data.error ?? "Upload failed");
    }
    setBusy(false);
    e.target.value = "";
  }

  return (
    <div className="admin-image-picker">
      <div className="admin-image-picker__preview">
        {value ? <img src={value} alt="" /> : <span style={{ color: "#a0aec0", fontSize: 11 }}>no image</span>}
      </div>
      <div style={{ flex: 1 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/assets/img/foo.jpg or /uploads/abc.jpg"
        />
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
          <label className="admin-btn admin-btn--ghost" style={{ cursor: "pointer" }}>
            {busy ? "Uploading…" : "Upload"}
            <input type="file" accept="image/*,application/pdf" onChange={upload} disabled={busy} style={{ display: "none" }} />
          </label>
          {err && <span style={{ color: "#c53030", fontSize: 12 }}>{err}</span>}
        </div>
      </div>
    </div>
  );
}
