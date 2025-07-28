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
      <section style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
        <h2>Política de Privacidade</h2>
        <p>
          Nós levamos sua privacidade a sério. Este documento explica como coletamos,
          usamos e protegemos suas informações pessoais quando você utiliza nosso site.
        </p>

        <h3>Informações que coletamos</h3>
        <p>
          Podemos coletar dados como seu nome, email, e outras informações que você
          fornece ao usar nossos formulários de contato e interação.
        </p>

        <h3>Uso das informações</h3>
        <p>
          As informações coletadas são usadas apenas para responder suas mensagens,
          melhorar o site e personalizar sua experiência. Não compartilhamos seus dados
          com terceiros sem sua autorização.
        </p>

        <h3>Cookies</h3>
        <p>
          Usamos cookies para melhorar a navegação e garantir funcionalidades do site.
          Você pode optar por aceitar ou recusar o uso de cookies através do banner
          exibido ao entrar no site.
        </p>

        <h3>Segurança</h3>
        <p>
          Tomamos medidas técnicas e organizacionais para proteger seus dados contra
          acessos não autorizados, perda ou alteração.
        </p>

        <h3>Alterações nesta política</h3>
        <p>
          Podemos atualizar esta política periodicamente. Recomendamos revisá-la
          regularmente para se manter informado sobre como protegemos seus dados.
        </p>

        <h3>Contato</h3>
        <p>
          Se tiver dúvidas ou quiser exercer seus direitos, entre em contato conosco via
          <a
            href="/contato"
            style={{ color: "#0077cc", textDecoration: "underline" }}
          >
            {" "}
            formulário de contato
          </a>
          .
        </p>
      </section>
    </>
  );
}

export default PrivacyPolicy;
