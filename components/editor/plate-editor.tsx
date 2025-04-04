"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { createClient } from "@/lib/supabase/client";

import { type Value } from "@udecode/plate";
import { Plate } from "@udecode/plate/react";
import { useSearchParams } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function PlateEditor() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState<Value>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const supabase = createClient();
  useEffect(() => {
    const fetchArticle = async () => {
      if (!searchParams.get("id")) return;
      const { data, error } = await supabase
        .from("articles")
        .select()
        .eq("id", searchParams.get("id"))
        .single();

      if (error) {
        console.error("Error fetching article:", error);
        return;
      }

      if (data) {
        // TODO: fetch到数据，但是初始化内容没有生效
        setValue(JSON.parse(data.content));
      }
    };
    fetchArticle();
  }, []);
  const editor = useCreateEditor({
    value: value,
  });
  // 保存文章内容函数
  const saveContent = async (value: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("articles").upsert({
      id: searchParams.get("id"),
      title: "untitled",
      content: value,
      is_published: false,
      auther_id: user?.id,
      updated_at: new Date(),
    });

    if (error) {
      console.error("Error saving article:", error);
      return;
    }
    console.log("Article saved");
  };

  // 实现debounce，延迟1秒执行保存操作
  const debouncedSaveContent = useCallback((value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveContent(value);
    }, 1000);
  }, []);

  const handleChange = ({ value }: { value: Value }) => {
    console.log("Editor value changed");
    debouncedSaveContent(JSON.stringify(value));
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
