"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import GamePosts from "@/components/GamePosts.jsx";
import { gameArticles, gameStreams } from "../data/games.js";
import { Container } from "react-bootstrap";

export default function GamesPage() {
  return (
    <>
      <Header activePage="games" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1
            className="display-4 fw-bold text-center mb-5"
            style={{
              background: "linear-gradient(90deg, #8000FF, #FF0090)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(128,0,255,0.5)",
            }}
          >
            Игры
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-purple ps-3">
              Статьи
            </h2>
            <GamePosts posts={gameArticles} isStream={false} />
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-danger ps-3">
              Прямые трансляции
            </h2>
            <GamePosts posts={gameStreams} isStream={true} />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}