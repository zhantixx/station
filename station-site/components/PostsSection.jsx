import Link from "next/link";
import styles from "./PostsSection.module.css";

export default function PostsSection({ title, posts }) {
  return (
    <div className={styles.postsContainer}>
      <h2>{title}</h2>
      <div className={styles.postsGrid}>
        {posts.map(post => (
          <Link key={post.id} href={`/news/${post.id}`} className={styles.postCard}>
            <div className={styles.postImagePlaceholder}>
            <img src={`/image/${post.img}`} alt={post.title} />
            </div>
            <h3>{post.title}</h3>
            <p>{post.meta}</p>
            </Link>
        ))}
      </div>
    </div>
  );
}
