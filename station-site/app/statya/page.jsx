import { prisma } from '@/lib/prisma';
import StatyaClientPage from './StatyaClientPage'; 
import { formatTimeSince } from '@/lib/utils'; 


async function getArticlesList() {
    
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
            createdAt: 'desc',
        },
    });

    if (!articles) {
        return [];
    }

    return articles.map(article => ({
        ...article,
        heroImage: article.heroImage || article.img || '/image/default_hero.jpg', 
        time: formatTimeSince(article.createdAt),
        id: String(article.id)
    }));
}


export default async function StatyaPage() {
    const allArticles = await getArticlesList();
    
    return <StatyaClientPage allArticles={allArticles} />;
}