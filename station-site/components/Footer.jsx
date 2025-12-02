"use client";

import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Link from "next/link"; 

const MODAL_CONTENT = {
    privacy: {
        title: "Политика конфиденциальности",
        body: (
            <>
                <p>
                    Сбор информации: Мы собираем личную информацию (имя, адрес электронной почты) 
                    только в том случае, если вы добровольно предоставляете ее, например, при регистрации или подписке на рассылку.
                </p>
                <p>
                    Использование данных: Ваши данные используются исключительно для персонализации 
                    контента, улучшения работы сайта и предоставления запрошенных вами услуг. 
                    Мы не продаем и не передаем вашу личную информацию третьим лицам без вашего согласия, 
                    за исключением случаев, предусмотренных законом.
                </p>
                <p>
                    Cookies: Мы используем файлы cookie для анализа трафика и улучшения функциональности сайта.
                </p>
            </>
        ),
    },
    contacts: {
        title: "Контакты",
        body: (
            <>
                <p>
                    Если у вас есть вопросы, предложения или вы хотите сообщить об ошибке, 
                    пожалуйста, свяжитесь с нами:
                </p>
                <ul>
                    <li>Электронная почта: info@station-news.com</li>
                    <li>Телефон: +7 (707) 123-45-67</li>
                    <li>Адрес: Город Н, Улица Примерная, 15</li>
                </ul>
                <p>
                    Мы стараемся отвечать на все запросы в течение 48 часов.
                </p>
            </>
        ),
    },
};

export default function Footer() {
    const [showModal, setShowModal] = useState(false);
    const [modalContentKey, setModalContentKey] = useState(null);

    const handleModalShow = (key) => {
        setModalContentKey(key);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModalContentKey(null);
    };

    const currentContent = MODAL_CONTENT[modalContentKey] || { title: "", body: null };

    const linkStyle = {
        textDecoration: "none",
        color: "#757575",
        fontSize: "14px",
        transition: "color 0.2s",
        cursor: "pointer",
    };

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
                        <Link
                            href="/"
                            className="d-flex align-items-center mb-3 text-decoration-none"
                            style={{
                                color: "#1565c0", 
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
                        </Link>

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
                                <Link 
                                    href="/about" 
                                    style={linkStyle} 
                                    className="footer-link"
                                >
                                    О нас
                                </Link>
                            </li>

                            <li className="mb-2">
                                <span onClick={() => handleModalShow('privacy')} style={linkStyle} className="footer-link">
                                    Политика конфиденциальности
                                </span>
                            </li>

                            <li className="mb-2">
                                <span onClick={() => handleModalShow('contacts')} style={linkStyle} className="footer-link">
                                    Контакты
                                </span>
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
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={linkStyle}
                                    className="footer-link"
                                >
                                    Facebook
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={linkStyle}
                                    className="footer-link"
                                >
                                    Instagram
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={linkStyle}
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

                <Row className="pt-3">
                    <Col className="text-center text-md-start">
                        <p style={{ fontSize: "12px", color: "#9e9e9e", margin: 0 }}>
                            &copy; {new Date().getFullYear()} Station. Все права защищены.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-primary">{currentContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentContent.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </footer>
    );
}