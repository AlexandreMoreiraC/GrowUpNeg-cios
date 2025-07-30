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
import { db, auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import "../styles/adminposts.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categorias = [
  "Marketing Digital",
  "Negócios Locais",
  "E-commerce",
  "Produtividade",
  "Finanças",
  "Tecnologia",
  "Sustentabilidade",
  "Carreira e Desenvolvimento",
  "Ideias de Negócio",
  "Entrepreneurismo para Iniciantes",
  "Ferramentas e Plataformas",
  "Histórias de Sucesso",
  "Marketing e Vendas",
];

export default function AdminPosts() {
  const editorRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

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

  const handleInsertLink = () => {
    if (!linkText.trim() || !linkUrl.trim()) {
      toast.warn("Preencha o texto e o URL do link.");
      return;
    }
    const selection = window.getSelection();
    if (!selection.rangeCount) {
      toast.warn("Selecione o local onde deseja inserir o link.");
      return;
    }
    const range = selection.getRangeAt(0);
    const a = document.createElement("a");
    a.href = linkUrl.trim();
    a.textContent = linkText.trim();
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    range.deleteContents();
    range.insertNode(a);
    setLinkText("");
    setLinkUrl("");
    editorRef.current.focus();
  };

  const criarPost = async () => {
    const conteudo = editorRef.current.innerHTML.trim();
    if (!titulo.trim() || !autor.trim() || !conteudo || conteudo === "<br>") {
      toast.warn("Preencha todos os campos antes de publicar.");
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
          category: categoria,
          updatedAt: serverTimestamp(),
        });
        toast.success("Crônica atualizada com sucesso!");
      } else {
        await addDoc(collection(db, "posts"), {
          titulo,
          autor,
          conteudo,
          dataPublicacao,
          category: categoria,
          createdAt: serverTimestamp(),
        });
        toast.success("Crônica publicada com sucesso!");
      }
      setTitulo("");
      setAutor("");
      setDataPublicacao("");
      setCategoria(categorias[0]);
      editorRef.current.innerHTML = "";
      setEditingId(null);
      fetchPosts();
    } catch (error) {
      console.error("Erro ao salvar crônica:", error);
      toast.error("Erro ao salvar, tente novamente.");
    }
  };

  const getResumo = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const imgs = tempDiv.querySelectorAll("img");
    imgs.forEach((img) => img.remove());
    const textoLimpo = tempDiv.textContent || tempDiv.innerText || "";
    return textoLimpo.length > 150 ? textoLimpo.substring(0, 150) + "..." : textoLimpo;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta crônica?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        fetchPosts();
        toast.info("Crônica excluída.");
      } catch (error) {
        console.error("Erro ao excluir crônica:", error);
        toast.error("Erro ao excluir, tente novamente.");
      }
    }
  };

  const handleEdit = (post) => {
    setTitulo(post.titulo);
    setAutor(post.autor);
    setDataPublicacao(post.dataPublicacao || "");
    editorRef.current.innerHTML = post.conteudo;
    setCategoria(post.category || categorias[0]);
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    editorRef.current.focus();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Você saiu da conta.");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao sair, tente novamente.");
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      (post.titulo?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (post.autor?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1>Administração de Artigos</h1>
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff5a5f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sair
        </button>
      </div>

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

      <label>
        Categoria:
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="admin-input"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <div className="editor-toolbar">
        <button onClick={() => exec("bold")}>
          <b>B</b>
        </button>
        <button onClick={() => exec("italic")}>
          <i>I</i>
        </button>
        <button onClick={() => exec("underline")}>
          <u>U</u>
        </button>
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
        <input
          type="text"
          placeholder="Texto do link"
          value={linkText}
          onChange={(e) => setLinkText(e.target.value)}
          className="admin-input"
          style={{ width: "150px", marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="URL do link"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="admin-input"
          style={{ width: "250px", marginLeft: "10px" }}
        />
        <button onClick={handleInsertLink} style={{ marginLeft: "10px" }}>
          Inserir Link
        </button>
        <button onClick={() => exec("removeFormat")} style={{ color: "white" }}>
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

      <h2>Artigos Publicados</h2>

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
            <p className="post-date">
              Publicado em: {post.dataPublicacao || "Data indisponível"}
            </p>
            <p>Categoria: {post.category || "—"}</p>
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
