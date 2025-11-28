"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import RecommendationsSection from "../../../components/RecommendSection.jsx";
import Comments from "../../../components/Comments.jsx";
import { techArticles, techStreams } from "../../data/technologies.js";
import { useAuth } from "../../../lib/AuthContext";

export default function TechPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, mounted, addFavorite, removeFavorite } = useAuth();
  

  useEffect(() => {
    const id = Number(params.id);
    const found = techArticles.find(p => p.id === id) || techStreams.find(p => p.id === id);
    setPost(found || null);
  }, [params.id]);

  if (!post) return (
    <>
      <Header />
      <Container className="py-5 text-center">
        <h1 className="text-muted">Статья не найдена</h1>
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
      addFavorite({ id: post.id, title: post.title, date: post.date, category: "Технологии" });
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <div className="position-relative mb-5 rounded-4 overflow-hidden shadow-sm">
          {post.img && <Card.Img src={post.img} alt={post.title} style={{ height: "420px", objectFit: "cover", filter: "brightness(60%)" }} />}

          <Button href="/technologies" variant="light" className="position-absolute top-0 start-0 m-3 rounded-circle shadow-lg" style={{ width: 50, height: 50, zIndex: 20 }}>
            ←
          </Button>

          <Card.ImgOverlay className="d-flex flex-column justify-content-end p-5 text-white">
            <div className="mb-2">
              <Badge bg="info" className="me-2 px-3 py-2">Технологии</Badge>
              <small className="opacity-75">{post.date}</small>
            </div>
            <h1 className="display-5 fw-bold">{post.title}</h1>

            <Row className="mt-4 g-3">
              <Col className="d-flex gap-2">
                <Button variant="outline-light" size="sm" onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}>
                  Комментарии
                </Button>
                <Button variant="outline-light" size="sm" onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Ссылка скопирована!"); }}>
                  Поделиться
                </Button>
                {currentUser && (
                  <Button variant={isFavorite ? "warning" : "outline-warning"} onClick={toggleFavorite}>
                    {isFavorite ? "В избранном" : "В избранное"}
                  </Button>
                )}
              </Col>
            </Row>
          </Card.ImgOverlay>
        </div>

        <section className="mb-5">
          {post.text.split("\n").map((p, i) => (
            <p key={i} className="fs-5 text-secondary lh-base mb-4">{p}</p>
          ))}
        </section>

        <RecommendationsSection recommendations={[]} />
        <hr className="my-5" />
        <div id="comments-section">
          <Comments initialComments={[]} />
        </div>
      </Container>
      <Footer />
    </>
  );
}