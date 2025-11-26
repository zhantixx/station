"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import SmallArticleCard from "../../components/SmallArticleCard";
import Pagination from "../../components/Pagination";
import { articles, popularWeek, popularMonth } from "../data/articles";
import { Container, Row, Col } from "react-bootstrap";

export default function StatyaPage() {
  return (
    <>
      <Header />

      <Container className="my-5">
        <Row>
          {/* Основной контент */}
          <Col lg={8} className="mb-4">
            <h1 className="mb-4">Статьи</h1>
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

          {/* Сайдбар */}
          <Col lg={4}>
            <div className="mb-4">
              <h3 className="h5 mb-3">Популярные за неделю</h3>
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

            <div>
              <h3 className="h5 mb-3">Популярное за месяц</h3>
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
