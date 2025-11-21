"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Для Next 13 app router
import { articles } from "../../data/articles"; 
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RecommendationsSection from "../../../components/RecommendSection";
import Comments from "../../../components/Comments";
import styles from "./articlePost.module.css";

export default function ArticlePage() {
  const params = useParams(); // получаем { id }
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
        {/* Hero */}
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
            </div>
          </div>
        </section>

        {/* Body */}
        <section className={styles.articleBody}>
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* Recommendations */}
        <RecommendationsSection
          recommendations={[
            { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане", meta: "EcoNews - 3 дня назад" },
            { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
          ]}
        />

        {/* Comments */}
        <Comments initialComments={post.comments || []} />
      </div>
      <Footer />
    </>
  );
}
