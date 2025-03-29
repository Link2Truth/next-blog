"use client";

import React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
  SubscriptPlugin,
  SuperscriptPlugin,
} from "@udecode/plate-basic-marks/react";
import { useEditorRef, useMarkToolbarButtonState } from "@udecode/plate/react";
import { CheckIcon, SubscriptIcon, SuperscriptIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function SuperscriptSubscriptDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  // 使用 useMarkToolbarButtonState 检查上标和下标状态
  const superscriptState = useMarkToolbarButtonState({
    nodeType: SuperscriptPlugin.key,
  });
  const subscriptState = useMarkToolbarButtonState({
    nodeType: SubscriptPlugin.key,
  });

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
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(SuperscriptPlugin.key, {
                remove: SubscriptPlugin.key,
              });
              editor.tf.focus();
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <SuperscriptIcon />
                上标
              </div>
              {superscriptState.pressed && <CheckIcon className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(SubscriptPlugin.key, {
                remove: SuperscriptPlugin.key,
              });
              editor.tf.focus();
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <SubscriptIcon />
                下标
              </div>
              {subscriptState.pressed && <CheckIcon className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
