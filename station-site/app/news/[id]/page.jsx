import { posts } from "../../data/posts";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "./newsPost.module.css";

export default async function ArticlePage({ params }) { 
    const resolved = await params; 
    const postId = Number(resolved.id); 
    const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <main className={styles.notFound}>
        <h1>Пост не найден</h1>
      </main>
    );
  }

  return (
    <>
      <Header />

      <div className={styles.contentWrapper}>
        <article className={styles.articleMain}>
          {/* Hero */}
          <section className={styles.articleHero}>
            <img src={post.heroImage} alt={post.title} className={styles.heroBgImage} />

            <a href="/news" className={styles.backLinkHero}>
              <img src="/image/back.png" alt="Назад" className={styles.backIconImg} />
            </a>

            <div className={styles.heroOverlayContent}>
              <div className={styles.metadata}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.time}>{post.time}</span>
              </div>

              <h1 className={styles.articleTitle}>{post.title}</h1>

              <div className={styles.articleInfo}>
                <div className={styles.author}>
                  {post.author.avatar && (
                    <img src={post.author.avatar} alt={post.author.name} className={styles.authorAvatar} />
                  )}
                  <span className={styles.authorName}>{post.author.name}</span>
                </div>

                <div className={styles.stats}>
                  <a className={styles.clickableIconLink}>
                    <img src="/image/love.png" alt="Лайк" className={styles.statIcon} /> 521K
                  </a>
                  <a className={styles.clickableIconLink}>
                    <img src="/image/comment.png" alt="Коммент" className={styles.statIcon} /> 213
                  </a>
                  <a className={styles.clickableIconLink}>
                    <img src="/image/share.png" alt="Поделится" className={styles.statIcon} /> 80
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Body */}
          <section className={styles.articleBody}>
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* Inline */}
          <section className={styles.articleBodyContinuation}>
            <div className={styles.inlineImageContainer}>
              <img src={post.inlineImage} className={styles.inlineArticleImage} />
            </div>

            <p className={styles.bodyTextBelowImage}>{post.inlineText}</p>
            <p className={styles.bodyTextBelowImage}>{post.inlineText2}</p>
            <p className={styles.bodyTextBelowImage}>{post.inlineText3}</p>
            <p className={styles.bodyTextBelowImage}>{post.inlineText4}</p>
          </section>
        </article>

        {/* Comments */}
        <section className={styles.commentsSection}>
          <div className={styles.commentInputArea}>
            <img src="/image/user_avatar.png" alt="Ава" className={styles.commentUserAvatar} />
            <div className={styles.inputFormContainer}>
              <textarea placeholder="Write your comment in here" className={styles.commentTextarea}></textarea>
              <button className={styles.postCommentButton}>Post Comment</button>
            </div>
          </div>

          <div className={styles.commentsList}>
            {post.comments.map((c) => (
              <div key={c.id} className={styles.commentItem}>
                <img src={c.avatar} className={styles.commentAuthorAvatar} />
                <div className={styles.commentContent}>
                  <span className={styles.commentAuthorName}>{c.name}</span>
                  <span className={styles.commentDate}>{c.date}</span>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
