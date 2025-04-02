import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ChevronRight, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "网站概况",
      url: "#",
      items: [
        {
          title: "概览统计",
          url: "/dashboard",
        },
        {
          title: "访问分析",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "内容管理",
      url: "#",
      items: [
        {
          title: "写文章",
          url: "/dashboard/posts/create",
        },
        {
          title: "所有文章",
          url: "/dashboard/posts",
        },
        {
          title: "草稿箱",
          url: "/dashboard/posts/drafts",
        },
        {
          title: "已发布",
          url: "/dashboard/posts/published",
        },
      ],
    },
    {
      title: "评论管理",
      url: "/dashboard/comments",

      items: [
        {
          title: "所有评论",
          url: "/dashboard/comments",
        },
        {
          title: "待审核",
          url: "/dashboard/comments/pending",
        },
        {
          title: "已批准",
          url: "/dashboard/comments/approved",
        },
        {
          title: "垃圾评论",
          url: "/dashboard/comments/spam",
        },
      ],
    },
    {
      title: "用户管理",
      url: "/dashboard/users",
      items: [
        {
          title: "所有用户",
          url: "/dashboard/users",
          isActive: true,
        },
        {
          title: "添加用户",
          url: "/dashboard/users/new",
        },
        {
          title: "个人资料",
          url: "/dashboard/profile",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild disabled>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">博客管理</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="h-10">
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <div>
                            <span className="w-2" />
                            <Link href={item.url}>{item.title}</Link>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
