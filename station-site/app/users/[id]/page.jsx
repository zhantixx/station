import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

import UserClientPage from './UserClientPage'; 

// Улучшенная версия с пробелами и поддержкой единственного числа
function formatTimeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000; // годы
    if (interval > 1) return `${Math.floor(interval)} г. назад`;
    interval = seconds / 2592000; // месяцы
    if (interval > 1) return `${Math.floor(interval)} мес. назад`;
    interval = seconds / 86400; // дни
    if (interval > 1) return `${Math.floor(interval)} д. назад`;
    interval = seconds / 3600; // часы
    if (interval > 1) return `${Math.floor(interval)} ч. назад`;
    interval = seconds / 60; // минуты
    if (interval > 1) return `${Math.floor(interval)} мин. назад`;
    return `${Math.floor(seconds)} сек. назад`;
}

async function getUserData(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            articles: {
                select: {
                    id: true,
                    title: true,
                    categorySlug: true,
                    createdAt: true,
                    // Если у вас есть реальные поля с изображениями — добавьте их:
                    // heroImage: true,
                    // img: true,
                },
                orderBy: { createdAt: 'desc' },
            },
            favorites: {
                include: {
                    article: {
                        select: {
                            id: true,
                            title: true,
                            categorySlug: true,
                            createdAt: true,
                            authorId: true,           // ← обязательно для фильтрации
                            // heroImage: true,       // ← если есть
                            // img: true,             // ← если есть
                            author: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            }
        },
    });

    if (!user) return null;

    // Форматирование одной статьи
    const formatArticle = (article, authorName = null) => ({
        id: String(article.id),
        title: article.title,
        category: article.categorySlug || null,  // PostsSection использует .category
        time: formatTimeSince(article.createdAt),
        heroImage: article.heroImage || '/image/default_hero.jpg',  // приоритет heroImage
        img: article.img || 'default_thumb.jpg',                    // fallback для старого пути
        author: authorName ? { name: authorName } : null,           // только для чужих статей в избранном
    });

    // Опубликованные статьи (свои)
    const publishedArticles = user.articles.map(article =>
        formatArticle(article)
    );

    // Избранные статьи — исключаем свои + добавляем автора
    const favoriteArticles = user.favorites
        .map(fav => fav.article)
        .filter(article => article !== null && article.authorId !== user.id) // ← убираем свои
        .map(article =>
            formatArticle(article, article.author?.name || 'Неизвестный автор')
        );

    return {
        userData: {
            id: String(user.id),
            name: user.name,
            avatar: user.avatar || '/image/ava.png',
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
            userId={userId}
        />
    );
}