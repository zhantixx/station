"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (register(username, email, password)) {
      router.push("/profile");
    } else {
      setError("Имя пользователя или Email уже заняты.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#e3f2fd" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg p-4" style={{ borderRadius: "12px" }}>
              <Card.Body>
                {/* Логотип и название */}
                <div className="text-center mb-3">
                  <img src="/image/logo footer.png" alt="Station Logo" style={{ width: "60px", marginBottom: "10px" }} />
                  <h2 className="text-primary fw-bold">Station</h2>
                  <p className="text-muted">Присоединяйтесь и получайте свежие новости</p>
                </div>

                {/* Ошибка */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Форма */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Введите имя пользователя"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Введите email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Введите пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100" style={{ backgroundColor: "#ff9800", borderColor: "#ff9800" }}>
                    Зарегистрироваться
                  </Button>
                </Form>

                {/* Ссылка на вход */}
                <p className="mt-3 text-center text-muted">
                  Уже есть аккаунт?{" "}
                  <span
                    className="text-warning fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/auth")}
                  >
                    Войти
                  </span>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
