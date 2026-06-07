"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SettingsFile } from "@/lib/types";

type Section = "contact" | "notification" | "home" | "about" | "homeInternet" | "corporate" | "footer";

const SECTIONS: { key: Section; label: string }[] = [
  { key: "contact", label: "Contact info" },
  { key: "notification", label: "Notification banner" },
  { key: "home", label: "Home page" },
  { key: "about", label: "About" },
  { key: "homeInternet", label: "Home Internet" },
  { key: "corporate", label: "Corporate" },
  { key: "footer", label: "Footer" },
];

export default function SettingsEditor({ initial }: { initial: SettingsFile }) {
  const router = useRouter();
  const [data, setData] = useState<SettingsFile>(initial);
  const [active, setActive] = useState<Section>("contact");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function set<K extends keyof SettingsFile>(key: K, value: SettingsFile[K]) {
    setData((cur) => ({ ...cur, [key]: value }));
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/settings", {
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

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            className="admin-btn"
            style={{
              background: active === s.key ? "#0f1c3a" : "transparent",
              color: active === s.key ? "#fff" : "#0f1c3a",
              border: "1px solid #cbd5e0",
            }}
            onClick={() => setActive(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {active === "contact" && (
        <ContactSection value={data.contact} onChange={(v) => set("contact", v)} />
      )}
      {active === "notification" && (
        <NotificationSection value={data.notification} onChange={(v) => set("notification", v)} />
      )}
      {active === "home" && <HomeSection value={data.home} onChange={(v) => set("home", v)} />}
      {active === "about" && (
        <div>
          <div className="admin-field">
            <label>Title</label>
            <input type="text" value={data.about.title} onChange={(e) => set("about", { ...data.about, title: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Body</label>
            <textarea value={data.about.body} onChange={(e) => set("about", { ...data.about, body: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Mission</label>
            <textarea value={data.about.mission} onChange={(e) => set("about", { ...data.about, mission: e.target.value })} />
          </div>
        </div>
      )}
      {active === "homeInternet" && (
        <div>
          <div className="admin-field">
            <label>Title</label>
            <input
              type="text"
              value={data.homeInternet.title}
              onChange={(e) => set("homeInternet", { ...data.homeInternet, title: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Body</label>
            <textarea
              value={data.homeInternet.body}
              onChange={(e) => set("homeInternet", { ...data.homeInternet, body: e.target.value })}
            />
          </div>
        </div>
      )}
      {active === "corporate" && (
        <div>
          <div className="admin-field">
            <label>Title</label>
            <input
              type="text"
              value={data.corporate.title}
              onChange={(e) => set("corporate", { ...data.corporate, title: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Body</label>
            <textarea
              value={data.corporate.body}
              onChange={(e) => set("corporate", { ...data.corporate, body: e.target.value })}
            />
          </div>
        </div>
      )}
      {active === "footer" && (
        <div>
          <div className="admin-field">
            <label>Company blurb</label>
            <textarea
              value={data.footer.companyBlurb}
              onChange={(e) => set("footer", { ...data.footer, companyBlurb: e.target.value })}
            />
          </div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <button type="button" className="admin-btn admin-btn--primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : "Save settings"}
        </button>
      </div>
    </div>
  );
}

function ContactSection({
  value,
  onChange,
}: {
  value: SettingsFile["contact"];
  onChange: (v: SettingsFile["contact"]) => void;
}) {
  return (
    <div>
      <h3>Phones</h3>
      {value.phones.map((p, i) => (
        <div key={i} className="admin-item">
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Label</label>
              <input
                type="text"
                value={p.label}
                onChange={(e) =>
                  onChange({ ...value, phones: value.phones.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })
                }
              />
            </div>
            <div className="admin-field">
              <label>Number</label>
              <input
                type="text"
                value={p.number}
                onChange={(e) =>
                  onChange({ ...value, phones: value.phones.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)) })
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={() => onChange({ ...value, phones: value.phones.filter((_, j) => j !== i) })}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="admin-btn admin-btn--ghost"
        onClick={() => onChange({ ...value, phones: [...value.phones, { label: "", number: "" }] })}
      >
        + Add phone
      </button>

      <h3 style={{ marginTop: 24 }}>Emails</h3>
      {value.emails.map((em, i) => (
        <div key={i} className="admin-item">
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Email</label>
              <input
                type="email"
                value={em}
                onChange={(e) => onChange({ ...value, emails: value.emails.map((x, j) => (j === i ? e.target.value : x)) })}
              />
            </div>
            <div className="admin-field" style={{ alignSelf: "end" }}>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={() => onChange({ ...value, emails: value.emails.filter((_, j) => j !== i) })}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="admin-btn admin-btn--ghost"
        onClick={() => onChange({ ...value, emails: [...value.emails, ""] })}
      >
        + Add email
      </button>

      <h3 style={{ marginTop: 24 }}>Address</h3>
      <div className="admin-field">
        <textarea value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} />
      </div>

      <h3 style={{ marginTop: 24 }}>Social links</h3>
      {(["facebook", "youtube", "linkedin", "twitter"] as const).map((k) => (
        <div key={k} className="admin-field">
          <label style={{ textTransform: "capitalize" }}>{k}</label>
          <input
            type="url"
            value={value.social[k]}
            onChange={(e) => onChange({ ...value, social: { ...value.social, [k]: e.target.value } })}
            placeholder="https://"
          />
        </div>
      ))}
    </div>
  );
}

function NotificationSection({
  value,
  onChange,
}: {
  value: SettingsFile["notification"];
  onChange: (v: SettingsFile["notification"]) => void;
}) {
  return (
    <div>
      <div className="admin-field">
        <label>
          <input type="checkbox" checked={value.enabled} onChange={(e) => onChange({ ...value, enabled: e.target.checked })} />{" "}
          Show notification banner
        </label>
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label>Type</label>
          <select value={value.type} onChange={(e) => onChange({ ...value, type: e.target.value as SettingsFile["notification"]["type"] })}>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
          </select>
        </div>
        <div className="admin-field">
          <label>Link (optional)</label>
          <input type="url" value={value.link ?? ""} onChange={(e) => onChange({ ...value, link: e.target.value || null })} placeholder="https://" />
        </div>
      </div>
      <div className="admin-field">
        <label>Text</label>
        <textarea value={value.text} onChange={(e) => onChange({ ...value, text: e.target.value })} />
      </div>
    </div>
  );
}

function HomeSection({
  value,
  onChange,
}: {
  value: SettingsFile["home"];
  onChange: (v: SettingsFile["home"]) => void;
}) {
  return (
    <div>
      <h3>Hero</h3>
      <div className="admin-field">
        <label>Title</label>
        <input type="text" value={value.hero.title} onChange={(e) => onChange({ ...value, hero: { ...value.hero, title: e.target.value } })} />
      </div>
      <div className="admin-field">
        <label>Subtitle</label>
        <textarea
          value={value.hero.subtitle}
          onChange={(e) => onChange({ ...value, hero: { ...value.hero, subtitle: e.target.value } })}
        />
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label>CTA label</label>
          <input
            type="text"
            value={value.hero.ctaLabel}
            onChange={(e) => onChange({ ...value, hero: { ...value.hero, ctaLabel: e.target.value } })}
          />
        </div>
        <div className="admin-field">
          <label>CTA URL</label>
          <input
            type="text"
            value={value.hero.ctaHref}
            onChange={(e) => onChange({ ...value, hero: { ...value.hero, ctaHref: e.target.value } })}
          />
        </div>
      </div>

      <h3 style={{ marginTop: 24 }}>Notice board teaser</h3>
      <div className="admin-field">
        <textarea value={value.noticeboard} onChange={(e) => onChange({ ...value, noticeboard: e.target.value })} />
      </div>

      <h3 style={{ marginTop: 24 }}>Stats</h3>
      {value.stats.map((s, i) => (
        <div key={i} className="admin-item">
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Label</label>
              <input
                type="text"
                value={s.label}
                onChange={(e) =>
                  onChange({ ...value, stats: value.stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })
                }
              />
            </div>
            <div className="admin-field">
              <label>Value</label>
              <input
                type="text"
                value={s.value}
                onChange={(e) =>
                  onChange({ ...value, stats: value.stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })
                }
              />
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 24 }}>Features</h3>
      {value.features.map((f, i) => (
        <div key={i} className="admin-item">
          <div className="admin-field">
            <label>Icon class</label>
            <input
              type="text"
              value={f.icon}
              onChange={(e) => onChange({ ...value, features: value.features.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)) })}
            />
            <div className="admin-field__hint">e.g. flaticon-testing</div>
          </div>
          <div className="admin-field">
            <label>Title</label>
            <input
              type="text"
              value={f.title}
              onChange={(e) => onChange({ ...value, features: value.features.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })}
            />
          </div>
          <div className="admin-field">
            <label>Text</label>
            <textarea
              value={f.text}
              onChange={(e) => onChange({ ...value, features: value.features.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
