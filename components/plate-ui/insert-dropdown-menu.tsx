"use client";

import React from "react";

import {
  insertBlock,
  insertInlineElement,
} from "@/components/editor/transforms";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
  EquationPlugin,
  InlineEquationPlugin,
} from "@udecode/plate-math/react";
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";
import { TablePlugin } from "@udecode/plate-table/react";
import { type PlateEditor, useEditorRef } from "@udecode/plate/react";
import {
  AudioLinesIcon,
  CalendarIcon,
  Columns3Icon,
  FileCodeIcon,
  FileUpIcon,
  FilmIcon,
  ImageIcon,
  Link2Icon,
  MinusIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  TableIcon,
  TableOfContentsIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { MediaDropdownSubMenuItems } from "./media-insert-dropdown-submenu-items";
import { TableDropdownSubMenuItems } from "./table-insert-dropdown-submenu-items";
import { ToolbarButton } from "./toolbar";

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;
  value: string;
  onSelect: (editor: PlateEditor, value: string) => void;
  focusEditor?: boolean;
  label?: string;
  subItems?: React.ReactNode;
}

const groups: Group[] = [
  {
    group: "基础",
    items: [
      {
        icon: <FileCodeIcon />,
        label: "代码块",
        value: CodeBlockPlugin.key,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: "公式块",
        value: EquationPlugin.key,
      },
      {
        icon: <QuoteIcon />,
        label: "引用",
        value: BlockquotePlugin.key,
      },
      {
        icon: <MinusIcon />,
        label: "分割线",
        value: HorizontalRulePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "媒体",
    items: [
      {
        icon: <ImageIcon />,
        label: "图片",
        value: ImagePlugin.key,
        subItems: <MediaDropdownSubMenuItems nodeType={ImagePlugin.key} />,
      },
      {
        icon: <FilmIcon />,
        label: "视频",
        value: VideoPlugin.key,
        subItems: <MediaDropdownSubMenuItems nodeType={VideoPlugin.key} />,
      },
      {
        icon: <AudioLinesIcon />,
        label: "音频",
        value: AudioPlugin.key,
        subItems: <MediaDropdownSubMenuItems nodeType={AudioPlugin.key} />,
      },
      {
        icon: <FileUpIcon />,
        label: "文件",
        value: FilePlugin.key,
        subItems: <MediaDropdownSubMenuItems nodeType={FilePlugin.key} />,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "高级",
    items: [
      {
        icon: <TableIcon />,
        label: "表格",
        value: TablePlugin.key,
        subItems: <TableDropdownSubMenuItems />,
      },
      {
        icon: <TableOfContentsIcon />,
        label: "目录",
        value: TocPlugin.key,
      },
      {
        icon: <Columns3Icon />,
        label: "多栏布局",
        value: "action_three_columns",
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "内联元素",
    items: [
      {
        icon: <Link2Icon />,
        label: "链接",
        value: LinkPlugin.key,
      },
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        label: "日期",
        value: DatePlugin.key,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: "内联公式",
        value: InlineEquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="插入" isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({ group, items: nestedItems }) => (
          <DropdownMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect, subItems }) =>
              subItems ? (
                <DropdownMenuSub key={value}>
                  <DropdownMenuSubTrigger className="min-w-[180px]">
                    {icon}
                    {label}
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>{subItems}</DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem
                  key={value}
                  className="min-w-[180px]"
                  onSelect={() => {
                    onSelect(editor, value);
                    editor.tf.focus();
                  }}
                >
                  {icon}
                  {label}
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
