"use client";

import { posts } from "../../data/posts";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "./newsPost.module.css";
import RecommendationsSection from "../../../components/RecommendSection";
import Comments from "../../../components/Comments";


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
                  <a
  className={styles.clickableIconLink}
  onClick={() => {
    const comments = document.getElementById("comments-section");
    if (comments) {
      comments.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
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

              <RecommendationsSection
                recommendations={[
                  { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "EcoNews - 3 дня назад" },
                  { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
                  { img: "рек3.jpg", title: "Казахстанские ученые создали биоразлагаемый пластик", meta: "KazScience - 2 дня назад" },
                   { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "EcoNews - 3 дня назад" },
                ]}
              />

        
      </div>
      <Comments initialComments={post.comments} />


      <Footer />
    </>
  );
}
