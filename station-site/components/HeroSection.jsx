"use client";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function HeroSection({ metaInfo, mainTitle, thumbnails, backgroundImage }) {
  return (
    <section
  style={{
    position: "relative",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "40px 20px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(2px)",
      zIndex: 1,
    }}
  ></div>

  <Container style={{ position: "relative", zIndex: 2 }}>
    <p style={{ fontSize: "1rem", color: "#f0f0f0", marginBottom: "8px" }}>
      {metaInfo}
    </p>
    <h1 style={{ fontSize: "2.6rem", color: "#fff", fontWeight: 700, textShadow: "0 3px 8px rgba(0,0,0,0.6)" }}>
      {mainTitle}
    </h1>

    <Row className="g-3 mt-3">
      {thumbnails.map((thumb, i) => (
        <Col key={i} xs={12} md={4}>
          <Card
            className="shadow-sm"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.45)",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <Card.Img 
              src={thumb.img} 
              alt={thumb.title} 
              style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }}
            />
            <Card.Body style={{ padding: "10px" }}>
              <Card.Text style={{ fontSize: "0.95rem", color: "#f8f8f8", fontWeight: 500 }}>
                {thumb.title}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</section>

  );
}
