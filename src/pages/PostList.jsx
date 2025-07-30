import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/postlistcategoria.css";

const posts = [
  {
    id: 1,
    title: "10 ideias de negócios com pouco dinheiro",
    category: "Ideias de Negócio",
    subcategory: "Negócios com pouco dinheiro",
    content: "Conteúdo detalhado do post 1...",
  },
  {
    id: 2,
    title: "Como validar sua ideia de negócio",
    category: "Empreendedorismo para Iniciantes",
    subcategory: "Como validar ideias",
    content: "Conteúdo detalhado do post 2...",
  },
  {
    id: 3,
    title: "Ferramentas para redes sociais",
    category: "Ferramentas e Plataformas",
    subcategory: "Ferramentas para redes sociais",
    content: "Conteúdo detalhado do post 3...",
  },
  // Adicione mais posts aqui
];

function PostList() {
  const { categoria, subcategoria } = useParams();

  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const filtered = posts.filter(post =>
        post.category.toLowerCase().replace(/ /g, '-') === categoria &&
        post.subcategory.toLowerCase().replace(/ /g, '-') === subcategoria
      );
      setFilteredPosts(filtered);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [categoria, subcategoria]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.25rem' }}>
        Carregando página...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      {/* Título acima */}
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Posts em {subcategoria.replace(/-/g, ' ')}
      </h1>

      {filteredPosts.length === 0 && <p>Nenhum post encontrado.</p>}

      {/* Lista de cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredPosts.map(post => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1a1a1a',
              color: 'white',
              borderRadius: 8,
              padding: '1.2rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 12px #ff3b3f';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            }}
          >
            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.3rem' }}>{post.title}</h3>
            <p style={{ color: '#ccc', fontSize: '0.95rem', flexGrow: 1 }}>{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostList;
