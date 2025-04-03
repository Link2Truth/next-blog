"use client";

import { useState } from "react";

import { SaveIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { FloatingInput } from "./input";
import { ToolbarButton } from "./toolbar";

// 使用默认导出而非命名导出
export function SaveToolbarButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

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

          <div className="group relative w-full">
            <FloatingInput
              id="title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="标题"
              type="text"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction>确定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
