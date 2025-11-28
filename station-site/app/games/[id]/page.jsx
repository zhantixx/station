"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Card, Button, Badge } from "react-bootstrap";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import RecommendationsSection from "../../../components/RecommendSection.jsx";
import Comments from "../../../components/Comments.jsx";
import { gameArticles, gameStreams } from "../../data/games.js";
import { useAuth } from "../../../lib/AuthContext";

export default function GamePostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, addFavorite, removeFavorite } = useAuth();

  useEffect(() => {
    const id = Number(params.id);
    const allPosts = [...gameArticles, ...gameStreams];
    const found = allPosts.find(p => p.id === id);
    setPost(found || null);
  }, [params.id]);

  if (!post) {
    return (
      <>
        <Header />
        <Container className="py-5 text-center">
          <h1 className="display-4 text-danger">Игра или стрим не найден</h1>
          <a href="/games" className="btn btn-outline-primary mt-3">← Вернуться в Игры</a>
        </Container>
        <Footer />
      </>
    );
  }

  const isFavorite = currentUser?.favorites?.some(f => f.id === post.id);

  const toggleFavorite = () => {
    if (!currentUser) return;
    isFavorite
      ? removeFavorite(post.id)
      : addFavorite({ id: post.id, title: post.title, date: post.date, category: "Игры" });
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <div className="position-relative rounded-4 overflow-hidden shadow-lg mb-5">
          <Card.Img
            src={post.img}
            alt={post.title}
            style={{ height: "460px", objectFit: "cover", filter: "brightness(55%)" }}
          />
          <Button
            href="/games"
            variant="light"
            className="position-absolute top-0 start-0 m-4 rounded-circle shadow"
            style={{ width: 50, height: 50, zIndex: 10 }}
          >
            ←
          </Button>
          <Card.ImgOverlay className="d-flex flex-column justify-content-end p-5 text-white">
            <Badge bg="purple" className="mb-3 px-4 py-2 fs-5">Игры</Badge>
            <h1 className="display-5 fw-bold mb-3">{post.title}</h1>
            <p className="opacity-90 fs-5">{post.date}</p>
            <div className="mt-4 d-flex gap-3">
              <Button variant="outline-light" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Ссылка скопирована!");
              }}>
                Поделиться
              </Button>
              {currentUser && (
                <Button
                  variant={isFavorite ? "warning" : "outline-warning"}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? "В избранном" : "В избранное"}
                </Button>
              )}
            </div>
          </Card.ImgOverlay>
        </div>

        <article className="mb-5">
          {post.text.split("\n").map((p, i) => (
            <p key={i} className="fs-5 text-secondary lh-base mb-4">{p}</p>
          ))}
        </article>

        <RecommendationsSection recommendations={[]} />
        <hr className="my-5" />
        <Comments initialComments={[]} />
      </Container>
      <Footer />
    </>
  );
}