"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { articles } from "../../data/articles"; 
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RecommendationsSection from "../../../components/RecommendSection";
import Comments from "../../../components/Comments";
import styles from "./articlePost.module.css";

export default function ArticlePage() {
  const params = useParams(); 
  const [post, setPost] = useState(null);

  useEffect(() => {
    const articleId = Number(params.id);
    const found = articles.find((a) => a.id === articleId);
    setPost(found || null);
  }, [params.id]);

  if (!post) {
    return (
      <>
        <Header />
        <main className={styles.notFound}>
          <h1>Пост не найден</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <section className={styles.articleHero}>
          <img src={post.heroImage} alt={post.title} className={styles.heroBgImage} />
          <a href="/statya" className={styles.backLinkHero}>
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
                <img src={post.author.avatar} alt={post.author.name} className={styles.authorAvatar} />
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
                  }}>
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

      
        <RecommendationsSection
                  recommendations={[
                    { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "EcoNews - 3 дня назад" },
                    { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
                    { img: "рек3.jpg", title: "Казахстанские ученые создали биоразлагаемый пластик", meta: "KazScience - 2 дня назад" },
                    { img: "rec4.JPG", title: "Культурный фестиваль «Мәңгілік Ел» привлек тысячи гостей", meta: "Culture.kz - 6 дней назад" },
                  ]}
                />

        <Comments initialComments={post.comments || []} />
      </div>
      <Footer />
    </>
  );
}
