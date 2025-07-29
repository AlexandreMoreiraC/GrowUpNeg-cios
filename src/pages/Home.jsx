import React, { useEffect, useState } from "react";
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
import NewsletterForm from "./NewsletterForm";
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
      } catch (error) {
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
      } catch (err) {
        setErrorPosts("Erro ao carregar artigos recentes.");
      } finally {
        setLoadingPosts(false);
      }
    }
    fetchRecentPosts();
  }, []);

  const defaultTitle = "Bem-vindo ao GrowUpNegócio";
  const defaultDescription =
    "Aqui você encontra ideias, dicas e inspirações para crescer seu negócio e empreender com sucesso.";
  const defaultWhyChooseUs =
    "No GrowUpNegócio, nossa missão é capacitar empreendedores com ferramentas, conhecimento e suporte para transformar suas ideias em negócios de sucesso. Seja você um iniciante ou um veterano, aqui você encontrará conteúdos relevantes para todas as etapas da jornada empreendedora.";
  const defaultAdditionalInfo =
    "Navegue pelo nosso site para descobrir artigos, cases, dicas práticas e tendências do mercado que vão te ajudar a tomar decisões estratégicas e crescer de forma sustentável.";

  const pageTitle = homeContent.title?.trim() || defaultTitle;
  const pageDescription = homeContent.description?.trim() || defaultDescription;

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
                <h2>Envie sua ideia — Vamos avaliar juntos a viabilidade!</h2>
                {homeContent.highlights && homeContent.highlights.length > 0 ? (
                  <div className="highlight-cards">
                    {homeContent.highlights.map((highlight, i) => (
                      <article key={i} className="highlight-card">
                        {highlight.imageUrl && (
                          <img
                            src={highlight.imageUrl}
                            alt={highlight.title || "Imagem destaque"}
                            className="highlight-image"
                          />
                        )}
                        <h3>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p>
                    Tem uma ideia de negócio? Envie para nós! Analisamos cuidadosamente cada proposta para ajudar você a entender sua viabilidade, identificar pontos fortes e desafios, e dar orientações para transformar sua ideia em um projeto de sucesso.
                  </p>
                )}
                <Link to="/contato" className="contact-button">
                  Ir para Contato
                </Link>
              </section>
              

              <section className="why-choose-us" aria-label="Por que escolher o GrowUpNegócio">
                <h2>Por que escolher o GrowUpNegócio?</h2>
                <p>{homeContent.whyChooseUs?.trim() ? homeContent.whyChooseUs : defaultWhyChooseUs}</p>
              </section>

              <section className="additional-info" aria-label="Mais sobre nosso trabalho">
                <h2>Mais sobre nosso trabalho</h2>
                <p>{homeContent.additionalInfo?.trim() ? homeContent.additionalInfo : defaultAdditionalInfo}</p>
              </section>

              <section className="newsletter-home" aria-label="Assinar newsletter">
                <h2>Receba novidades por email</h2>
                <NewsletterForm />
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
      </section>
    </>
  );
}

export default Home;
