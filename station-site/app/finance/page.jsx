"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import FinancePosts from "@/components/FinancePosts.jsx";
import { articles } from "../data/articles.js";
import { Container } from "react-bootstrap";

export default function FinancePage() {

  // 🔥 Фильтруем только финансовые статьи
  const financeArticles = articles.filter(a => a.category === "Финансы");

  return (
    <>
      <Header activePage="finance" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1 className="display-4 fw-bold text-center mb-5 text-success">
            Финансы
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-success ps-3">
              Статьи
            </h2>

            {/* 🔥 Передаем только статьи */}
            <FinancePosts posts={financeArticles} isStream={false} hoverEffect />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
