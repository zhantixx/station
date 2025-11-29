"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      className="pt-5 pb-3"
      style={{
        backgroundColor: "white",
        borderTop: "1px solid #f0f0f0",
      }}
    >
      <Container style={{ maxWidth: "1200px" }}>
        <Row className="gy-4">

          <Col xs={12} md={6} lg={4}>
            <a
              href="/"
              className="d-flex align-items-center mb-3 text-decoration-none"
              style={{
                color: "#1e88e5",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <img
                src="/image/logo footer.png"
                alt="Лого Station"
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                }}
              />
              <span>Station</span>
            </a>

            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.8",
                color: "#757575",
                marginBottom: "20px",
                maxWidth: "300px",
              }}
            >
              Station — актуальные новости и аналитика. Мы помогаем быть в курсе главных событий.
            </p>
          </Col>

          <Col xs={6} md={3} lg={2}>
            <h5
              className="mb-3"
              style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
            >
              Компания
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/about"
                  style={{
                    textDecoration: "none",
                    color: "#757575",
                    fontSize: "14px",
                  }}
                  className="footer-link"
                >
                  О нас
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#757575",
                    fontSize: "14px",
                  }}
                  className="footer-link"
                >
                  Политика конфиденциальности
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#757575",
                    fontSize: "14px",
                  }}
                  className="footer-link"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={3} lg={2}>
            <h5
              className="mb-3"
              style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
            >
              Социальные сети
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#757575",
                    fontSize: "14px",
                  }}
                  className="footer-link"
                >
                  Facebook
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#757575",
                    fontSize: "14px",
                  }}
                  className="footer-link"
                >
                  Instagram
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#757575",
                    fontSize: "14px",
                  }}
                  className="footer-link"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <div
          style={{
            height: "1px",
            backgroundColor: "#e0e0e0",
            marginTop: "30px",
            marginBottom: "0",
          }}
        ></div>
      </Container>
    </footer>
  );
}
