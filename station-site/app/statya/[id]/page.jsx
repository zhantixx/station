"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { articles } from "../../data/articles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RecommendationsSection from "../../../components/RecommendSection";
import Comments from "../../../components/Comments";
import { Container, Row, Col, Card, Button, Image, Badge } from "react-bootstrap";
import { useAuth } from "../../../lib/AuthContext";

export default function ArticlePage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, mounted, addFavorite, removeFavorite } = useAuth();

  useEffect(() => {
    const articleId = Number(params.id);
    const found = articles.find(a => a.id === articleId);
    setPost(found || null);
  }, [params.id]);

  if (!post) {
    return (
      <>
        <Header />
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <h1 className="text-muted">Пост не найден</h1>
        </Container>
        <Footer />
      </>
    );
  }

  if (!mounted) return null;

  // Проверяем, добавлен ли пост в избранное
  const isFavorite = currentUser?.favorites?.some(f => f.id === post.id);

  const toggleFavorite = () => {
    if (!currentUser) return;
    if (isFavorite) {
      removeFavorite(post.id);
    } else {
      addFavorite(post);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <div className="position-relative mb-5 rounded-4 overflow-hidden shadow-sm">
          <Card.Img
            src={post.heroImage}
            alt={post.title}
            style={{ height: "480px", objectFit: "cover", filter: "brightness(70%)" }}
          />

          <Button
            href="/statya"
            variant="light"
            className="position-absolute top-0 start-0 shadow d-flex align-items-center justify-content-center"
            style={{ width: 50, height: 50, borderRadius: "50%", margin: 16, zIndex: 20 }}
          >
            <span className="fw-bold" style={{ fontSize: "1.5rem" }}>←</span>
          </Button>

          <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 text-white">
            <div className="mb-2">
              <Badge bg="primary" className="me-2 px-3 py-2">{post.category}</Badge>
              <small className="opacity-75">{post.time}</small>
            </div>

            <h1 className="fw-bold display-5">{post.title}</h1>

            <Row className="align-items-center mt-4 g-2">
              <Col xs="auto" className="d-flex align-items-center">
                <Image
                  src={post.author.avatar}
                  roundedCircle
                  width={48}
                  height={48}
                  className="me-2 border border-light"
                />
                <span className="fw-semibold">{post.author.name}</span>
              </Col>

              <Col className="d-flex gap-2 mt-2 mt-md-0">
                {/* COMMENTS */}
                <Button
                  variant="outline-light"
                  size="sm"
                  className="d-flex align-items-center gap-1 px-3 shadow-sm"
                  onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <img src="/image/comment.png" width={18} alt="Коммент" /> {post.comments?.length || "0"}
                </Button>

                {/* SHARE */}
                <Button
                  variant="outline-light"
                  size="sm"
                  className="d-flex align-items-center gap-1 px-3 shadow-sm"
                  onClick={async () => {
                    const shareData = { title: post.title, text: 'Читайте интересную статью!', url: window.location.href };
                    if (navigator.share) {
                      try { await navigator.share(shareData); } catch (err) { console.error(err); }
                    } else {
                      try { await navigator.clipboard.writeText(window.location.href); alert('Ссылка скопирована!'); }
                      catch (err) { console.error(err); }
                    }
                  }}
                >
                  <img src="/image/share.png" width={18} alt="Поделиться" /> Поделиться
                </Button>

                {/* FAVORITE */}
                {currentUser && (
               <Button
  variant={isFavorite ? "warning" : "outline-warning"}
  onClick={toggleFavorite}
>
  {isFavorite ? "В избранном" : "Добавить в избранное"}
</Button>

                )}
              </Col>
            </Row>
          </Card.ImgOverlay>
        </div>

        <div className="mb-5">
          {post.content.map((p, i) => (
            <p key={i} className="fs-5 text-secondary lh-base">{p}</p>
          ))}
        </div>

        <hr className="my-5" />
        <RecommendationsSection recommendations={articles.slice(0, 4)} />

        <hr className="my-5" />
        <div id="comments-section">
          <Comments initialComments={post.comments || []} />
        </div>
      </Container>
      <Footer />
    </>
  );
}
