"use client";

import React from "react";
import Link from "next/link";
import { Card, Badge } from "react-bootstrap"; 

const CATEGORY_STYLES = {
    "Политика": "danger",
    "Музыка": "info", 
    "Игры": "primary",
    "Финансы": "warning",
    "Спорт": "success", 
    "Путешествия": "info",
    "Технологии": "secondary", 
    "Культура": "secondary", 
    "Наука": "dark", 
    "default": "primary" 
};

export default function SmallArticleCard({ img, category, time, title, href }) {
    
    const categoryBgClass = CATEGORY_STYLES[category] || CATEGORY_STYLES.default;

    return (
        <Link
            href={href || "#"}
            className="text-decoration-none text-dark d-block"
        >
            <Card
                className="shadow-sm border-0 rounded-4 d-flex flex-row align-items-center p-2 mb-3"
                style={{
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 0.75rem 1.5rem rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0.25rem 0.8rem rgba(0,0,0,0.08)";
                }}
            >
                <div
                    className="overflow-hidden rounded-3"
                    style={{
                        width: "100px",
                        height: "75px",
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={img}
                        alt={title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.35s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                </div>

                <Card.Body className="ms-3 flex-grow-1 p-0"> 
                    <div className="d-flex justify-content-between mb-1 align-items-center">
                       
                        {category && (
                            <Badge bg={categoryBgClass} className="text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                                {category}
                            </Badge>
                        )}
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                            {time}
                        </small>
                    </div>

                    <div
                        className="text-dark"
                        style={{
                            fontSize: "0.92rem",
                            fontWeight: 600,
                            lineHeight: "1.25",
                        }}
                    >
                        {title}
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
}