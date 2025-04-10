import { LoginForm } from "@/app/login/login-form";
import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Check if user is already logged in
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
