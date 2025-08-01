import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Helmet } from "react-helmet";
import "../styles/pages.css";
import "../styles/Post.css";
import "../styles/global.css";

const NewsletterForm = lazy(() => import("./NewsletterForm"));

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Post não encontrado.");
          setPost(null);
        }
      } catch (err) {
        setError("Erro ao carregar o post.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  useEffect(() => {
    function handleExitIntent(e) {
      if (e.clientY < 0 && !showNewsletter) {
        setShowNewsletter(true);
      }
    }
    document.addEventListener("mouseout", handleExitIntent);
    return () => document.removeEventListener("mouseout", handleExitIntent);
  }, [showNewsletter]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowNewsletter(false);
      }
    }
    if (showNewsletter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNewsletter]);

  if (loading) return <p>Carregando post...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return null;

  const metaDescription = post.conteudo
    ? post.conteudo.replace(/<[^>]+>/g, "").slice(0, 150) + "..."
    : "Leia este artigo no GrowUpNegócio";

  return (
    <>
      <article className="post">
        <Helmet>
          <title>{post.titulo || "Sem título"} - GrowUpNegócio</title>
          <meta name="description" content={metaDescription} />
          <meta
            property="og:title"
            content={`${post.titulo || "Sem título"} - GrowUpNegócio`}
          />
          <meta property="og:description" content={metaDescription} />
        </Helmet>

        <h1 tabIndex={0}>{post.titulo || "Sem título"}</h1>
        <p>
          <em>Por {post.autor || "Desconhecido"}</em>
        </p>
        {post.createdAt && (
          <p>
            <small>
              Publicado em: {post.createdAt.toDate().toLocaleDateString("pt-BR")}
            </small>
          </p>
        )}
        {post.category && post.subcategory && (
          <p>
            Categoria:{" "}
            <Link
              to={`/categoria/${post.category.toLowerCase().replace(/ /g, "-")}`}
            >
              {post.category}
            </Link>{" "}
            &gt;{" "}
            <Link
              to={`/categoria/${post.category
                .toLowerCase()
                .replace(/ /g, "-")}/${post.subcategory
                .toLowerCase()
                .replace(/ /g, "-")}`}
            >
              {post.subcategory}
            </Link>
          </p>
        )}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.conteudo || "" }}
        />
        <Link to="/" className="back-link" aria-label="Voltar para a página inicial">
          ← Voltar para Home
        </Link>
      </article>

    </>
  );
}

export default Post;
