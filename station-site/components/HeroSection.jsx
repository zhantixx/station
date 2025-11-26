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
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)"
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
          zIndex: 1
        }}
      ></div>

      {/* Content */}
      <Container style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: "0.95rem", color: "#eeeeee" }}>{metaInfo}</p>
        <h1 style={{
          fontSize: "2.4rem",
          color: "#fff",
          fontWeight: 700,
          textShadow: "0 2px 5px rgba(0,0,0,0.5)"
        }}>{mainTitle}</h1>

        <Row className="mt-3 g-3">
          {thumbnails.map((thumb, i) => (
            <Col key={i} xs={12} md={thumb.main ? 12 : 4}>
              <Card
                className={thumb.main ? "" : "bg-dark text-white"}
                style={{
                  borderRadius: thumb.main ? "12px" : "10px",
                  overflow: "hidden",
                  border: "none",
                  backgroundColor: thumb.main ? "transparent" : "rgba(0,0,0,0.4)"
                }}
              >
                <Card.Img 
                  src={thumb.img} 
                  alt={thumb.title} 
                  style={{ width: "100%", borderRadius: thumb.main ? "12px" : "10px" }}
                />
                {!thumb.main && (
                  <Card.Body>
                    <Card.Text style={{ fontSize: "0.98rem", color: "#f5f5f5" }}>
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
