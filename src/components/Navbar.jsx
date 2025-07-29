import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/navbar.css";
import "../styles/global.css";

function Navbar() {
  const location = useLocation();

  const seoData = {
    "/": {
      title: "GrowUpNegócio - Início",
      description:
        "Ideias, dicas e inspirações para empreendedores crescerem seus negócios com sucesso.",
    },
    "/blog": {
      title: "GrowUpNegócio - Blog de Ideias",
      description: "Leia artigos inspiradores e dicas práticas para seu negócio.",
    },
    "/sobre": {
      title: "GrowUpNegócio - Sobre Nós",
      description:
        "Conheça a missão e os valores do GrowUpNegócio para ajudar empreendedores.",
    },
    "/contato": {
      title: "GrowUpNegócio - Contato",
      description:
        "Entre em contato conosco para tirar dúvidas ou enviar sua ideia de negócio.",
    },
  };

  const { title, description } =
    seoData[location.pathname] || {
      title: "GrowUpNegócio",
      description: "Ajuda e inspiração para empreendedores de sucesso.",
    };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <nav className="navbar">
        <h1>
          <Link to="/" className="navbar-logo-link" aria-label="Ir para a página inicial GrowUp Negócios">
            GrowUp Negócios
          </Link>
        </h1>
        <ul>
  <li>
    <Link to="/">Início</Link>
  </li>
  <li>
    <Link to="/blog">Blog</Link>
  </li>
  <li>
    <Link to="/Categorias">Categorias</Link>
  </li>
  <li>
    <Link to="/sobre">Sobre</Link>
  </li>
  <li>
    <Link to="/contato">Contato</Link>
  </li>
</ul>
      </nav>
    </>
  );
}

export default Navbar;
