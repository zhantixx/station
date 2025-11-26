"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import SportPosts from "@/components/SportPosts.jsx";
import { sportArticles, sportStreams } from "../data/sports";
import { Container } from "react-bootstrap";

export default function SportsPage() {
  return (
    <>
      <Header activePage="sports" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          {/* Основной заголовок */}
          <h1 className="display-5 fw-bold mb-5">Спорт</h1>

          {/* Статьи */}
          <SportPosts posts={sportArticles} isStream={false} />

          {/* Трансляции */}
          <h2 className="h3 fw-bold mt-5 mb-4">Трансляции</h2>
          <SportPosts posts={sportStreams} isStream={true} />
        </Container>
      </main>

      <Footer />
    </>
  );
}
