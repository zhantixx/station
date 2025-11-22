"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import SmallArticleCard from "../../components/SmallArticleCard";
import Pagination from "../../components/Pagination";
import { articles, popularWeek, popularMonth } from "../data/articles";
import styles from "./statya.module.css";

export default function StatyaPage() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Статьи</h1>

          <div className={styles.articlesList}>
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/statya/${article.id}`}
                className={styles.cardLink}
              >
                <ArticleCard
                  img={article.heroImage || article.img}
                  title={article.title}
                  excerpt={article.excerpt}
                  author={article.author.name}
                  date={article.time}
                />
              </Link>
            ))}
          </div>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.popularSection}>
            <h3 className={styles.sectionTitle}>Популярные за неделю</h3>
            <div className={styles.smallArticleList}>
              {popularWeek.map((item) => (
                <SmallArticleCard
                  key={item.id}
                  img={item.img}
                  category={item.category}
                  time={item.time}
                  title={item.title}
                  href={`/statya/${item.id}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.popularSection}>
            <h3 className={styles.sectionTitle}>Популярное за месяц</h3>
            <div className={styles.smallArticleList}>
              {popularMonth.map((item) => (
                <SmallArticleCard
                  key={item.id}
                  img={item.img}
                  category={item.category}
                  time={item.time}
                  title={item.title}
                  href={`/statya/${item.id}`}
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
