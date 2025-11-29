"use client";

import React from "react";
import { Card, Container } from "react-bootstrap";

export default function RecommendationsSection({ recommendations }) {
  return (
    <Container className="my-5">
      <h2 className="text-primary mb-3">Рекомендаций для вас</h2>

      <div
        className="d-flex flex-row gap-3 overflow-auto pb-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {recommendations.map((rec, i) => (
          <a
            key={i}
            href="#"
            className="text-decoration-none text-dark"
            style={{ minWidth: "280px", flexShrink: 0 }}
          >
            <Card
              className="h-100 shadow-sm border-0"
              style={{
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%", 
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Card.Img
                  src={`/image/${rec.img}`}
                  alt={rec.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Card.Body className="p-2">
                <Card.Title className="h6 mb-1">{rec.title}</Card.Title>
                <Card.Text
                  className="text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  {rec.meta}
                </Card.Text>
              </Card.Body>
            </Card>
          </a>
        ))}
      </div>
    </Container>
  );
}
