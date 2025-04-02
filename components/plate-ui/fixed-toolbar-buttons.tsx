"use client";

import React from "react";

import { SuperscriptSubscriptDropdownMenu } from "@/components/plate-ui/superscript-subscript-dropdown-menu";

import {
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from "@udecode/plate-font/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { useEditorReadOnly } from "@udecode/plate/react";
import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from "lucide-react";

import { AIToolbarButton } from "./ai-toolbar-button";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { CommentToolbarButton } from "./comment-toolbar-button";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { ExportToolbarButton } from "./export-toolbar-button";
import { FontSizeToolbarButton } from "./font-size-toolbar-button";
import { RedoToolbarButton, UndoToolbarButton } from "./history-toolbar-button";
import { ImportToolbarButton } from "./import-toolbar-button";
import {
  BulletedIndentListToolbarButton,
  NumberedIndentListToolbarButton,
} from "./indent-list-toolbar-button";
import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button";
import { IndentToolbarButton } from "./indent-toolbar-button";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { OutdentToolbarButton } from "./outdent-toolbar-button";
import { PublishToolbarButton } from "./publish-toolbar-button";
import { SaveToolbarButton } from "./save-toolbar-button";
import { ToggleToolbarButton } from "./toggle-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex w-full h-10">
      {!readOnly && (
        <div className="flex mx-auto">
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <ExportToolbarButton>
              <ArrowUpToLineIcon />
            </ExportToolbarButton>
            <ImportToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <TurnIntoDropdownMenu />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="加粗">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="斜体">
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="下划线">
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={StrikethroughPlugin.key}
              tooltip="删除线"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KbdPlugin.key} tooltip="代码块">
              <Code2Icon />
            </MarkToolbarButton>

            <ColorDropdownMenu
              nodeType={FontColorPlugin.key}
              tooltip="字体颜色"
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={FontBackgroundColorPlugin.key}
              tooltip="高亮显示"
            >
              <HighlighterIcon />
            </ColorDropdownMenu>
            <SuperscriptSubscriptDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <NumberedIndentListToolbarButton />
            <BulletedIndentListToolbarButton />
            <IndentTodoToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LineHeightDropdownMenu />
            <AlignDropdownMenu />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <CommentToolbarButton />
            <InsertDropdownMenu />
            <AIToolbarButton tooltip="AI">
              <WandSparklesIcon />
            </AIToolbarButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <SaveToolbarButton />
            <PublishToolbarButton />
          </ToolbarGroup>
        </div>
      )}
    </div>
  );
}
