"use client";

import React from "react";

import {
  STRUCTURAL_TYPES,
  getBlockType,
  setBlockType,
} from "@/components/editor/transforms";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { HEADING_KEYS } from "@udecode/plate-heading";
import {
  ParagraphPlugin,
  useEditorRef,
  useSelectionFragmentProp,
} from "@udecode/plate/react";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  PilcrowIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

const turnIntoItems = [
  {
    icon: <PilcrowIcon />,
    keywords: ["paragraph"],
    label: "正文",
    value: ParagraphPlugin.key,
  },
  {
    icon: <Heading1Icon />,
    keywords: ["title", "h1"],
    label: "标题 1",
    value: HEADING_KEYS.h1,
  },
  {
    icon: <Heading2Icon />,
    keywords: ["subtitle", "h2"],
    label: "标题 2",
    value: HEADING_KEYS.h2,
  },
  {
    icon: <Heading3Icon />,
    keywords: ["subtitle", "h3"],
    label: "标题 3",
    value: HEADING_KEYS.h3,
  },
  {
    icon: <Heading4Icon />,
    keywords: ["subtitle", "h4"],
    label: "标题 4",
    value: HEADING_KEYS.h4,
  },
  {
    icon: <Heading5Icon />,
    keywords: ["subtitle", "h5"],
    label: "标题 5",
    value: HEADING_KEYS.h5,
  },
  {
    icon: <Heading6Icon />,
    keywords: ["subtitle", "h6"],
    label: "标题 6",
    value: HEADING_KEYS.h6,
  },
];

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    structuralTypes: STRUCTURAL_TYPES,
    getProp: (node) => getBlockType(node as any),
  });
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.value === (value ?? ParagraphPlugin.key),
      ) ?? turnIntoItems[0],
    [value],
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="min-w-18"
          pressed={openState.open}
          tooltip="转换格式"
          isDropdown
        >
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-0"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.tf.focus();
        }}
        align="start"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
          }}
          label="转换为"
        >
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className="min-w-[120px]"
              value={itemValue}
            >
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
