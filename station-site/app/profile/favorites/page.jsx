"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../lib/AuthContext";
import { articlesData } from "../../data/articles";
import { Container, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function FavoritesPage() {
    const { currentUser, removeFavorite } = useAuth();

    // Сбор всех постов (предполагаем, что этот код верен для получения всех статей)
    const allPosts = Object.values(articlesData).flatMap(c => [
        ...(c.articles || []),
        ...(c.streams || [])
    ]);

    const favorites = currentUser?.favorites || [];

    return (
        <>
            <Header />

            <Container className="py-5">
                <Link href="/profile" className="text-primary mb-4 d-inline-block fw-semibold text-decoration-none hover-dark transition-all">
                    ← Назад в профиль
                </Link>

                <h2 className="display-6 fw-bold mb-5 text-center text-dark">
                    Мое Избранное <span className="text-primary">({favorites.length})</span>
                </h2>

                {favorites.length === 0 ? (
                    <Card className="text-center p-5 border-dashed shadow-sm" style={{ borderRadius: "20px", borderStyle: "dashed" }}>
                        <Card.Body>
                            <div className="mb-4 text-primary opacity-75">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <h4>Здесь пока тихо</h4>
                            <p className="text-muted mb-4">Нажмите на звездочку рядом со статьей, чтобы добавить ее сюда.</p>
                            <Link href="/" className="btn btn-primary rounded-pill px-4 shadow-sm">
                                Начать чтение
                            </Link>
                        </Card.Body>
                    </Card>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {favorites.map(fav => {
                            // Ищем полные данные поста
                            const post = allPosts.find(p => p.id === fav.id);
                            if (!post) return null;

                            return (
                                <div key={post.id} className="col">
                                    <Card 
                                        className="h-100 border-0 shadow-sm transition-all hover-scale-up" 
                                        style={{ borderRadius: "16px", overflow: "hidden" }}
                                    >
                                        {post.image && (
                                            <div className="position-relative">
                                                <Card.Img
                                                    variant="top"
                                                    src={post.image}
                                                    alt={post.title}
                                                    style={{ height: "180px", objectFit: "cover" }}
                                                />
                                                <span className="badge bg-secondary position-absolute top-0 end-0 m-2 rounded-pill">
                                                    {post.type === 'stream' ? 'Трансляция' : 'Статья'}
                                                </span>
                                            </div>
                                        )}
                                        <Card.Body className="d-flex flex-column p-4">
                                            <Card.Title className="fw-bold fs-6 mb-2">
                                                <Link href={`/statya/${post.id}`} className="text-decoration-none text-dark stretched-link hover-primary">
                                                    {post.title}
                                                </Link>
                                            </Card.Title>
                                            <small className="text-muted mb-3">
                                                {post.category} · {post.time || "Недавно"}
                                            </small>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="mt-auto rounded-pill fw-semibold"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Предотвращаем срабатывание stretched-link
                                                    removeFavorite(post.id);
                                                }}
                                                style={{ zIndex: 10 }} // Для работы кнопки над stretched-link
                                            >
                                                💔 Удалить
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Container>

            <Footer />
        </>
    );
}