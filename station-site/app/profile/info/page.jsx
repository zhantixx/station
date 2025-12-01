"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../lib/AuthContext";
import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap";
import Link from "next/link";

export default function ProfileInfoPage() {
    const { currentUser, logout } = useAuth();
    
    const stats = {
        registrationDate: "1 января 2025",
        articlesRead: 47,
        comments: 18,
    };

    return (
        <>
            <Header />

            <Container className="py-5">
                <Link href="/profile" className="text-primary mb-4 d-inline-block fw-semibold text-decoration-none hover-dark transition-all">
                    ← Вернуться в профиль
                </Link>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-5 border-bottom pb-4">
                                    <img
                                        src={currentUser.avatar || "/image/default-avatar.png"}
                                        alt="Аватар"
                                        width={120}
                                        height={120}
                                        className="rounded-circle shadow border border-4 border-primary"
                                    />
                                    <h2 className="mt-4 fw-bold">{currentUser.username}</h2>
                                    <Badge bg="success" className="px-4 py-2 fs-6">Активный пользователь</Badge>
                                </div>

                                <h4 className="fw-bold mb-4 text-primary">Основная информация</h4>
                                <ListGroup variant="flush" className="mb-5">
                                    <ListGroup.Item className="py-3 px-0 d-flex justify-content-between">
                                        <span className="text-muted">Email</span>
                                        <strong>{currentUser.email}</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="py-3 px-0 d-flex justify-content-between">
                                        <span className="text-muted">Дата регистрации</span>
                                        <strong>{stats.registrationDate}</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="py-3 px-0 d-flex justify-content-between">
                                        <span className="text-muted">Прочитано статей</span>
                                        <strong className="text-success">{stats.articlesRead}</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="py-3 px-0 d-flex justify-content-between">
                                        <span className="text-muted">Комментариев</span>
                                        <strong className="text-info">{stats.comments}</strong>
                                    </ListGroup.Item>
                                </ListGroup>

                                <Button
                                    onClick={logout}
                                    variant="outline-danger"
                                    className="w-100 rounded-pill py-3 fw-semibold mt-4"
                                >
                                    Выйти из аккаунта
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>

            <Footer />
        </>
    );
}