import { type Database } from "@/lib/supabase/types";

type Article = Database["public"]["Tables"]["articles"]["Insert"];

async function createArticle(article: Article) {
  return await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create article");
    }
    return response.json();
  });
}

async function getArticles(page: number, pageSize: number) {
  return await fetch(`/api/articles?page=${page}&pageSize=${pageSize}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return response.json();
    },
  );
}

async function getArticle(id: string) {
  return await fetch(`/api/articles/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }
    return response.json();
  });
}

async function updateArticle(id: string, article: Article) {
  return await fetch(`/api/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update article");
    }
    return response.json();
  });
}

async function deleteArticle(id: string) {
  return await fetch(`/api/articles/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete article");
    }
    return response.json();
  });
}

export { createArticle, getArticles, getArticle, updateArticle, deleteArticle };
