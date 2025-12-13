import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient.jsx'; 
import { Prisma } from '@prisma/client'; 
import type { Article } from '@prisma/client'; 

const articleInclude = {
    author: {
        select: { id: true, name: true, avatar: true } 
    },
    comments: {
        include: {
            author: { 
                select: { id: true, name: true, avatar: true }
            }
        },
        orderBy: {
            createdAt: 'desc', 
        }
    }
};



function formatTimeSince(date: Date): string {
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


async function getArticleData(id: string) {
  
    if (!id || id.trim() === '') {
        return null;
    }

    const post: any = await prisma.article.findUnique({
        where: { 
            id: id 
        },
        include: articleInclude as any 
    }); 

    if (!post) {
        return null;
    }

    const recommendations = await prisma.article.findMany({
        where: { 
            id: { not: id }, 
            categorySlug: post.categorySlug 
        },
        take: 4,
        orderBy: { 
            createdAt: 'desc' 
        },
        select: {
            id: true,
            title: true,
            categorySlug: true,
        }
    });

  
    const contentString = Array.isArray(post.content) ? post.content.join('\n\n') : '';
    const excerptString = Array.isArray(post.excerpt) ? post.excerpt.join(' ') : null;

    const safePost = {
        ...post,
        content: contentString, 
        excerpt: excerptString, 
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        time: formatTimeSince(post.createdAt),
        
        comments: post.comments.map((comment: any) => ({
            ...comment,
            authorName: comment.author?.name || comment.authorName || 'Аноним', 
            createdAt: comment.createdAt.toISOString()
        }))
    }

    return { post: safePost, recommendations };
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
    const articleId = params.id; 

    const data = await getArticleData(articleId);

    if (!data) {
        notFound(); 
    }

    return (
        <ArticleClient 
            initialPost={data.post} 
            initialRecommendations={data.recommendations} 
        />
    );
}