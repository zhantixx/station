"use client";

import Link from "next/link";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function MusicPosts({ posts, isStream = false }) {
  return (
    <Row className="g-4 mb-4">
      {posts.map((post) => (
        <Col key={post.id} xs={12} md={6} lg={6}>
          <Link href={`/music/${post.id}`} className="text-decoration-none text-dark">
            <Card
              className="shadow-sm border-0 rounded-4 overflow-hidden h-100"
              style={{
                cursor: "pointer",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(255, 20, 147, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
              }}
            >
              <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                {post.img && (
                  <Card.Img
                    src={post.img}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                {isStream && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,20,147,0.8), rgba(255,105,180,0.7))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="text-white fw-bold" style={{ fontSize: "4.5rem" }}>
                      LIVE
                    </span>
                  </div>
                )}
              </div>

              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Badge bg="pink" className="px-3 py-2">Музыка</Badge>
                  <small className="text-muted">{post.date}</small>
                </div>
                <Card.Title className="fw-bold fs-5 lh-base">{post.title}</Card.Title>
                {post.text && (
                  <Card.Text
                    className="text-secondary mt-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.text}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}