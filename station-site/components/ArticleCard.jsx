"use client";

import React from "react";
import Card from "react-bootstrap/Card";

export default function ArticleCard({ img, title, excerpt, author, date }) {
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Img variant="top" src={img} alt={title} />

      <Card.Body>
        <Card.Title className="h5">{title}</Card.Title>

        <Card.Text className="flex-grow-1">{excerpt}</Card.Text>

        <div className="d-flex justify-content-between text-muted small mt-3">
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

