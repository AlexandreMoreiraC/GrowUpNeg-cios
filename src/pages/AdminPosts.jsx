import React, { useRef, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/Firebase";
import "../styles/adminposts.css";

export default function AdminPosts() {
  const editorRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const listaPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(listaPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleImageInsert = () => {
    if (imageUrl.trim()) {
      const img = document.createElement("img");
      img.src = imageUrl.trim();
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.contentEditable = false;
      editorRef.current.appendChild(img);
      setImageUrl("");
      editorRef.current.focus();
    }
  };

  const criarPost = async () => {
    const conteudo = editorRef.current.innerHTML.trim();
    if (!titulo.trim() || !autor.trim() || !conteudo || conteudo === "<br>") {
      alert("Preencha todos os campos antes de publicar.");
      return;
    }
    try {
      if (editingId) {
        const postRef = doc(db, "posts", editingId);
        await updateDoc(postRef, {
          titulo,
          autor,
          conteudo,
          dataPublicacao,
          updatedAt: serverTimestamp(),
        });
        alert("Crônica atualizada com sucesso!");
      } else {
        await addDoc(collection(db, "posts"), {
          titulo,
          autor,
          conteudo,
          dataPublicacao,
          createdAt: serverTimestamp(),
        });
        alert("Crônica publicada com sucesso!");
      }
      setTitulo("");
      setAutor("");
      setDataPublicacao("");
      editorRef.current.innerHTML = "";
      setEditingId(null);
      fetchPosts();
    } catch (error) {
      console.error("Erro ao salvar crônica:", error);
      alert("Erro ao salvar, tente novamente.");
    }
  };

  const getResumo = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const imgs = tempDiv.querySelectorAll("img");
    imgs.forEach((img) => img.remove());
    const textoLimpo = tempDiv.textContent || tempDiv.innerText || "";
    if (textoLimpo.length > 150) {
      return textoLimpo.substring(0, 150) + "...";
    }
    return textoLimpo;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta crônica?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        fetchPosts();
      } catch (error) {
        console.error("Erro ao excluir crônica:", error);
        alert("Erro ao excluir, tente novamente.");
      }
    }
  };

  const handleEdit = (post) => {
    setTitulo(post.titulo);
    setAutor(post.autor);
    setDataPublicacao(post.dataPublicacao || "");
    editorRef.current.innerHTML = post.conteudo;
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    editorRef.current.focus();
  };

  const filteredPosts = posts.filter(
    (post) =>
      (post.titulo?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (post.autor?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>Administração de Crônicas</h1>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="admin-input"
      />

      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        className="admin-input"
      />

      <input
        type="text"
        placeholder="Data de Publicação (ex: 28/07/2025)"
        value={dataPublicacao}
        onChange={(e) => setDataPublicacao(e.target.value)}
        className="admin-input"
      />

      <div className="editor-toolbar">
        <button onClick={() => exec("bold")}><b>B</b></button>
        <button onClick={() => exec("italic")}><i>I</i></button>
        <button onClick={() => exec("underline")}><u>U</u></button>
        <select onChange={(e) => exec("fontSize", e.target.value)} defaultValue="3">
          <option value="1">Muito Pequeno</option>
          <option value="2">Pequeno</option>
          <option value="3">Normal</option>
          <option value="4">Grande</option>
          <option value="5">Maior</option>
          <option value="6">Enorme</option>
          <option value="7">Gigante</option>
        </select>
        <button onClick={() => exec("insertUnorderedList")}>• Lista</button>
        <button onClick={() => exec("insertOrderedList")}>1. Lista</button>
        <button onClick={() => exec("justifyLeft")}>⬅</button>
        <button onClick={() => exec("justifyCenter")}>⬌</button>
        <button onClick={() => exec("justifyRight")}>➡</button>
        <button onClick={() => exec("justifyFull")}>☰</button>
        <input
          type="text"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="admin-input"
          style={{ width: "200px", marginLeft: "auto" }}
        />
        <button onClick={handleImageInsert}>Inserir Imagem</button>
        <button onClick={() => exec("removeFormat")} style={{ color: "red" }}>
          Limpar
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        spellCheck={true}
      ></div>

      <button onClick={criarPost} className="admin-submit-btn">
        {editingId ? "Salvar alterações" : "Publicar"}
      </button>

      <h2>Crônicas Publicadas</h2>

      <input
        type="text"
        placeholder="Pesquisar por título ou autor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-search"
      />

      {filteredPosts.length === 0 && <p>Nenhuma crônica encontrada.</p>}

      <div className="posts-list">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.titulo}</h3>
            <p className="italic">{post.autor}</p>
            <p className="post-date">Publicado em: {post.dataPublicacao || "Data indisponível"}</p>
            <p>{getResumo(post.conteudo)}</p>
            <div className="post-card-footer">
              <button onClick={() => handleEdit(post)} className="post-card-btn edit">
                Editar
              </button>
              <button onClick={() => handleDelete(post.id)} className="post-card-btn delete">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
