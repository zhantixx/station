"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import RecommendationsSection from "../../../components/RecommendSection.jsx";
import Comments from "../../../components/Comments.jsx";
import { sportArticles, sportStreams } from "../../data/sports.js";

export default function SportPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const id = Number(params.id);
    const found = sportArticles.find(p => p.id === id) || sportStreams.find(p => p.id === id);
    setPost(found || null);
  }, [params.id]);

  if (!post) {
    return (
      <>
        <Header />
        <Container className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
          <h1 className="text-muted">Пост не найден</h1>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-5">
        {/* Хиро-блок */}
       {/* Хиро-блок */}
<Card className="bg-dark text-white mb-5 shadow-sm border-0 position-relative">
  {post.img && (
    <Card.Img
      src={post.img}
      alt={post.title}
      style={{ objectFit: 'cover', height: '400px' }}
    />
  )}

  <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
    {/* Кнопка "Назад" */}
    <div className="position-absolute top-0 start-0 m-3">
      <Button href="/sports" variant="light" className="position-absolute top-0 start-0 m-3">
      <img src="/image/back.png" alt="Назад" width={25} />
    </Button>
    </div>

    {/* Заголовок и информация */}
    <Card.Title className="display-6 fw-bold">{post.title}</Card.Title>
    <div className="d-flex gap-3 mt-2">
      <span className="fw-bold">{post.author}</span>
      <span className="text-light">{post.date}</span>
    </div>
  </Card.ImgOverlay>
</Card>

        {/* Тело поста */}
        <section className="mb-5">
          {post.text.split("\n").map((p, i) => (
            <p key={i} className="fs-5" style={{lineHeight: 1.75}}>{p}</p>
          ))}
        </section>

        {/* Рекомендации */}
        <RecommendationsSection
          recommendations={[
            { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане", meta: "EcoNews - 3 дня назад" },
            { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
          ]}
        />

        {/* Комментарии */}
        <Comments initialComments={post.comments || []} />
      </Container>
      <Footer />
    </>
  );
}
