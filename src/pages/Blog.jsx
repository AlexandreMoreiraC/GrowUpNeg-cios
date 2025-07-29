import React, { useEffect, useState, lazy, Suspense } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import PostCard from "../components/PostCard";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../styles/pages.css";
import "../styles/global.css";
import "../styles/Blog.css";

const NewsletterForm = lazy(() => import("./NewsletterForm"));

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            titulo: data.titulo || "",
            autor: data.autor || "",
            conteudo: data.conteudo || "",
            imageUrl: data.imageUrl || "",
            category: data.category || "",
            subcategory: data.subcategory || "",
            createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
          };
        });
        setPosts(postsArray);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(term) ||
      post.autor.toLowerCase().includes(term)
    );
  });

  const recentPosts = posts.slice(0, 5);

  return (
    <section className="blog" style={{ padding: "2rem" }}>
      <Helmet>
        <title>Blog GrowUpNegócio - Dicas e Inspirações para Empreendedores</title>
        <meta
          name="description"
          content="Explore nosso blog com artigos, ideias e dicas para ajudar seu negócio a crescer com sucesso. Conteúdo atualizado para empreendedores de todos os níveis."
        />
        <meta property="og:title" content="Blog GrowUpNegócio" />
        <meta
          property="og:description"
          content="Explore artigos e dicas para impulsionar seu negócio. Conteúdo atualizado para empreendedores."
        />
      </Helmet>

      <h2>Inspiração & Empreendedorismo</h2>

      <input
        type="text"
        placeholder="Buscar por título ou autor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {loading ? (
        <p>Carregando posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        <div className="posts-list" style={{ marginTop: "1rem" }}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <h3 style={{ marginTop: "3rem" }}>Posts Recentes</h3>
      <ul>
        {recentPosts.map((post) => (
          <li key={post.id} style={{ margin: "0.5rem 0" }}>
            <Link
              to={`/post/${post.id}`}
              style={{ color: "#1d3557", textDecoration: "none" }}
            >
              {post.titulo} <small>({post.category})</small>
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "40px" }}>
        <Suspense fallback={<p>Carregando formulário...</p>}>
          <NewsletterForm />
        </Suspense>
      </div>
    </section>
  );
}