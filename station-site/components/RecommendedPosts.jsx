import { prisma } from '@/lib/prisma';
import RecommendationsSection from './RecommendSection';

async function getRecommendedPosts(count = 5) {
  try {
    const totalArticles = await prisma.article.count();

    if (totalArticles === 0) return [];

    const randomOffsets = [];
    while (randomOffsets.length < count && randomOffsets.length < totalArticles) {
      const offset = Math.floor(Math.random() * totalArticles);
      if (!randomOffsets.includes(offset)) randomOffsets.push(offset);
    }

    const promises = randomOffsets.map(offset =>
      prisma.article.findMany({
        take: 1,
        skip: offset,
        select: {
          id: true,
          title: true,
          excerpt: true,
          img: true,
          heroImage: true,
          createdAt: true,
          author: {
            select: { name: true, avatar: true }
          }
        }
      })
    );

    const results = await Promise.all(promises);
    const articles = results.flat();

    return articles.map(article => ({
      id: article.id,
      title: article.title,
      meta: Array.isArray(article.excerpt) ? article.excerpt[0] || "Без описания" : "Без описания",
      image: article.heroImage || article.img || "/image/placeholder.jpg",
      createdAt: article.createdAt,
      author: {
        name: article.author?.name || "Редакция",
        avatar: article.author?.avatar || null
      }
    }));
  } catch (error) {
    console.error("Ошибка получения рекомендаций:", error);
    return [];
  }
}

export default async function RecommendedPosts() {
  const recommendedPosts = await getRecommendedPosts(5);

  return <RecommendationsSection initialRecommendations={recommendedPosts} />;
}