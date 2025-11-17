import React from "react";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import PostsSection from "../../components/PostsSection";
import VideosSection from "../../components/VideoSection";
import RecommendationsSection from "../../components/RecommendSection";
import Footer from "../../components/Footer";
import styles from "./news.module.css";

export default function NewsPage() {
  return (
    <div className={styles.container}>
      <Header />

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

      <PostsSection
        title="Наши последние посты"
        posts={[
          { img: "пост1.JPG", title: "Курс тенге стабилизировался после снижения цен на нефть", meta: "Zakon.kz - 1 день назад" },
          { img: "пост2.jpg", title: "Astana Hub объявил о запуске новой программы для IT-стартапов", meta: "Forbes Kazakhstan - 3 часа назад" },
          { img: "пост3.jpg", title: "ООН оценила вклад Казахстана в поддержку устойчивого развития", meta: "Informburo.kz - 5 часов назад" },
          { img: "пост4.JPG", title: "Футбольный клуб «Астана» вышел в финал Кубка Казахстана", meta: "Vesti.kz - 6 часов назад" },
          { img: "пост5.JPG", title: "В Алматы открыли международный фестиваль современного искусства", meta: "Tengrinews - 1 день назад" },
          { img: "пост6.JPG", title: "Kcell и Huawei протестировали первую 5G-сеть в Казахстане", meta: "Kazinform - 2 дня назад" },
          { img: "пост7.JPG", title: "Как AI меняет Казахстан: стартапы, образование и госуслуги", meta: "Digital Nation - 4 дня назад" },
          { img: "пост8.JPG", title: "Казахстан и ЕС подтвердили совместные усилия по стабилизации Афганистана", meta: "Astana Times - 4 часа назад" },
          { img: "post9.JPG", title: "Рост туризма в Казахстане: новые направления и увеличение посещаемости", meta: "Kazinform - 3 часа назад" },
        ]}
      />

      <VideosSection
        mainVideo={{
          title: "Илья Ильин вернулся в большой спорт — интервью чемпиона",
          meta: "Qazaq TV - 1 день назад",
        }}
        sidebarVideos={[
          {
            title: "Казахстан представил павильон на Expo 2025 в Осаке",
            meta: "Kazinform - 2 дня назад",
          },
          {
            title: "Почему Алматы станет центром падела в Центральной Азии к 2027 году",
            meta: "Sports.kz - 2 дня назад",
          },
          {
            title: "Как Huawei и Kcell протестировали первую 5G-сеть в Казахстане",
            meta: "Kazinform - 3 дня назад",
          },
        ]}
      />

      <div className={styles["newsletter-section"]}>
        <div className={styles["newsletter-container"]}>
          
          <div className={styles["newsletter-left"]}>
            <h2 className={styles["newsletter-title"]}>
              Будьте в курсе последних событий
            </h2>
            <button className={styles["subscribe-button"]}>
              Подписаться
            </button>
          </div>

          <div className={styles["newsletter-right"]}>
            <p className={styles["newsletter-text"]}>
              Получайте главные новости Казахстана каждый день. 
              Никакого спама — только самое важное.
            </p>
          </div>

        </div>
      </div>

      <RecommendationsSection
        recommendations={[
          { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "EcoNews - 3 дня назад" },
          { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
          { img: "рек3.jpg", title: "Казахстанские ученые создали биоразлагаемый пластик", meta: "KazScience - 2 дня назад" },
        ]}
      />

      <Footer />
    </div>
  );
}
