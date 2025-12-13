"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import Link from "next/link";
import EditorApplicationModal from "../../components/EditorApplicationModal";

const APPLICATION_STATUS_KEY = "editorApplicationStatus";

export default function ProfilePage() {
    const { currentUser, isAuthenticated, logout, isEditor } = useAuth();
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) router.push("/");
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (currentUser) {
            const storedStatus = localStorage.getItem(`${APPLICATION_STATUS_KEY}_${currentUser.username}`);
            if (storedStatus) {
                setApplicationStatus(storedStatus);
            }
        }
    }, [currentUser]);

    if (!isAuthenticated || !currentUser) return null;

    const stats = {
        articlesRead: 0,
        comments: 0,
        registrationDate: "01.01.2025"
    };

    const handleApplicationSubmit = (formData) => {
        console.log("Заявка на редактора отправлена:", formData);

        setApplicationStatus('pending');
        localStorage.setItem(`${APPLICATION_STATUS_KEY}_${currentUser.username}`, 'pending');
        setShowModal(false);

        setTimeout(() => {
            setApplicationStatus('approved');
            localStorage.setItem(`${APPLICATION_STATUS_KEY}_${currentUser.username}`, 'approved');

            alert("Поздравляем! Ваша заявка одобрена. Пожалуйста, перезайдите, чтобы получить доступ редактора.");
            logout();
        }, 5000);
    };

    const renderEditorButton = () => {
        if (isEditor()) {
            return (
                <Button variant="success" className="rounded-pill py-2 fw-bold w-100" disabled>
                    Вы — Редактор
                </Button>
            );
        }

        if (applicationStatus === 'pending') {
            return (
                <Button variant="warning" className="rounded-pill py-2 fw-bold w-100" disabled>
                    Заявка на Редактора на рассмотрении...
                </Button>
            );
        }

        if (applicationStatus === 'approved') {
            return (
                <Button variant="info" className="rounded-pill py-2 fw-bold w-100" onClick={logout}>
                    Заявка одобрена! Нажмите для перелогина
                </Button>
            );
        }

        return (
            <Button
                variant="primary"
                className="rounded-pill py-2 fw-bold w-100"
                onClick={() => setShowModal(true)}
            >
                Стать Редактором
            </Button>
        );
    };

    return (
        <>
            <Header />

            <div className="d-flex justify-content-center align-items-start" style={{ backgroundColor: '#f0f2f5', padding: '60px 0', minHeight: 'calc(100vh - 120px)' }}>
                <Container className="my-5">
                    <Row className="justify-content-center g-5">
                        <Col lg={4}>
                            <Card className="border-0 shadow-lg" style={{ borderRadius: "25px" }}>
                                
                                <Card.Body className="p-5 text-center d-flex flex-column align-items-center">
                                    <img
                                        src={currentUser.avatar || "/image/ava.png"}
                                        alt="Аватар"
                                        width={130}
                                        height={130}
                                        className="rounded-circle shadow-sm border border-5 border-primary mb-4"
                                    />
                                    <h2 className="fw-bolder mb-1 text-dark" style={{ fontSize: '1.8rem' }}>
                                        {currentUser.username}
                                    </h2>
                                    <p className="text-secondary mb-4">{currentUser.email}</p>

                                    <div className="d-grid gap-3 mb-4 w-100" style={{ maxWidth: '280px' }}>
                                        {renderEditorButton()}
                                    </div>

                                    <div className="d-grid gap-3 w-100" style={{ maxWidth: '280px' }}>
                                        <Link
                                            href="/profile/favorites"
                                            className="btn btn-outline-dark rounded-pill py-2 fw-semibold"
                                        >
                                            Избранное ({currentUser.favorites?.length || 0})
                                        </Link>
                                        <Link
                                            href="/profile/settings"
                                            className="btn btn-outline-secondary rounded-pill py-2"
                                        >
                                            Настройки
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

                        <Col lg={8}>
                            <Card className="border-0 shadow-lg h-100" style={{ borderRadius: "25px" }}>
                                <Card.Body className="p-5">
                                    <h3 className="fw-bolder mb-4 border-bottom pb-3 text-primary">
                                        Статистика
                                    </h3>

                                    <Row className="mb-5 text-center g-4">
                                        <Col md={4}>
                                            <Card className="border-0 shadow-sm" style={{ backgroundColor: '#e3f2fd' }}>
                                                <Card.Body>
                                                    <h4 className="display-5 fw-bolder text-primary">{currentUser.favorites?.length || 0}</h4>
                                                    <p className="mb-0 text-muted">В избранном</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="border-0 shadow-sm" style={{ backgroundColor: '#e8f5e9' }}>
                                                <Card.Body>
                                                    <h4 className="display-5 fw-bolder text-success">{stats.articlesRead}</h4>
                                                    <p className="mb-0 text-muted">Прочитано статей</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="border-0 shadow-sm" style={{ backgroundColor: '#fff3e0' }}>
                                                <Card.Body>
                                                    <h4 className="display-5 fw-bolder text-warning">{stats.comments}</h4>
                                                    <p className="mb-0 text-muted">Комментариев</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <h3 className="fw-bolder mb-3 border-bottom pb-3 text-dark">
                                        Детали Аккаунта
                                    </h3>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                                            <span className="text-secondary fw-semibold">Имя пользователя:</span>
                                            <strong className="text-dark">{currentUser.username}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                                            <span className="text-secondary fw-semibold">Email:</span>
                                            <strong className="text-dark">{currentUser.email}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                                            <span className="text-secondary fw-semibold">Роль:</span>
                                            <strong className={`text-capitalize fw-bold ${isEditor() ? 'text-primary' : 'text-success'}`}>{currentUser.role || 'reader'}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3">
                                            <span className="text-secondary fw-semibold">Дата регистрации:</span>
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

            <EditorApplicationModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleApplicationSubmit}
                username={currentUser.username}
                email={currentUser.email}
            />
        </>
    );
}