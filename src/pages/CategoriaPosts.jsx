import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import "../styles/CategoriaPosts.css";

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

  if (loading) return <p>Carregando posts...</p>;
  if (posts.length === 0) return <p>Não há posts nesta categoria.</p>;

  return (
    <div className="posts-list">
      <h2 style={{ textTransform: "capitalize", marginBottom: "20px" }}>
        {categoriasSlugParaNome[slug]}
      </h2>
      {posts.map(post => (
        <Link
          key={post.id}
          to={`/post/${post.id}`}
          className="post-card"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3>{post.titulo}</h3>
          <p className="italic">{post.autor}</p>
          <p>Publicado em: {post.dataFormatada}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: post.conteudo.length > 150
                ? post.conteudo.slice(0, 150) + "..."
                : post.conteudo
            }}
          />
        </Link>
      ))}
    </div>
  );
}

export default CategoriaPosts;
