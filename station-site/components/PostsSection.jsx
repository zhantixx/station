"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useAuth } from "@/lib/AuthContext";

const categoriesConfig = {
  Политика: "#dc3545",
  Музыка: "#e83e8c",
  Игры: "#0d6efd",
  Финансы: "#ffc107",
  Спорт: "#20c997",
  Путешествия: "#17a2b8",
  Технологии: "#6f42c1",
  Культура: "#6c757d",
  Наука: "#495057",
  Образование: "#2563EB",
  Кино: "#DC2626",
  Здоровье: "#10B981",
};

const getImageUrl = (post) =>
  post.heroImage || (post.img ? `/image/${post.img}` : "/image/placeholder.jpg");

export default function PostsSection({ title, posts, size = "large", variant = "default" }) {
  const { currentUser, addFavorite, removeFavorite } = useAuth();

  if (!posts || posts.length === 0) return null;

  const isLarge = size === "large";
  const isSquare = variant === "square";

  return (
    <>
      {title && <h2 className="text-primary fw-bold mb-4">{title}</h2>}

      <Row className="g-4">
        {posts.map((post) => {
          const isFavorite = currentUser?.favoriteIds?.includes(post.id) || false;

          const catColor = post.category ? categoriesConfig[post.category] || "#6c757d" : "#6c757d";

          const handleFavorite = async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!currentUser) {
              alert("Войдите в аккаунт, чтобы добавлять в избранное.");
              return;
            }

            if (isFavorite) {
              await removeFavorite(post.id);
            } else {
              await addFavorite(post.id);
            }
          };

          return (
            <Col
              key={post.id}
              xs={12}
              sm={isSquare ? 6 : isLarge ? 6 : 12}
              lg={isSquare ? 4 : isLarge ? 4 : 12}
              xl={isSquare ? 3 : isLarge ? 4 : 12}
            >
              <Link href={`/statya/${post.id}`} className="text-decoration-none d-block h-100">
                <Card
                  className="h-100 shadow-sm border-0 overflow-hidden"
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
                  <div
                    className="position-absolute top-0 end-0 z-3 p-3"
                    onClick={handleFavorite}
                    style={{ cursor: "pointer" }}
                  >
                    {isFavorite ? (
                      <HeartFill size={26} className="text-danger" />
                    ) : (
                      <Heart
                        size={26}
                        className="text-white"
                        style={{ filter: "drop-shadow(3px 3px 4px rgba(0,0,0,0.8))" }}
                      />
                    )}
                  </div>

                  <div
                    className="position-relative"
                    style={{
                      width: "100%",
                      height: isSquare ? "240px" : isLarge ? "280px" : "200px",
                    }}
                  >
                    <Image
                      src={getImageUrl(post)}
                      alt={post.title || "Статья"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />

                    {isSquare && post.category && (
                      <div className="position-absolute bottom-0 start-0 p-3">
                        <span
                          className="badge px-3 py-2 fw-semibold"
                          style={{ backgroundColor: catColor, color: "#fff", fontSize: "0.85rem" }}
                        >
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column p-4">
                    {!isSquare && post.category && (
                      <span
                        className="badge mb-2 px-3 py-2 fw-semibold"
                        style={{
                          backgroundColor: catColor,
                          color: "#fff",
                          fontSize: "0.8rem",
                          alignSelf: "flex-start",
                        }}
                      >
                        {post.category}
                      </span>
                    )}

                    <Card.Title className="fw-bold text-dark mb-2 fs-5 line-clamp-2">
                      {post.title}
                    </Card.Title>

                    {(post.author?.name || post.time) && (
                      <small className="text-muted mt-auto">
                        {post.author?.name && `${post.author.name}`}
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