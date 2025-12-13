import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

import UserClientPage from './UserClientPage'; 


function formatTimeSince(date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    
    if (interval > 1) { return Math.floor(interval) + " г. назад"; }
    interval = seconds / 2592000;
    if (interval > 1) { return Math.floor(interval) + " мес. назад"; }
    interval = seconds / 86400;
    if (interval > 1) { return Math.floor(interval) + " д. назад"; }
    interval = seconds / 3600;
    if (interval > 1) { return Math.floor(interval) + " ч. назад"; }
    interval = seconds / 60;
    if (interval > 1) { return Math.floor(interval) + " мин. назад"; }
    return Math.floor(seconds) + " сек. назад";
}

async function getUserData(userId) {
    
    const user = await prisma.user.findUnique({
        where: { 
            id: userId 
        },
        include: {
            articles: {
                select: {
                    id: true,
                    title: true,
                    categorySlug: true, 
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
            favorites: {
                include: {
                    article: {
                        select: {
                            id: true,
                            title: true,
                            categorySlug: true,
                            createdAt: true,
                        }
                    }
                }
            }
        },
    });

    if (!user) {
        return null;
    }
    
    
    const publishedArticles = user.articles.map(article => ({
        ...article,
        heroImage: '/image/default_hero.jpg', 
        image: '/image/default_thumb.jpg',
        category: article.categorySlug, 
        time: formatTimeSince(article.createdAt),
        id: String(article.id)
    }));

    const favoriteArticles = user.favorites
        .map(fav => fav.article)
        .filter(article => article !== null) 
        .map(article => ({
            ...article,
            heroImage: '/image/default_hero.jpg', 
            image: '/image/default_thumb.jpg',
            category: article.categorySlug,
            time: formatTimeSince(article.createdAt),
            id: String(article.id)
        }));

    
    return {
        userData: {
            id: String(user.id),
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            subtitle: user.subtitle,
            bio: user.bio,
            fullBio: JSON.parse(user.fullBio || '[]'), 
            profileImage: user.profileImage,
            activityStats: [
                { icon: 'bi-file-text', count: publishedArticles.length, label: 'Статей опубликовано', color: 'text-success' },
                { icon: 'bi-chat-dots', count: 0, label: 'Комментариев', color: 'text-info' }, 
                { icon: 'bi-heart', count: user.favorites.length, label: 'Понравилось', color: 'text-danger' },
            ],
            contacts: user.contacts, 
        },
        publishedArticles,
        favoriteArticles,
    };
}



export default async function UserPage({ params }) {
    
    const resolvedParams = await params;
    const userId = resolvedParams.id; 

    if (!userId || typeof userId !== 'string') {
        notFound();
    }

    const data = await getUserData(userId);

    if (!data) {
        notFound();
    }
    
    return (
        <UserClientPage 
            user={data.userData} 
            publishedArticles={data.publishedArticles}
            favoriteArticles={data.favoriteArticles}
        />
    );
}