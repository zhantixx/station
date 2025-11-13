import React from "react";
import styles from "./RecommendSection.module.css";

export default function RecommendationsSection({ recommendations }) {
  return (
    <div className={styles.recommendedContainer}>
      <h2 className={styles.sectionTitle}>Рекомендаций для вас</h2>
      <div className={styles.recommendationsScrollWrapper}>
        {recommendations.map((rec, i) => (
          <a key={i} href="#" className={styles.recommendedCard}>
            <div className={styles.cardPlaceholder}>
<img src={`/image/${rec.img}`} alt="пост" className={styles.postImage} />
            </div>
            <h3 className={styles.cardTitle}>{rec.title}</h3>
            <p className={styles.cardMeta}>{rec.meta}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
