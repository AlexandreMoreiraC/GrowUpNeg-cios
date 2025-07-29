import React from "react";
import { Helmet } from "react-helmet";

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade - GrowUpNegócio</title>
        <meta
          name="description"
          content="Leia nossa política de privacidade e saiba como protegemos seus dados pessoais e garantimos sua segurança ao usar nosso site GrowUpNegócio."
        />
        <meta property="og:title" content="Política de Privacidade - GrowUpNegócio" />
        <meta
          property="og:description"
          content="Leia nossa política de privacidade e saiba como protegemos seus dados pessoais e garantimos sua segurança ao usar nosso site GrowUpNegócio."
        />
      </Helmet>
      <section
        style={{
          maxWidth: 800,
          margin: "2rem auto",
          padding: "0 1rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#1d3557",
          lineHeight: 1.7,
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Política de Privacidade
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>
          Nós levamos sua privacidade a sério. Este documento explica como coletamos,
          usamos e protegemos suas informações pessoais quando você utiliza nosso site.
        </p>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "2rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #1d3557",
            paddingBottom: "0.3rem",
          }}
        >
          Informações que coletamos
        </h3>
        <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>
          Podemos coletar dados como seu nome, email, e outras informações que você
          fornece ao usar nossos formulários de contato e interação.
        </p>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "2rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #1d3557",
            paddingBottom: "0.3rem",
          }}
        >
          Uso das informações
        </h3>
        <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>
          As informações coletadas são usadas apenas para responder suas mensagens,
          melhorar o site e personalizar sua experiência. Não compartilhamos seus dados
          com terceiros sem sua autorização.
        </p>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "2rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #1d3557",
            paddingBottom: "0.3rem",
          }}
        >
          Cookies
        </h3>
        <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>
          Usamos cookies para melhorar a navegação e garantir funcionalidades do site.
          Você pode optar por aceitar ou recusar o uso de cookies através do banner
          exibido ao entrar no site.
        </p>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "2rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #1d3557",
            paddingBottom: "0.3rem",
          }}
        >
          Segurança
        </h3>
        <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>
          Tomamos medidas técnicas e organizacionais para proteger seus dados contra
          acessos não autorizados, perda ou alteração.
        </p>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "2rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #1d3557",
            paddingBottom: "0.3rem",
          }}
        >
          Alterações nesta política
        </h3>
        <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>
          Podemos atualizar esta política periodicamente. Recomendamos revisá-la
          regularmente para se manter informado sobre como protegemos seus dados.
        </p>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "2rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #1d3557",
            paddingBottom: "0.3rem",
          }}
        >
          Contato
        </h3>
        <p style={{ fontSize: "18px" }}>
          Se tiver dúvidas ou quiser exercer seus direitos, entre em contato conosco via
          <a
            href="/contato"
            style={{ color: "#0077cc", marginLeft: 4 }}
          >
            Clicando aqui
          </a>
          .
        </p>
      </section>
    </>
  );
}

export default PrivacyPolicy;
