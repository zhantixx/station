"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import MusicPosts from "@/components/MusicPosts.jsx";
import { musicArticles, musicStreams } from "../data/music.js";
import { Container } from "react-bootstrap";

export default function MusicPage() {
  return (
    <>
      <Header activePage="music" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1
            className="display-4 fw-bold text-center mb-5"
            style={{
              background: "linear-gradient(90deg, #FF1493, #FF69B4, #FFB6C1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(255,20,147,0.4)",
            }}
          >
            Музыка
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-pink ps-3">
              Статьи
            </h2>
            <MusicPosts posts={musicArticles} isStream={false} />
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-danger ps-3">
              Прямые трансляции
            </h2>
            <MusicPosts posts={musicStreams} isStream={true} />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}