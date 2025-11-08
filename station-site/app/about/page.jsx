"use client";
import React from "react";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>О нас</title>
        <link rel="stylesheet" href="/css/about.css" />
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
        <section className="mission">
          <h1>Наша миссия</h1>
          <p>
            Мы стремимся делиться знаниями и развивать интерес к программированию
            и современным технологиям через обучение, проекты и статьи.
          </p>
          <img src="/image/mission.jpg" alt="Наша миссия" />
        </section>

        <section className="team">
          <h2>Наша команда</h2>
          <p>
            Команда CodePlay — это преподаватели и разработчики, объединённые
            общей целью: сделать обучение простым, интересным и эффективным.
          </p>
          <img src="/image/team.jpg" alt="Наша команда" />
        </section>
      </main>

      <footer>
        <p>© 2025 CodePlay. Все права защищены.</p>
      </footer>
    </>
  );
}
