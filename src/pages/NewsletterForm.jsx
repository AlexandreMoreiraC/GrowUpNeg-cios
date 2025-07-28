// NewsletterForm.jsx
import React, { useState } from "react";
import "../styles/newsletter.css";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    // Aqui você pode integrar com Firebase, Mailchimp, etc.
    setStatus("Inscrição realizada com sucesso!");
    setEmail("");

    setTimeout(() => setStatus(null), 5000);
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <h3>Newsletter</h3>
      <p>Receba novidades, dicas e conteúdos exclusivos diretamente no seu email.</p>
      <div className="newsletter-inputs">
        <input
          type="email"
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