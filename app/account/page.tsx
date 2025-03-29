import { ProfileForm } from "@/app/account/profile-form";
import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
