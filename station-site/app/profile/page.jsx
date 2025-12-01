"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import Link from "next/link";

export default function ProfilePage() {
    const { currentUser, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) router.push("/");
    }, [isAuthenticated, router]);

    if (!isAuthenticated || !currentUser) return null;
    
    // Добавим заглушки для статистики, так как их нет в currentUser
    const stats = {
        articlesRead: 47,
        comments: 18,
        registrationDate: "01.01.2025"
    };

    return (
        <>
            <Header />

            <div className="min-vh-100 bg-light py-5">
                <Container className="pt-4">
                    <h1 className="display-5 fw-bold mb-5 text-center text-dark">
                        Личный Кабинет
                    </h1>
                    
                    <Row className="g-4">
                        {/* 1. Левая колонка: Информация и Навигация */}
                        <Col lg={4}>
                            <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                                <Card.Body className="p-4 text-center">
                                    <img
                                        src={currentUser.avatar || "/image/default-avatar.png"}
                                        alt="Аватар"
                                        width={120}
                                        height={120}
                                        className="rounded-circle shadow-sm border border-4 border-primary mb-3"
                                    />
                                    <h2 className="fw-bold mb-1 text-dark">
                                        {currentUser.username}
                                    </h2>
                                    <p className="text-muted mb-4">{currentUser.email}</p>

                                    <div className="d-grid gap-3">
                                        <Link
                                            href="/profile/favorites"
                                            className="btn btn-outline-primary rounded-pill py-2 fw-semibold"
                                        >
                                            ⭐ Избранное ({currentUser.favorites?.length || 0})
                                        </Link>
                                        <Link
                                            href="/profile/settings"
                                            className="btn btn-outline-secondary rounded-pill py-2"
                                        >
                                            ⚙️ Настройки
                                        </Link>
                                    </div>
                                    
                                    <Button
                                        variant="danger"
                                        className="rounded-pill px-5 mt-4"
                                        onClick={logout}
                                    >
                                        Выйти
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 2. Правая колонка: Статистика и Основная информация */}
                        <Col lg={8}>
                            <Card className="border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
                                <Card.Body className="p-5">
                                    <h3 className="fw-bold mb-4 border-bottom pb-2 text-primary">
                                        Обзор Аккаунта
                                    </h3>
                                    
                                    <Row className="mb-5 text-center">
                                        <Col md={4} className="mb-3">
                                            <Card className="border-0 shadow-sm bg-primary text-white">
                                                <Card.Body>
                                                    <h4 className="display-6 fw-bold">{currentUser.favorites?.length || 0}</h4>
                                                    <p className="mb-0">В избранном</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Card className="border-0 shadow-sm bg-success text-white">
                                                <Card.Body>
                                                    <h4 className="display-6 fw-bold">{stats.articlesRead}</h4>
                                                    <p className="mb-0">Прочитано статей</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Card className="border-0 shadow-sm bg-info text-white">
                                                <Card.Body>
                                                    <h4 className="display-6 fw-bold">{stats.comments}</h4>
                                                    <p className="mb-0">Комментариев</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <h4 className="fw-bold mb-3 border-bottom pb-2 text-dark">
                                        Детали Профиля
                                    </h4>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3">
                                            <span className="text-muted">Имя пользователя:</span>
                                            <strong className="text-dark">{currentUser.username}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3">
                                            <span className="text-muted">Email:</span>
                                            <strong className="text-dark">{currentUser.email}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3">
                                            <span className="text-muted">Дата регистрации:</span>
                                            <strong className="text-dark">{stats.registrationDate}</strong>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </>
    );
}