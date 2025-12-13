import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import * as jose from 'jose'; 
import { cookies } from 'next/headers'; 

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY_FALLBACK_'); 
const COOKIE_NAME = 'auth_token';

export async function POST(request) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return NextResponse.json({ message: 'Заполните все обязательные поля' }, { status: 400 });
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { name: username } 
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ message: 'Email уже используется' }, { status: 409 });
            }
            if (existingUser.name === username) { 
                return NextResponse.json({ message: 'Имя пользователя уже занято' }, { status: 409 });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: username, 
                email: email,
                password: hashedPassword, 
                role: 'reader', 
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                avatar: true,
            }
        });

        const token = await new jose.SignJWT({ 
                userId: newUser.id, 
                role: newUser.role 
            })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') 
            .sign(JWT_SECRET);
            
        const userToReturn = {
            id: newUser.id,
            username: newUser.name, 
            email: newUser.email,
            role: newUser.role,
            favorites: [],
        };

        const response = NextResponse.json({ 
            message: 'Пользователь успешно зарегистрирован',
            user: userToReturn 
        }, { status: 201 });

        const maxAge = 60 * 60 * 24; 
        const cookie = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
        
        response.headers.set('Set-Cookie', cookie);

        return response; 

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера при регистрации' }, { status: 500 });
    }
}