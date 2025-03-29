"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@supabase/supabase-js";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ProfileAvatar } from "./profile-avatar";
import { ProfileBackground } from "./profile-background";

const ProfileFormSchema = z.object({
  email: z.string().email(),
  username: z.string().optional(),
  birthday: z.date().optional(),
  avatar_url: z.string().optional(),
  bg_url: z.string().optional(),
  description: z.string().max(200, "不能超过 200 个字符").optional(),
});

export function ProfileForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      email: user?.email || "",
      username: "",
      birthday: undefined,
      avatar_url: "",
      bg_url: "",
      description: "",
    },
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, birthday, avatar_url, bg_url, description`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        form.setValue("email", user?.email || "");
        form.setValue("username", data.username || "");
        form.setValue("birthday", new Date(data.birthday));
        form.setValue("avatar_url", data.avatar_url || "");
        form.setValue("bg_url", data.bg_url || "");
        form.setValue("description", data.description || "");
      }
    } catch (error) {
      toast.error("用户信息加载失败：" + error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        username: data.username,
        birthday: data.birthday ? format(data.birthday, "yyyy-MM-dd") : null,
        avatar_url: data.avatar_url,
        bg_url: data.bg_url,
        description: data.description,
        updated_at: new Date(),
      });
      if (error) {
        throw error;
      }
      toast.success("用户信息更新成功!");
    } catch (error) {
      toast.error("用户信息加载失败!" + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ProfileBackground defaultImage={form.getValues("bg_url")} />
      <ProfileAvatar defaultImage={form.getValues("avatar_url")} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="输入..." {...field} disabled />
                </FormControl>
                <FormDescription>更改邮箱地址, 请联系管理员.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input
                    placeholder={loading ? "加载中..." : "输入..."}
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>生日</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={loading}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: zhCN })
                        ) : (
                          <span>{loading ? "加载中..." : "选择日期"}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={zhCN}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述自己</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={loading ? "加载中..." : "输入..."}
                    {...field}
                    disabled={loading}
                    className="min-h-20"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="button primary w-full"
            disabled={loading}
            type="submit"
          >
            {loading ? "加载信息..." : "更新信息"}
          </Button>
        </form>
      </Form>
    </>
  );
}
