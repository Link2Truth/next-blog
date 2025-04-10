"use client";

import { useCallback, useEffect, useRef } from "react";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { createArticle, getArticle, updateArticle } from "@/lib/api/articles";

import { type Value } from "@udecode/plate";
import { Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface PlateEditorProps {
  articleId?: string;
}

export function PlateEditor({ articleId }: PlateEditorProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const editor = useCreateEditor({
    value: [],
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      getArticle(articleId)
        .then((response) => {
          if (response.data?.content) {
            editor.tf.setValue(JSON.parse(response.data.content));
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.message === "Article not found") {
            createArticle({
              id: articleId,
              title: "untitled",
              content: null,
              updated_at: new Date().toISOString(),
            }).catch((error) => {
              throw new Error(error.message);
            });
          }
        });
    };
    fetchArticle(); //FIXME 函数重复调用
  }, []);

  // 实现debounce，延迟1秒执行保存操作
  const debouncedSaveContent = useCallback((value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (articleId) {
        updateArticle(articleId, {
          id: articleId,
          title: "untitled",
          content: value,
          updated_at: new Date().toISOString(),
        });
      } else {
        console.error("No article ID provided for saving content.");
      }
    }, 1000);
  }, []);

  const handleChange = ({ value }: { value: Value }) => {
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
