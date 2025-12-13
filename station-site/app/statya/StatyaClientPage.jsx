"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostsSection from "../../components/PostsSection";
import SmallArticleCard from "../../components/SmallArticleCard";
import Pagination from "../../components/Pagination";
import { Container, Row, Col } from "react-bootstrap";

const ARTICLES_PER_PAGE = 6; 

export default function StatyaClientPage({ allArticles = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const articlesToShow = allArticles.slice(startIndex, endIndex);

  const popularWeek = allArticles.slice(0, 4);
  const popularMonth = allArticles.slice(4, 8);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <Container className="my-5">
        <Row className="g-5">
          <Col lg={8}>
            <div className="mb-5 pb-3 border-bottom border-dark">
              <h1 className="display-5 fw-bold text-dark">Статьи</h1>
              <p className="text-muted lead mt-2">
                Лучшие аналитические материалы, интервью, исследования и авторские колонки.
              </p>
            </div>

            <PostsSection posts={articlesToShow} size="medium" variant="default" />

            {totalPages > 1 && (
              <div className="mt-5 d-flex justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </Col>

          {/* === Сайдбар — популярное === */}
          <Col lg={4}>
            {/* Популярное за неделю */}
            <div className="mb-5">
              <h3 className="fw-bold h5 mb-4 position-relative ps-3">
                <span
                  className="position-absolute start-0 top-0 bottom-0 bg-primary"
                  style={{ width: "4px" }}
                ></span>
                <span className="ps-2">Популярное за неделю</span>
              </h3>

              <div className="d-flex flex-column gap-4">
                {popularWeek.map((item) => (
                  <SmallArticleCard
                    key={item.id}
                    img={item.heroImage || item.img || "/image/placeholder.jpg"}
                    category={item.category}
                    time={item.time || "Недавно"}
                    title={item.title}
                    href={`/statya/${item.id}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="fw-bold h5 mb-4 position-relative ps-3">
                <span
                  className="position-absolute start-0 top-0 bottom-0 bg-warning"
                  style={{ width: "4px" }}
                ></span>
                <span className="ps-2">Популярное за месяц</span>
              </h3>

              <div className="d-flex flex-column gap-4">
                {popularMonth.map((item) => (
                  <SmallArticleCard
                    key={item.id}
                    img={item.heroImage || item.img || "/image/placeholder.jpg"}
                    category={item.category}
                    time={item.time || "Недавно"}
                    title={item.title}
                    href={`/statya/${item.id}`}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}