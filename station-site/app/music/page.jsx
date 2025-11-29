"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import MusicPosts from "@/components/MusicPosts.jsx";
import { musicArticles, musicStreams } from "../data/music";
import { Container } from "react-bootstrap";

export default function MusicPage() {
  return (
    <>
      <Header activePage="music" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1 className="display-4 fw-bold text-center mb-5 text-pink" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}>
            Музыка
          </h1>

          {/* Статьи */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-pink ps-3">
              Статьи
            </h2>
            <MusicPosts posts={musicArticles} isStream={false} hoverEffect />
          </section>

          {/* Трансляции */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-success ps-3">
              Трансляции
            </h2>
            <MusicPosts posts={musicStreams} isStream={true} hoverEffect />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}