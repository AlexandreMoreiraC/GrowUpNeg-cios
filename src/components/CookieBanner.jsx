import React, { useState, useEffect } from "react";
import "../styles/cookiebanner.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    if (consent !== "true") {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="region"
      aria-live="polite"
      aria-label="Aviso sobre uso de cookies"
      tabIndex={-1}
    >
      <p className="cookie-banner__text">
        Este site usa cookies para melhorar sua experiência.{" "}
        <a
          href="/politica-de-privacidade"
          className="cookie-banner__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Leia nossa política de privacidade sobre cookies"
        >
          Saiba mais
        </a>
      </p>
      <button
        onClick={acceptCookies}
        className="cookie-banner__button"
        aria-label="Aceitar cookies e fechar aviso"
        autoFocus
      >
        Aceitar
      </button>
    </div>
  );
}
