
import { prisma } from '@/lib/prisma';
import { formatTimeSince } from '@/lib/utils'; 


export async function getAllArticlesList() {
    try {
        const articles = await prisma.article.findMany({
            select: { 
                id: true, 
                title: true, 
                category: true, 
                categorySlug: true, 
                createdAt: true,
                heroImage: true,
                img: true,
            },
            orderBy: { 
                createdAt: 'desc'
            },
        });

        return articles.map(article => ({
            ...article,
            id: article.id, 
            heroImage: article.heroImage || article.img || '/image/default_hero.jpg', 
            time: formatTimeSince(article.createdAt),
            category: article.category, 
        }));

    } catch (error) {
        console.error("Ошибка при получении списка статей:", error);
        return [];
    }
}