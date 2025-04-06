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
    return new NextResponse(
      JSON.stringify({ message: "查询失败：" + error.message, data: null }),
      {
        status: 500,
      },
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "查询成功！", data: data }),
    { status: 200 },
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) {
    return new NextResponse(
      JSON.stringify({ message: "删除失败：" + error.message, data: null }),
      { status: 500 },
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "删除成功！", data: null }),
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
  const article = await request.json();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return new NextResponse(
      JSON.stringify({ message: "更新失败：" + error.message, data: data }),
      {
        status: 500,
      },
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "更新成功！", data: data }),
    {
      status: 200,
    },
  );
}
