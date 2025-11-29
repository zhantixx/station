"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import SportPosts from "@/components/SportPosts.jsx";
import { articles } from "../data/articles.js";
import { Container } from "react-bootstrap";

export default function SportsPage() {
  return (
    <>
      <Header activePage="sports" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1 className="display-4 fw-bold text-center mb-5 text-primary" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}>
            Спорт
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-primary ps-3">
              Статьи
            </h2>
            <SportPosts posts={sportArticles} isStream={false} hoverEffect />
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-success ps-3">
              Трансляции
            </h2>
            <SportPosts posts={sportStreams} isStream={true} hoverEffect />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
