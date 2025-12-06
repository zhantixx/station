"use client";

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
      <Header />

      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={6}>
              <h2 className="display-5 text-primary mb-3 position-relative">
                Наша миссия
                <span
                  className="position-absolute"
                  style={{
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 4,
                    background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                    borderRadius: 2,
                  }}
                />
              </h2>
              <p className="fs-5 text-secondary mb-3">
                <strong>Station</strong> — современный новостной портал, который ежедневно рассказывает о главных событиях Казахстана и мира. Мы стремимся к точности и качеству информации.
              </p>
              
            </Col>
            <Col md={6}>
              <img
                src="/image/mission.jpg"
                alt="Наша миссия"
                className="img-fluid rounded-4 shadow-lg"
                style={{ transition: "transform 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={6} className="order-md-2">
              <h2 className="display-5 text-primary mb-3 position-relative">
                Кто мы
                <span
                  className="position-absolute"
                  style={{
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 4,
                    background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                    borderRadius: 2,
                  }}
                />
              </h2>
              <p className="fs-5 text-secondary mb-3">
                Команда Station — это журналисты, редакторы, дизайнеры и разработчики, которые любят своё дело. Мы создаем контент для каждого, кто хочет быть в курсе событий.
              </p>
            </Col>
            <Col md={6} className="order-md-1">
              <img
                src="/image/team.jpg"
                alt="Наша команда"
                className="img-fluid rounded-4 shadow-lg"
                style={{ transition: "transform 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4 text-center">
            {[
              {
                img: "/image/oper.png",
                title: "Оперативность",
                text: "Новости публикуются сразу после проверки фактов. Вы всегда получаете актуальную информацию.",
              },
              {
                img: "/image/object.png",
                title: "Объективность",
                text: "Мы не гонимся за сенсациями, а даём читателю честную картину происходящего.",
              },
              {
                img: "/image/udob.png",
                title: "Удобство",
                text: "Читаете где угодно: на телефоне, планшете или компьютере. Всё адаптировано под вас.",
              },
            ].map((card, i) => (
              <Col md={4} key={i}>
                <Card className="h-100 border-0 shadow-sm p-4 text-center hover-shadow transition" 
                  style={{ transition: "transform 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <img src={card.img} alt={card.title} className="mb-3" style={{ width: 80, height: 80 }} />
                  <Card.Title className="h5 text-primary">{card.title}</Card.Title>
                  <Card.Text className="text-secondary">{card.text}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default About;
