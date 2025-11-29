"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import TechPosts from "@/components/TechPosts.jsx";
import { techArticles, techStreams } from "../data/technologies";
import { Container } from "react-bootstrap";

export default function TechnologiesPage() {
  return (
    <>
      <Header activePage="technologies" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1 className="display-4 fw-bold text-center mb-5 text-info" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}>
            Технологии
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-info ps-3">
              Статьи
            </h2>
            <TechPosts posts={techArticles} isStream={false} hoverEffect />
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-success ps-3">
              Трансляции
            </h2>
            <TechPosts posts={techStreams} isStream={true} hoverEffect />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}