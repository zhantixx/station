"use client";

import React from "react";
import Link from "next/link";
import { Container, Card } from "react-bootstrap";

const textClampStyle = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

export default function RecommendationsSection({ initialRecommendations = [] }) {
  if (initialRecommendations.length === 0) {
    return null;
  }

  return (
    <Container className="my-5">
      <h2 className="display-5 fw-bold text-primary mb-5 text-center">
        Рекомендации для вас
      </h2>

      <div className="d-flex gap-4 overflow-auto pb-4">
        {initialRecommendations.map((post) => {
          const imageSrc = post.image || "/image/placeholder.jpg";

          return (
            <Link
              key={post.id}
              href={`/statya/${post.id}`}
              className="text-decoration-none text-dark"
              style={{ minWidth: "400px", flexShrink: 0 }}
            >
              <Card
                className="border-0 shadow-sm"
                style={{
                  width: "400px",
                  height: "580px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#fff"
                }}
              >
                <div style={{ width: "100%", height: "300px", position: "relative" }}>
                  <img
                    src={imageSrc}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    loading="lazy"
                  />
                </div>

                <Card.Body className="p-4 d-flex flex-column" style={{ height: "280px" }}>
                  <Card.Title
                    className="fw-bold mb-3"
                    style={{ ...textClampStyle(3), fontSize: "1.4rem", lineHeight: "1.45" }}
                  >
                    {post.title}
                  </Card.Title>

                  <Card.Text
                    className="text-muted flex-grow-1 mb-3"
                    style={{ ...textClampStyle(3), fontSize: "1.05rem", lineHeight: "1.6" }}
                  >
                    {post.meta}
                  </Card.Text>

                  <div className="d-flex align-items-center mt-auto">
                    <div
                      className="me-3 rounded-circle bg-secondary flex-shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage: post.author.avatar ? `url(${post.author.avatar})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div>
                      <div className="fw-semibold small">{post.author.name}</div>
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString("ru-RU") : "Недавно"}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}