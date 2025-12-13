"use client";

import React from "react";
import Link from "next/link"; 
import { Container, Row, Col, Card } from "react-bootstrap";

export default function HeroSection({ metaInfo, mainTitle, thumbnails, backgroundImage, isMinimal, className }) {

    const minimalStyles = { 
        backgroundColor: "rgba(255, 255, 255, 0.7)", 
        background: "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 240, 0.7) 100%)", 
        backdropFilter: "blur(5px)", 
        padding: "30px 20px", 
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)", 
        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s",
        color: "#333",
        width: "100%"
    };

   
    const standardStyles = {
        position: "relative",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "10px 20px 30px 20px", 
        overflow: "hidden",
        color: "#fff"
    };

    const sectionStyles = isMinimal ? minimalStyles : standardStyles;
    const textStyles = isMinimal ? { color: "#333", textShadow: "none" } : { color: "#fff", textShadow: "0 3px 8px rgba(0,0,0,0.6)" };

    const renderOverlay = !isMinimal && backgroundImage;
    const renderThumbnails = !isMinimal && thumbnails && thumbnails.length > 0;

  return (
    <Link 
        href="/weather" 
        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
    >
        <section
          style={sectionStyles}
            className={className} 
        >
          {renderOverlay && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(2px)",
                zIndex: 1,
              }}
            ></div>
          )}

          <Container style={{ position: "relative", zIndex: 2 }}>
            <p 
                    style={{ 
                        fontSize: "1rem", 
                        color: textStyles.color, 
                        marginBottom: "2px",
                        marginLeft: 0,
                        paddingLeft: 0, 
                    }}>
              {metaInfo}
            </p>
            <h1 
                    style={{ 
                        fontSize: "2.6rem", 
                        color: textStyles.color, 
                        fontWeight: 700, 
                        textShadow: textStyles.textShadow, 
                        marginBottom: "10px", 
                        marginLeft: 0,
                        paddingLeft: 0, 
                    }}>
              {mainTitle}
            </h1>
            
            {renderThumbnails && (
            <Row className="g-3 mt-1">
              {thumbnails.map((thumb, i) => (
                    <Col key={i} xs={12} md={4}>
                        <Card
                            className="shadow-sm"
                            style={{
                                borderRadius: "10px",
                                overflow: "hidden",
                                border: "none",
                                backgroundColor: "rgba(0,0,0,0.45)", 
                                transition: "transform 0.3s",
                                cursor: "pointer",
                                position: "relative"
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <Card.Img 
                                src={thumb.img} 
                                alt={thumb.title} 
                                style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }}
                            />
                            
                            <Card.Body 
                                style={{ 
                                    position: 'absolute', 
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: "10px 15px", 
                                    background: 'none', 
                                }}
                            >
                                <Card.Text 
                                    style={{ 
                                        fontSize: "0.95rem", 
                                        color: "#f8f8f8", 
                                        fontWeight: 500,
                                        margin: 0 
                                    }}
                                >
                                    {thumb.title}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            )}
          </Container>
        </section>
    </Link>
  );
}