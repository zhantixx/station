"use server";

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();
const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}


export async function searchArticles(query = "", categoryFilter = "") {
  const searchString = query ? query.trim() : "";

  if (!searchString && !categoryFilter) {
    return [];
  }

  const whereConditions = {
    AND: [],
  };

  if (categoryFilter) {
    whereConditions.AND.push({
      category: {
        equals: categoryFilter,
        mode: "insensitive", 
      },
    });
  }

  if (searchString) {
    whereConditions.AND.push({
      OR: [
        { title: { contains: searchString, mode: "insensitive" } },
        
        { excerpt: { hasSome: [searchString] } },
        
        { content: { hasSome: [searchString] } }, 
      ],
    });
  }

  try {
    const articles = await prisma.article.findMany({
      where: whereConditions.AND.length > 0 ? { AND: whereConditions.AND } : undefined,
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        heroImage: true,
        img: true,
        category: true,
        categorySlug: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title || "Без заголовка",
      description: article.excerpt?.join(" ") || article.content?.join(" ") || null,
      content: article.content?.join("\n") || "",
      heroImage: article.heroImage || article.img || "/image/default.jpg",
      img: article.img || "/image/default.jpg",
      category: article.category || "Без категории",
      createdAt: article.createdAt,
    }));
  } catch (error) {
    console.error("DATABASE SEARCH ERROR:", error);
    return [];
  }
}


export async function getFavoriteArticles(userId) {
  "use server";

  if (!userId) return [];

  try {
    const favoriteRecords = await prisma.favorite.findMany({
      where: { userId },
      select: {
        article: {
          select: {
            id: true,
            title: true,
            category: true,
            heroImage: true,
            excerpt: true,
            img: true,
            time: true,
            author: { select: { name: true } },
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return favoriteRecords.map((record) => record.article);
  } catch (error) {
    console.error("DATABASE FETCH FAVORITES ERROR:", error);
    return [];
  }
}


export async function getLatestPosts(userId = null) {
  "use server";

  try {
    const posts = await prisma.article.findMany({
      take: 9,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        img: true,
        heroImage: true,
        excerpt: true,
        category: true,
        time: true,
        author: { select: { name: true } },
      },
    });

    if (userId) {
      const favorites = await prisma.favorite.findMany({
        where: { userId },
        select: { articleId: true },
      });

      const favoriteIdSet = new Set(favorites.map((f) => f.articleId));

      return posts.map((post) => ({
        ...post,
        isFavorite: favoriteIdSet.has(post.id),
      }));
    }

    return posts.map((post) => ({
      ...post,
      isFavorite: false,
    }));
  } catch (error) {
    console.error("Ошибка получения последних постов:", error);
    return [];
  }
}

export async function toggleFavorite(userId, articleId, isFavorite) {
  "use server";

  if (!userId) {
    return { success: false, error: "User not authenticated." };
  }

  const uniqueId = { userId_articleId: { userId, articleId } };

  try {
    if (isFavorite) {
      await prisma.favorite.delete({ where: uniqueId });
    } else {
      await prisma.favorite.create({
        data: { userId, articleId },
      });
    }
    return { success: true };
  } catch (error) {
    console.error("TOGGLE FAVORITE FAILED:", error);
    return { success: false, error: error.message };
  }
}