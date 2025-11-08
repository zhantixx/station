"use client";
import React from "react";
import Head from "next/head";

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>Главная — Новости</title>
        <link rel="stylesheet" href="./news.module.css" />
      </Head>

      <header>
        <img src="/image/logo.JPG" alt="Логотип" className="logo" />
        <nav>
          <a href="/" className="active">Главная</a>
          <a href="/statya">Статьи</a>
          <a href="/sports">Спорт</a>
          <a href="/about">О нас</a>
        </nav>
        <input type="text" placeholder="Поиск..." />
        <button>Войти</button>
      </header>

      <main>
        <section className="hero">
          <h1>Новости технологий и науки</h1>
          <p>Читайте самые свежие события в мире науки, техники и инноваций.</p>
        </section>

        <section className="latest-posts">
          <h2>Последние публикации</h2>
          <div className="posts-grid">
            <article className="post-card">
              <div className="image-placeholder"></div>
              <h3>Новые технологии для зарядки устройств</h3>
              <span className="author">Флойд Майлс</span> • <span className="date">3 дня назад</span>
            </article>
            <article className="post-card">
              <div className="image-placeholder"></div>
              <h3>Исследование Луны: шаг к Марсу</h3>
              <span className="author">Джейкоб Джонс</span> • <span className="date">3 дня назад</span>
            </article>
            <article className="post-card">
              <div className="image-placeholder"></div>
              <h3>Искусственный интеллект в медицине</h3>
              <span className="author">Анна Иванова</span> • <span className="date">3 дня назад</span>
            </article>
          </div>
        </section>

        <section className="videos">
          <h2>Видео</h2>
          <div className="video-grid">
            <div className="video-card">
              <iframe width="300" height="200" src="https://www.youtube.com/embed/il_MNVEwQNI" title="Обзор матча" frameBorder="0" allowFullScreen></iframe>
              <h3>Обзор матча Лиги чемпионов</h3>
              <span className="author">Алексей Сидоров</span> • <span className="date">15 сентября 2025</span>
            </div>
            <div className="video-card">
              <iframe width="300" height="200" src="https://www.youtube.com/embed/2aAOkvd0xPE" title="ФК Кайрат" frameBorder="0" allowFullScreen></iframe>
              <h3>ФК «Кайрат» — путь к финалу Кубка</h3>
              <span className="author">Марина Жумабаева</span> • <span className="date">16 сентября 2025</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 CodePlay. Все права защищены.</p>
      </footer>
    </>
  );
}