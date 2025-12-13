"use client";

import { useState } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { users } from "../app/data/users"; // ❌ ЭТО УДАЛЯЕМ, будем использовать данные из БД/контекста
import { useAuth } from '@/lib/AuthContext'; // 💡 Используем контекст для получения данных пользователя

export default function Comments({ initialComments, articleId }) {
    // 💡 Используем данные из useAuth
    const { isAuthenticated, user } = useAuth(); 
    
    // Комментарии будут включать в себя данные о пользователе (name, avatar, id)
    const [comments, setComments] = useState(initialComments || []);
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const addComment = async () => {
        if (!isAuthenticated) {
            setError('Вы должны войти, чтобы оставить комментарий.');
            return;
        }

        if (!text.trim()) {
            setError('Комментарий не может быть пустым.');
            return;
        }
        
        setIsSubmitting(true);
        setError(null);

        const newCommentData = {
            articleId: articleId,
            text: text,
            // userId не отправляем, его сервер возьмет из куки.
        };

        try {
            const response = await fetch('/api/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentData),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || 'Ошибка при добавлении комментария.');
                return;
            }

            // Сервер должен вернуть созданный комментарий, включая ID, дату, и информацию о пользователе.
            const createdComment = result.comment;

            // 💡 Обновляем локальное состояние, добавляя новый комментарий
            setComments([createdComment, ...comments]);
            setText("");

        } catch (err) {
            console.error('Ошибка сети или сервера:', err);
            setError('Не удалось связаться с сервером.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 💡 Функция для отображения информации о пользователе.
    // Если комментарий пришел с сервера, он уже должен содержать имя и аватар автора.
    const renderCommentAuthor = (comment) => {
        const authorName = comment.author?.name || comment.name || 'Аноним';
        const authorAvatar = comment.author?.avatar || comment.avatar || '/image/default-avatar.png';
        const authorId = comment.authorId || comment.userId;
        
        return (
            <div className="d-flex align-items-center gap-2 mb-1">
                <img src={authorAvatar} className="rounded-circle" width={50} height={50} alt={authorName} />
                <div className="flex-grow-1">
                    {authorId ? (
                        <Link href={`/users/${authorId}`} className="fw-bold">
                            {authorName}
                        </Link>
                    ) : (
                        <strong>{authorName}</strong>
                    )}
                    {/* Date должен быть ISO-строкой с сервера и форматироваться здесь */}
                    <small className="text-muted ms-2">{comment.date || new Date(comment.createdAt).toLocaleDateString('ru-RU')}</small>
                </div>
            </div>
        );
    };

    return (
        <section className="container my-4">
            <h3>Комментарии ({comments.length})</h3>
            
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex mb-4 gap-3">
                <img 
                    src={user?.avatar || "/image/profile.png"} 
                    className="rounded-circle" 
                    width={50} 
                    height={50} 
                    alt={user?.name || "Аватар"} 
                />
                <div className="flex-grow-1 d-flex flex-column">
                    {!isAuthenticated && (
                        <p className="text-muted">
                            <Link href="/login" className="text-primary fw-bold">Войдите</Link>, чтобы оставить комментарий.
                        </p>
                    )}
                    <textarea
                        className="form-control mb-2"
                        placeholder={isAuthenticated ? "Написать комментарий..." : "Войдите, чтобы написать комментарий..."}
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={!isAuthenticated || isSubmitting}
                    />
                    <button 
                        className="btn btn-primary align-self-start" 
                        onClick={addComment} 
                        disabled={!isAuthenticated || isSubmitting || !text.trim()}
                    >
                        {isSubmitting ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            </div>

            <div className="d-flex flex-column gap-3">
                {comments.map((c) => (
                    <div key={c.id || c.date} className="d-flex gap-3">
                        {renderCommentAuthor(c)}
                        <div className="flex-grow-1">
                            {/* Мы уже отобразили имя и аватар в renderCommentAuthor */}
                            <p className="mb-0">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 💡 ВАЖНО: Вам нужно будет обновить место, где вы используете этот компонент, 
// чтобы передать ему articleId. Например, на странице статьи:
// <Comments initialComments={article.comments} articleId={article.id} />