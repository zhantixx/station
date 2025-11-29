"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Card, Button, Row, Col, Image, Badge } from "react-bootstrap";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import RecommendationsSection from "../../../components/RecommendSection.jsx";
import Comments from "../../../components/Comments.jsx";
import { financeArticles, financeStreams } from "../../data/finance.js";
import { useAuth } from "../../../lib/AuthContext";

export default function FinancePostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, mounted, addFavorite, removeFavorite } = useAuth();

  useEffect(() => {
    const id = Number(params.id);
    const found = financeArticles.find(p => p.id === id) || financeStreams.find(p => p.id === id);
    setPost(found || null);
  }, [params.id]);

  if (!post) return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <h1 className="text-muted">Новость не найдена</h1>
      </Container>
      <Footer />
    </>
  );

  if (!mounted) return null;

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

        {/* HERO */}
        <div className="position-relative mb-5 rounded-4 overflow-hidden shadow-sm">
          {post.img && <Card.Img src={post.img} alt={post.title} style={{ height: '400px', objectFit: 'cover', filter: 'brightness(65%)' }} />}

          {/* КНОПКА НАЗАД */}
          <Button
            href="/finance"
            variant="light"
            className="position-absolute top-0 start-0 m-3 rounded-circle shadow-lg d-flex justify-content-center align-items-center"
            style={{ width: 50, height: 50, padding: 0, zIndex: 20 }}
          >
            <img src="/image/back.png" alt="Назад" width={25} />
          </Button>

          {/* HERO OVERLAY */}
          <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 text-white">
            <div className="mb-2">
              <Badge bg="success" className="me-2 px-3 py-2">Финансы</Badge>
              <small className="opacity-75">{post.date}</small>
            </div>

            <h1 className="fw-bold display-5">{post.title}</h1>

            <Row className="align-items-center mt-3 g-2">
              <Col xs="auto" className="d-flex align-items-center">
                {post.authorAvatar && <Image src={post.authorAvatar} roundedCircle width={40} height={40} className="me-2 border border-light" />}
                <span className="fw-semibold">{post.author || "Редакция"}</span>
              </Col>

              <Col className="d-flex gap-2 mt-2 mt-md-0">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="d-flex align-items-center gap-1 px-3 shadow-sm"
                  onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <img src="/image/comment.png" width={18} alt="Коммент" /> {post.comments?.length || "0"}
                </Button>

                <Button
                  variant="outline-light"
                  size="sm"
                  className="d-flex align-items-center gap-1 px-3 shadow-sm"
                  onClick={async () => {
                    const shareData = { title: post.title, text: 'Важная финансовая новость!', url: window.location.href };
                    if (navigator.share) {
                      try { await navigator.share(shareData); } catch {}
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      alert('Ссылка скопирована!');
                    }
                  }}
                >
                  <img src="/image/share.png" width={18} alt="Поделиться" /> Поделиться
                </Button>

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

        {/* ТЕКСТ СТАТЬИ */}
        <section className="mb-5">
          {post.text.split("\n").map((p, i) => (
            <p key={i} className="fs-5 text-secondary lh-base mb-3">{p}</p>
          ))}
        </section>

        {/* РЕКОМЕНДАЦИИ */}
        <RecommendationsSection recommendations={[
          { img: "/image/finance/rec1.jpg", title: "Курс тенге укрепился до 485 за доллар", meta: "Финансы - 30 мин назад" },
          { img: "/image/finance/rec2.jpg", title: "Kaspi запустил вклад под 19%", meta: "Финансы - Вчера" },
        ]} />

        {/* КОММЕНТАРИИ */}
        <hr className="my-5" />
        <div id="comments-section">
          <Comments initialComments={post.comments || []} />
        </div>

      </Container>
      <Footer />
    </>
  );
}