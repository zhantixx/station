"use client";

import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function SportPosts({ posts, isStream }) {
  return (
    <Row className="g-4 mb-4">
      {posts.map((post) => (
        <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
          <Link
            href={isStream ? `/sports/streams/${post.id}` : `/sports/${post.id}`}
            className="text-decoration-none text-dark"
          >
            <Card className="h-100 shadow-sm border-0 overflow-hidden">
              {/* Картинка или плей-иконка */}
              {isStream ? (
                <div
                  className="bg-secondary d-flex justify-content-center align-items-center"
                  style={{ height: '180px' }}
                >
                  <span className="text-white fs-2">▶</span>
                </div>
              ) : (
                post.img && (
                  <Card.Img
                    src={post.img}
                    alt={post.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                )
              )}

              {/* Контент */}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h6">{post.title}</Card.Title>
                <div className="mb-2 text-muted small d-flex gap-2 flex-wrap">
                  {post.category && <Badge bg="info">{post.category}</Badge>}
                  {post.author && <span>{post.author}</span>}
                  {post.date && <span>{post.date}</span>}
                </div>
                <Card.Text
                  className="text-truncate"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
