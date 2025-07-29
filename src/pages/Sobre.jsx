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
        <h1 style={{ color: "#1d3557", fontSize: "30px" , textAlign: "center"}}>Sobre o GrowUpNegócio</h1>
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
  O GrowUpNegócio foi criado com o propósito de apoiar e impulsionar empreendedores de todos os níveis a
  transformarem suas ideias em negócios concretos, rentáveis e sustentáveis. Sabemos que o caminho do empreendedorismo
  é repleto de desafios, dúvidas e decisões importantes, por isso, nosso objetivo é oferecer um conteúdo completo, prático
  e atualizado, que sirva como um verdadeiro guia para quem deseja crescer no mundo dos negócios.

  Aqui, você encontrará não apenas dicas valiosas e estratégias testadas, mas também histórias inspiradoras de quem já trilhou essa
  jornada, além de ferramentas e recursos essenciais para facilitar a gestão do seu empreendimento. Queremos estar ao seu lado em cada
  etapa — desde a concepção da ideia, passando pelo planejamento, execução, até o desenvolvimento e expansão do seu negócio.

  Acreditamos que o sucesso vem da combinação entre conhecimento, atitude e persistência, e por isso, buscamos trazer informações
  que motivem, orientem e capacitem você a tomar as melhores decisões, superar obstáculos e inovar constantemente. No GrowUpNegócio,
  você não está sozinho: fazemos parte de uma comunidade que acredita no poder do empreendedorismo para transformar vidas e gerar impacto
  positivo na sociedade.

  Venha crescer com a gente, se conectar com outros empreendedores e construir um futuro de sucesso para o seu negócio!
</p>

      </section>
    </>
  );
}

export default Sobre;
