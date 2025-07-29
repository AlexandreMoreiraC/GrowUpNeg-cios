import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { initGA, logPageView } from "./services/analytics";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CookieBanner from "./components/CookieBanner";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const Post = lazy(() => import("./pages/Post"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const Login = lazy(() => import("./pages/Login"));
const AdminPosts = lazy(() => import("./pages/AdminPosts"));
const AdminHome = lazy(() => import("./pages/AdminHome"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Categorias = lazy(() => import("./pages/Categorias"));
const CategoriaPosts = lazy(() => import("./pages/CategoriaPosts"));

import { auth } from "./services/firebase";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="main-content" role="main" style={{ flexGrow: 1 }}>
          <Suspense fallback={<p>Carregando...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/:slug" element={<CategoriaPosts />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/posts"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AdminPosts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/home"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AdminHome />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;
