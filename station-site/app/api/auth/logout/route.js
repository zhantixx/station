import { NextResponse } from 'next/server';

const COOKIE_NAME = 'auth_token'; 


export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true, message: 'Выход выполнен успешно.' },
            { status: 200 }
        );

        const cookie = `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`;

        response.headers.set('Set-Cookie', cookie);

        return response;

    } catch (error) {
        console.error('Ошибка выхода из системы:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка сервера при выходе.' },
            { status: 500 }
        );
    }
}