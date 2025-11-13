import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import SmallArticleCard from "../../components/SmallArticleCard";
import styles from "./statya.module.css";

export default function StatyaPage() {
  const articles = [
    { img: "https://via.placeholder.com/600x300/a9a9a9/ffffff?text=Main+Article+Image+1", title: "Астана глазами туриста...", excerpt: "Современные районы...", author: "Айжан Кали", date: "2 часа назад" },
    { img: "https://via.placeholder.com/600x300/a9a9a9/ffffff?text=Main+Article+Image+2", title: "Сборная Казахстана...", excerpt: "Национальная команда...", author: "Нуржан Искаков", date: "5 часов назад" },
    { img: "https://via.placeholder.com/600x300/a9a9a9/ffffff?text=Main+Article+Image+3", title: "Как развивается IT-индустрия...", excerpt: "Казахстан становится новым центром...", author: "Алина Турсын", date: "1 день назад" },
  ];

  const popularWeek = [
    { img: "https://via.placeholder.com/60x60/a9a9a9/ffffff?text=1", category: "Спорт", time: "3 часа назад", title: "Геннадий Головкин объявил о возвращении в профессиональный бокс" },
    { img: "https://via.placeholder.com/60x60/a9a9a9/ffffff?text=2", category: "Общество", time: "5 часов назад", title: "В Алматы запустили пилотный проект «Умный район»" },
  ];

  const popularMonth = [
    { img: "https://via.placeholder.com/60x60/a9a9a9/ffffff?text=6", category: "Экономика", time: "1 неделя назад", title: "Нацбанк сообщил о росте курса тенге" },
    { img: "https://via.placeholder.com/60x60/a9a9a9/ffffff?text=7", category: "Технологии", time: "2 недели назад", title: "Запущен первый спутник связи Казахстана" },
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Статьи</h1>
          {articles.map((article, idx) => (
            <ArticleCard
              key={idx}
              img={article.img}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.date}
            />
          ))}
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.popularSection}>
            <h3 className={styles.sectionTitle}>Популярные за неделю</h3>
            <div className={styles.smallArticleList}>
              {popularWeek.map((item, idx) => (
                <SmallArticleCard
                  key={idx}
                  img={item.img}
                  category={item.category}
                  time={item.time}
                  title={item.title}
                />
              ))}
            </div>
          </div>

          <div className={styles.popularSection}>
            <h3 className={styles.sectionTitle}>Популярное за месяц</h3>
            <div className={styles.smallArticleList}>
              {popularMonth.map((item, idx) => (
                <SmallArticleCard
                  key={idx}
                  img={item.img}
                  category={item.category}
                  time={item.time}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}
