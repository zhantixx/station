"use client";

import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PostsSection from "../components/PostsSection";
import VideosSection from "../components/VideoSection";
import RecommendationsSection from "../components/RecommendSection";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NewsPage() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="container-fluid p-0">
            <HeroSection
              metaInfo="Обновлено • 2 часа назад"
              mainTitle="Снег и морозы до –15°C ожидаются"
              backgroundImage="/image/фото1.jpg"
              thumbnails={[
                {
                  img: "https://exclusive.kz/wp-content/uploads/2025/08/img_6879.webp",
                  title: "В Казахстане ожидается резкое похолодание",
                  main: true,
                },
                {
                  img: "https://adm-english-prime-site.seok.com.ua/uploads/image/1-5-pogoda-na-anglijskom-1.jpg",
                  title: "Гололед и туман — предупреждение Казгидромета",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container my-5">
        <h2 className="mb-4">Наши последние посты</h2>
        <div className="row g-4">
          <PostsSection
            posts={[
              { id: 1, img: "пост1.JPG", title: "Курс тенге стабилизировался после снижения цен на нефть", meta: "Андрей Валентинов - 1 день назад" },
              { id: 2, img: "пост2.jpg", title: "Astana Hub объявил о запуске новой программы для IT-стартапов", meta: "Astana Hub - 3 часа назад" },
              { id: 3, img: "пост3.jpg", title: "ООН оценила вклад Казахстана в поддержку устойчивого развития", meta: "Карашаш Жандос - 5 часов назад" },
              { id: 4, img: "пост4.JPG", title: "Футбольный клуб «Астана» вышел в финал Кубка Казахстана", meta: "Алдияр Касенов - 6 часов назад" },
              { id: 5, img: "пост5.JPG", title: "В Алматы открыли международный фестиваль современного искусства", meta: "Гульназ Ахметова - 1 день назад" },
              { id: 6, img: "пост6.JPG", title: "Kcell и Huawei протестировали первую 5G-сеть в Казахстане", meta: "Айдос Нурмаганбетов - 2 дня назад" },
              { id: 7, img: "пост7.JPG", title: "Как AI меняет Казахстан: стартапы, образование и госуслуги", meta: "Инжу Балтабекова - 4 дня назад" },
              { id: 8, img: "пост8.JPG", title: "Казахстан и ЕС подтвердили совместные усилия по стабилизации Афганистана", meta: "Ербол Тулегенов - 4 часа назад" },
              { id: 9, img: "post9.JPG", title: "Рост туризма в Казахстане: новые направления и увеличение посещаемости", meta: "Нурлан Бекжанов - 3 часа назад" },
            ]}
          />
        </div>
      </div>

      {/* Videos Section */}
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

      {/* Newsletter Section */}
      <div className="container my-5 p-4 rounded bg-primary text-white d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="flex-grow-1">
          <h2>Будьте в курсе последних событий</h2>
          <button className="btn btn-warning mt-2">Подписаться</button>
        </div>
        <div className="flex-grow-1">
          <p>Получайте главные новости Казахстана каждый день. Никакого спама — только самое важное.</p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="container my-5">
        <RecommendationsSection
          recommendations={[
            { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "Алия Мухамеджанова - 3 дня назад" },
            { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Айдана Жумабекова - 5 дней назад" },
            { img: "рек3.jpg", title: "Казахстанские ученые создали биоразлагаемый пластик", meta: "Нурлан Жаксылыков - 2 дня назад" },
            { img: "rec4.JPG", title: "Культурный фестиваль «Мәңгілік Ел» привлек тысячи гостей", meta: "Данияр Тургенов - 6 дней назад" },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
