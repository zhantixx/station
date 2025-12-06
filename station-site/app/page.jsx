"use client";

import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PostsSection from "../components/PostsSection";
import VideosSection from "../components/VideoSection";
import RecommendationsSection from "../components/RecommendSection";
import Footer from "../components/Footer";
import SubscribeCTA from '../components/SubscribeCTA'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NewsPage() {
    
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
  
  <PostsSection 
    posts={[
  {
    id: 5001,
    img: "пост1.JPG",
    title: "Курс тенге стабилизировался после снижения цен на нефть",
    author: { name: "Андрей Валентинов" },
    time: "1 час назад",
    category: "Финансы",
    excerpt: "Нацбанк сообщил о стабилизации курса национальной валюты на фоне падения нефтяных котировок."
  },
  {
    id: 5002,
    img: "пост2.jpg",
    title: "Astana Hub объявил о запуске новой программы для IT-стартапов",
    author: { name: "Диас Каримов" },
    time: "3 часа назад",
    category: "Технологии",
    excerpt: "Industrial AI Acceleration 2025 поможет внедрить искусственный интеллект в крупные предприятия."
  },
  {
    id: 5003,
    img: "пост3.jpg",
    title: "ООН оценила вклад Казахстана в поддержку устойчивого развития",
    author: { name: "Карашаш Жандос" },
    time: "5 часов назад",
    category: "Политика",
    excerpt: "Генсек ООН высоко оценил роль Казахстана как моста между Востоком и Западом."
  },
  {
    id: 5004,
    img: "пост4.JPG",
    title: "Футбольный клуб «Астана» вышел в финал Кубка Казахстана",
    author: { name: "Алдияр Косенов" },
    time: "6 часов назад",
    category: "Спорт",
    excerpt: "Столичная команда победила «Актобе» по сумме двух матчей и сыграет в финале."
  },
  {
    id: 5005,
    img: "пост5.JPG",
    title: "В Алматы открыли международный фестиваль современного искусства",
    author: { name: "Гульназ Ахметова" },
    time: "1 день назад",
    category: "Культура",
    excerpt: "ALA ART FAIR объединил галереи из Казахстана, Кыргызстана и Узбекистана."
  },
  {
    id: 5006,
    img: "пост6.JPG",
    title: "Kcell и Huawei протестировали первую 5G-сеть в Казахстане",
    author: { name: "Айдос Нурмаганбетов" },
    time: "2 дня назад",
    category: "Технологии",
    excerpt: "Скорость достигла 1.8 Гбит/с — это прорыв для промышленности и IoT."
  },
  {
    id: 5007,
    img: "пост7.JPG",
    title: "Как AI меняет Казахстан: стартапы, образование и госуслуги",
    author: { name: "Инжу Балтабекова" },
    time: "4 дня назад",
    category: "Технологии",
    excerpt: "Digital Bridge 2025 и запуск alem.ai — ключевые шаги к Generative Nation."
  },
  {
    id: 5008,
    img: "пост8.JPG",
    title: "Казахстан и ЕС подтвердили совместные усилия по стабилизации Афганистана",
    author: { name: "Ербол Тулегенов" },
    time: "4 дня назад",
    category: "Политика",
    excerpt: "Совместное заявление по итогам встречи в Ташкенте."
  },
  {
    id: 5009,
    img: "post9.JPG",
    title: "Рост туризма в Казахстане: новые направления и увеличение посещаемости",
    author: { name: "Нурлан Бекжанов" },
    time: "5 дней назад",
    category: "Путешествия",
    excerpt: "За 9 месяцев 2025 года страну посетили 11,5 млн иностранных гостей."
  },
]}
  />
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
                <RecommendationsSection
                
                />
            </div>

            <Footer />
        </div>
    );
}