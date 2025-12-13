import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import * as jose from 'jose'; 

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY_FALLBACK_'); 
const COOKIE_NAME = 'auth_token';

export async function POST(request) {
    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ message: 'Заполните все поля' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { name: username }, 
            select: { id: true, name: true, email: true, password: true, role: true, avatar: true, favorites: { select: { articleId: true } } } 
        });

        if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ message: 'Неверное имя пользователя или пароль' }, { status: 401 });
        }
        
        const token = await new jose.SignJWT({ 
                userId: user.id, 
                role: user.role 
            })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') 
            .sign(JWT_SECRET);
            
        const userToReturn = {
            id: user.id,
            username: user.name, 
            email: user.email,
            role: user.role,
            avatar: user.avatar || '/image/default-avatar.png',
            favorites: user.favorites.map(f => f.articleId),
        };

        const response = NextResponse.json({ 
            message: 'Вход успешен',
            user: userToReturn 
        }, { status: 200 });

        const maxAge = 60 * 60 * 24; 
        const cookie = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
        
        response.headers.set('Set-Cookie', cookie);

        return response; 

    } catch (error) {
        console.error('Ошибка входа:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}