import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ArticleClientPage from './ArticleClientPage'; 
import { formatTimeSince } from '@/lib/utils'; 
import { getAllArticlesList } from '@/lib/article-helpers'; 


async function getSingleArticleData(articleId) {
    
    const article = await prisma.article.findUnique({
        where: { id: articleId }, 
        include: {
            author: {
                select: { id: true, name: true, avatar: true }
            },
            comments: {
                select: { id: true, text: true, authorName: true, createdAt: true },
                orderBy: { createdAt: 'asc' }
            }
        },
    });

    if (!article) return null;

    const formattedArticle = {
        ...article,
        id: article.id, 
        content: article.content || [], 
        excerpt: article.excerpt || [], 
        time: formatTimeSince(article.createdAt),
        youtube: article.isStream ? article.youtubeId : null, 
        author: {
            id: article.author.id,
            name: article.author.name,
            avatar: article.author.avatar,
        },
        comments: article.comments.map(c => ({
            ...c,
            id: c.id, 
        }))
    };
    
    return formattedArticle;
}


export default async function ArticlePage({ params }) {
    
   
    const awaitedParams = await params;
    
    const articleId = awaitedParams.id; 

    if (!articleId || typeof articleId !== 'string') {
        notFound();
    }
    
    const post = await getSingleArticleData(articleId);

    if (!post) {
        notFound();
    }
    
    const allArticles = await getAllArticlesList(); 
    
    const recommendations = allArticles.filter(a => a.id !== post.id).slice(0, 4);

    return (
        <ArticleClientPage 
            post={post} 
            recommendations={recommendations}
        />
    );
}