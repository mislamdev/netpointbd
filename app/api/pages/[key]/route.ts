import { NextResponse } from "next/server";
import { readJSON } from "@/lib/db";
import type { SettingsFile } from "@/lib/types";

const KEY_MAP: Record<string, keyof SettingsFile> = {
  home: "home",
  about: "about",
  homeInternet: "homeInternet",
  corporate: "corporate",
  footer: "footer",
};

export async function GET(_req: Request, ctx: { params: Promise<{ key: string }> }) {
  const { key } = await ctx.params;
  if (!(key in KEY_MAP)) {
    return NextResponse.json({ error: "Unknown page key" }, { status: 404 });
  }
  const data = await readJSON<SettingsFile>("settings");
  return NextResponse.json({ key, value: data[KEY_MAP[key]] });
}
