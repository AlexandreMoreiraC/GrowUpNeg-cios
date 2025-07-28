import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
      navigate("/admin");
    } catch {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Entrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
