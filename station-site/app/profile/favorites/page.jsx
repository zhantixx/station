"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../lib/AuthContext";
import { articlesData } from "../../data/articles";
import { Container, Card } from "react-bootstrap";
import Link from "next/link";
import PostsSection from "../../../components/PostsSection"; 

export default function FavoritesPage() {
    const { currentUser } = useAuth();

    const allPosts = Object.values(articlesData).flatMap(c => [
        ...(c.articles || []),
        ...(c.streams || [])
    ]);

    const favorites = currentUser?.favorites || [];

    const favoritePosts = favorites
        .map(fav => allPosts.find(p => p.id === fav.id))
        .filter(Boolean); 

    return (
        <>
            <Header />

            <Container className="py-5">
                <Link href="/profile" className="text-primary mb-4 d-inline-block fw-semibold text-decoration-none hover-dark transition-all">
                    ← Назад в профиль
                </Link>

                <h2 className="display-6 fw-bold mb-5 text-center text-dark">
                    Мое Избранное <span className="text-primary">({favoritePosts.length})</span>
                </h2>

                {favoritePosts.length === 0 ? (
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
                    <PostsSection 
                        posts={favoritePosts} 
                        size="large" 
                    />
                )}
            </Container>

            <Footer />
        </>
    );
}