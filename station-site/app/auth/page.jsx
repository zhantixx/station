"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError("");
        setIsLoading(true); 

        try {
            const success = await login(username, password);

            if (success) {
                router.push("/profile");
            } else {
                setError("Неверное имя пользователя или пароль.");
            }
        } catch (err) {
            console.error("Ошибка входа:", err);
            setError("Произошла ошибка сервера. Попробуйте позже.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#e3f2fd" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-lg p-4" style={{ borderRadius: "12px" }}>
                            <Card.Body>
                                <div className="text-center mb-3">
                                    <img src="/image/logo footer.png" alt="Station Logo" style={{ width: "60px", marginBottom: "10px" }} />
                                    <h2 className="text-primary fw-bold">Station</h2>
                                    <p className="text-muted">Будьте в курсе последних событий</p>
                                </div>

                                {error && <Alert variant="danger">{error}</Alert>}

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
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Введите пароль"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        type="submit" 
                                        className="w-100" 
                                        style={{ backgroundColor: "#ff9800", borderColor: "#ff9800" }}
                                        disabled={isLoading} 
                                    >
                                        {isLoading ? "Вход..." : "Войти"}
                                    </Button>
                                </Form>

                                <p className="mt-3 text-center text-muted">
                                    Нет аккаунта?{" "}
                                    <span
                                        className="text-warning fw-bold"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => router.push("/register")}
                                    >
                                        Зарегистрироваться
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