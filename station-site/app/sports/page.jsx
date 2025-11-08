"use client";
import React from "react";
import Head from "next/head";

export default function SportsPage() {
  return (
    <>
      <Head>
        <title>Спорт</title>
        <link rel="stylesheet" href="/css/sports.css" />
      </Head>

      <header>
        <img src="/image/logo.JPG" alt="Логотип" className="logo" />
        <nav>
          <a href="/">Главная</a>
          <a href="/news">Новости</a>
          <a href="/sports">Спорт</a>
          <a href="/about">О нас</a>
        </nav>
      </header>

      <main>
        <section className="sports-intro">
          <h1>Новости спорта</h1>
          <p>
            Здесь вы можете узнать о последних спортивных событиях, достижениях
            спортсменов и интересных фактах из мира спорта.
          </p>
        </section>

        <section className="gallery">
          <h2>Фото из мира спорта</h2>
          <div className="images">
            <img src="/image/sport1.jpg" alt="Футбол" />
            <img src="/image/sport2.jpg" alt="Баскетбол" />
            <img src="/image/sport3.jpg" alt="Теннис" />
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 CodePlay. Все права защищены.</p>
      </footer>
    </>
  );
}
