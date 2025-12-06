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
                <h2 className="mb-4">Наши последние посты</h2>
                <div className="row g-4">
                    <PostsSection
                        posts={[
                            { id: 5001, img: "пост1.JPG", title: "Курс тенге стабилизировался после снижения цен на нефть", meta: "Андрей Валентинов - 1 час назад" },
                            { id: 5002, img: "пост2.jpg", title: "Astana Hub объявил о запуске новой программы для IT-стартапов", meta: "Диас Каримов - 3 часа назад" },
                            { id: 5003, img: "пост3.jpg", title: "ООН оценила вклад Казахстана в поддержку устойчивого развития", meta: "Карашаш Жандос - 5 часов назад" },
                            { id: 5004, img: "пост4.JPG", title: "Футбольный клуб «Астана» вышел в финал Кубка Казахстана", meta: "Алдияр Касенов - 6 часов назад" },
                            { id: 5005, img: "пост5.JPG", title: "В Алматы открыли международный фестиваль современного искусства", meta: "Гульназ Ахметова - 1 день назад" },
                            { id: 5006, img: "пост6.JPG", title: "Kcell и Huawei протестировали первую 5G-сеть в Казахстане", meta: "Айдос Нурмаганбетов - 2 дня назад" },
                            { id: 5007, img: "пост7.JPG", title: "Как AI меняет Казахстан: стартапы, образование и госуслуги", meta: "Инжу Балтабекова - 4 дня назад" },
                            { id: 5008, img: "пост8.JPG", title: "Казахстан и ЕС подтвердили совместные усилия по стабилизации Афганистана", meta: "Ербол Тулегенов - 4 дня назад" },
                            { id: 5009, img: "post9.JPG", title: "Рост туризма в Казахстане: новые направления и увеличение посещаемости", meta: "Нурлан Бекжанов - 5 дня назад" },
                        ]}
                    />
                </div>
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