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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <Card className="shadow p-4">
              <Card.Body className="text-center">
                <Card.Title className="mb-4 text-secondary" style={{ fontSize: '2rem' }}>
                  Регистрация
                </Card.Title>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <Form.Control
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control
                    type="password"
                    placeholder="Пароль (мин. 6 символов)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="secondary" className="mt-2 fw-bold">
                    Зарегистрироваться
                  </Button>
                </Form>

                <p className="mt-3 text-muted">
                  Уже есть аккаунт? <a href="/" className="text-secondary fw-bold">Войти</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
