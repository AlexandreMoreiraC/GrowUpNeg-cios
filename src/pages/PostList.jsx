import React from 'react';
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

  const filteredPosts = posts.filter(post => 
    post.category.toLowerCase().replace(/ /g, '-') === categoria &&
    post.subcategory.toLowerCase().replace(/ /g, '-') === subcategoria
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Posts em {subcategoria.replace(/-/g, ' ')}</h1>
      {filteredPosts.length === 0 && <p>Nenhum post encontrado.</p>}
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id} style={{ margin: '1rem 0' }}>
            <Link to={`/post/${post.id}`} style={{ color: '#1d3557', textDecoration: 'none' }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
