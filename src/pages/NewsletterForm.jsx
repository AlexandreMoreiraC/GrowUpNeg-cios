import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/newsletter.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    emailjs
      .send(
        "service_4rkvyvs",
        "template_3qahcxf",
        {
          user_email: email,
          subscribe_time: new Date().toLocaleString(),
        },
        "PgxHQsJgnsH0IoVii"
      )
      .then(() => {
        toast.success("Inscrição realizada com sucesso!");
        setEmail("");
      })
      .catch(() => {
        toast.error("Erro ao enviar. Tente novamente.");
      });
  }

  return (
    <>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <h3>Assine a Newsletter</h3>
        <p>
          Fique por dentro! Receba em seu email novidades, dicas incríveis e
          conteúdos exclusivos feitos especialmente para você.
        </p>
        <div className="newsletter-inputs">
          <input
            type="email"
            name="user_email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default NewsletterForm;
