"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import { Row, Col, Card } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useAuth } from "@/lib/AuthContext";

const categoriesConfig = {
  "Политика": "#dc3545",
  "Музыка": "#e83e8c",
  "Игры": "#0d6efd",
  "Финансы": "#ffc107",
  "Спорт": "#20c997",
  "Путешествия": "#17a2b8",
  "Технологии": "#6f42c1",
  "Культура": "#6c757d",
  "Наука": "#495057",
  "Образование": "#2563EB",
  "Кино": "#DC2626",
  "Здоровье": "#10B981",
};

const getImageUrl = (post) =>
  post.heroImage || (post.img ? `/image/${post.img}` : "/image/placeholder.jpg");

export default function PostsSection({ title, posts, size = "large", variant = "default" }) {
  const { currentUser, addFavorite, removeFavorite } = useAuth();

  if (!posts || posts.length === 0) return null;

  const isLarge = size === "large";
  const isSquare = variant === "square";
  
  const aspectRatioClass = isLarge ?  "ratio-4x3" :"ratio-16x9" ; 

  return (
    <>
      {title && (
        <div className="mb-4">
          <h2 className="text-primary fw-bold">{title}</h2>
        </div>
      )}

      <Row className="g-4">
        {posts.map((post) => {
          const isFavorite = currentUser?.favorites?.some(f => f.id === post.id);
          const catColor = post.category ? categoriesConfig[post.category] || "#6c757d" : "#6c757d";

          const handleFavorite = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFavorite) {
              removeFavorite(post.id);
            } else {
              addFavorite(post);
            }
          };

          return (
            <Col
              key={post.id}
              xs={12}
              sm={isSquare ? 6 : isLarge ? 6 : 12} 
              // Для 1 поста в ряд
              lg={isSquare ? 4 : isLarge ? 4 : 12} 
              xl={isSquare ? 4 : isLarge ? 4 : 12} 
            >
              <Link 
                href={`/statya/${post.id}`} 
                className="text-decoration-none d-block h-100" 
              > 
                <Card
                  className="h-100 shadow-sm border-0 position-relative overflow-hidden"
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Лайк */}
                  <div
                    className="position-absolute top-0 end-0 z-3 p-4"
                    onClick={handleFavorite}
                    style={{ cursor: "pointer" }}
                  >
                    {isFavorite ? (
                      <HeartFill size={28} className="text-danger" />
                    ) : (
                      <Heart size={28} className="text-white" style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.7))" }} />
                    )}
                  </div>

                  {isSquare ? (
                    <div className="position-relative overflow-hidden ratio ratio-1x1">
                      <Image 
                        src={getImageUrl(post)}
                        alt={post.title}
                        fill
                        objectFit="cover" 
                        className="card-img-top" 
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {post.category && (
                        <div className="position-absolute bottom-0 start-0 p-3 z-2">
                          <span
                            className="badge px-3 py-2"
                            style={{
                              backgroundColor: catColor,
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: "0.8rem",
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      className={`position-relative overflow-hidden ratio ${aspectRatioClass}`}
                    >
                      <Image 
                        src={getImageUrl(post)}
                        alt={post.title}
                        fill
                        objectFit="cover" 
                        className="card-img-top" 
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <Card.Body className={isLarge ? "p-4" : "p-3"}>
                    {!isSquare && post.category && (
                      <span
                        className="badge mb-2 px-3 py-2"
                        style={{
                          backgroundColor: catColor,
                          color: "#fff",
                          fontWeight: "600",
                          fontSize: "0.75rem",
                        }}
                      >
                        {post.category}
                      </span>
                    )}

                    <Card.Title className={`fw-bold ${isLarge ? "fs-5" : "fs-6"} mb-2 text-dark`}> 
                      {post.title}
                    </Card.Title>

                    {(post.author?.name || post.time) && (
                      <small className="text-muted">
                        {post.author?.name && post.author.name}
                        {post.author?.name && post.time && " — "}
                        {post.time}
                      </small>
                    )}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}