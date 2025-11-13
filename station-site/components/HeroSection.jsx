import React from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection({ metaInfo, mainTitle, thumbnails }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentContainer}>
        <p className={styles.metaInfo}>{metaInfo}</p>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
        <div className={styles.relatedContent}>
          {thumbnails.map((thumb, i) => (
            <a key={i} href="#" className={`${styles.thumbnailItem} ${thumb.main ? styles.mainThumbnail : ""}`}>
              <div className={styles.imagePlaceholder}>
                <img src={thumb.img} alt="фото" className={styles.thumbnailImage}/>
              </div>
              <p className={styles.thumbnailTitle}>{thumb.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
