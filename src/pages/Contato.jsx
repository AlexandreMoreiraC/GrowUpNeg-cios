import React from "react";
import { Helmet } from "react-helmet";
import { db } from "../services/firebase";
import ContactForm from "../components/ContactForm";
import "../styles/contato.css";

function Contato() {
  return (
    <section className="contato">
      <Helmet>
        <title>Contato - GrowUpNegócio</title>
        <meta
          name="description"
          content="Entre em contato com o GrowUpNegócio para tirar dúvidas, enviar sugestões ou solicitar suporte. Estamos aqui para ajudar seu negócio a crescer."
        />
        <meta property="og:title" content="Contato - GrowUpNegócio" />
        <meta
          property="og:description"
          content="Fale conosco no GrowUpNegócio. Suporte e informações para ajudar seu empreendimento."
        />
      </Helmet>

      <h2>Fale Conosco</h2>
      <ContactForm />
    </section>
  );
}

export default Contato;
