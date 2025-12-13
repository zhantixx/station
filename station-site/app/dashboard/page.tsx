
import { prisma } from '@/lib/prisma'; 


import type { Article, User } from '@prisma/client'; 

export default async function DashboardPage() {
    
    const articles = await prisma.article.findMany({
        orderBy: {
            createdAt: 'desc', 
        },
        include: {
            author: true, 
        },
        take: 10, 
    }) as (Article & { author: User })[];


    if (articles.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Админ-панель (Дашборд)</h1>
                <p className="text-xl text-gray-600">
                    Статьи не найдены. <br />
                    Проверьте, успешно ли прошел запуск команды <code className="font-mono bg-gray-200 p-1 rounded">npm run seed</code>.
                </p>
            </div>
        );
    }


    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 border-b pb-2">
                🌟 Панель управления (Dashboard)
            </h1>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Последние 10 статей из Базы Данных (PostgreSQL)
            </h2>

            <div className="space-y-6">
                {articles.map((article) => (
                    <div key={article.id} className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-bold text-blue-600 mb-2">{article.title}</h3>
                        <p className="text-gray-700 mb-2">
                            **ID:** <span className="font-mono text-sm bg-yellow-100 px-2 rounded">{article.id}</span>
                        </p>
                        <p className="text-gray-700 mb-2">
                            **Автор:** {article.author.name} (Role: {article.author.role})
                        </p>
                        <p className="text-gray-500 text-sm">
                            **Категория:** {article.category} (Slug: {article.categorySlug})
                        </p>
                        <p className="text-sm italic mt-3 border-t pt-2">
                            {article.excerpt}
                        </p>
                    </div>
                ))}
            </div>

            <p className="mt-10 text-center text-green-600 font-medium">
                Если вы видите список статей выше, значит, связка Next.js Server Component + Prisma + PostgreSQL работает!
            </p>
        </div>
    );
}
