"use client";

import React from "react";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ img, title, excerpt, author, date }) {
  return (
    <div className={styles.articleCard}>
      <img src={img} alt={title} className={styles.articleImage} />
      <div className={styles.articleContent}>
        <h3 className={styles.articleTitle}>{title}</h3>
        <p className={styles.articleExcerpt}>{excerpt}</p>
        <div className={styles.articleMeta}>
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
