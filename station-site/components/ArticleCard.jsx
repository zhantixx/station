import React from "react";
import styles from "@/app/statya/statya.module.css";

export default function ArticleCard({ img, title, excerpt, author, date }) {
  return (
    <article className={styles.articleCard}>
      <img src={img} alt={title} className={styles.articleImage} />
      <h2 className={styles.articleTitle}>{title}</h2>
      <p className={styles.articleExcerpt}>{excerpt}</p>
      <div className={styles.articleMeta}>
        <span className={styles.articleMetaAuthor}>{author}</span>
        <span className={styles.articleMetaDate}>{date}</span>
      </div>
    </article>
  );
}
