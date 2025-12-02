"use client";

import React from "react";
import Link from "next/link"; 
import { Container, Row, Col, Card } from "react-bootstrap";

export default function HeroSection({ metaInfo, mainTitle, thumbnails, backgroundImage }) {
  return (
    <Link 
        href="/weather" 
        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
    >
        <section
          style={{
            position: "relative",
            width: "100vw",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "10px 20px",
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
            <p 
                    style={{ 
                        fontSize: "1rem", 
                        color: "#f0f0f0", 
                        marginBottom: "2px",
                        marginLeft: 0,
                        paddingLeft: 0, 
                    }}>
              {metaInfo}
            </p>
            <h1 
                    style={{ 
                        fontSize: "2.6rem", 
                        color: "#fff", 
                        fontWeight: 700, 
                        textShadow: "0 3px 8px rgba(0,0,0,0.6)", 
                        marginBottom: "5px",
                        marginLeft: 0,
                        paddingLeft: 0, 
                    }}>
              {mainTitle}
            </h1>

            <Row className="g-3 mt-1">
              {thumbnails.map((thumb, i) => (
                <Col key={i} xs={12} md={4}>
                  <Card
                    className="shadow-sm"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "none",
                      backgroundColor: "rgba(0,0,0,0.45)", // ВОССТАНОВЛЕН ПОЛУПРОЗРАЧНЫЙ ЧЕРНЫЙ ФОН
                      transition: "transform 0.3s",
                      cursor: "pointer",
                      position: "relative"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <Card.Img 
                      src={thumb.img} 
                      alt={thumb.title} 
                      style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }}
                    />
                    
                    <Card.Body 
                        style={{ 
                            position: 'absolute', 
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "10px 15px", 
                            // Градиент больше не нужен, т.к. сам фон карточки полупрозрачный
                            background: 'none', 
                        }}
                    >
                        <Card.Text 
                            style={{ 
                                fontSize: "0.95rem", 
                                color: "#f8f8f8", 
                                fontWeight: 500,
                                margin: 0 
                            }}
                        >
                            {thumb.title}
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
    </Link>

  );
}