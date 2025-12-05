"use client";

import { useState, useEffect, useMemo } from "react"; // Добавлен useMemo
import { useParams, useRouter } from "next/navigation";
// ИСПРАВЛЕНО: Изменен импорт для соответствия файловой структуре
import { articlesData } from "../../data/articles.js"; 
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RecommendationsSection from "../../../components/RecommendSection";
import Comments from "../../../components/Comments";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useAuth } from "../../../lib/AuthContext";

const getAllPosts = (data) => {
  return Object.values(data).flatMap(category => [
    ...(category.articles || []),
    ...(category.streams || [])
  ]);
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const { currentUser, mounted, addFavorite, removeFavorite } = useAuth();

  const allPosts = useMemo(() => getAllPosts(articlesData), []);

  useEffect(() => {
    const articleId = Number(params.id); 
    
    const found = allPosts.find(a => a.id === articleId);
    setPost(found || null);
  }, [params.id, allPosts]); 


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

  const isFavorite = currentUser?.favorites?.some(f => f.id === post.id);

  const toggleFavorite = () => {
    if (!currentUser) return;
    if (isFavorite) removeFavorite(post.id);
    else addFavorite(post);
  };
  
  return (
    <>
      <Header />
      <Container className="my-5">
        
        <Row className="justify-content-center mb-4">
          <Col lg={11} xl={10}>
            <button
              className="btn d-flex align-items-center justify-content-center"
              style={{ 
                width: 44, 
                height: 44, 
                borderRadius: "50%", 
                backgroundColor: "rgba(0, 0, 0, 0.05)", 
                color: "black", 
                border: "none", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "background-color 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
              onClick={() => router.back()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
              </svg>
            </button>
          </Col>
        </Row>

        <Row className="mb-5 justify-content-center">
          <Col lg={11} xl={10}>
            <div className="d-flex align-items-center mb-3">
              <Badge bg="primary" className="me-3 px-3 py-2 fw-semibold rounded-pill">{post.category}</Badge>
               <small className="text-muted fw-light">
                <span
                onClick={() => router.push(`/users/${post.author.id}`)}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  {post.author.name}
                  </span>
                  &nbsp;• {post.time}
                  </small>
            </div>
            
            <h1 className="fw-bolder display-5 mb-4 text-dark">{post.title}</h1>
            
            <div className="d-flex gap-3 pt-2 pb-4 border-bottom border-top">
              <Button
                variant="outline-primary"
                size="sm"
                className="d-flex align-items-center gap-2 px-3 fw-semibold"
                onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.307 1.14l-.004.01-.001.002-.002.004-.002.005-.001.006-.002.008-.002.009a6.5 6.5 0 0 0 1.344 4.881c.548.775 1.488 1.444 2.378 1.83.332.148.7.218 1.052.23a31 31 0 0 0 2.222 0c.35-.01.718-.08 1.052-.23.889-.386 1.83-.799 2.378-1.83a6.5 6.5 0 0 0 1.344-4.881.996.996 0 0 1-.002-.009l-.002-.008-.001-.006-.002-.005-.002-.004-.001-.002-.004-.01a10.941 10.941 0 0 1-.307-1.14 1 1 0 0 1 .287-.801c.288-.384.605-.838.762-1.282.02-.056.035-.108.05-.157.086-.271.139-.58.139-.933 0-3.313-2.686-6-6-6S1 1.763 1 5.075c0 .353.053.662.139.933.015.049.03.101.05.157.157.444.474.898.762 1.282z"/>
                </svg>
                {post.comments?.length || "0"} Комментариев
              </Button>
              
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-flex align-items-center gap-2 px-3 fw-semibold"
                onClick={async () => {
                  const shareData = { title: post.title, text: 'Читайте интересную статью!', url: window.location.href };
                  if (navigator.share) await navigator.share(shareData);
                  else { await navigator.clipboard.writeText(window.location.href); alert('Ссылка скопирована!'); }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .932 4.852l-5.32 2.66a2.5 2.5 0 1 1 0-5.787l5.32 2.66c.19-.38.41-.75.66-1.096a2.5 2.5 0 0 1 2.585-2.072zM5.5 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
                </svg>
                Поделиться
              </Button>
              
              {currentUser && (
                <Button 
                  variant={isFavorite ? "warning" : "outline-warning"} 
                  onClick={toggleFavorite} 
                  size="sm"
                  className="fw-semibold"
                >
                  {isFavorite ? "★ В избранном" : "☆ Добавить в избранное"}
                </Button>
              )}
            </div>
          </Col>
        </Row>


        <Row className="justify-content-center mb-5">
          <Col lg={11} xl={10}>
            <div className="rounded-4 overflow-hidden shadow-lg">
              <Card.Img
                src={post.heroImage || post.img}
                alt={post.title}
                style={{ height: "450px", objectFit: "cover" }}
                className="w-100"
              />
            </div>
          </Col>
        </Row>
        
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            {post.content.map((p, i) => (
              <p key={i} className="fs-5 text-dark lh-lg mb-4">{p}</p>
            ))}
          </Col>
        </Row>
        
        <Row className="mb-5 justify-content-center">
          <Col lg={11} xl={10}>
            {post.inlineImage && (
              <img 
                src={post.inlineImage} 
                alt="Inline" 
                className="img-fluid rounded-4 mb-4 shadow-sm" 
                style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
              />
            )}
           Ы {post.inlineText && <p className="fs-5 text-dark lh-lg mb-3">{post.inlineText}</p>}
            {post.inlineText2 && <p className="fs-5 text-dark lh-lg mb-3">{post.inlineText2}</p>}
            {post.inlineText3 && <p className="fs-5 text-dark lh-lg mb-3">{post.inlineText3}</p>}
            {post.inlineText4 && <p className="fs-5 text-dark lh-lg mb-3">{post.inlineText4}</p>}
          </Col>
        </Row>

        <hr className="my-5 border-3" />
        
        <h2 className="mb-4 fw-bold text-center">⭐ Читайте также</h2>
        <RecommendationsSection recommendations={allPosts.slice(0, 4)} />

        <hr className="my-5 border-3" />
        
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            <h2 className="mb-4 fw-bold">💬 Обсуждение</h2>
            <div id="comments-section">
              <Comments initialComments={post.comments || []} />
            </div>
          </Col>
        </Row>

      </Container>
      <Footer />
    </>
  );
}