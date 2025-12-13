import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as jose from 'jose';
import { cookies } from 'next/headers'; 

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY_FALLBACK_'); 
const COOKIE_NAME = 'auth_token';

export async function GET() {
    
    let token = null;
    try {
        const cookieStore = await cookies(); 
        token = cookieStore[COOKIE_NAME]?.value; 
    } catch (e) {
        console.error("Ошибка чтения куки в сессии:", e);
        return NextResponse.json({ isAuthenticated: false, user: null }, { status: 401 });
    }


    if (!token) {
        return NextResponse.json({ isAuthenticated: false, user: null }, { status: 401 });
    }

    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        const userId = payload.userId; 

        if (!userId) {
             return NextResponse.json({ isAuthenticated: false, user: null }, { status: 401 });
        }

        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                favorites: {
                    select: { articleId: true }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ isAuthenticated: false, user: null }, { status: 404 });
        }
        
        const userToReturn = {
            id: user.id,
            username: user.name, 
            email: user.email,
            role: user.role,
            avatar: user.avatar || '/image/default-avatar.png',
            favorites: user.favorites.map(f => f.articleId),
        };

        return NextResponse.json({ 
            isAuthenticated: true, 
            user: userToReturn 
        }, { status: 200 });

    } catch (error) {
        console.error('Ошибка верификации токена сессии:', error);
        return NextResponse.json({ isAuthenticated: false, user: null, message: 'Сессия истекла или недействительна.' }, { status: 401 });
    }
}