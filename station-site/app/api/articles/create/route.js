import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { title, category, categorySlug, excerpt, content, heroImage, userId } = body;

    if (!title || !category || !content || !userId) {
      return NextResponse.json(
        { message: "Заполните все обязательные поля и войдите в аккаунт" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "Пользователь не найден" }, { status: 401 });
    }

    if (user.role !== "editor") {
      return NextResponse.json({ message: "Доступ запрещен. Только для редакторов." }, { status: 403 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content: typeof content === 'string' ? content.split('\n\n') : content,
        excerpt: excerpt ? (typeof excerpt === 'string' ? excerpt.split('\n\n') : excerpt) : [],
        category,
        categorySlug: categorySlug || category.toLowerCase(),
        heroImage: heroImage || null,
        img: heroImage || null,
        authorId: user.id, 
      },
    });

    return NextResponse.json({
      message: "Статья успешно создана!",
      articleId: article.id,
    }, { status: 201 });

  } catch (error) {
    console.error("Ошибка создания статьи:", error);
    return NextResponse.json(
      { message: "Ошибка сервера при создании статьи" },
      { status: 500 }
    );
  }
}