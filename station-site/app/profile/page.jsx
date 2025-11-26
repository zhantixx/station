"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Nav, Card, Button, ListGroup, Alert } from "react-bootstrap";

export default function ProfilePage() {
  const { currentUser, isAuthenticated, logout, removeFavorite } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (!isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <Card className="p-4 shadow-sm mb-4">
            <Card.Title>Основные данные</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Имя пользователя:</strong> {currentUser.username}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {currentUser.email}</ListGroup.Item>
              <ListGroup.Item><strong>Дата регистрации:</strong> 01.01.2024 (Имитация)</ListGroup.Item>
              <ListGroup.Item><strong>Статус:</strong> Активный пользователь</ListGroup.Item>
            </ListGroup>
            <Button variant="dark" className="mt-3" onClick={logout}>Выйти из аккаунта</Button>
          </Card>
        );
      case 'favorites':
        const favorites = currentUser.favorites || [];
        return (
          <Card className="p-4 shadow-sm mb-4">
            <Card.Title>Избранные новости ({favorites.length})</Card.Title>
            {favorites.length === 0 ? (
              <Alert variant="secondary">У вас пока нет избранных новостей.</Alert>
            ) : (
              <ListGroup variant="flush">
                {favorites.map(news => (
                  <ListGroup.Item key={news.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <a href={`/statya/${news.id}`} className="fw-bold text-decoration-none">{news.title}</a>
                      <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                        Категория: {news.category} | Дата: {news.date}
                      </div>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => removeFavorite(news.id)}>❌</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        );
      case 'settings':
        return (
          <Card className="p-4 shadow-sm mb-4">
            <Card.Title>Настройки аккаунта</Card.Title>
            <p className="text-muted">Здесь можно реализовать смену пароля, обновление email или настройку уведомлений (имитация).</p>
            <Button variant="primary">Изменить пароль</Button>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2>Личный кабинет</h2>
            <p>Добро пожаловать, <strong>{currentUser.username}</strong>! Управляйте вашим профилем и избранным контентом.</p>
          </Col>
        </Row>
        <Row>
          {/* Sidebar */}
          <Col xs={12} md={3} className="mb-4">
            <Nav variant="pills" className="flex-column gap-2">
              <Nav.Item>
                <Nav.Link active={activeTab === 'info'} onClick={() => setActiveTab('info')}>
                  👤 Информация о профиле
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>
                  ⭐ Избранные новости
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                  ⚙️ Настройки
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={logout} className="text-danger">
                  🚪 Выйти
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col xs={12} md={9}>
            {renderContent()}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
