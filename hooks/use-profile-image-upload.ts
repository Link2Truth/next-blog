"use client";

// TODO 使用cloudflare-r2实现上传
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 图片上传Hook的属性接口
 * @interface UseImageUploadProps
 * @property {Function} onUpload - 可选的回调函数，在图片上传后调用，参数为图片URL
 */
interface UseImageUploadProps {
  onUpload?: (url: string) => void;
}

/**
 * 自定义Hook，用于处理图片上传功能
 * 提供图片预览、选择和删除功能
 * @param {UseImageUploadProps} props - 配置选项
 * @returns {Object} 包含状态和处理函数的对象
 */
export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  // 用于跟踪预览URL的ref，主要用于组件卸载时清理资源
  const previewRef = useRef<string | null>(null);
  // 文件输入元素的ref，用于触发文件选择器
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 图片预览URL状态
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 文件名状态
  const [fileName, setFileName] = useState<string | null>(null);

  /**
   * 处理缩略图点击事件
   * 点击时触发文件选择器打开
   */
  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * 处理文件变更事件
   * 当用户选择文件后，创建预览URL并更新状态
   * @param {React.ChangeEvent<HTMLInputElement>} event - 文件输入元素的变更事件
   */
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        previewRef.current = url;
        onUpload?.(url);
      }
    },
    [onUpload],
  );

  /**
   * 处理移除图片事件
   * 清理预览URL资源并重置状态
   */
  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  /**
   * 组件卸载时清理资源
   * 释放由URL.createObjectURL创建的对象URL
   */
  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  // 返回状态和处理函数供组件使用
  return {
    previewUrl, // 图片预览URL
    fileName, // 文件名
    fileInputRef, // 文件输入元素引用
    handleThumbnailClick, // 点击缩略图处理函数
    handleFileChange, // 文件变更处理函数
    handleRemove, // 移除图片处理函数
  };
}
