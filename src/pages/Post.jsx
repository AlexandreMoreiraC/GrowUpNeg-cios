import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Helmet } from "react-helmet";
import "../styles/pages.css";
import "../styles/Post.css";
import "../styles/global.css";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <p>Carregando post...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return null;

  const metaDescription = post.conteudo
    ? post.conteudo.replace(/<[^>]+>/g, '').slice(0, 150) + '...'
    : 'Leia este artigo no GrowUpNegócio';

  return (
    <article className="post">
      <Helmet>
        <title>{post.titulo || "Sem título"} - GrowUpNegócio</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${post.titulo || "Sem título"} - GrowUpNegócio`} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <h1 tabIndex={0}>{post.titulo || "Sem título"}</h1>
      <p><em>Por {post.autor || "Desconhecido"}</em></p>
      {post.dataPublicacao && (
        <p><small>Publicado em: {post.dataPublicacao}</small></p>
      )}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.conteudo || "" }}
      />
      <Link to="/" className="back-link" aria-label="Voltar para a página inicial">
        ← Voltar para Home
      </Link>
    </article>
  );
}

export default Post;
