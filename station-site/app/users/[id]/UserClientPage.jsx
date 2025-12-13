// app/user/[id]/UserClientPage.jsx

"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

export default function UserClientPage({ user, articlesCount, isAuthor }) {
  const router = useRouter();
  const roleDisplay = isAuthor ? "Редактор" : "Пользователь";

  return (
    <>
      <Header />

      <div
        className="d-flex justify-content-center align-items-start"
        style={{
          backgroundColor: "#f0f2f5",
          padding: "60px 0",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <Container className="my-5">
          <Row className="justify-content-center g-5">

            {/* Левая колонка */}
            <Col lg={4}>
              <Card className="border-0 shadow-lg" style={{ borderRadius: "25px" }}>
                <Card.Body className="p-5 text-center d-flex flex-column align-items-center">
                  <img
                    src={user.avatar || "/image/ava.png"}
                    alt="Аватар"
                    width={130}
                    height={130}
                    className="rounded-circle shadow-sm border border-5 border-primary mb-4"
                    style={{ objectFit: "cover" }}
                  />

                  <h2 className="fw-bolder mb-1 text-dark" style={{ fontSize: "1.8rem" }}>
                    {user.name}
                  </h2>

                  <p className="text-secondary mb-4">
                    {user.email || "Email не указан"}
                  </p>

                  {/* Роль */}
                  <Button
                    variant="primary"
                    className="rounded-pill py-3 fw-bold w-100 mb-3"
                    disabled
                    style={{ maxWidth: "280px" }}
                  >
                    {roleDisplay}
                  </Button>

                  {/* Опубликованные статьи */}
                  

                  {/* Назад */}
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill px-5"
                    onClick={() => router.back()}
                  >
                    Назад
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Правая колонка */}
            <Col lg={8}>
              <Card className="border-0 shadow-lg h-100" style={{ borderRadius: "25px" }}>
                <Card.Body className="p-5">
          

                  <h3 className="fw-bolder mb-3 border-bottom pb-3 text-dark">
                    Детали Аккаунта
                  </h3>

                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between px-0 py-3 border-bottom">
                      <span className="text-secondary fw-semibold">
                        Имя пользователя:
                      </span>
                      <strong>{user.name}</strong>
                    </ListGroup.Item>

                    {user.email && (
                      <ListGroup.Item className="d-flex justify-content-between px-0 py-3 border-bottom">
                        <span className="text-secondary fw-semibold">Email:</span>
                        <strong>{user.email}</strong>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item className="d-flex justify-content-between px-0 py-3 border-bottom">
                      <span className="text-secondary fw-semibold">Роль:</span>
                      <strong className="text-primary fw-bold">
                        {roleDisplay}
                      </strong>
                    </ListGroup.Item>

                    <ListGroup.Item className="d-flex justify-content-between px-0 py-3">
                      <span className="text-secondary fw-semibold">
                        Дата регистрации:
                      </span>
                      <strong>{user.registrationDate}</strong>
                    </ListGroup.Item>
                  </ListGroup>

                  {(user.bio || user.fullBio?.length > 0) && (
                    <>
                      <h3 className="fw-bolder mt-5 mb-4 border-bottom pb-3 text-primary">
                        Обо Мне
                      </h3>

                      {user.bio && (
                        <blockquote className="blockquote border-start border-3 border-primary ps-3 mb-4">
                          <p className="lead mb-0 text-dark">{user.bio}</p>
                        </blockquote>
                      )}

                      {user.fullBio?.map((p, i) => (
                        <p key={i} className="mb-3 text-secondary">
                          {p}
                        </p>
                      ))}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
}
