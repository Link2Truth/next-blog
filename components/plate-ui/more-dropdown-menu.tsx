"use client";

import React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  SubscriptPlugin,
  SuperscriptPlugin,
} from "@udecode/plate-basic-marks/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { useEditorRef } from "@udecode/plate/react";
import {
  KeyboardIcon,
  MoreHorizontalIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="更多">
          <MoreHorizontalIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar flex max-h-[500px] min-w-[100px] flex-col overflow-y-auto"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(KbdPlugin.key);
              editor.tf.collapse({ edge: "end" });
              editor.tf.focus();
            }}
          >
            <KeyboardIcon />
            键盘
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(SuperscriptPlugin.key, {
                remove: SubscriptPlugin.key,
              });
              editor.tf.focus();
            }}
          >
            <SuperscriptIcon />
            上标
            {/* (⌘+,) */}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(SubscriptPlugin.key, {
                remove: SuperscriptPlugin.key,
              });
              editor.tf.focus();
            }}
          >
            <SubscriptIcon />
            下标
            {/* (⌘+.) */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
