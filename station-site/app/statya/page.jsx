"use client";
import React from "react";
import styles from "./statya.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleItem from "@/components/ArticleItem";

export default function StatyaPage() {
  const articles = [
    {
      img: "/image/photo1.JPG",
      title: "Как современные технологии и онлайн-платформы меняют образование",
      text: "Онлайн-обучение и цифровые инструменты уже давно стали частью нашей жизни. Сегодня студенты могут получать знания из любой точки мира.",
      author: "Нурсултан Ермеков",
      time: "2 часа назад"
    },
    {
      img: "/image/photo2.jpg",
      title: "Будущее искусственного интеллекта",
      text: "ИИ активно внедряется во все сферы: от медицины до бизнеса. Но сможет ли он заменить человека или останется только инструментом?",
      author: "Динара Сарсенова",
      time: "Вчера"
    },
    {
      img: "/image/photo3.jpg",
      title: "5 советов, как улучшить продуктивность",
      text: "Планирование дня, работа по методу Pomodoro и правильный отдых помогут вам достигать целей быстрее.",
      author: "Арман Бекжанов",
      time: "3 дня назад"
    }
  ];

  return (
    <>
      <Header />

      <main className={styles.container}>
        <section className={styles.articles}>
          <h2>Статьи</h2>
          {articles.map((art, i) => (
            <ArticleItem
              key={i}
              img={art.img}
              title={art.title}
              text={art.text}
              author={art.author}
              time={art.time}
            />
          ))}
        </section>

      </main>

      <Footer />
    </>
  );
}
