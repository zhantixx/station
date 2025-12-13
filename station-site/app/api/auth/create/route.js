import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as jose from 'jose';
import { cookies } from 'next/headers'; 

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY_FALLBACK_'); 
const COOKIE_NAME = 'auth_token';

async function verifyUserAndGetId() {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return { userId: null, role: null };
    }

    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        return { userId: payload.userId, role: payload.role };
    } catch (error) {
        return { userId: null, role: null };
    }
}


export async function POST(request) {
    const { userId, role } = await verifyUserAndGetId();
    
    if (!userId || (role !== 'editor' && role !== 'admin')) { 
        return NextResponse.json({ message: 'Доступ запрещен. Требуется роль Редактора.' }, { status: 403 });
    }

    try {
        const { 
            title, 
            category, 
            categorySlug,
            excerpt, 
            content, 
            heroImage 
        } = await request.json();

        if (!title || !categorySlug || !content) {
            return NextResponse.json({ message: 'Отсутствуют обязательные поля (заголовок, категория, содержание).' }, { status: 400 });
        }

        const newArticle = await prisma.article.create({
            data: {
                title: title,
                category: category, 
                categorySlug: categorySlug, 
                excerpt: excerpt || title.substring(0, 150) + '...', 
                content: content,
                heroImage: heroImage || '/image/default-hero.jpg', 
                authorId: userId, 
                time: "5 min", 
                isStream: false, 
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ 
            message: 'Статья успешно опубликована', 
            articleId: newArticle.id 
        }, { status: 201 });

    } catch (error) {
        console.error('Ошибка сервера при создании статьи:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера.' }, { status: 500 });
    }
}