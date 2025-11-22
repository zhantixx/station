"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { posts } from "../../data/posts";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Comments from "../../../components/Comments";
import RecommendationsSection from "../../../components/RecommendSection";
import styles from "./newsPost.module.css";

export default function ArticlePage() {
  const params = useParams(); 
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!params?.id) return; 

    const postId = Number(params.id);
    const found = posts.find((p) => p.id === postId);
    setPost(found || null);
  }, [params]);

  if (!post) {
    return (
      <main style={{ textAlign: "center", padding: "50px" }}>
        <h1>Пост не найден</h1>
      </main>
    );
  }

  return (
    <>
      <Header />

      <div className={styles.contentWrapper}>
        <article className={styles.articleMain}>
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
                      if (comments) comments.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <img src="/image/comment.png" alt="Коммент" className={styles.statIcon} /> 213
                  </a>
                  <a className={styles.clickableIconLink}>
                    <img src="/image/share.png" alt="Поделиться" className={styles.statIcon} /> 80
                  </a>
                </div>
              </div>
            </div>
          </section>

       
          <section className={styles.articleBody}>
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          
          <section className={styles.articleBodyContinuation}>
            <div className={styles.inlineImageContainer}>
              <img src={post.inlineImage} alt="Inline" className={styles.inlineArticleImage} />
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
            { img: "rec4.JPG", title: "Культурный фестиваль «Мәңгілік Ел» привлек тысячи гостей", meta: "Culture.kz - 6 дней назад" },
          ]}
        />
      </div>

      <Comments initialComments={post.comments} />
      <Footer />
    </>
  );
}
