"use client";

import Link from "next/link";
import styles from "./SportPosts.module.css";

export default function SportPosts({ posts, isStream }) {
  return (
    <div className={isStream ? styles.streamsList : styles.sportList}>
      {posts.map((post) => (
        <Link 
          key={post.id} 
          href={`/sports/${post.id}`} 
          className={isStream ? styles.streamItem : styles.sportItem}
        >
          <div className={isStream ? styles.streamPreview : styles.sportPreview}>
            <div className={isStream ? styles.streamImage : styles.sportImage}>
              {isStream && <div className={styles.playButton}>▶</div>}
              {!isStream && post.img && <img src={post.img} alt={post.title} />}
            </div>
          </div>
          <div className={isStream ? styles.streamText : styles.sportText}>
            <h3 className={isStream ? styles.streamArticleTitle : styles.sportArticleTitle}>
              {post.title}
            </h3>
            <div className={isStream ? styles.streamMeta : styles.sportMeta}>
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
            <p className={isStream ? styles.streamExcerpt : styles.sportExcerpt}>{post.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
