"use client";

import Link from "next/link";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function PoliticsPosts({ posts, isStream = false }) {
  return (
    <Row className="g-4 mb-4">
      {posts.map((post) => (
        <Col key={post.id} xs={12} md={6} lg={6}>
          <Link
            href={`/politics/${post.id}`}   
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
                {post.img && (
                  <Card.Img
                    src={post.img}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
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
                    <span className="text-white" style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>
                      Play
                    </span>
                  </div>
                )}
              </div>

              <Card.Body className="p-3 d-flex flex-column justify-content-between">
                <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
                  <Badge bg="danger">Политика</Badge>
                  <small className="text-muted">{post.date}</small>
                </div>

                <Card.Title className="fw-bold fs-5">{post.title}</Card.Title>

                {post.text && (
                  <Card.Text
                    className="text-secondary mb-0"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
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