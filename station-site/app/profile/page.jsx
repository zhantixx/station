"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Nav, Card, Button, ListGroup, Alert, Badge, Image, ProgressBar } from "react-bootstrap";

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
          <Card className="p-4 shadow-sm mb-4 border-0 rounded-4">
            <Card.Title className="mb-3">Основные данные</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Имя пользователя:</span>
                <Badge bg="secondary">{currentUser.username}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Email:</span>
                <Badge bg="secondary">{currentUser.email}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Дата регистрации:</span>
                <Badge bg="secondary">01.01.2024</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Статус:</span>
                <Badge bg="success">Активный</Badge>
              </ListGroup.Item>
            </ListGroup>

            <Card className="mt-4 p-3 border-0 bg-light rounded-3">
              <Card.Subtitle className="mb-2">Статистика активности</Card.Subtitle>
              <div className="mb-2">
                <span>Прочитано статей: 35</span>
                <ProgressBar now={70} label="70%" />
              </div>
              <div className="mb-2">
                <span>Комментарии оставлено: 12</span>
                <ProgressBar now={50} label="50%" variant="info" />
              </div>
            </Card>

            <Button variant="danger" className="mt-4 w-100" onClick={logout}>Выйти из аккаунта</Button>
          </Card>
        );

      case 'favorites':
        const favorites = currentUser.favorites || [];
        return (
          <Card className="p-4 shadow-sm mb-4 border-0 rounded-4">
            <Card.Title className="mb-3">Избранные новости <Badge bg="primary">{favorites.length}</Badge></Card.Title>
            {favorites.length === 0 ? (
              <Alert variant="secondary">У вас пока нет избранных новостей.</Alert>
            ) : (
              <ListGroup variant="flush">
                {favorites.map(news => (
                  <ListGroup.Item key={news.id} className="d-flex justify-content-between align-items-center py-3">
                    <div>
                      <a href={`/statya/${news.id}`} className="fw-semibold text-decoration-none text-dark">{news.title}</a>
                      <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                        {news.category} | {news.date}
                      </div>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFavorite(news.id)}
                      className="d-flex align-items-center justify-content-center"
                    >
                      Удалить
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        );

      case 'settings':
        return (
          <Card className="p-4 shadow-sm mb-4 border-0 rounded-4">
            <Card.Title className="mb-3">Настройки аккаунта</Card.Title>
            <p className="text-muted mb-3">
              Здесь можно изменить пароль, обновить email или настроить уведомления.
            </p>
            <Button variant="primary" className="me-2">Изменить пароль</Button>
            <Button variant="secondary">Обновить email</Button>
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
            <h2 className="fw-bold">Личный кабинет</h2>
            <p className="text-muted">
              Добро пожаловать, <strong>{currentUser.username}</strong>! Управляйте вашим профилем и избранным контентом.
            </p>
          </Col>
        </Row>

        <Row>
          {/* Sidebar */}
          <Col xs={12} md={3} className="mb-4">
            <Card className="p-3 shadow-sm rounded-4 text-center mb-4 border-0">
              {currentUser.avatar ? (
                <Image src={currentUser.avatar} roundedCircle width={100} height={100} className="mb-3 border border-secondary" />
              ) : (
                <div className="bg-secondary rounded-circle mx-auto mb-3" style={{ width: 100, height: 100 }}></div>
              )}
              <Card.Title className="mb-1">{currentUser.username}</Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: '0.85rem' }}>Активный пользователь</Card.Text>
            </Card>

            <Nav variant="pills" className="flex-column gap-2">
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'info'}
                  onClick={() => setActiveTab('info')}
                  className="d-flex align-items-center gap-2 py-2 rounded-3"
                >
                  Информация
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'favorites'}
                  onClick={() => setActiveTab('favorites')}
                  className="d-flex align-items-center gap-2 py-2 rounded-3"
                >
                  Избранное
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'settings'}
                  onClick={() => setActiveTab('settings')}
                  className="d-flex align-items-center gap-2 py-2 rounded-3"
                >
                  Настройки
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={logout} className="text-danger d-flex align-items-center gap-2 py-2 rounded-3">
                  Выйти
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
