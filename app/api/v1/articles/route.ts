import { createClient } from "@/lib/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageNum") || "10");
  // 计算起始索引
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = await createClient();
  // 获取总数和分页数据
  const countPromise = supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  const dataPromise = supabase
    .from("articles")
    .select("*")
    .range(from, to)
    .order("updated_at", { ascending: false });

  const [countResult, dataResult] = await Promise.all([
    countPromise,
    dataPromise,
  ]);

  if (countResult.error || dataResult.error) {
    return new NextResponse(
      JSON.stringify({
        message:
          "查询失败：" + countResult.error?.message ||
          dataResult.error?.message,
        data: null,
      }),
      { status: 500 },
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "查询成功！",
      data: dataResult.data,
      pagination: {
        total: countResult.count,
        page,
        pageSize,
        pageCount: Math.ceil((countResult.count || 0) / pageSize),
      },
    }),
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const article = await request.json();
  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();
  if (error) {
    return new NextResponse(
      JSON.stringify({ message: "创建失败：" + error.message, data: null }),
      { status: 500 },
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "创建成功！", data: data }),
    {
      status: 200,
    },
  );
}
