"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";
import { useAuth } from '../../lib/AuthContext';
import Link from 'next/link';

const categories = [
    "Политика", "Спорт", "Технологии", "Игры", "Музыка", "Финансы",
    "Путешествия", "Культура", "Кино", "Здоровье", "Наука", "Образование"
];

const inputStyle = {
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: 'none',
    padding: '12px 15px',
    transition: 'border-color 0.2s',
};

const AccessDeniedMessage = () => (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Card className="shadow-lg text-center p-5" style={{ maxWidth: '600px', borderRadius: '15px' }}>
            <Card.Body>
                <h2 className="text-danger mb-4 fw-bold">🚫 Доступ Запрещен</h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                    Страница создания поста доступна только пользователям с ролью **Редактор**.
                </p>
                <p className="text-dark fw-semibold">
                    Если вы хотите публиковать статьи, <br/> подайте заявку на редактора в вашем профиле:
                </p>
                <Link href="/profile" passHref legacyBehavior>
                    <Button variant="primary" size="lg" className="mt-3 fw-bold" style={{ borderRadius: '50px' }}>
                        Перейти в Профиль
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    </Container>
);

export default function AddPostPage() {
    const router = useRouter();
    const { mounted, isAuthenticated, isEditor } = useAuth();
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]); 
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [heroImage, setHeroImage] = useState(''); 
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !category || !content) {
            setError('Пожалуйста, заполните поля "Заголовок", "Категория" и "Содержание поста".');
            return;
        }
        
        const newPostId = Date.now().toString();
        const newPost = {
            id: newPostId,
            title,
            category,
            categoryLink: `/category/${category.toLowerCase()}`,
            time: "только что",
            author: { name: "Текущий Редактор", avatar: "/image/default-avatar.png" },
            heroImage,
            excerpt,
            content: content.split('\n\n').filter(p => p.trim() !== ''),
        };

        console.log("Новый пост для добавления:", newPost);
        
        setSuccess(`✅ Пост "${title}" успешно подготовлен!`);
        
        setTitle('');
        setExcerpt('');
        setContent('');
        setHeroImage('');
        setCategory(categories[0]);
    };

    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
                <p>Загрузка данных...</p>
            </div>
        ); 
    }

    if (!isAuthenticated || !isEditor()) {
        return (
            <>
                <Header />
                <AccessDeniedMessage />
                <Footer />
            </>
        );
    }
    
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
            <Header /> 
            
            <Container style={{ maxWidth: '900px', padding: '50px 20px', flexGrow: 1 }}>
                
                <h1 className="mb-5 text-dark fw-bold text-center" style={{ fontSize: '2.8rem' }}>
                    <span role="img" aria-label="write" className="me-3">✒️</span> Создание Новой Статьи
                </h1>
                
                <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
                    <Card.Body className="p-md-5 p-4">
                        
                        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
                        {success && <Alert variant="success" className="mb-4">{success}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            
                            <h4 className="text-secondary mb-4 border-bottom pb-2">Основные Атрибуты</h4>
                            
                            <Form.Group className="mb-4" controlId="postTitle">
                                <Form.Label className="fw-semibold text-muted">Заголовок</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Введите заголовок статьи..." 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    size="lg" 
                                    style={inputStyle}
                                />
                            </Form.Group>

                            <div className="row g-4 mb-5">
                                <Form.Group controlId="postCategory" className="col-md-6">
                                    <Form.Label className="fw-semibold text-muted">Категория</Form.Label>
                                    <Form.Select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                        style={inputStyle}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="postHeroImage" className="col-md-6">
                                    <Form.Label className="fw-semibold text-muted">URL Обложки</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text style={{ ...inputStyle, borderRight: 'none' }}>🖼️</InputGroup.Text>
                                        <Form.Control 
                                            type="url" 
                                            placeholder="Ссылка на изображение (https://...)" 
                                            value={heroImage}
                                            onChange={(e) => setHeroImage(e.target.value)}
                                            style={{ ...inputStyle, borderLeft: 'none' }}
                                        />
                                    </InputGroup>
                                    <Form.Text className="text-muted ms-1">
                                        Изображение для превью.
                                    </Form.Text>
                                </Form.Group>
                            </div>

                            <h4 className="text-secondary mb-4 border-bottom pb-2">Содержание</h4>

                            <Form.Group className="mb-4" controlId="postExcerpt">
                                <Form.Label className="fw-semibold text-muted">Краткое описание</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3}
                                    placeholder="Краткое описание для превью..."
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    style={inputStyle}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-5" controlId="postContent">
                                <Form.Label className="fw-semibold text-muted">Полный текст</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={18} 
                                    placeholder="Введите полный текст статьи..." 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    style={{ ...inputStyle, fontFamily: 'Arial, sans-serif' }}
                                />
                                <Form.Text className="text-muted ms-1">
                                    Используйте двойной Enter для создания параграфов.
                                </Form.Text>
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="w-100 py-3 fw-bolder text-uppercase"
                                style={{ 
                                    fontSize: '1.1rem', 
                                    borderRadius: '50px', 
                                    backgroundColor: '#1565c0', 
                                    borderColor: '#1565c0',
                                    boxShadow: '0 8px 15px rgba(21, 101, 192, 0.3)', 
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span role="img" aria-label="publish" className="me-2">🚀</span> Опубликовать Статью
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            
            <Footer />
        </div>
    );
}