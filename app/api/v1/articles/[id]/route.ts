import { createClient } from "@/lib/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
  return new NextResponse(JSON.stringify(data), { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
  return new NextResponse(
    JSON.stringify({ message: "Article deleted successfully" }),
    {
      status: 200,
    },
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const updates = await request.json();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .upsert(updates)
    .select()
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
  console.log("data:", data);
  return new NextResponse(JSON.stringify(data), { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const updates = await request.json();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .upsert(updates)
    .select()
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
}
