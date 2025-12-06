"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, Container } from "react-bootstrap";
import Link from "next/link";
import { articlesData } from "../app/data/articles";

const textClampStyle = (lines) => ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

function getAllPosts() {
    return Object.values(articlesData).flatMap((cat) => [
        ...(cat.articles || []),
        ...(cat.streams || []),
    ]);
}

function getRandomPosts(allPosts, count = 5) {
    return [...allPosts].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function RecommendationsSection() {
    // Используем useMemo для создания массива allPosts только один раз
    const allPosts = useMemo(() => getAllPosts(), []); 
    
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Логика рандомизации выполняется ТОЛЬКО на клиенте после монтирования
        const randomPosts = getRandomPosts(allPosts, 5);
        setRecommendations(randomPosts);
    }, [allPosts]); // allPosts теперь стабилен, эффект сработает только один раз

    return (
        <Container className="my-5">
            <h2 className="display-5 fw-bold text-primary mb-5 text-center">
                Рекомендации для вас
            </h2>

            <div className="d-flex gap-4 overflow-auto pb-4">
                {recommendations.map((post) => {
                    const imageSrc =
                        post.image ||
                        post.img ||
                        `https://via.placeholder.com/400x300/333333/ffffff?text=${encodeURIComponent(post.title.slice(0, 20))}`;

                    const authorName =
                        typeof post.author === "object" && post.author !== null
                            ? post.author.name || post.author.writer || "Автор"
                            : post.author || post.writer || "Автор неизвестен";

                    const authorAvatar =
                        typeof post.author === "object" && post.author !== null
                            ? post.author.avatar || null
                            : null;

                    return (
                        <Link
                            key={post.id}
                            href={`/statya/${post.id}`}
                            className="text-decoration-none text-dark"
                            style={{ minWidth: "400px", flexShrink: 0 }}
                        >
                            <Card
                                className="border-0 shadow-sm"
                                style={{
                                    width: "400px",
                                    height: "580px",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    background: "#fff",
                                }}
                            >
                                <div style={{ width: "100%", height: "300px", position: "relative" }}>
                                    <img
                                        src={imageSrc}
                                        alt={post.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/400x300/f0f0f0/999999?text=Нет+изображения";
                                        }}
                                    />
                                </div>

                                <Card.Body className="p-4 d-flex flex-column" style={{ height: "280px" }}>
                                    <Card.Title
                                        className="fw-bold mb-3"
                                        style={{
                                            ...textClampStyle(3),
                                            fontSize: "1.4rem",
                                            lineHeight: "1.45",
                                        }}
                                    >
                                        {post.title}
                                    </Card.Title>

                                    <Card.Text
                                        className="text-muted flex-grow-1 mb-3"
                                        style={{
                                            ...textClampStyle(3),
                                            fontSize: "1.05rem",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {post.meta || post.description || post.category || "Новость"}
                                    </Card.Text>

                                    <div className="d-flex align-items-center mt-auto">
                                        <div
                                            className="me-3 rounded-circle bg-secondary flex-shrink-0"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                backgroundImage: authorAvatar ? `url(${authorAvatar})` : "none",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        <div>
                                            <div className="fw-semibold small">{authorName}</div>
                                            <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                                                {post.time || post.date || "Недавно"}
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </Container>
    );
}