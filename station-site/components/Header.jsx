"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, currentUser } = useAuth();

    const [searchValue, setSearchValue] = useState("");
    const [showCategories, setShowCategories] = useState(false);

    const categories = [
        "Политика","Спорт","Технологии","Игры","Музыка","Финансы",
        "Путешествия","Культура","Кино","Здоровье","Наука","Образование"
    ];

    const categoryRoutes = {
        "Политика": "/category/politics", 
        "Спорт": "/category/sport", 
        "Технологии": "/category/technologies", 
        "Игры": "/category/games",
        "Музыка": "/category/music",
        "Финансы": "/category/finance",
        "Путешествия": "/category/travel",
        "Культура": "/category/culture",
        "Кино": "/category/movies",
        "Здоровье": "/category/health",
        "Наука": "/category/science",
        "Образование": "/category/education",
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchValue.trim() !== "") {
            router.push(`/search?query=${searchValue}`);
        }
    };

    const handleCategoryClick = (category) => {
        const route = categoryRoutes[category];
        if (route) router.push(route);
        setShowCategories(false);
    };

    const handleAuthClick = () => {
        router.push(isAuthenticated ? "/profile" : "/auth");
    };

    const baseLinkStyle = { 
        fontSize: "18px", 
        textDecoration: "none", 
        color: "white",
        transition: "opacity 0.2s"
    };

    const hoverLinkStyle = {
        opacity: 0.8,
    };

    return (
        <header style={{ backgroundColor: "#1e88e5", width: "100%" }}>
            <Container style={{ maxWidth: "1200px", padding: "0 20px" }}>
                <div className="d-flex align-items-center justify-content-between py-2">
                    
                    <Link href="/" className="d-flex align-items-center text-white text-decoration-none" style={{ fontSize: "18px", fontWeight: "bold" }}>
                        <img src="/image/logo header.png" alt="Лого" style={{ width: "20px", height: "20px", marginRight: "5px" }} />
                        Station
                    </Link>

                    <nav className="d-flex align-items-center gap-4">
                        <Link href="/" style={baseLinkStyle}>Главная</Link>
                        <Link href="/statya" style={baseLinkStyle}>Статьи</Link>

                        <div className="position-relative">
                            <span
                                style={{ ...baseLinkStyle, cursor: "pointer" }}
                                onClick={() => setShowCategories(!showCategories)}
                                onMouseOver={(e) => e.currentTarget.style.opacity = hoverLinkStyle.opacity}
                                onMouseOut={(e) => e.currentTarget.style.opacity = 1}
                            >
                                Категории ▾
                            </span>
                            {showCategories && (
                                <div
                                    className="position-absolute bg-white shadow-lg p-2 rounded"
                                    style={{ top: "30px", left: 0, width: "200px", zIndex: 50 }}
                                >
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className="py-2 px-3 rounded text-dark"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleCategoryClick(cat)}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/about" style={baseLinkStyle}>О нас</Link>
                    </nav>

                    <div className="d-flex align-items-center gap-3">
                        
                        {isAuthenticated && (
                            <Link href="/profile/favorites" className="text-decoration-none">
                                <Button 
                                    variant="warning" 
                                    className="d-flex align-items-center rounded-pill fw-semibold border-0" 
                                    style={{ fontSize: "16px", padding: "8px 15px" }}
                                >
                                    <span style={{ marginRight: '6px' }}>⭐</span>
                                    Избранное 
                                    {currentUser?.favorites?.length > 0 && (
                                        <span className="badge bg-danger ms-2 rounded-pill">
                                            {currentUser.favorites.length}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        )}

                        <Button 
                            variant="warning" 
                            onClick={handleAuthClick} 
                            style={{ fontSize: "18px", padding: isAuthenticated ? "8px 15px" : "8px 25px" }}
                            className="rounded-pill fw-semibold border-0"
                        >
                            {isAuthenticated ? "Личный кабинет" : "Войти"}
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-center pb-3">
                    <div className="position-relative w-100" style={{ maxWidth: "900px" }}>
                        <img src="/image/search.png" alt="search" style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)", width: "20px", height: "20px", opacity: 0.75, pointerEvents: "none" }} />
                        <input
                            type="text"
                            placeholder="Поиск по теме..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{ width: "100%", padding: "12px 15px 12px 50px", fontSize: "16px", borderRadius: "8px", border: "none", outline: "none" }}
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
}