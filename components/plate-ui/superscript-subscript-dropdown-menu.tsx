"use client";

import React, { useState, useEffect } from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
  SubscriptPlugin,
  SuperscriptPlugin,
} from "@udecode/plate-basic-marks/react";
import { useEditorRef, useMarkToolbarButtonState } from "@udecode/plate/react";
import { SubscriptIcon, SuperscriptIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function SuperscriptSubscriptDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  // 检查上下标状态
  const superscriptState = useMarkToolbarButtonState({
    nodeType: SuperscriptPlugin.key,
  });
  const subscriptState = useMarkToolbarButtonState({
    nodeType: SubscriptPlugin.key,
  });

  // 计算当前值
  const [value, setValue] = useState("");

  // 当标记状态变化时更新value
  useEffect(() => {
    if (superscriptState.pressed) setValue("superscript");
    else if (subscriptState.pressed) setValue("subscript");
    else setValue("");
  }, [superscriptState.pressed, subscriptState.pressed]);

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="上下标" isDropdown>
          <SubscriptIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar flex max-h-[500px] min-w-[100px] flex-col overflow-y-auto"
        align="start"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            setValue(newValue);
            if (newValue === "superscript") {
              editor.tf.toggleMark(SuperscriptPlugin.key, {
                remove: SubscriptPlugin.key,
              });
            } else if (newValue === "subscript") {
              editor.tf.toggleMark(SubscriptPlugin.key, {
                remove: SuperscriptPlugin.key,
              });
            } else if (newValue === "") {
              // 如果当前有上标或下标，则移除
              if (superscriptState.pressed) {
                editor.tf.toggleMark(SuperscriptPlugin.key);
              }
              if (subscriptState.pressed) {
                editor.tf.toggleMark(SubscriptPlugin.key);
              }
            }
            editor.tf.focus();
          }}
        >
          <DropdownMenuRadioItem value="superscript">
            <div className="flex items-center">
              <SuperscriptIcon className="mr-2" />
              上标
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="subscript">
            <div className="flex items-center">
              <SubscriptIcon className="mr-2" />
              下标
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
