import React from "react";
import styles from "./PostsSection.module.css";

export default function PostsSection({ title, posts }) {
  return (
    <div className={styles.postsContainer}>
      <div className={styles.postsHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button className={styles.viewAllButton}>Смотреть все</button>
      </div>
      <div className={styles.postsGrid}>
        {posts.map((post, i) => (
          <a key={i} href="#" className={styles.postCard}>
            <div className={styles.postImagePlaceholder}>
<img src={`/image/${post.img}`} alt="пост" className={styles.postImage} />
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postMeta}>{post.meta}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
