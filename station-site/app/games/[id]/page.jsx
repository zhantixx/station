"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Card, Button, Row, Col, Image, Badge } from "react-bootstrap";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import RecommendationsSection from "../../../components/RecommendSection.jsx";
import Comments from "../../../components/Comments.jsx";
import { articles } from "../../data/articles.js";
import { useAuth } from "../../../lib/AuthContext";

export default function GamePostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, mounted, addFavorite, removeFavorite } = useAuth();

  useEffect(() => {
    const id = Number(params.id);

    // 🔥 Ищем ТОЛЬКО в статьях с категорией "Игры"
    const found = articles
      .filter(a => a.category === "Игры")
      .find(a => a.id === id);

    setPost(found || null);
  }, [params.id]);

  if (!post) return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <h1 className="text-muted">Пост не найден</h1>
      </Container>
      <Footer />
    </>
  );

  if (!mounted) return null;

  const isFavorite = currentUser?.favorites?.some(f => f.id === post.id);

  const toggleFavorite = () => {
    if (!currentUser) return;
    isFavorite ? removeFavorite(post.id) : addFavorite(post);
  };

  return (
    <>
      <Header />
      <Container className="my-5">

        {/* HERO */}
        <div className="position-relative mb-5 rounded-4 overflow-hidden shadow-sm">
          {post.img && (
            <Card.Img
              src={post.img}
              alt={post.title}
              style={{ height: '400px', objectFit: 'cover', filter: 'brightness(65%)' }}
            />
          )}

          {/* Назад */}
          <button
            className="btn position-absolute top-0 start-0"
            style={{ margin: 16, zIndex: 20, width: 25, height: 25, borderRadius: "50%", padding: 0, border: "none" }}
            onClick={() => history.back()}
          >
            <img src="/image/back.png" alt="Назад" style={{ width: 20, height: 20 }} />
          </button>

          <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 text-white">
            <div className="mb-2">
              <Badge bg="warning" className="me-2 px-3 py-2">Игры</Badge>
              <small className="opacity-75">{post.date}</small>
            </div>

            <h1 className="fw-bold display-5">{post.title}</h1>
          </Card.ImgOverlay>
        </div>

        <section className="mb-5">
          {post.text
            ?.split("\n")
            .map((p, i) => <p key={i} className="fs-5 text-secondary lh-base mb-3">{p}</p>)}
        </section>

        <RecommendationsSection
          recommendations={[
            { img: "/image/games/rec1.jpg", title: "Almaty Cyber Cup 2025", meta: "Игры - 2 часа назад" },
            { img: "/image/games/rec2.jpg", title: "Nomad Warriors бьют рекорды", meta: "Игры - Вчера" },
          ]}
        />

        <hr className="my-5" />
        <div id="comments-section">
          <Comments initialComments={post.comments || []} />
        </div>

      </Container>
      <Footer />
    </>
  );
}
