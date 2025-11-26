"use client";

import React from "react";
import Link from "next/link";
import { Card, Row, Col } from "react-bootstrap";

export default function SmallArticleCard({ img, category, time, title, href }) {
  return (
    <Link href={href || "#"} className="text-decoration-none text-dark d-block mb-3">
      <Card className="flex-row align-items-center shadow-sm border-0" style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        <div style={{ width: "80px", height: "60px", overflow: "hidden", borderRadius: "5px", flexShrink: 0 }}>
          <Card.Img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Card.Body className="p-2 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-primary fw-bold">{category}</small>
            <small className="text-muted">{time}</small>
          </div>
          <Card.Text className="mb-0" style={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.2 }}>
            {title}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
