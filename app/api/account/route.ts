import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/supabase/server";
import { getServiceClient } from "@/lib/supabase";

export async function DELETE(req: Request) {
  const session = await getRequestUser(req);
  if (!session) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  try {
    // Service role is server-only. Deleting the user cascades to public.progress.
    const { error } = await getServiceClient().auth.admin.deleteUser(session.user.id);
    if (error) throw error;
  } catch {
    return NextResponse.json({ error: "Could not delete account" }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
