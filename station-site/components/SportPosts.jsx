import styles from './SportPosts.module.css';

export default function SportPosts({ posts, isStream = false }) {
  return (
    <div className={styles.list}>
      {posts.map((post, index) => (
        <div key={index} className={styles.card}>
          {/* Превью */}
          <div className={styles.preview}>
            <div className={styles.image}>
              {isStream && (
                <div className={styles.playButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Текст */}
          <div className={styles.text}>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.meta}>
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
            <p className={styles.excerpt}>{post.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}