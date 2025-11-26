"use client";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function HeroSection({ metaInfo, mainTitle, thumbnails, backgroundImage }) {
  return (
    <section
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: "40px auto",
        maxWidth: "1100px",
        padding: "40px 20px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(2px)",
          borderRadius: "16px",
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <Container style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: "0.95rem", color: "#eeeeee" }}>{metaInfo}</p>
        <h1
          style={{
            fontSize: "2.4rem",
            color: "#fff",
            fontWeight: 700,
            textShadow: "0 2px 5px rgba(0,0,0,0.5)",
          }}
        >
          {mainTitle}
        </h1>

        <Row className="mt-3 g-3">
          {thumbnails.map((thumb, i) => (
            <Col
              key={i}
              xs={12}
              md={thumb.main ? 12 : 4}
              className={thumb.main ? "mb-3" : ""}
            >
              <Card
                className="overflow-hidden"
                style={{
                  borderRadius: thumb.main ? "12px" : "10px",
                  border: "none",
                  backgroundColor: thumb.main ? "transparent" : "rgba(0,0,0,0.4)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Card.Img
                  src={thumb.img}
                  alt={thumb.title}
                  style={{
                    width: "100%",
                    borderRadius: thumb.main ? "12px" : "10px",
                  }}
                />
                {!thumb.main && (
                  <Card.Body style={{ padding: "8px 12px" }}>
                    <Card.Text
                      style={{
                        fontSize: "0.98rem",
                        color: "#f5f5f5",
                        textAlign: "center",
                      }}
                    >
                      {thumb.title}
                    </Card.Text>
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
