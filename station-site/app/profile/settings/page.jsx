"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Container, Card, Alert, Form, ListGroup, Button } from "react-bootstrap";
import Link from "next/link";

export default function SettingsPage() {
    
    const isReady = false;

    return (
        <>
            <Header />

            <Container className="py-5">
                <Link href="/profile" className="text-primary mb-4 d-inline-block fw-semibold text-decoration-none hover-dark transition-all">
                    ← Назад в профиль
                </Link>

                <h2 className="display-6 fw-bold mb-5 text-center text-dark">
                    Настройки Аккаунта
                </h2>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {isReady ? (
                            <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                                <Card.Body className="p-5">
                                    <h4 className="fw-bold mb-4 text-primary border-bottom pb-2">Общие</h4>
                                    
                                    <ListGroup variant="flush" className="mb-4">
                                        <ListGroup.Item className="py-3 px-0 d-flex justify-content-between align-items-center">
                                            <span>Сменить пароль</span>
                                            <Button variant="outline-secondary" size="sm" className="rounded-pill">Изменить</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="py-3 px-0 d-flex justify-content-between align-items-center">
                                            <span>Загрузить аватар</span>
                                            <Button variant="outline-secondary" size="sm" className="rounded-pill">Загрузить</Button>
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <h4 className="fw-bold mb-4 text-primary border-bottom pb-2 mt-5">Предпочтения</h4>
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="dark-mode-switch"
                                            label="Темная тема (Dark Mode)"
                                            className="mb-3 fs-5"
                                            disabled
                                        />
                                        <Form.Check 
                                            type="switch"
                                            id="notifications-switch"
                                            label="Получать уведомления по Email"
                                            className="mb-3 fs-5"
                                            defaultChecked
                                            disabled
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                                <Card.Body className="p-5 text-center">
                                    <div className="mb-4 opacity-75 text-warning">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                    </div>
                                    <h3 className="fw-bold mb-3">Раздел в разработке</h3>
                                    <p className="text-muted mb-4">
                                        Скоро здесь появится возможность сменить пароль, управлять аватаром и настроить уведомления.
                                    </p>
                                    <Alert variant="info" className="mb-0 rounded-pill">
                                        Ожидаемое обновление: Q1 2026
                                    </Alert>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </div>
            </Container>

            <Footer />
        </>
    );
}