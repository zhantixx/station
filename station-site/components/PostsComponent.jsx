"use client";

import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Badge } from "react-bootstrap";

// ПРИМЕЧАНИЕ: Этот компонент используется в CategoryPage.js и StatyaPage.js.
// В CategoryPage.js он импортируется как PostsComponent.
export default function SportPosts({ posts, isStream }) {
  
  if (!Array.isArray(posts) || posts.length === 0) {
    return null; // Не рендерим ничего, если нет постов
  }

  // --- Настройки для Badge (Можно сделать более гибким) ---
  const badgeConfig = {
    article: { bg: "info" },
    stream: { bg: "danger" }
  };
  const currentBadge = isStream ? badgeConfig.stream : badgeConfig.article;


  return (
    <Row className="g-4 mb-4">
      {posts.map((post) => {
        // ⛔️ ПРОВЕРКА: Если нет ID или заголовка, пропускаем пост, чтобы не сломать рендеринг
        if (!post.id) return null; 

        // 🛠️ ИСПРАВЛЕНИЕ: Формирование ссылки. 
        // Используем универсальный роут /statya/[id], который вы используете на главной.
        const href = `/statya/${post.id}`; 

        return (
          <Col key={post.id} xs={12} md={6} lg={6}>
            <Link
              href={href}
              className="text-decoration-none text-dark"
            >
              <Card
                className="shadow-sm border-0 rounded-4 overflow-hidden h-100"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
                  {/* 🛠️ ИСПРАВЛЕНИЕ: Проверяем heroImage или img */}
                  {isStream && post.youtube ? (
                    <iframe
                    src={post.img}
                    alt={post.title}
                    style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    objectFit: "cover",
                  }}
                  />
                  ) : ( 
                    (post.heroImage || post.img) && (
                    <Card.Img
                    src={post.heroImage || post.img}
                    alt={post.title || "Изображение"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}/>
                  )
                  )}
                  {isStream && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span className="text-white" style={{ fontSize: '3rem' }}>▶</span>
                    </div>
                  )}
                </div>

                <Card.Body className="p-3 d-flex flex-column justify-content-between">
                  <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
                    {/* 🛠️ ИСПОЛЬЗУЕМ КАТЕГОРИЮ И ЦВЕТ ИЗ ТЕКУЩЕГО КОМПОНЕНТА */}
                    {post.category && <Badge bg={currentBadge.bg}>{post.category}</Badge>}
                    {isStream && <Badge bg="danger">LIVE</Badge>}
                    {post.date && <small className="text-muted">{post.date}</small>}
                  </div>
                  <Card.Title className="fw-bold fs-5">{post.title || "Статья без заголовка"}</Card.Title>
                  
                  {/* 🛠️ ИСПРАВЛЕНИЕ: Используем excerpt (анонс), который чаще встречается в данных */}
                  {(post.excerpt || post.text) && (
                    <Card.Text
                      className="text-secondary mb-0"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt || post.text}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}