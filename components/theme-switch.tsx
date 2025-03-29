"use client";

import { useEffect, useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);

  // 在客户端挂载后再读取主题，避免服务端渲染不匹配
  useEffect(() => {
    setMounted(true);
    setChecked(theme === "dark");
  }, [theme]);

  // 处理主题切换
  const handleCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
    setTheme(isChecked ? "dark" : "light");
  };

  // 在组件挂载前不渲染具体内容，避免闪烁
  if (!mounted) {
    return <div className="w-[62px] h-9"></div>;
  }

  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center">
          <SunIcon size={16} aria-hidden="true" />
        </span>
        <span className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center">
          <MoonIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        切换主题
      </Label>
    </div>
  );
}
