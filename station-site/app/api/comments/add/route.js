import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as jose from 'jose';
import { cookies } from 'next/headers'; 

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY_FALLBACK_'); 
const COOKIE_NAME = 'auth_token';

async function verifyUserAndGetId() {
    

    const cookieStore = await cookies(); 
    
    const token = cookieStore[COOKIE_NAME]?.value; 

    if (!token) {
        return { userId: null };
    }

    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        return { userId: payload.userId }; 
    } catch (error) {
        return { userId: null };
    }
}


export async function POST(request) {

    const { userId } = await verifyUserAndGetId();
    
    if (!userId) { 
        return NextResponse.json({ message: 'Требуется авторизация для добавления комментария.' }, { status: 401 });
    }

    try {
        const { articleId, text } = await request.json();

        if (!articleId || !text || text.trim().length === 0) {
            return NextResponse.json({ message: 'Необходимо указать ID статьи и непустой текст.' }, { status: 400 });
        }
        
        const newComment = await prisma.comment.create({
            data: {
                articleId: Number(articleId),
                authorId: userId,
                text: text,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true, 
                    }
                },
            },
        });

        const commentToReturn = {
            id: newComment.id,
            text: newComment.text,
            createdAt: newComment.createdAt,
            authorId: newComment.authorId,
            author: {
                name: newComment.author.name,
                avatar: newComment.author.avatar || '/image/default-avatar.png', 
            }
        };


        return NextResponse.json({ 
            message: 'Комментарий успешно добавлен', 
            comment: commentToReturn 
        }, { status: 201 });

    } catch (error) {
        console.error('Ошибка сервера при добавлении комментария:', error);
        if (error.code === 'P2003') { 
             return NextResponse.json({ message: 'Статья для комментирования не найдена.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Внутренняя ошибка сервера.' }, { status: 500 });
    }
}