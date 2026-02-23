import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!key) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const adminClient = createClient(url, key);

  const { data: invitation } = await adminClient
    .from("invitations")
    .select("id, view_count, viewed_at")
    .eq("token", token)
    .single();

  if (!invitation) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  await adminClient
    .from("invitations")
    .update({
      view_count: invitation.view_count + 1,
      viewed_at: invitation.viewed_at ?? new Date().toISOString(),
    })
    .eq("id", invitation.id);

  return NextResponse.json({ ok: true });
}
