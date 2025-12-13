"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function HeroSection({
  metaInfo,
  mainTitle,
  thumbnails,
  backgroundImage,
  isMinimal = false,
  className,
}) {
  const minimalStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 240, 0.7) 100%)",
    backdropFilter: "blur(5px)",
    padding: "20px 20px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    boxShadow: "0 1px 10px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s",
    color: "#333",
    width: "100%",
    position: "relative",
  };

  const standardStyles = {
    position: "relative",
    width: "100%",
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "10px 20px 30px 20px",
    overflow: "hidden",
    color: "#fff",
  };

  const sectionStyles = isMinimal ? minimalStyles : standardStyles;

  const textStyles = isMinimal
    ? { color: "#333", textShadow: "none" }
    : { color: "#fff", textShadow: "0 3px 8px rgba(0,0,0,0.6)" };

  const renderOverlay = !isMinimal && backgroundImage;
  const renderThumbnails = !isMinimal && thumbnails && thumbnails.length > 0;

  return (
    <section style={sectionStyles} className={className}>
      <Link
        href="/weather"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          zIndex: 3,
          cursor: "pointer",
        }}
        aria-label={mainTitle || "Погода"}
      />

      {renderOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)",
            zIndex: 1,
          }}
        />
      )}

      <Container style={{ position: "relative", zIndex: 2 }}>
        {metaInfo && (
          <p
            style={{
              fontSize: "1rem",
              color: textStyles.color,
              marginBottom: "2px",
            }}
          >
            {metaInfo}
          </p>
        )}

        {mainTitle && (
          <h1
            style={{
              fontSize: "2.6rem",
              color: textStyles.color,
              fontWeight: 700,
              textShadow: textStyles.textShadow,
              marginBottom: "10px",
            }}
          >
            {mainTitle}
          </h1>
        )}

        {renderThumbnails && (
          <Row className="g-3 mt-1">
            {thumbnails.map((thumb, i) => (
              <Col key={i} xs={12} md={4}>
                <Card
                  className="shadow-sm"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={thumb.image}
                    alt={thumb.title}
                  />
                  <Card.Body>
                    <Card.Title>{thumb.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}
