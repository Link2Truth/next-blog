"use client";

import React, { useCallback, useState } from "react";

import { isUrl } from "@udecode/plate";
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";
import { useEditorRef } from "@udecode/plate/react";
import {
  AudioLinesIcon,
  FileUpIcon,
  FilmIcon,
  ImageIcon,
  LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";

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
import { DropdownMenuItem } from "./dropdown-menu";
import { FloatingInput } from "./input";

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> = {
  [AudioPlugin.key]: {
    accept: ["audio/*"],
    icon: <AudioLinesIcon className="size-4" />,
    title: "插入音频",
    tooltip: "音频",
  },
  [FilePlugin.key]: {
    accept: ["*"],
    icon: <FileUpIcon className="size-4" />,
    title: "插入文件",
    tooltip: "文件",
  },
  [ImagePlugin.key]: {
    accept: ["image/*"],
    icon: <ImageIcon className="size-4" />,
    title: "插入图片",
    tooltip: "图片",
  },
  [VideoPlugin.key]: {
    accept: ["video/*"],
    icon: <FilmIcon className="size-4" />,
    title: "插入视频",
    tooltip: "视频",
  },
};

export function MediaDropdownSubMenuItems({ nodeType }: { nodeType: string }) {
  const editor = useEditorRef();
  const currentConfig = MEDIA_CONFIG[nodeType];
  const [dialogOpen, setDialogOpen] = useState(false);

  const { openFilePicker } = useFilePicker({
    accept: currentConfig.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles: updatedFiles }) => {
      (editor as any).tf.insert.media(updatedFiles);
    },
  });
  return (
    <>
      <DropdownMenuItem onSelect={() => openFilePicker()}>
        {currentConfig.icon}
        本地上传
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDialogOpen(true);
        }}
      >
        <LinkIcon />
        插入URL
      </DropdownMenuItem>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={(value) => {
          setDialogOpen(value);
        }}
      >
        <AlertDialogContent className="gap-6">
          <MediaUrlDialogContent
            currentConfig={currentConfig}
            nodeType={nodeType}
            setOpen={setDialogOpen}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = useState("");

  const embedMedia = useCallback(() => {
    if (!isUrl(url)) return toast.error("Invalid URL");

    setOpen(false);
    editor.tf.insertNodes({
      children: [{ text: "" }],
      name: nodeType === FilePlugin.key ? url.split("/").pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className="group relative w-full">
        <FloatingInput
          id="url"
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") embedMedia();
          }}
          label="URL"
          placeholder=""
          type="url"
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            embedMedia();
          }}
        >
          确定
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
