import { createClient } from "@/lib/supabase/server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("articles")
      .insert({
        title: "untitled",
        content: [],
        is_published: false,
        auther_id: user?.id,
        created_at: new Date(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating article:", error);
      return NextResponse.json(
        { error: "Failed to create article" },
        { status: 500 },
      );
    }
    console.log("Article created:", data);
    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = "/dashboard/articles/create";
    redirectTo.searchParams.set("articleId", data.id);
    console.log("Redirecting to:", redirectTo);
    return NextResponse.redirect(redirectTo);
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
