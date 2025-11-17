import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import SmallArticleCard from "../../components/SmallArticleCard";
import styles from "./statya.module.css";
import Pagination from "../../components/Pagination";

export default function StatyaPage() {
  const articles = [
    { img: "/image/stat1.JPG", title: "Астана глазами туриста: как столица Казахстана меняется к зиме", excerpt: "Современные районы, украшенные огнями, катки и рождественские ярмарки делают Астану одним из самых атмосферных городов зимой. Гид по новым локациям и впечатлениям.", author: "Айжан Кали", date: "2 часа назад" },
    { img: "/image/stat2.JPG", title: "Сборная Казахстана одержала победу над Сербией в товарищеском матче", excerpt: "Национальная команда продемонстрировала уверенную игру и одержала победу со счетом 2:1. Тренер отметил прогресс молодых игроков и настрой на будущие квалификации.", author: "Нуржан Искаков", date: "5 часов назад" },
    { img: "/image/stat3.JPG", title: "Как развивается IT-индустрия Казахстана: стартапы, инвестиции и таланты", excerpt: "Казахстан становится новым центром IT-разработки в Центральной Азии. Инвестиции в технологические парки и обучение специалистов приносят первые результаты.", author: "Алина Турсын", date: "1 день назад" },
  ];

  const popularWeek = [
    { img: "/image/stat4.JPG", category: "Спорт", time: "3 часа назад", title: "Геннадий Головкин объявил о возвращении в профессиональный бокс" },
    { img: "/image/stat5.JPG", category: "Общество", time: "5 часов назад", title: "В Алматы запустили пилотный проект «Умный район»" },
    { img: "/image/stat8.JPG", category: "Наука", time: "7 часов назад", title: "Казахстанские школьники выиграли медали на олимпиаде по физике" },
    { img: "/image/stat9.JPG", category: "Экология", time: "9 часов назад", title: "В Казахстане началась масштабная посадка деревьев в рамках акции «Жасыл ел»" },
    { img: "/image/stat10.JPG", category: "Технологии", time: "11 часов назад", title: "Казахстанские разработчики создали приложение для поиска отечественных товаров" },
  ];

  const popularMonth = [
    { img: "/image/stat6.JPG", category: "Экономика", time: "1 неделя назад", title: "Нацбанк сообщил о росте курса тенге" },
    { img: "/image/stat7.JPG", category: "Технологии", time: "2 недели назад", title: "Запущен первый спутник связи Казахстана" },
    { img: "/image/stat11.JPG", category: "Мир", time: "3 недели назад", title: "ООН обсудила вопросы водных ресурсов в Центральной Азии" },
    { img: "/image/stat12.JPG", category: "Культура", time: "3 недели назад", title: "В Алматы открылась выставка молодых художников Казахстана" },
    { img: "/image/stat13.JPG", category: "Образование", time: "4 недели назад", title: "Казахстанские университеты вошли в топ-500 мирового рейтинга QS" },
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

      <Pagination />
      <Footer />
    </>
  );
}
