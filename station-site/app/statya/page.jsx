"use client";

import React, { useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostsSection from "../../components/PostsSection";
import SmallArticleCard from "../../components/SmallArticleCard";
import Pagination from "../../components/Pagination";
import { articlesData } from "../data/articles";
import { Container, Row, Col } from "react-bootstrap";

const ARTICLES_PER_PAGE = 5;

const getAllArticles = (data) => {
  const all = [];
  for (const categoryKey in data) {
    if (data[categoryKey].articles) {
      all.push(...data[categoryKey].articles);
    }
  }
  return all.sort((a, b) => b.id - a.id);
};

export default function StatyaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const allArticles = useMemo(() => getAllArticles(articlesData), []);

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
        <Row className="g-4">
          <Col lg={8}>
            <div className="mb-4 pb-2 border-bottom">
              <h1 className="fw-bold">Статьи</h1>
              <p className="text-muted mt-1" style={{ fontSize: "0.95rem" }}>
                Лучшие аналитические материалы, интервью, исследования и авторские колонки.
              </p>
            </div>

            <PostsSection posts={articlesToShow} size="small" variant="default" />
            
            <div className="mt-5 d-flex justify-content-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className="mb-5">
              <h3 className="fw-bold h5 mb-3 border-start border-3 border-primary ps-2">
                Популярное за неделю
              </h3>
              <div className="d-flex flex-column gap-3">
                {popularWeek.map((item) => (
                  <SmallArticleCard
                    key={item.id}
                    img={item.heroImage || item.img}
                    category={item.category}
                    time={item.time}
                    title={item.title}
                    href={`/statya/${item.id}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="fw-bold h5 mb-3 border-start border-3 border-warning ps-2">
                Популярное за месяц
              </h3>
              <div className="d-flex flex-column gap-3">
                {popularMonth.map((item) => (
                  <SmallArticleCard
                    key={item.id}
                    img={item.heroImage || item.img}
                    category={item.category}
                    time={item.time}
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