"use client";

import { useEffect, useRef, useState } from "react";

import { NavBarUserMenu } from "@/components/nav-bar-user-menu";
import { ThemeSwitch } from "@/components/theme-switch";
import { createClient } from "@/lib/supabase/client";

import { type User } from "@supabase/supabase-js";
import { Code2Icon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
  { href: "/about", label: "关于" },
];

export function NavBar() {
  const navItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  // 在组件加载时获取用户信息
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setLoginUser(data.user);
    };
    fetchUser();
  }, []);

  // 根据鼠标位置，更新导航菜单背景元素尺寸和位置
  useEffect(() => {
    if (hoveredIndex !== null && navItemsRef.current[hoveredIndex]) {
      const currentItem = navItemsRef.current[hoveredIndex];
      setDimensions({
        width: currentItem?.offsetWidth || 0,
        height: currentItem?.offsetHeight || 0,
        left: currentItem?.offsetLeft || 0,
      });
    }
  }, [hoveredIndex]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 h-16 z-50 bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* logo */}
      <div className="flex items-center">
        <div className="mr-2">
          <Code2Icon />
        </div>
        <h1 className="text-xl font-semibold text-primary">Blog</h1>
      </div>

      {/* 菜单 */}
      <div className="hidden md:flex md:flex-1 justify-center">
        <ul className="flex list-none relative">
          {/* 动态背景元素 */}
          {hoveredIndex !== null && (
            <motion.div
              className="absolute bg-accent rounded-md top-0"
              initial={false}
              animate={{
                width: dimensions.width,
                height: dimensions.height,
                x: dimensions.left,
                opacity: 1,
              }}
              transition={{
                type: "ease",
                duration: 0.3,
              }}
            />
          )}

          {navLinks.map((link, index) => (
            <li
              key={link.href}
              ref={(el) => {
                navItemsRef.current[index] = el;
              }}
              className="mx-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={link.href}
                className="no-underline text-primary px-3 py-2 rounded-md block relative z-10"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 用户头像 */}
      <div className="hidden md:flex items-center gap-4">
        <ThemeSwitch />
        <NavBarUserMenu user={loginUser} />
      </div>
    </motion.nav>
  );
}
