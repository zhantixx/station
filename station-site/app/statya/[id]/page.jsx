
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ArticleClientPage from './ArticleClientPage';

export default async function ArticlePage({ params }) {
  const { id } = await params; 

  if (!id) {
    notFound();
  }

  const post = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      heroImage: true,
      img: true,
      youtubeId: true, 
      category: true,
      categorySlug: true,
      time: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
        }
      },
      comments: true,
    }
  });

  if (!post) {
    notFound();
  }
  const recommendations = await prisma.article.findMany({
    where: {
      id: { not: id }
    },
    take: 4,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      title: true,
      excerpt: true,
      img: true,
      heroImage: true,
      time: true,
      author: {
        select: {
          name: true,
          avatar: true
        }
      }
    }
  });

  const formattedRecommendations = recommendations.map(rec => ({
    id: rec.id,
    title: rec.title,
    meta: Array.isArray(rec.excerpt) ? rec.excerpt[0] : "Без описания",
    image: rec.heroImage || rec.img || "/image/placeholder.jpg",
    time: rec.time,
    author: {
      name: rec.author?.name || "Редакция",
      avatar: rec.author?.avatar || null
    }
  }));

  return <ArticleClientPage post={post} recommendations={formattedRecommendations} />;
}