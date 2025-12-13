import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PostsSection from "../components/PostsSection";
import VideosSection from "../components/VideoSection";
import RecommendedPosts from "@/components/RecommendedPosts";
import Footer from "../components/Footer";
import SubscribeCTA from "../components/SubscribeCTA";
import "bootstrap/dist/css/bootstrap.min.css";

import { getLatestPosts } from "@/app/actions";

export default async function NewsPage() {
  const sessionUserId = "cmj3bc2250000uicg3c25ifmq";
  const posts = await getLatestPosts(sessionUserId);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Header />

      {/* ===== ПОГОДНЫЙ HERO ===== */}
      <HeroSection
        isMinimal
        metaInfo="Алматы • обновлено 2 часа назад"
        mainTitle={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "3rem", lineHeight: 1 }}>❄️</span>

            <div>
              <div
                style={{
                  fontSize: "2.6rem",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                –15°C
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  opacity: 0.8,
                }}
              >
                Снег и сильный мороз
              </div>
            </div>
          </div>
        }
      />

      {/* ===== ПОСТЫ ===== */}
      <div className="container my-5">
        <h2 className="mb-4 fw-bold">Наши последние посты</h2>
        <PostsSection posts={posts} />
      </div>

      {/* ===== ВИДЕО ===== */}
      <div className="container my-5">
        <VideosSection
          mainVideo={{
            title: "Илья Ильин вернулся в большой спорт — интервью чемпиона",
            meta: "Qazaq TV • 1 день назад",
            url: "https://www.youtube.com/watch?v=JqYZn_UQUsc",
          }}
          sidebarVideos={[
            {
              title: "Казахстан представил павильон на Expo 2025 в Осаке",
              meta: "Телеканал • 2 дня назад",
              url: "https://www.youtube.com/watch?v=Q21aky7hFi0",
            },
            {
              title:
                "Почему Алматы станет центром падела в Центральной Азии к 2027 году",
              meta: "Sports • 2 дня назад",
              url: "https://www.youtube.com/watch?v=gTd9OXQoiuw",
            },
          ]}
        />
      </div>

      {/* ===== ПОДПИСКА ===== */}
      <SubscribeCTA
        title="Будьте в курсе последних событий"
        description="Получайте главные новости Казахстана каждый день. Никакого спама — только самое важное."
      />

      {/* ===== РЕКОМЕНДАЦИИ ===== */}
      <div className="container my-5">
        <RecommendedPosts />
      </div>

      <Footer />
    </div>
  );
}
