import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/navbar.css";
import "../styles/global.css";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const seoData = {
    "/": {
      title: "GrowUpNegócio - Início",
      description: "Ideias, dicas e inspirações para empreendedores crescerem seus negócios com sucesso.",
    },
    "/blog": {
      title: "GrowUpNegócio - Blog de Ideias",
      description: "Leia artigos inspiradores e dicas práticas para seu negócio.",
    },
    "/sobre": {
      title: "GrowUpNegócio - Sobre Nós",
      description: "Conheça a missão e os valores do GrowUpNegócio para ajudar empreendedores.",
    },
    "/contato": {
      title: "GrowUpNegócio - Contato",
      description: "Entre em contato conosco para tirar dúvidas ou enviar sua ideia de negócio.",
    },
  };

  const { title, description } =
    seoData[location.pathname] || {
      title: "GrowUpNegócio",
      description: "Ajuda e inspiração para empreendedores de sucesso.",
    };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
          <Link
            to="/"
            className="navbar-logo-link"
            aria-label="Ir para a página inicial GrowUp Negócios"
            onClick={closeMenu}
          >
            <img
              src="/logo-growup-nav.webp"
              alt="Logo GrowUp Negócios"
            />
            <span>GrowUp Negócios</span>
          </Link>
        </h1>

        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Início</Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
          </li>
          <li>
            <Link to="/categorias" onClick={closeMenu}>Categorias</Link>
          </li>
          <li>
            <Link to="/sobre" onClick={closeMenu}>Sobre</Link>
          </li>
          <li>
            <Link to="/contato" onClick={closeMenu}>Contato</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
