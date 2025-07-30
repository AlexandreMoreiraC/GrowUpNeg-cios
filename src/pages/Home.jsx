import React, { useEffect, useState, lazy, Suspense } from "react";
import { db } from "../services/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const NewsletterForm = lazy(() => import("./NewsletterForm"));
import "../styles/pages.css";
import "../styles/home.css";
import "../styles/global.css";

function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [homeContent, setHomeContent] = useState({
    title: "",
    description: "",
    highlights: [],
    whyChooseUs: "",
    additionalInfo: "",
  });
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingHome, setLoadingHome] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);
  const [errorHome, setErrorHome] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [modalShownOnce, setModalShownOnce] = useState(false);

  useEffect(() => {
    async function fetchHomeData() {
      setLoadingHome(true);
      setErrorHome(null);
      try {
        const docRef = doc(db, "config", "homeContent");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHomeContent(docSnap.data());
        }
      } catch {
        setErrorHome("Erro ao carregar conteúdo da home.");
      } finally {
        setLoadingHome(false);
      }
    }
    fetchHomeData();
  }, []);

  useEffect(() => {
    async function fetchRecentPosts() {
      setLoadingPosts(true);
      setErrorPosts(null);
      try {
        const q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecentPosts(posts);
      } catch {
        setErrorPosts("Erro ao carregar artigos recentes.");
      } finally {
        setLoadingPosts(false);
      }
    }
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    function handleMouseMove(e) {
      if (e.clientY < 50 && !modalShownOnce) {
        setShowExitModal(true);
        setModalShownOnce(true);
      }
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [modalShownOnce]);

  const defaultTitle =
    "Bem-vindo ao GrowUpNegócio - Dicas e Ideias para Empreendedores";
  const defaultDescription =
    "No GrowUpNegócio você encontra dicas, ideias e inspirações para empreender com criatividade e sucesso.";
  const defaultWhyChooseUs =
    "Aqui no GrowUpNegócio compartilhamos conteúdos práticos, insights e tendências para ajudar você a desenvolver seu negócio com mais segurança e inovação. Nosso objetivo é apoiar empreendedores em todas as etapas da jornada.";
  const defaultAdditionalInfo =
    "Explore nosso blog para acessar artigos atualizados, análises e estratégias que vão inspirar você a transformar suas ideias em negócios reais e sustentáveis.";

  const pageTitle = homeContent.title?.trim() || defaultTitle;
  const pageDescription = homeContent.description?.trim() || defaultDescription;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function closeModal() {
    setShowExitModal(false);
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="negócios, empreendedorismo, ideias, dicas, GrowUpNegócio, análise de ideias, crescimento"
        />
        <meta name="author" content="GrowUpNegócio" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="home-container" aria-label="Página inicial GrowUpNegócio">
        <main className="home-main">
          {loadingHome ? (
            <p>Carregando conteúdo...</p>
          ) : errorHome ? (
            <p className="error">{errorHome}</p>
          ) : (
            <>
              <h1 tabIndex={0}>{pageTitle}</h1>
              <p>{pageDescription}</p>

              <section className="highlights" aria-label="Envie sua ideia - Avaliação de viabilidade">
                <h2>Tem uma ideia de negócio? Compartilhe conosco!</h2>
                {homeContent.highlights && homeContent.highlights.length > 0 ? (
                  <div className="highlight-cards">
                    {homeContent.highlights.map((highlight, i) => (
                      <article key={i} className="highlight-card">
                        {highlight.imageUrl && (
                          <img
                            src={highlight.imageUrl}
                            alt={highlight.title || "Imagem destaque"}
                            className="highlight-image"
                            loading="lazy"
                          />
                        )}
                        <h3>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p>
                    No GrowUpNegócio você pode enviar suas ideias e receber sugestões e dicas para ajudar no desenvolvimento do seu projeto. Vamos juntos aprender e crescer como empreendedores!
                  </p>
                )}
                <Link to="/contato" className="contact-button">
                  Compartilhe sua ideia
                </Link>
              </section>

              <section className="why-choose-us" aria-label="Por que escolher o GrowUpNegócio">
                <h2>O GrowUp Negócios</h2>
                <p>{homeContent.whyChooseUs?.trim() ? homeContent.whyChooseUs : defaultWhyChooseUs}</p>
              </section>

              <section className="additional-info" aria-label="Mais sobre nosso trabalho">
                <h2>Mais sobre nosso trabalho</h2>
                <p>{homeContent.additionalInfo?.trim() ? homeContent.additionalInfo : defaultAdditionalInfo}</p>
              </section>

              <section className="newsletter-home" aria-label="Assinar newsletter">
                <h2>Assine nossa newsletter e receba novidades por email</h2>
                <Suspense fallback={<p>Carregando formulário...</p>}>
                  <NewsletterForm />
                </Suspense>
              </section>
            </>
          )}
        </main>

        <aside className="home-sidebar" aria-label="Barra lateral com artigos recentes">
          <section className="recent-posts" aria-label="Artigos recentes">
            <h2>Artigos Recentes</h2>
            {loadingPosts ? (
              <p>Carregando artigos...</p>
            ) : errorPosts ? (
              <p className="error">{errorPosts}</p>
            ) : (
              <ul>
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>
                        {post.titulo || "Sem título"}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>Nenhum artigo recente encontrado.</li>
                )}
              </ul>
            )}
          </section>
        </aside>

        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "rgba(255, 127, 80, 0.9)",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            zIndex: 10000,
          }}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          ↑ Topo
        </button>

        {showExitModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exitModalTitle"
            aria-describedby="exitModalDesc"
            className="exit-modal-overlay"
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 11000,
            }}
          >
            <div
              className="exit-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "20px",
                maxWidth: "500px",
                width: "90%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              <Suspense fallback={<p>Carregando formulário...</p>}>
                <NewsletterForm />
              </Suspense>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
