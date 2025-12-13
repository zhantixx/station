import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import PostsSection from "../../../components/PostsSection.jsx"; 
import SmallArticleCard from "../../../components/SmallArticleCard.jsx";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { prisma } from "@/lib/prisma"; 
import { notFound } from 'next/navigation'; 


const categoriesConfig = {
    politics:       { name: "Политика",      color: "#dc3545" },
    music:          { name: "Музыка",        color: "#e83e8c" },
    games:          { name: "Игры",          color: "#0d6efd" },
    finance:        { name: "Финансы",       color: "#ffc107" },
    sport:          { name: "Спорт",         color: "#20c997" },      
    travel:         { name: "Путешествия",   color: "#17a2b8" },
    technologies:   { name: "Технологии",    color: "#6f42c1" },
    culture:        { name: "Культура",      color: "#6c757d" },
    science:        { name: "Наука",         color: "#495057" },
    education:      { name: "Образование",   color: "#2563EB" },     
    movies:         { name: "Кино",          color: "#DC2626" }, 
    health:         { name: "Здоровье",      color: "#10B981" }
};

const getPopularArticles = async () => {
    const allArticles = await prisma.article.findMany({
        orderBy: {
            createdAt: 'desc', 
        },
        select: {
            id: true,
            title: true,
            heroImage: true,
            img: true,
            category: true, 
            time: true,
            categorySlug: true, 
        },
        take: 8, 
    });
    return allArticles;
};


export default async function CategoryPage({ params }) {
    
    const { slug } = await params; 

    const categoryConfig = categoriesConfig[slug];

    if (!categoryConfig) {
        notFound();
    }

    let articles = [];
    let streams = [];
    let categoryArticles = [];

    try {
        categoryArticles = await prisma.article.findMany({
            where: {
                categorySlug: slug, 
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        articles = categoryArticles.filter(a => !a.isStream);
        streams = categoryArticles.filter(a => a.isStream);

    } catch (error) {
        console.error("Ошибка получения статей из категории:", error);
        
        notFound();
    }
    
    
    const allArticlesForPopular = await getPopularArticles();
    const popularWeek = allArticlesForPopular.slice(0, 4);
    const popularMonth = allArticlesForPopular.slice(4, 8);


    return (
        <>
            <Header activePage={slug} />

            <main className="bg-light min-vh-100 py-5">
                <Container>
                    <Row className="justify-content-center mb-5">
                        <Col md={10} lg={8}>
                            <h1
                                className="display-3 fw-bolder text-center pb-3 border-bottom"
                                style={{ color: categoryConfig.color, borderColor: categoryConfig.color }}
                            >
                                {categoryConfig.name}
                            </h1>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        <Col lg={8}>
                            
                            <section className="mb-5">
                                <h2 className="h4 fw-bold mb-4 text-dark border-start border-4 ps-3" style={{ borderColor: categoryConfig.color }}>
                                    Статьи ({articles.length})
                                </h2>
                                {articles.length > 0 ? (
                                    <PostsSection posts={articles} size="small" variant="default" />
                                ) : (
                                    <p className="text-muted fst-italic">Статьи пока отсутствуют.</p>
                                )}
                            </section>

                            <section className="mb-5">
                                <h2 className="h4 fw-bold mb-4 text-dark border-start border-4 ps-3" style={{ borderColor: categoryConfig.color }}>
                                    Трансляции ({streams.length})
                                </h2>
                                {streams.length > 0 ? (
                                    <PostsSection posts={streams} size="small" variant="default" />
                                ) : (
                                    <p className="text-muted fst-italic">Трансляции пока отсутствуют.</p>
                                )}
                            </section>

                        </Col> 


                        <Col lg={4}>
                            
                            <div className="mb-5">
                                <h3 className="fw-bold h5 mb-3 border-start border-3 border-primary ps-2">
                                    Популярное за неделю
                                </h3>
                                <div className="d-flex flex-column gap-3">
                                    {popularWeek.map((item) => (
                                        <SmallArticleCard
                                            key={item.id}
                                            img={item.heroImage || item.img}
                                            category={item.category}
                                            time={item.time}
                                            title={item.title}
                                            href={`/statya/${item.id}`} 
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="fw-bold h5 mb-3 border-start border-3 border-warning ps-2">
                                    Популярное за месяц
                                </h3>
                                <div className="d-flex flex-column gap-3">
                                    {popularMonth.map((item) => (
                                        <SmallArticleCard
                                            key={item.id}
                                            img={item.heroImage || item.img}
                                            category={item.category}
                                            time={item.time}
                                            title={item.title}
                                            href={`/statya/${item.id}`}
                                        />
                                    ))}
                                </div>
                            </div>

                        </Col> 

                    </Row>
                </Container>
            </main>

            <Footer />
        </>
    );
}