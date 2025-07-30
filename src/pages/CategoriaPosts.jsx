import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/CategoriaPosts.css";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

const categoriasSlugParaNome = {
  "marketing-digital": "Marketing Digital",
  "negocios-locais": "Negócios Locais",
  "e-commerce": "E-commerce",
  "produtividade": "Produtividade",
  "financas": "Finanças",
  "tecnologia": "Tecnologia",
  "sustentabilidade": "Sustentabilidade",
  "carreira-desenvolvimento": "Carreira e Desenvolvimento",
  "ideias-de-negocio": "Ideias de Negócio",
  "empreendedorismo-para-iniciantes": "Empreendedorismo para Iniciantes",
  "ferramentas-e-plataformas": "Ferramentas e Plataformas",
  "historias-de-sucesso": "Histórias de Sucesso",
  "marketing-e-vendas": "Marketing e Vendas",
};

const NewsletterForm = lazy(() => import("./NewsletterForm"));

function CategoriaPosts() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const categoriaNome = categoriasSlugParaNome[slug];
      if (!categoriaNome) {
        setPosts([]);
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "posts"),
          where("category", "==", categoriaNome),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate?.();
          const dataFormatada = createdAt
            ? createdAt.toLocaleDateString("pt-BR")
            : "Data indisponível";
          return {
            id: doc.id,
            ...data,
            dataFormatada,
          };
        });
        setPosts(postsData);
      } catch {
        setPosts([]);
      }
      setLoading(false);
    }
    fetchPosts();
  }, [slug]);

  if (loading) return <p className="categoria-status">Carregando posts...</p>;
  if (posts.length === 0) return <p className="categoria-status">Não há posts nesta categoria.</p>;

  return (
    <>
      <div className="categoria-container">
        <h2 className="categoria-titulo">{categoriasSlugParaNome[slug]}</h2>
        <div className="posts-list">
          {posts.map(post => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="post-card"
            >
              <div className="post-card-category">{post.category}</div>
              <h3>{post.titulo}</h3>
              <p className="italic">{post.autor}</p>
              <p className="data-publicacao">Publicado em: {post.dataFormatada}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    post.conteudo.length > 150
                      ? post.conteudo.slice(0, 150) + "..."
                      : post.conteudo,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
      <Suspense fallback={<p>Carregando formulário...</p>}>
        <NewsletterForm />
      </Suspense>
    </>
  );
}

export default CategoriaPosts;
