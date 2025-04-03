"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { id } from "date-fns/locale";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { FloatingInput } from "./input";
import { ToolbarButton } from "./toolbar";

export function SaveToolbarButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const handleSave = async () => {
    const editorContentId = localStorage.getItem("articleId");
    const editorContent = localStorage.getItem("editorContent");

    if (!editorContent || editorContent === "[]") {
      setOpen(false);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("articles")
      .upsert({
        id: editorContentId ? editorContentId : undefined,
        title: title,
        content: editorContent,
        is_published: false,
        auther_id: user?.id,
        updated_at: new Date(),
      })
      .select();
    if (error) {
      toast.error("保存失败！请联系管理员。");
      console.error("Error saving article:", error);
      setOpen(false);
      return;
    }

    localStorage.setItem("articleId", data?.[0]?.id);
    toast.success("保存成功！");
    setOpen(false);
  };

  return (
    <>
      <ToolbarButton onClick={() => setOpen(true)}>
        <SaveIcon />
        <span>保存</span>
      </ToolbarButton>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>保存文章</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="group relative w-full">
            <FloatingInput
              id="title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="标题"
              type="text"
            />
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>确定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
