"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import GamePosts from "@/components/GamePosts.jsx";
import { articles } from "../data/articles.js";
import { Container } from "react-bootstrap";

export default function GamesPage() {

  // 🔥 Получаем только статьи категории "Игры"
  const gameArticles = articles.filter(a => a.category === "Игры");

  return (
    <>
      <Header activePage="games" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1 className="display-4 fw-bold text-center mb-5 text-warning">
            Игры
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-warning ps-3">
              Статьи
            </h2>

            {/* 🔥 передаем только игровые статьи */}
            <GamePosts posts={gameArticles} isStream={false} hoverEffect />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
