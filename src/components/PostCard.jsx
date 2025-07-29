import React from "react";
import { Link } from "react-router-dom";

import "../styles/postcard.css";

function PostCard({ post }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getSummary = (text, maxLength = 150) => {
    const cleanText = stripHtml(text);
    if (!cleanText) return "";
    if (cleanText.length <= maxLength) return cleanText;
    const trimmed = cleanText.substr(0, maxLength);
    return trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" "))) + "...";
  };

  return (
    <Link
      to={`/post/${post.id}`}
      className="post-card-link-wrapper"
      aria-label={`Ler post: ${post.titulo || "Sem título"}`}
      tabIndex={-1}
    >
      <article
        className="post-card"
        tabIndex={0}
        aria-label={`Post: ${post.titulo || "Sem título"}`}
        role="article"
      >
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.titulo || "Imagem do post"}
            className="post-card-image"
            loading="lazy"
            decoding="async"
          />
        )}
        <header>
          <h3 className="post-card-title">{post.titulo || "Sem título"}</h3>
          {post.createdAt && (
            <time className="post-card-date" dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
          )}
          {post.autor && (
            <p className="post-card-autor" aria-label={`Autor: ${post.autor}`}>
              Por {post.autor}
            </p>
          )}
        </header>
        <p className="post-card-summary">{getSummary(post.conteudo)}</p>
      </article>
    </Link>
  );
}

export default PostCard;
