import { createClient } from "@/lib/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const articleId = params.id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select()
    .eq("id", articleId)
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
  return new NextResponse(JSON.stringify(data), { status: 200 });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const articleId = params.id;

  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);

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
  const articleId = params.id;
  const updates = await request.json();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", articleId)
    .select()
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const articleId = params.id;
  const updates = await request.json();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", articleId)
    .select()
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
}
