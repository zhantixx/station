"use client";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import FinancePosts from "@/components/FinancePosts.jsx";
import { financeArticles, financeStreams } from "../data/finance.js";
import { Container } from "react-bootstrap";

export default function FinancePage() {
  return (
    <>
      <Header activePage="finance" />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <h1
            className="display-4 fw-bold text-center mb-5 text-success"
            style={{
              textShadow: "0 0 20px rgba(0, 128, 0, 0.4)",
            }}
          >
            Финансы
          </h1>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-success ps-3">
              Статьи
            </h2>
            <FinancePosts posts={financeArticles} isStream={false} />
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-4 text-secondary border-start border-4 border-danger ps-3">
              Прямые трансляции
            </h2>
            <FinancePosts posts={financeStreams} isStream={true} />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}