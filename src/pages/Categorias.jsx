import React from "react";
import { Link } from "react-router-dom";
import "../styles/categorias.css";

function Categorias() {
  const categorias = [
    { name: "Marketing Digital", slug: "marketing-digital" },
    { name: "Negócios Locais", slug: "negocios-locais" },
    { name: "E-commerce", slug: "e-commerce" },
    { name: "Produtividade", slug: "produtividade" },
    { name: "Finanças", slug: "financas" },
    { name: "Tecnologia", slug: "tecnologia" },
    { name: "Sustentabilidade", slug: "sustentabilidade" },
    { name: "Carreira e Desenvolvimento", slug: "carreira-desenvolvimento" },
    { name: "Ideias de Negócio", slug: "ideias-de-negocio" },
    { name: "Empreendedorismo para Iniciantes", slug: "empreendedorismo-para-iniciantes" },
    { name: "Ferramentas e Plataformas", slug: "ferramentas-e-plataformas" },
    { name: "Histórias de Sucesso", slug: "historias-de-sucesso" },
    { name: "Marketing e Vendas", slug: "marketing-e-vendas" },
  ];

  return (
    <div className="categorias-container">
      <h2 className="categorias-titulo"></h2>
      <p className="categorias-subtitulo">
        Explore ideias e estratégias divididas por temas para transformar seu negócio.
      </p>
      <ul className="categorias-lista">
        {categorias.map(({ name, slug }) => (
          <li key={slug} className="categoria-item">
            <Link to={`/categorias/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
