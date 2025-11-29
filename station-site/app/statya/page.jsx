"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import SmallArticleCard from "../../components/SmallArticleCard";
import Pagination from "../../components/Pagination";
import { articles } from "../data/articles";
import { Container, Row, Col } from "react-bootstrap";

export default function StatyaPage() {
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

            <Row className="g-4">
              {articles.map((article) => (
                <Col key={article.id} xs={12}>
                  <Link href={`/statya/${article.id}`} className="text-decoration-none">
                    <ArticleCard
                      img={article.heroImage || article.img}
                      title={article.title}
                      excerpt={article.excerpt}
                      author={article.author.name}
                      date={article.time}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
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
                    img={item.img}
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
                    img={item.img}
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

      <Pagination />
      <Footer />
    </>
  );
}
