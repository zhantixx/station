"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { articles } from "../../data/articles"; 
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RecommendationsSection from "../../../components/RecommendSection";
import Comments from "../../../components/Comments";
import { Container, Row, Col, Card, Button, Image, Badge } from "react-bootstrap";

export default function ArticlePage() {
  const params = useParams(); 
  const [post, setPost] = useState(null);

  useEffect(() => {
    const articleId = Number(params.id);
    const found = articles.find((a) => a.id === articleId);
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

  return (
    <>
      <Header />
      <Container className="my-5">
        {/* Hero Section */}
        <Card className="mb-4 border-0 overflow-hidden text-white" style={{ borderRadius: '16px' }}>
  <Card.Img src={post.heroImage} alt={post.title} style={{ height: '450px', objectFit: 'cover' }} />
  <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4">
    <div className="mb-2">
      <Badge bg="info" className="me-2">{post.category}</Badge>
      <small>{post.time}</small>
    </div>
    <Card.Title className="display-6 fw-bold">{post.title}</Card.Title>
    <Row className="align-items-center mt-3">
      <Col xs="auto" className="d-flex align-items-center">
        <Image src={post.author.avatar} roundedCircle width={45} height={45} className="me-2 border border-white" />
        <span>{post.author.name}</span>
      </Col>
      <Col className="d-flex gap-3 justify-content-start mt-2 mt-md-0">
        <Button variant="outline-light" size="sm">
          <img src="/image/love.png" alt="Лайк" width={20} className="me-1" />521K
        </Button>
        <Button variant="outline-light" size="sm" onClick={() => {
          const comments = document.getElementById("comments-section");
          if (comments) comments.scrollIntoView({ behavior: "smooth" });
        }}>
          <img src="/image/comment.png" alt="Коммент" width={20} className="me-1" />213
        </Button>
        <Button variant="outline-light" size="sm">
          <img src="/image/share.png" alt="Поделиться" width={20} className="me-1" />80
        </Button>
      </Col>
    </Row>
    <Button href="/statya" variant="light" className="position-absolute top-0 start-0 m-3">
      <img src="/image/back.png" alt="Назад" width={25} />
    </Button>
  </Card.ImgOverlay>
</Card>

        {/* Article Body */}
        <div className="mb-5">
          {post.content.map((p, i) => (
            <p key={i} className="mb-3">{p}</p>
          ))}
        </div>

        {/* Recommendations */}
        <RecommendationsSection
          recommendations={[
            { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "EcoNews - 3 дня назад" },
            { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
            { img: "рек3.jpg", title: "Казахстанские ученые создали биоразлагаемый пластик", meta: "KazScience - 2 дня назад" },
            { img: "rec4.JPG", title: "Культурный фестиваль «Мәңгілік Ел» привлек тысячи гостей", meta: "Culture.kz - 6 дней назад" },
          ]}
        />

        {/* Comments */}
        <div id="comments-section" className="mt-5">
          <Comments initialComments={post.comments || []} />
        </div>
      </Container>
      <Footer />
    </>
  );
}
