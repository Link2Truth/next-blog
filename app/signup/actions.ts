"use server";

import { createClient } from "@/lib/supabase/server";

import { revalidatePath } from "next/cache";

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  revalidatePath("/", "layout");
  return {
    success: true,
    message: "注册成功",
  };
}
