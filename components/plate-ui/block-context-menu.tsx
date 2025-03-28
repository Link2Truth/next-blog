"use client";

import { useCallback, useState } from "react";

import { AIChatPlugin } from "@udecode/plate-ai/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import {
  BLOCK_CONTEXT_MENU_ID,
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from "@udecode/plate-selection/react";
import {
  ParagraphPlugin,
  useEditorPlugin,
  usePlateState,
} from "@udecode/plate/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Copy,
  Heading1,
  Heading2,
  Heading3,
  IndentDecrease,
  IndentIncrease,
  Pilcrow,
  Quote,
  Replace,
  Sparkles,
  Trash,
} from "lucide-react";

import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

type Value = "askAI" | null;

export function BlockContextMenu({ children }: { children: React.ReactNode }) {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin);
  const [value, setValue] = useState<Value>(null);
  const isTouch = useIsTouchDevice();
  const [readOnly] = usePlateState("readOnly");

  const handleTurnInto = useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[IndentListPlugin.key]) {
            editor.tf.unsetNodes([IndentListPlugin.key, "indent"], {
              at: path,
            });
          }

          editor.tf.toggleBlock(type, { at: path });
        });
    },
    [editor]
  );

  const handleAlign = useCallback(
    (align: "center" | "left" | "right") => {
      editor
        .getTransforms(BlockSelectionPlugin)
        .blockSelection.setNodes({ align });
    },
    [editor]
  );

  if (isTouch) {
    return children;
  }

  const menuContextOptions = [
    [
      {
        id: "ai",
        icon: <Sparkles className="h-4 w-4" />,
        label: "AI",
        action: () => {
          setValue("askAI");
        },
      },
      {
        id: "delete",
        icon: <Trash className="h-4 w-4" />,
        label: "删除",
        action: () => {
          editor
            .getTransforms(BlockSelectionPlugin)
            .blockSelection.removeNodes();
          editor.tf.focus();
        },
      },
      {
        id: "duplicate",
        icon: <Copy className="h-4 w-4" />,
        label: "复制",
        action: () => {
          editor.getTransforms(BlockSelectionPlugin).blockSelection.duplicate();
        },
      },
      {
        id: "turnInto",
        icon: <Replace className="h-4 w-4" />,
        label: "转换为",
        submenu: [
          {
            id: "paragraph",
            icon: <Pilcrow className="h-4 w-4" />,
            label: "段落",
            action: () => handleTurnInto(ParagraphPlugin.key),
          },
          {
            id: "heading1",
            icon: <Heading1 className="h-4 w-4" />,
            label: "标题 1",
            action: () => handleTurnInto(HEADING_KEYS.h1),
          },
          {
            id: "heading2",
            icon: <Heading2 className="h-4 w-4" />,
            label: "标题 2",
            action: () => handleTurnInto(HEADING_KEYS.h2),
          },
          {
            id: "heading3",
            icon: <Heading3 className="h-4 w-4" />,
            label: "标题 3",
            action: () => handleTurnInto(HEADING_KEYS.h3),
          },
          {
            id: "blockquote",
            icon: <Quote className="h-4 w-4" />,
            label: "引用",
            action: () => handleTurnInto(BlockquotePlugin.key),
          },
        ],
      },
    ],
    [
      {
        id: "indentIncrease",
        icon: <IndentIncrease className="h-4 w-4" />,
        label: "添加缩进",
        action: () => {
          editor
            .getTransforms(BlockSelectionPlugin)
            .blockSelection.setIndent(1);
        },
      },
      {
        id: "indentDecrease",
        icon: <IndentDecrease className="h-4 w-4" />,
        label: "减少缩进",
        action: () => {
          editor
            .getTransforms(BlockSelectionPlugin)
            .blockSelection.setIndent(-1);
        },
      },
      {
        id: "align",
        icon: <AlignLeft className="h-4 w-4" />,
        label: "对齐",
        submenu: [
          {
            id: "alignLeft",
            icon: <AlignLeft className="h-4 w-4" />,
            label: "靠左",
            action: () => handleAlign("left"),
          },
          {
            id: "alignCenter",
            icon: <AlignCenter className="h-4 w-4" />,
            label: "居中",
            action: () => handleAlign("center"),
          },
          {
            id: "alignRight",
            icon: <AlignRight className="h-4 w-4" />,
            label: "靠右",
            action: () => handleAlign("right"),
          },
        ],
      },
    ],
  ];

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (!open) {
          // prevent unselect the block selection
          setTimeout(() => {
            api.blockMenu.hide();
          }, 0);
        }
      }}
      modal={false}
    >
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          const dataset = (event.target as HTMLElement).dataset;

          const disabled = dataset?.slateEditor === "true" || readOnly;

          if (disabled) return event.preventDefault();

          api.blockMenu.show(BLOCK_CONTEXT_MENU_ID, {
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        <div className="w-full">{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent
        className="w-30"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.getApi(BlockSelectionPlugin).blockSelection.focus();

          if (value === "askAI") {
            editor.getApi(AIChatPlugin).aiChat.show();
          }

          setValue(null);
        }}
      >
        {menuContextOptions.map((groupItems, groupIndex) => (
          <ContextMenuGroup key={`group-${groupIndex}`}>
            {groupItems.map((item) =>
              item.submenu ? (
                <ContextMenuSub key={item.id}>
                  <ContextMenuSubTrigger className="gap-2">
                    {item.icon}
                    {item.label}
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-30">
                    {item.submenu.map((subItem) => (
                      <ContextMenuItem
                        key={subItem.id}
                        onClick={subItem.action}
                        className="gap-2"
                      >
                        {subItem.icon}
                        {subItem.label}
                      </ContextMenuItem>
                    ))}
                  </ContextMenuSubContent>
                </ContextMenuSub>
              ) : (
                <ContextMenuItem
                  key={item.id}
                  onClick={item.action}
                  className="gap-2"
                >
                  {item.icon}
                  {item.label}
                </ContextMenuItem>
              )
            )}
          </ContextMenuGroup>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
