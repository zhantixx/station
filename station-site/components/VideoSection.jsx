"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function VideosSection({ mainVideo, sidebarVideos }) {
  return (
    <div className="container my-5">
      <Row className="g-4">
        <Col lg={8} md={12}>
          <Card className="shadow-sm border-0">
            <div className="ratio ratio-16x9 rounded">
              <iframe
                src={mainVideo.url}
                title={mainVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Card.Body>
              <Card.Title>{mainVideo.title}</Card.Title>
              <Card.Text className="text-muted">{mainVideo.meta}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={12}>
          <div className="d-flex flex-column gap-3">
            {sidebarVideos.map((video, idx) => (
              <Card key={idx} className="shadow-sm border-0">
                <div className="ratio ratio-16x9 rounded-top">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>{video.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {video.meta}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
