"use client";

import { use, useMemo } from "react"; 
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import PostsSection from "../../../components/PostsSection.jsx"; 
import SmallArticleCard from "../../../components/SmallArticleCard.jsx";
import { articlesData } from "../../data/articles.js";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const categoriesConfig = {
  politics:     { name: "Политика",       color: "#dc3545" },
  music:        { name: "Музыка",        color: "#e83e8c" },
  games:        { name: "Игры",          color: "#0d6efd" },
  finance:      { name: "Финансы",       color: "#ffc107" },
  sport:       { name: "Спорт",         color: "#20c997" },     
  travel:       { name: "Путешествия",   color: "#17a2b8" },
  technologies: { name: "Технологии",    color: "#6f42c1" },
  culture:      { name: "Культура",      color: "#6c757d" },
  science:      { name: "Наука",         color: "#495057" },
  education: { name: "Образование", color: "#2563EB" },  
  movies:       { name: "Кино",          color: "#DC2626" }, 
  health:       { name: "Здоровье",      color: "#10B981" }
};

const getAllArticles = (data) => {
  const all = [];
  for (const categoryKey in data) {
    if (data[categoryKey].articles) {
      all.push(...data[categoryKey].articles);
    }
  }
  return all.sort((a, b) => b.id - a.id);
};

export default function CategoryPage({ params }) {
  
  const { slug } = use(params); 

  if (!slug) {
    return (
      <>
        <Header activePage="" />
        <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
          <h2 className="h1 text-danger mb-4">404</h2>
          <p className="h3 text-muted mb-4">Не удалось определить категорию.</p>
          <Link href="/" className="btn btn-primary">Вернуться на главную</Link>
        </Container>
        <Footer />
      </>
    );
  }

  const category = categoriesConfig[slug];
  const categoryData = articlesData[slug];

  if (!category || !categoryData) {
    return (
      <>
        <Header activePage={slug} />
        <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
          <h2 className="h3 text-danger mb-3">Категория "{slug}" не найдена</h2>
          <p className="text-muted mb-4">Проверьте написание или настройки.</p>
          <Link href="/" className="btn btn-secondary">На главную</Link>
        </Container>
        <Footer />
      </>
    );
  }
  
  const articles = categoryData.articles || [];
  const streams = categoryData.streams || [];
  
  const allArticles = useMemo(() => getAllArticles(articlesData), []);
  const popularWeek = allArticles.slice(0, 4);
  const popularMonth = allArticles.slice(4, 8);


  return (
    <>
      <Header activePage={slug} />

      <main className="bg-light min-vh-100 py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={10} lg={8}>
              <h1
                className="display-3 fw-bolder text-center pb-3 border-bottom"
                style={{ color: category.color, borderColor: category.color }}
              >
                {category.name}
              </h1>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={8}>
              
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-4 text-dark border-start border-4 ps-3" style={{ borderColor: category.color }}>
                  Статьи ({articles.length})
                </h2>
                {articles.length > 0 ? (
                  <PostsSection posts={articles} size="small" variant="default" />
                ) : (
                  <p className="text-muted fst-italic">Статьи пока отсутствуют.</p>
                )}
              </section>

              <section className="mb-5">
                <h2 className="h4 fw-bold mb-4 text-dark border-start border-4 ps-3" style={{ borderColor: category.color }}>
                  Трансляции ({streams.length})
                </h2>
                {streams.length > 0 ? (
                  <PostsSection posts={streams} size="small" variant="default" />
                ) : (
                  <p className="text-muted fst-italic">Трансляции пока отсутствуют.</p>
                )}
              </section>

            </Col> 


            <Col lg={4}>
              
              <div className="mb-5">
                <h3 className="fw-bold h5 mb-3 border-start border-3 border-primary ps-2">
                  Популярное за неделю
                </h3>
                <div className="d-flex flex-column gap-3">
                  {popularWeek.map((item) => (
                    <SmallArticleCard
                      key={item.id}
                      img={item.heroImage || item.img}
                      category={item.category}
                      time={item.time}
                      title={item.title}
                      href={`/statya/${item.id}`} 
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="fw-bold h5 mb-3 border-start border-3 border-warning ps-2">
                  Популярное за месяц
                </h3>
                <div className="d-flex flex-column gap-3">
                  {popularMonth.map((item) => (
                    <SmallArticleCard
                      key={item.id}
                      img={item.heroImage || item.img}
                      category={item.category}
                      time={item.time}
                      title={item.title}
                      href={`/statya/${item.id}`}
                    />
                  ))}
                </div>
              </div>

            </Col> 

          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
}