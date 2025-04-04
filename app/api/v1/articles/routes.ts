import { createClient } from "@/lib/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("id");
  if (!articleId) {
    return new NextResponse(
      JSON.stringify({ error: "Article ID is required" }),
      {
        status: 400,
      },
    );
  }
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

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const articleData = await request.json();
    const { data, error } = await supabase
      .from("articles")
      .upsert(articleData)
      .select()
      .single();

    if (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 });
    }
    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: "Invalid request data" }), {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("id");

  if (!articleId) {
    return new NextResponse(
      JSON.stringify({ error: "Article ID is required" }),
      {
        status: 400,
      },
    );
  }

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

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("id");

  if (!articleId) {
    return new NextResponse(
      JSON.stringify({ error: "Article ID is required" }),
      {
        status: 400,
      },
    );
  }

  try {
    const updateData = await request.json();

    const { data, error } = await supabase
      .from("articles")
      .update(updateData)
      .eq("id", articleId)
      .select()
      .single();

    if (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: "Invalid request data" }), {
      status: 400,
    });
  }
}
