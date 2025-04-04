"use client";

import { useState } from "react";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { createClient } from "@/lib/supabase/client";

import { type Value } from "@udecode/plate";
import { Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function PlateEditor() {
  const value: Value = [];
  const [articleId, setArticleId] = useState(undefined);

  const editor = useCreateEditor({
    value: value,
  });
  const supabase = createClient();
  // 保存文章内容函数
  const saveContent = async (value: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("articles")
      .upsert({
        id: articleId,
        title: "untitled",
        content: value,
        is_published: false,
        auther_id: user?.id,
        updated_at: new Date(),
      })
      .select();
    if (error) {
      console.error("Error saving article:", error);
      return;
    }
    if (articleId === undefined) {
      setArticleId(data?.[0]?.id);
    }
    console.log("Article saved");
  };

  const handleChange = ({ value }: { value: Value }) => {
    console.log("Editor value changed");
    saveContent(JSON.stringify(value));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={handleChange}>
        <EditorContainer>
          <Editor variant="default" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
