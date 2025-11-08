"use client";
import React from "react";
import styles from "@/app/statya/statya.module.css";

export default function ArticleItem({ img, title, text, author, time }) {
  return (
    <article className={styles.post}>
      <img src={img} alt={title} className={styles.postImg} />
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{title}</h3>
        <p className={styles.postText}>{text}</p>
        {author && time && (
          <div className={styles.postMeta}>
            <span className={styles.author}>{author}</span> • <span className={styles.time}>{time}</span>
          </div>
        )}
      </div>
    </article>
  );
}
