import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import "../styles/global.css";

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p>© 2025 GrowUpNegócio. Todos os direitos reservados.</p>
      <nav aria-label="Links úteis no rodapé">
        <ul className="footer-links">
          <li>
            <Link to="/politica-de-privacidade" tabIndex={0}>
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link to="/contato" tabIndex={0}>
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
