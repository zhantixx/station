import React from "react";
import { Card } from "react-bootstrap";

export default function ArticleCard({ img, title, excerpt, author, date }) {
  return (
    <Card
      className="border-0 shadow-sm rounded-4 overflow-hidden h-100"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 1rem 2rem rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 .5rem 1rem rgba(0,0,0,0.1)";
      }}
    >
      <div className="ratio ratio-16x9 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-100 h-100 object-fit-cover"
          style={{ transition: "transform 0.4s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <Card.Body className="px-4 py-4">

        <Card.Title className="fw-bold fs-5 lh-sm">
          {title}
        </Card.Title>

        <div className="border-bottom mt-3 mb-3 opacity-25"></div>

        <Card.Text className="text-secondary mb-3">
          {excerpt}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center pt-2">
          <small className="fw-semibold text-primary">{author}</small>
          <small className="text-muted">{date}</small>
        </div>
      </Card.Body>
    </Card>
  );
}
