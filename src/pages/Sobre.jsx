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
          content="Conheça o GrowUpNegócio, um blog dedicado a compartilhar dicas, ideias e inspirações para quem deseja empreender com criatividade e sucesso."
        />
        <meta property="og:title" content="Sobre o GrowUpNegócio" />
        <meta
          property="og:description"
          content="Conheça o GrowUpNegócio, um blog dedicado a compartilhar dicas, ideias e inspirações para quem deseja empreender com criatividade e sucesso."
        />
      </Helmet>
      <section className="sobre">
        <h1 style={{ color: "#1d3557", fontSize: "30px", textAlign: "center" }}>
          Sobre o GrowUpNegócio
        </h1>
        <p
          style={{
            color: "#1d3557",
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "800px",
            margin: "1.5rem auto",
            textAlign: "justify",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          O GrowUpNegócio é um blog criado para compartilhar dicas, ideias e inspirações para pessoas que desejam empreender de forma criativa e eficiente. Aqui você encontra conteúdos práticos e atualizados que ajudam a transformar suas ideias em projetos reais e viáveis.
          <br /><br />
          Nosso foco é apoiar empreendedores em diferentes estágios, oferecendo informações que auxiliam na tomada de decisões, superação de desafios e no desenvolvimento sustentável dos negócios. Além disso, trazemos histórias inspiradoras, análises de mercado e ferramentas úteis para sua jornada.
          <br /><br />
          Acreditamos que o empreendedorismo é um caminho de aprendizado contínuo, e queremos ser seu parceiro nessa caminhada, fomentando uma comunidade que valoriza a inovação, a persistência e o crescimento coletivo.
          <br /><br />
          Junte-se a nós para crescer, aprender e transformar suas ideias em negócios de sucesso!
        </p>

        <h2
          style={{
            color: "#1d3557",
            fontSize: "26px",
            maxWidth: "800px",
            margin: "2rem auto 1rem auto",
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Missão
        </h2>
        <p
          style={{
            color: "#1d3557",
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "800px",
            margin: "0 auto 2rem auto",
            textAlign: "justify",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Nossa missão é fornecer conteúdo acessível, relevante e inspirador para ajudar pessoas a desenvolverem suas habilidades empreendedoras e transformarem suas ideias em negócios concretos e sustentáveis.
        </p>

        <h2
          style={{
            color: "#1d3557",
            fontSize: "26px",
            maxWidth: "800px",
            margin: "2rem auto 1rem auto",
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Visão
        </h2>
        <p
          style={{
            color: "#1d3557",
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "800px",
            margin: "0 auto 2rem auto",
            textAlign: "justify",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Ser reconhecido como um blog de referência para empreendedores brasileiros, fomentando uma comunidade engajada que busca inovação, conhecimento e crescimento sustentável no mundo dos negócios.
        </p>
      </section>
    </>
  );
}

export default Sobre;
