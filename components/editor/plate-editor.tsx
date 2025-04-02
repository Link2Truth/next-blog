"use client";

import React from "react";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";

import { Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function PlateEditor() {
  const value = [
    {
      type: "p",
      children: [
        {
          text: "开始输入...",
        },
      ],
    },
  ];
  const localValue =
    typeof window !== "undefined" && localStorage.getItem("editorContent");

  const editor = useCreateEditor({
    value: localValue ? JSON.parse(localValue) : value,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={({ value }) => {
          localStorage.setItem("editorContent", JSON.stringify(value));
        }}
      >
        <EditorContainer>
          <Editor variant="default" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
