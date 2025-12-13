import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PostsSection from "../components/PostsSection";
import VideosSection from "../components/VideoSection";
import RecommendedPosts from '@/components/RecommendedPosts';
import Footer from "../components/Footer";
import SubscribeCTA from '../components/SubscribeCTA';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getLatestPosts } from '@/app/actions';


export default async function NewsPage() {
 
  const sessionUserId = "cmj3bc2250000uicg3c25ifmq";

  const posts = await getLatestPosts(sessionUserId);

  return (
    <div>
      <Header />

      <HeroSection
        metaInfo="Обновлено • 2 часа назад"
        mainTitle="Снег и морозы до –15°C ожидаются"
        backgroundImage="/image/фото1.jpg"
        thumbnails={[
          {
            img: "https://exclusive.kz/wp-content/uploads/2025/08/img_6879.webp",
            title: "В Казахстане ожидается резкое похолодание",
          },
          {
            img: "https://adm-english-prime-site.seok.com.ua/uploads/image/1-5-pogoda-na-anglijskom-1.jpg",
            title: "Гололед и туман — предупреждение Казгидромета",
          },
        ]}
      />

      <div className="container my-5">
        <h2 className="mb-4 fw-bold">Наши последние посты</h2>

        <PostsSection posts={posts} />
      </div>

      <div className="container my-5">
        <VideosSection
          mainVideo={{
            title: "Илья Ильин вернулся в большой спорт — интервью чемпиона",
            meta: "Qazaq TV - 1 день назад",
            url: "https://www.youtube.com/watch?v=JqYZn_UQUsc",
          }}
          sidebarVideos={[
            {
              title: "Казахстан представил павильон на Expo 2025 в Осаке",
              meta: "Телеканал - 2 дня назад",
              url: "https://www.youtube.com/watch?v=Q21aky7hFi0",
            },
            {
              title: "Почему Алматы станет центром падела в Центральной Азии к 2027 году",
              meta: "Sports - 2 дня назад",
              url: "https://www.youtube.com/watch?v=gTd9OXQoiuw",
            },
          ]}
        />
      </div>

      <SubscribeCTA
        title="Будьте в курсе последних событий"
        description="Получайте главные новости Казахстана каждый день. Никакого спама — только самое важное."
      />

      <div className="container my-5">
        <RecommendedPosts />
      </div>

      <Footer />
    </div>
  );
}