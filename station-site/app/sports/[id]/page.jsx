"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import RecommendationsSection from "../../../components/RecommendSection.jsx";
import Comments from "../../../components/Comments.jsx";
import { sportArticles, sportStreams } from "../../data/sports.js";
import styles from "./sportPost.module.css";

export default function SportPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const id = Number(params.id);
    const found = sportArticles.find(p => p.id === id) || sportStreams.find(p => p.id === id);
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

        {/* Hero Section */}
        <section className={styles.articleHero}>
          {post.img && <img src={post.img} alt={post.title} className={styles.heroBgImage} />}
          <a href="/sports" className={styles.backLinkHero}>
            <img src="/image/back.png" alt="Назад" className={styles.backIconImg} />
          </a>
          <div className={styles.heroOverlayContent}>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.articleInfo}>
              <span className={styles.authorName}>{post.author}</span>
              <span className={styles.postDate}>{post.date}</span>
            </div>
          </div>
        </section>

        {/* Body Section */}
        <section className={styles.articleBody}>
          {post.text.split("\n").map((p, i) => (
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
