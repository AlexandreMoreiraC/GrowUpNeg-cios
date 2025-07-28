import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import AdminPosts from "./pages/AdminPosts";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import CookieBanner from "./components/CookieBanner";

import { auth } from "./services/firebase";


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
      <div className="app-container">
        <Navbar />
        <main className="main-content" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
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
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;
