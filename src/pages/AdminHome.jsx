import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/adminhome.css";

function AdminHome() {
  const [content, setContent] = useState({
    title: "",
    description: "",
    highlights: [],
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchHomeContent() {
      try {
        const docRef = doc(db, "config", "homeContent");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Caso o campo highlights não exista, inicializa como array vazio
          const data = docSnap.data();
          setContent({
            title: data.title || "",
            description: data.description || "",
            highlights: data.highlights || [],
          });
        }
      } catch (error) {
        console.error("Erro ao buscar conteúdo da home:", error);
      }
    }
    fetchHomeContent();
  }, []);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...content.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setContent({ ...content, highlights: newHighlights });
  };

  const addHighlight = () => {
    setContent({
      ...content,
      highlights: [...content.highlights, { title: "", description: "", imageUrl: "" }],
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = content.highlights.filter((_, i) => i !== index);
    setContent({ ...content, highlights: newHighlights });
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "config", "homeContent"), content);
      setStatus("Conteúdo salvo com sucesso!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
      setStatus("Erro ao salvar conteúdo.");
    }
  };

  return (
    <div className="admin-container">
      <h2>Administração da Página Inicial</h2>
      <p>
        Aqui você pode editar o conteúdo que aparece na página inicial do site.
        <br />
        <strong>Título:</strong> aparece como o título principal da home (ex: "Bem-vindo ao GrowUpNegócio").
        <br />
        <strong>Descrição:</strong> é o texto logo abaixo do título, que descreve o objetivo do site para os visitantes.
        <br />
        <strong>Destaques do Mês:</strong> você pode adicionar, editar ou remover destaques, cada um com título, descrição e uma imagem.
      </p>

      <label>
        Título da Home:
        <input
          type="text"
          name="title"
          value={content.title}
          onChange={handleChange}
          placeholder="Ex: Bem-vindo ao GrowUpNegócio"
        />
      </label>

      <label>
        Descrição da Home:
        <textarea
          name="description"
          value={content.description}
          onChange={handleChange}
          placeholder="Aqui você encontra ideias, dicas e inspirações para crescer seu negócio e empreender com sucesso."
          rows={5}
        />
      </label>

      <h3>Destaques do Mês</h3>
      {content.highlights.map((highlight, index) => (
        <div key={index} className="highlight-item">
          <label>
            Título:
            <input
              type="text"
              value={highlight.title}
              onChange={(e) => handleHighlightChange(index, "title", e.target.value)}
              placeholder="Título do destaque"
            />
          </label>
          <label>
            Descrição:
            <textarea
              value={highlight.description}
              onChange={(e) => handleHighlightChange(index, "description", e.target.value)}
              placeholder="Descrição do destaque"
              rows={3}
            />
          </label>
          <label>
            URL da Imagem:
            <input
              type="text"
              value={highlight.imageUrl}
              onChange={(e) => handleHighlightChange(index, "imageUrl", e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </label>
          <button type="button" onClick={() => removeHighlight(index)} className="btn-remove">
            Remover destaque
          </button>
          <hr />
        </div>
      ))}

      <button type="button" onClick={addHighlight} className="btn-add">
        Adicionar destaque
      </button>

      <button onClick={handleSave} className="btn-save">
        Salvar alterações
      </button>

      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default AdminHome;
