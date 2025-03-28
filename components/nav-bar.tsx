import Link from "next/link";
import { Code2, User } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
  { href: "/about", label: "关于" },
];

export function NavBar() {
  const navItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  // 根据鼠标位置，更新元素尺寸和位置
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
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* logo */}
      <div className="flex items-center">
        <div className="mr-2">
          <Code2 />
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
        <Link href="/login">
          <Avatar className="h-9 w-9 cursor-pointer border-2 rounded-full">
            <AvatarImage src="#" alt="用户头像" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </motion.nav>
  );
}
