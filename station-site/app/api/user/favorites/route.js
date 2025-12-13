import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => new PrismaClient();
const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

const getUserIdFromSession = (request) => {
  return "cmj3bc2250000uicg3c25ifmq";

 
};


export async function POST(request) {
  let articleId;
  try {
    const body = await request.json();
    articleId = body.articleId;
  } catch {
    return NextResponse.json({ message: 'Некорректный JSON.' }, { status: 400 });
  }

  const userId = getUserIdFromSession(request);
  if (!userId) {
    return NextResponse.json({ message: 'Требуется аутентификация.' }, { status: 401 });
  }

  articleId = articleId ? String(articleId).trim() : '';
  if (!articleId) {
    return NextResponse.json({ message: 'articleId обязателен.' }, { status: 400 });
  }

  try {
    await prisma.favorite.upsert({
      where: { userId_articleId: { userId, articleId } },
      update: {},
      create: {
        user: { connect: { id: userId } },
        article: { connect: { id: articleId } },
      },
    });

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: { articleId: true },
    });

    const favoriteIds = favorites.map(f => f.articleId);

    return NextResponse.json({ success: true, favorites: favoriteIds });
  } catch (error) {
    console.error('Ошибка добавления в избранное:', error);
    return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  let articleId;
  try {
    const body = await request.json();
    articleId = body.articleId;
  } catch {
    return NextResponse.json({ message: 'Некорректный JSON.' }, { status: 400 });
  }

  const userId = getUserIdFromSession(request);
  if (!userId) {
    return NextResponse.json({ message: 'Требуется аутентификация.' }, { status: 401 });
  }

  articleId = articleId ? String(articleId).trim() : '';
  if (!articleId) {
    return NextResponse.json({ message: 'articleId обязателен.' }, { status: 400 });
  }

  try {
    await prisma.favorite.delete({
      where: { userId_articleId: { userId, articleId } },
    });
  } catch (error) {
    if (error.code !== 'P2025') { 
      console.error('Ошибка удаления:', error);
      return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { articleId: true },
  });

  const favoriteIds = favorites.map(f => f.articleId);

  return NextResponse.json({ success: true, favorites: favoriteIds });
}