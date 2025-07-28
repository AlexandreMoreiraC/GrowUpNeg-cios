// src/pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admindashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Painel de Administração</h2>
      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/home")}>Editar Página Inicial</button>
        <button onClick={() => navigate("/admin/posts")}>Gerenciar Crônicas</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
