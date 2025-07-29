import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/newsletter.css";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

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
        setStatus("Inscrição realizada com sucesso!");
        setEmail("");
        setTimeout(() => setStatus(null), 5000);
      })
      .catch((err) => {
        setStatus("Erro ao enviar, tente novamente.");
        console.error("Erro EmailJS:", err);
        setTimeout(() => setStatus(null), 5000);
      });
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <h3></h3>
      <p>Fique por dentro! Receba em seu email novidades, dicas incríveis e conteúdos exclusivos feitos especialmente para você.</p>
      <div className="newsletter-inputs">
        {/* Importante para casar com o template */}
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
      {status && <p className="newsletter-status">{status}</p>}
    </form>
  );
}

export default NewsletterForm;