"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { WordRotate } from "@/components/magicui/word-rotate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <NavBar />
      {/* 背景装饰元素 */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-400/20 z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-24 left-1/4 w-20 h-20 rounded-full bg-yellow-500/10 dark:bg-yellow-400/20 z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/3 right-12 w-32 h-32 rounded-full bg-purple-500/10 dark:bg-purple-400/20 z-0 hidden md:block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.div
        className="absolute -bottom-10 right-1/3 w-24 h-24 rounded-lg rotate-12 bg-green-500/10 dark:bg-green-400/20 z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* 左侧文字区域 */}
          <div className="max-w-xl md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground"
            >
              欢迎来到{" "}
              <AuroraText className="text-4xl sm:text-5xl lg:text-6xl">
                我的博客
              </AuroraText>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 space-y-3"
            >
              <span className="flex flex-wrap items-center gap-x-1.5">
                在这里，我分享关于
                <WordRotate
                  words={["编程", "技术", "设计"]}
                  className="inline-block font-bold text-black dark:text-white"
                />
                的见解和经验。
              </span>
              探索新知识，提升技能。一起在快速发展的技术世界中成长。
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg">
                <Link href="/blog">浏览博客</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">了解更多</Link>
              </Button>
            </motion.div>
          </div>

          {/* 右侧图片区域 */}
          <div className="md:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* 相框效果 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-0 bg-white shadow-lg rounded-lg p-2 -rotate-2"
              ></motion.div>
              {/* 主图片 */}
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 3 }}
                whileHover={{ rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
                className="relative rounded-lg shadow-md bg-white p-3"
              >
                <Image
                  src="/images/hero.jpg"
                  alt="博客图片"
                  width={600}
                  height={400}
                  className="rounded"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
