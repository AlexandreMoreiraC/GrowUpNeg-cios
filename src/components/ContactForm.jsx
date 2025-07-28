import React, { useState } from "react";
import "../styles/contactform.css";
import "../styles/global.css";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // para mostrar feedback

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui você pode integrar com Firebase, API ou serviço real
    setStatus("Mensagem enviada! Obrigado.");
    setForm({ name: "", email: "", message: "" });

    // Limpa o status após 5 segundos (opcional)
    setTimeout(() => setStatus(null), 5000);
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" aria-label="Formulário de contato">
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
        aria-required="true"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        aria-required="true"
      />

      <label htmlFor="message">Mensagem</label>
      <textarea
        id="message"
        name="message"
        placeholder="Mensagem"
        value={form.message}
        onChange={handleChange}
        required
        aria-required="true"
        rows={5}
      />

      <button type="submit">Enviar</button>

      {status && <p role="alert" className="form-status">{status}</p>}
    </form>
  );
}

export default ContactForm;
