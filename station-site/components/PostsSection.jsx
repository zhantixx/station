"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function PostsSection({ title, posts }) {
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">{title}</h2>
      </div>

      <Row className="g-4">
        {posts.map((post) => (
          <Col key={post.id} xs={12} sm={6} md={4}>
            <Link href={`/${post.id}`} className="text-decoration-none">
              <Card
                className="h-100 shadow-sm border-0"
                style={{
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Card.Img
                  variant="top"
                  src={`/image/${post.img}`}
                  alt={post.title}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    objectFit: "cover",
                    height: "180px",
                  }}
                />
                <Card.Body>
                  <Card.Title className="h6 text-dark">{post.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {post.meta}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
