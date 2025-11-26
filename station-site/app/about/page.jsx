"use client";

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
      <Header />

      {/* Миссия */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={6}>
              <h2 className="display-5 text-primary mb-3">Наша миссия</h2>
              <p className="fs-5 text-secondary mb-3">
                <strong>Station</strong> — современный новостной портал, который ежедневно рассказывает о главных событиях Казахстана и мира. Мы стремимся к точности и качеству информации.
              </p>
              <Button href="/about/project" variant="primary">
                Подробнее о проекте
              </Button>
            </Col>
            <Col md={6}>
              <img
                src="/image/mission.jpg"
                alt="Наша миссия"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Команда */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={6} className="order-md-2">
              <h2 className="display-5 text-primary mb-3">Кто мы</h2>
              <p className="fs-5 text-secondary mb-3">
                Команда Station — это журналисты, редакторы, дизайнеры и разработчики, которые любят своё дело. Мы создаем контент для каждого, кто хочет быть в курсе событий.
              </p>
            </Col>
            <Col md={6} className="order-md-1">
              <img
                src="/image/team.jpg"
                alt="Наша команда"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Преимущества / карточки */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <img src="/image/oper.png" alt="Оперативность" className="mb-3" style={{width: '80px', height: '80px'}} />
                <Card.Title className="h5 text-primary">Оперативность</Card.Title>
                <Card.Text className="text-secondary">
                  Новости публикуются сразу после проверки фактов. Вы всегда получаете актуальную информацию.
                </Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <img src="/image/object.png" alt="Объективность" className="mb-3" style={{width: '80px', height: '80px'}} />
                <Card.Title className="h5 text-primary">Объективность</Card.Title>
                <Card.Text className="text-secondary">
                  Мы не гонимся за сенсациями, а даём читателю честную картину происходящего.
                </Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <img src="/image/udob.png" alt="Удобство" className="mb-3" style={{width: '80px', height: '80px'}} />
                <Card.Title className="h5 text-primary">Удобство</Card.Title>
                <Card.Text className="text-secondary">
                  Читаете где угодно: на телефоне, планшете или компьютере. Всё адаптировано под вас.
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default About;
