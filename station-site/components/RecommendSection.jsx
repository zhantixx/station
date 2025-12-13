"use client";

import React from "react";
import Link from "next/link";
import { Container, Card, Badge } from "react-bootstrap";

const CATEGORY_STYLES = {
  "Политика": "danger",
  "Музыка": "info",
  "Игры": "primary",
  "Финансы": "warning",
  "Спорт": "success",
  "Путешествия": "info",
  "Технологии": "secondary",
  "Культура": "secondary",
  "Наука": "dark",
  "default": "primary"
};

export default function RecommendationsSection({ initialRecommendations = [] }) {
  if (initialRecommendations.length === 0) {
    return null;
  }

  return (
    <Container className="my-5">
      <h2 className="display-5 fw-bold text-primary mb-5 text-center">
        Рекомендации для вас
      </h2>

      <div
        className="d-flex gap-4 overflow-auto pb-3"
        style={{
          scrollbarWidth: "thin", 
          msOverflowStyle: "none", 
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {initialRecommendations.map((post) => {
          const imageSrc = post.image || "/image/placeholder.jpg";
          const category = post.category || null; 
          const categoryBgClass = CATEGORY_STYLES[category] || CATEGORY_STYLES.default;

          const formattedDate = post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("ru-RU")
            : "Недавно";

          return (
            <Link
              key={post.id}
              href={`/statya/${post.id}`}
              className="text-decoration-none text-dark d-block"
              style={{ minWidth: "380px", flexShrink: 0 }} 
            >
              <Card
                className="shadow-sm border-0 rounded-4 d-flex flex-row align-items-center p-3 h-100"
                style={{
                  width: "380px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 0.75rem 1.5rem rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0.25rem 0.8rem rgba(0,0,0,0.08)";
                }}
              >
                <div
                  className="overflow-hidden rounded-3 flex-shrink-0"
                  style={{ width: "130px", height: "100px" }}
                >
                  <img
                    src={imageSrc}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.35s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    loading="lazy"
                  />
                </div>

                {/* Текстовая часть справа */}
                <Card.Body className="ms-3 p-0 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    {category && (
                      <Badge
                        bg={categoryBgClass}
                        className="text-uppercase fw-bold"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {category}
                      </Badge>
                    )}
                    <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {formattedDate}
                    </small>
                  </div>

                  <div
                    className="fw-semibold text-dark mb-2"
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: "1.35",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.title}
                  </div>

                  {post.meta && (
                    <div
                      className="text-muted"
                      style={{
                        fontSize: "0.88rem",
                        lineHeight: "1.45",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.meta}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}