import { PrismaClient } from '@prisma/client';


import { articlesData } from "../app/data/articles.js"; 
import { users } from "../app/data/users.js"; 

const prisma = new PrismaClient();


interface Article {
    id: string; 
    title: string;
    img: string;
    heroImage: string;
    authorId: string; 
    category: string;
    categorySlug: string;
    time: string;
    excerpt: string;
    content: string;
    isStream: boolean;
    youtubeId: string | null;
}


function prepareDataForDatabase(sourceData: any, authorMap: Record<string, string>): Article[] {
    const articlesList: Article[] = [];
    
    const DEFAULT_AUTHOR_ID = authorMap['Айдос Нурмаганбетов'] || '101'; 

    const categorySlugs = Object.keys(sourceData);

    for (const slug of categorySlugs) {
        const categoryData = sourceData[slug];
        const categoryName = categoryData.articles?.[0]?.category || categoryData.streams?.[0]?.category || '';

        const processItems = (items: any[], isStream: boolean) => {
            for (const item of items) {
                
                const authorName = item.author?.name || 'Редакция';
                
                const authorId = authorMap[authorName] || DEFAULT_AUTHOR_ID;
                
                let combinedContent = '';
                if (isStream) {
                    combinedContent = (item.content || []).join('\n\n');
                } else {
                    combinedContent = [
                        ...(item.content || []),
                        ...(item.inlineText || []),
                        ...(item.inlineText2 || []),
                        ...(item.inlineText3 || []),
                        ...(item.inlineText4 || []),
                    ].filter(Boolean).join('\n\n');
                }

                articlesList.push({
                    id: String(item.id), 
                    title: item.title,
                    img: item.img,
                    heroImage: isStream ? item.img : item.heroImage, 
                    authorId: authorId, 
                    category: categoryName,
                    categorySlug: slug,
                    time: item.time,
                    excerpt: item.excerpt,
                    content: combinedContent,
                    isStream: isStream,
                    youtubeId: item.youtube || null,
                });
            }
        };

        if (categoryData.articles) {
            processItems(categoryData.articles, false);
        }
        if (categoryData.streams) {
            processItems(categoryData.streams, true);
        }
    }
    return articlesList;
}


function prepareUsersForDatabase(sourceData: any[]): any[] {
    return sourceData.map(user => ({
        id: String(user.id), 
        
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        profileImage: user.profileImage || null,
        bio: user.bio,
        subtitle: user.subtitle || null,
        fullBio: JSON.stringify(user.fullBio || []),
        contacts: JSON.stringify(user.contacts || {}),
    }));
}



async function main() {
    console.log("--- Начало подготовки данных ---");

    const preparedUsers = prepareUsersForDatabase(users);
    console.log(`Подготовлено ${preparedUsers.length} пользователей для загрузки.`);

    const authorMap = preparedUsers.reduce((map: Record<string, string>, user: any) => {
        if (user.role === 'author') {
            map[user.name] = user.id; 
        }
        return map;
    }, {});

    const preparedArticles = prepareDataForDatabase(articlesData, authorMap);
    console.log(`Подготовлено ${preparedArticles.length} статей и стримов для загрузки.`);

    try {
        
        console.log("Удаление устаревших данных...");
        await prisma.article.deleteMany({});
        await prisma.user.deleteMany({});
        console.log("Устаревшие данные удалены.");

         console.log("Создание записей пользователей...");
        const userResult = await prisma.user.createMany({
            data: preparedUsers,
            skipDuplicates: true,
        });
        console.log(`Успешно добавлено ${userResult.count} новых пользователей.`);

 
        console.log("Создание записей статей...");
        const articleResult = await prisma.article.createMany({
            data: preparedArticles as any,
            skipDuplicates: true,
        });
        console.log(`Успешно добавлено ${articleResult.count} новых записей статей.`);

    } catch (error) {
        console.error("Ошибка при загрузке данных в Prisma:", error);
    } finally {
        await prisma.$disconnect();
    }

    console.log("--- Подготовка данных завершена ---");
    return { articles: preparedArticles, users: preparedUsers };
}

main()
    .then(() => {
        console.log("Скрипт сидинга завершен. Данные должны быть в базе.");
    })
    .catch((e) => {
        console.error("Критическая ошибка сидинга:", e);
        process.exit(1);
    });