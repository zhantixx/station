"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import GamePosts from "@/components/GamePosts.jsx";
import { gameArticles, gameStreams } from "../data/games";
import { Container } from "react-bootstrap";

export default function GamesPage() {
  return (
    <>
      <Header activePage="games" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1 className="display-4 fw-bold text-center mb-5 text-warning" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}>
            Игры
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-warning ps-3">
              Статьи
            </h2>
            <GamePosts posts={gameArticles} isStream={false} hoverEffect />
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-success ps-3">
              Трансляции
            </h2>
            <GamePosts posts={gameStreams} isStream={true} hoverEffect />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}