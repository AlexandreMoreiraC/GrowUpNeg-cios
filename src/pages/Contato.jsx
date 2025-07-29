import React, { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/contato.css";

function Contato() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_4rkvyvs",
        "template_3qahcxf",
        formData,
        "PgxHQsJgnsH0IoVii"
      )
      .then(() => {
        toast.success("Mensagem enviada com sucesso!");
        setFormData({
          user_name: "",
          user_email: "",
          user_message: "",
        });
      })
      .catch((err) => {
        console.error("Erro ao enviar:", err);
        toast.error("Erro ao enviar mensagem. Tente novamente.");
      });
  };

  return (
    <>
      <form className="contato" onSubmit={handleSubmit}>
        <h3>Fale Conosco</h3>
        <div className="form-group">
          <input
            type="text"
            name="user_name"
            placeholder="Seu nome"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="user_email"
            placeholder="Seu email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="user_message"
            placeholder="Sua mensagem"
            rows="5"
            value={formData.user_message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {/* Container do Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Contato;
