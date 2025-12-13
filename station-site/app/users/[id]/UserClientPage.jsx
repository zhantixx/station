"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import React from 'react';
import PostsSection from "@/components/PostsSection"; // ← Убедитесь, что путь правильный!

export default function UserClientPage({ 
  user, 
  publishedArticles, 
  favoriteArticles,
  userId  
}) {
  const router = useRouter();

  const isAuthor = user.role === 'author';
  const roleDisplay = isAuthor ? 'Редактор' : 'Пользователь';

  // Статистика из пропса (уже подготовлена на сервере)
  const stats = user.activityStats.reduce((acc, stat) => {
    if (stat.label.includes('Статей опубликовано')) acc.articles = stat.count;
    if (stat.label.includes('Комментариев')) acc.comments = stat.count;
    if (stat.label.includes('Понравилось')) acc.favorites = stat.count;
    return acc;
  }, { articles: 0, comments: 0, favorites: 0 });

  const goToArticlesPage = () => {
    router.push(`/users/${userId}/articles`);
  };

  return (
    <>
      <Header />

      <div className="d-flex justify-content-center align-items-start" style={{ backgroundColor: '#f0f2f5', padding: '60px 0', minHeight: 'calc(100vh - 120px)' }}>
        <Container className="my-5">
          <Row className="justify-content-center g-5">

            {/* Левая колонка — профиль */}
            <Col lg={4}>
              <Card className="border-0 shadow-lg" style={{ borderRadius: "25px" }}>
                <Card.Body className="p-5 text-center d-flex flex-column align-items-center">
                  <img
                    src={user.avatar}
                    alt="Аватар"
                    width={130}
                    height={130}
                    className="rounded-circle shadow-sm border border-5 border-primary mb-4"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = "/image/ava.png";
                    }}
                  />
                  <h2 className="fw-bolder mb-1 text-dark" style={{ fontSize: '1.8rem' }}>
                    {user.name || 'Пользователь'}
                  </h2>
                  <p className="text-secondary mb-4">{user.subtitle || 'Нет подзаголовка'}</p>

                  <div className="d-grid gap-3 mb-4 w-100" style={{ maxWidth: '280px' }}>
                    <Button variant="primary" className="rounded-pill py-2 fw-bold w-100" disabled>
                      {roleDisplay}
                    </Button>
                  </div>

                  {/* Кнопка перехода к полному списку статей/избранного */}
                  <div className="d-grid gap-3 mb-4 w-100" style={{ maxWidth: '280px' }}>
                    <Button
                      variant="outline-dark"
                      className="rounded-pill py-2 fw-semibold w-100"
                      onClick={goToArticlesPage}
                    >
                      {isAuthor 
                        ? `Все статьи (${publishedArticles.length})` 
                        : `Избранное (${favoriteArticles.length})`
                      }
                    </Button>
                  </div>

                  <Button
                    variant="outline-secondary"
                    className="rounded-pill px-5 mt-4"
                    onClick={() => router.back()}
                  >
                    Назад
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Правая колонка — контент */}
            <Col lg={8}>
              <Card className="border-0 shadow-lg h-100" style={{ borderRadius: "25px" }}>
                <Card.Body className="p-5">

                  {/* Статистика */}
                  <h3 className="fw-bolder mb-4 border-bottom pb-3 text-primary">
                    Статистика
                  </h3>

                  <Row className="mb-5 text-center g-4">
                    {isAuthor ? (
                      <>
                        <Col md={4}>
                          <Card className="border-0 shadow-sm" style={{ backgroundColor: '#e3f2fd' }}>
                            <Card.Body>
                              <h4 className="display-5 fw-bolder text-primary">{stats.articles}</h4>
                              <p className="mb-0 text-muted">Опубликовано</p>
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
                      </>
                    ) : (
                      <Col md={4}>
                        <Card className="border-0 shadow-sm" style={{ backgroundColor: '#e8f5e9' }}>
                          <Card.Body>
                            <h4 className="display-5 fw-bolder text-success">{stats.favorites}</h4>
                            <p className="mb-0 text-muted">В избранном</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                    <Col md={4}>
                      <Card className="border-0 shadow-sm" style={{ backgroundColor: '#f3e5f5' }}>
                        <Card.Body>
                          <h4 className="display-5 fw-bolder text-purple">—</h4>
                          <p className="mb-0 text-muted">Прочитано</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Детали аккаунта */}
                  <h3 className="fw-bolder mb-3 border-bottom pb-3 text-dark">
                    Детали Аккаунта
                  </h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                      <span className="text-secondary fw-semibold">Имя:</span>
                      <strong className="text-dark">{user.name || 'Не указано'}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                      <span className="text-secondary fw-semibold">Роль:</span>
                      <strong className={`fw-bold ${isAuthor ? 'text-primary' : 'text-success'}`}>
                        {roleDisplay}
                      </strong>
                    </ListGroup.Item>
                  </ListGroup>

                  {/* Обо мне */}
                  {(user.bio || (user.fullBio && user.fullBio.length > 0)) && (
                    <>
                      <h3 className="fw-bolder mb-4 mt-5 border-bottom pb-3 text-primary">
                        Обо мне
                      </h3>
                      {user.bio && (
                        <blockquote className="blockquote border-start border-3 border-primary ps-3 mb-4">
                          <p className="lead mb-0 text-dark">{user.bio}</p>
                        </blockquote>
                      )}
                      {user.fullBio && user.fullBio.length > 0 && user.fullBio.map((p, i) => (
                        <p key={i} className="mb-3 text-secondary">{p}</p>
                      ))}
                    </>
                  )}

                  {/* Секция статей — теперь через PostsSection */}
                  {isAuthor ? (
                    <>
                      <PostsSection
                        title="Опубликованные статьи"
                        posts={publishedArticles}
                        size="large"
                        variant="default"
                      />
                      {favoriteArticles.length > 0 && (
                        <>
                          <div className="mt-5">
                            <PostsSection
                              title="Понравилось"
                              posts={favoriteArticles}
                              size="large"
                              variant="default"
                            />
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    favoriteArticles.length > 0 && (
                      <PostsSection
                        title="Избранные статьи"
                        posts={favoriteArticles}
                        size="large"
                        variant="default"
                      />
                    )
                  )}

                  {/* Если ничего нет */}
                  {isAuthor && publishedArticles.length === 0 && favoriteArticles.length === 0 && (
                    <p className="text-muted text-center py-5">
                      У этого автора пока нет опубликованных статей.
                    </p>
                  )}
                  {!isAuthor && favoriteArticles.length === 0 && (
                    <p className="text-muted text-center py-5">
                      У этого пользователя пока нет избранных статей.
                    </p>
                  )}

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