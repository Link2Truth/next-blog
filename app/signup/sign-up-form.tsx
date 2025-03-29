"use client";

import { useState } from "react";

import { signup } from "@/app/signup/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUpFormSchema = z
  .object({
    email: z
      .string({
        required_error: "邮箱不能为空",
      })
      .min(1, { message: "邮箱不能为空" })
      .email({ message: "请输入有效的邮箱地址" })
      .trim()
      .toLowerCase(),
    password: z
      .string({
        required_error: "未输入密码",
      })
      .min(6, {
        message: "密码长度至少为6",
      })
      .regex(/[0-9]/, {
        message: "密码需要至少包含一个数字",
      })
      .regex(/[a-zA-Z]/, {
        message: "密码需要至少包含一个字母",
      }),
    confirmPassword: z.string({
      required_error: "未输入确认密码",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    try {
      const result = await signup(formData);
      if (result.success) {
        toast("请在邮箱中查收注册邮件");
      } else {
        toast.error("注册失败", {
          description: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("注册失败:" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">注册</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input placeholder="输入邮箱..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="输入密码..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="确认密码..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "注册中..." : "注册"}
              </Button>
              <div className="mt-4 text-center text-sm">
                已有账户?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  登录
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
