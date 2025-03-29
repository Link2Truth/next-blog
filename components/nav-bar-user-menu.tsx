import { useCallback, useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { createClient } from "@/lib/supabase/client";

import { type User } from "@supabase/supabase-js";
import { GaugeIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function NavBarUserMenu({ user }: { user: User | null }) {
  const supabase = createClient();
  const [login, setLogin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const getAvatar = useCallback(async () => {
    try {
      if (!user) {
        setLogin(false);
        return;
      }
      setLogin(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username,  avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        console.error(error);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        console.log("avatar_url", data.avatar_url);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, supabase]);

  useEffect(() => {
    getAvatar();
  }, [user, getAvatar]);

  return (
    <>
      {login ? (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Link href="/dashboard">
              <Button variant="link">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{username}</AvatarFallback>
                  </Avatar>
                </motion.div>
              </Button>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="w-30 p-1">
            <div className="grid grid-cols1 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <GaugeIcon />
                <Link href="/dashboard">个人中心</Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <SettingsIcon />
                <Link href="/account">账号设置</Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={async () => {
                  fetch("/api/v1/auth/signout", { method: "POST" });
                  setLogin(false);
                }}
              >
                <LogOutIcon />
                注销登录
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Link href="/login">
          <Button className="h-9 w-9 rounded-full" variant={"outline"}>
            <UserIcon className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </>
  );
}
