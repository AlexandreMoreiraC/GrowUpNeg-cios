import React from "react";
import { Helmet } from "react-helmet";
import "../styles/pages.css";
import "../styles/global.css";

function Sobre() {
  return (
    <>
      <Helmet>
        <title>Sobre o GrowUpNegócio</title>
        <meta
          name="description"
          content="Conheça o GrowUpNegócio, a plataforma que ajuda empreendedores a transformar ideias em negócios reais com conteúdo prático e inspirador."
        />
        <meta property="og:title" content="Sobre o GrowUpNegócio" />
        <meta
          property="og:description"
          content="Conheça o GrowUpNegócio, a plataforma que ajuda empreendedores a transformar ideias em negócios reais com conteúdo prático e inspirador."
        />
      </Helmet>
      <section className="sobre">
        <h2>Sobre o GrowUpNegócio</h2>
        <p>
          O GrowUpNegócio foi criado para ajudar empreendedores a transformar ideias em negócios reais,
          trazendo conteúdo prático e inspirador para você crescer.
        </p>
      </section>
    </>
  );
}

export default Sobre;
