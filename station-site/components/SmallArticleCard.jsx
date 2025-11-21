import React from "react";
import Link from "next/link";
import styles from "./SmallArticleCard.module.css";

export default function SmallArticleCard({ img, category, time, title, href }) {
  return (
    <Link href={href || "#"} className={styles.smallArticleCard}>
      <img src={img} alt={title} className={styles.smallArticleImage} />
      <div className={styles.smallArticleContent}>
        <span className={styles.category}>{category}</span>
        <span className={styles.time}>{time}</span>
        <p className={styles.smallArticleTitle}>{title}</p>
      </div>
    </Link>
  );
}
