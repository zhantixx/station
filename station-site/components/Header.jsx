"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

import { articlesData } from "../app/data/articles"; 

const allArticles = Object.values(articlesData).flatMap(category => category.articles || []);

const baseLinkStyle = { 
    fontSize: "18px", 
    textDecoration: "none", 
    color: "white",
    transition: "opacity 0.2s, transform 0.2s"
};

const hoverLinkStyle = {
    opacity: 0.9,
    transform: 'translateY(-1px)'
};

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, currentUser } = useAuth();

    const [searchValue, setSearchValue] = useState("");
    const [showCategories, setShowCategories] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');


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

    const handleApplyFilter = (newValue) => {
        const newCategory = newValue === selectedCategoryFilter ? '' : newValue;

        setSelectedCategoryFilter(newCategory);
        
        handleLiveSearch(searchValue, newCategory);
        setShowFilterDropdown(false); 
    };

    const handleLiveSearch = (value, categoryFilter = selectedCategoryFilter) => {
        setSearchValue(value);
        const query = value.trim().toLowerCase();

        if (query.length > 1 || categoryFilter) {
            let filteredResults = allArticles;

            if (query.length > 1) {
                filteredResults = filteredResults.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    article.excerpt?.toLowerCase().includes(query) ||
                    article.category?.toLowerCase().includes(query)
                );
            }

            if (categoryFilter) {
                filteredResults = filteredResults.filter(article =>
                    article.category.toLowerCase() === categoryFilter.toLowerCase()
                );
            }

            setSearchResults(filteredResults.slice(0, 5)); 
        } else {
            setSearchResults([]); 
        }
    };

    const handleEnterSearch = (e) => {
        if (e.key === "Enter" && searchValue.trim() !== "") {
            
            if (searchResults.length > 0) {
                const firstArticleId = searchResults[0].id;
                router.push(`/statya/${firstArticleId}`);
                setSearchResults([]); 
                setShowFilterDropdown(false);
            } else {
                router.push(`/search?query=${searchValue}`);
                setSearchResults([]); 
                setShowFilterDropdown(false);
            }
        }
    };
    
    const handleResultClick = (id) => {
        router.push(`/statya/${id}`); 
        setSearchResults([]); 
        setSearchValue(""); 
        setShowFilterDropdown(false);
    };


    const handleCategoryClick = (category) => {
        const route = categoryRoutes[category];
        if (route) router.push(route);
        setShowCategories(false);
    };

    const handleAuthClick = () => {
        router.push(isAuthenticated ? "/profile" : "/auth");
    };

    const linkProps = (href) => ({
        href,
        style: baseLinkStyle,
        onMouseOver: (e) => Object.assign(e.currentTarget.style, hoverLinkStyle),
        onMouseOut: (e) => Object.assign(e.currentTarget.style, baseLinkStyle)
    });

    return (
        <header style={{ backgroundColor: "#1565c0", width: "100%", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}>
            <Container style={{ maxWidth: "1200px", padding: "0 20px" }}>
                <div className="d-flex align-items-center justify-content-between py-3">
                    
                    <Link href="/" className="d-flex align-items-center text-white text-decoration-none" style={{ fontSize: "20px", fontWeight: "700" }}>
                        <img src="/image/logo header.png" alt="Лого" style={{ width: "24px", height: "24px", marginRight: "8px" }} />
                        Station
                    </Link>

                    <nav className="d-flex align-items-center gap-5">
                        <Link {...linkProps("/")}>Главная</Link>
                        <Link {...linkProps("/statya")}>Статьи</Link>

                        <div className="position-relative">
                            <span
                                style={{ ...baseLinkStyle, cursor: "pointer", fontWeight: "500" }}
                                onClick={() => setShowCategories(!showCategories)}
                                onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverLinkStyle)}
                                onMouseOut={(e) => Object.assign(e.currentTarget.style, baseLinkStyle)}
                            >
                                Категории ▾
                            </span>
                            {showCategories && (
                                <div
                                    className="position-absolute bg-white shadow-lg p-2 rounded"
                                    style={{ top: "35px", left: 0, width: "200px", zIndex: 50, transform: 'translateY(-5px)', opacity: 0.98 }}
                                >
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className="py-2 px-3 text-dark"
                                            style={{ cursor: "pointer", transition: "background-color 0.15s", borderRadius: "4px" }}
                                            onClick={() => handleCategoryClick(cat)}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e0f2f1"}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link {...linkProps("/about")}>О нас</Link>
                    </nav>

                    <div className="d-flex align-items-center gap-3">
                        
                        {isAuthenticated && (
                            <Link href="/profile/favorites" className="text-decoration-none">
                                <Button 
                                    variant="light" 
                                    className="d-flex align-items-center rounded-pill fw-semibold border-0 text-primary" 
                                    style={{ fontSize: "15px", padding: "8px 18px", boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
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
                            style={{ 
                                fontSize: "16px", 
                                padding: isAuthenticated ? "8px 18px" : "8px 25px",
                                backgroundColor: '#ffc107',
                                color: '#212529',
                                fontWeight: 'bold'
                            }}
                            className="rounded-pill border-0"
                        >
                            {isAuthenticated ? "Личный кабинет" : "Войти"}
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-center pb-4">
                    <div className="position-relative w-100 d-flex align-items-start" style={{ maxWidth: "950px" }}>
                        
                        <div className="position-relative d-flex align-items-center" style={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <img src="/image/search.png" alt="search" style={{ position: "absolute", top: "50%", left: "20px", transform: "translateY(-50%)", width: "20px", height: "20px", opacity: 0.5, pointerEvents: "none" }} />
                            <input
                                type="text"
                                placeholder="Поиск по теме..."
                                value={searchValue}
                                onChange={(e) => handleLiveSearch(e.target.value)} 
                                onKeyDown={handleEnterSearch}
                                style={{ 
                                    width: "100%", 
                                    padding: "12px 15px 12px 50px", 
                                    fontSize: "16px", 
                                    borderRadius: "50px 0 0 50px", 
                                    border: "none", 
                                    outline: "none",
                                    backgroundColor: 'transparent'
                                }}
                            />
                            
                            <button
                                type="button"
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className="btn p-2"
                                style={{ 
                                    height: "44px", 
                                    width: "44px",
                                    backgroundColor: 'transparent', 
                                    border: 'none',
                                    flexShrink: 0,
                                    marginRight: '10px'
                                }}
                            >
                                <img 
                                    src="/image/filtr.png" 
                                    alt="Фильтр" 
                                    style={{ width: "24px", height: "24px", opacity: showFilterDropdown ? 1 : 0.6 }} 
                                />
                            </button>
                        </div>

                        {searchResults.length > 0 && (
                            <div
                                className="position-absolute bg-white shadow-lg rounded mt-1"
                                style={{ 
                                    width: "calc(100% - 0px)", 
                                    zIndex: 60, 
                                    maxHeight: "300px", 
                                    overflowY: "auto", 
                                    top: "54px",
                                    left: 0,
                                    borderRadius: '12px'
                                }}
                            >
                                {searchResults.map((article) => (
                                    <div
                                        key={article.id}
                                        className="d-flex align-items-center p-3"
                                        style={{ cursor: "pointer", borderBottom: '1px solid #eee', transition: 'background-color 0.15s' }}
                                        onClick={() => handleResultClick(article.id)}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e8f0fe"}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                                    >
                                        <img 
                                            src={article.heroImage || article.img || "/image/default.jpg"} 
                                            alt={article.title}
                                            style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "6px", marginRight: "15px" }}
                                        />
                                        <div>
                                            <div className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{article.title}</div>
                                            <div className="text-muted" style={{ fontSize: "0.8rem" }}>{article.category}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                         {searchValue.length > 1 && searchResults.length === 0 && (
                            <div
                                className="position-absolute bg-white shadow-lg rounded mt-1 p-3 text-center text-muted"
                                style={{ width: "100%", zIndex: 60, top: "54px", left: 0, borderRadius: '12px' }}
                            >
                                Ничего не найдено по запросу: "{searchValue}"
                            </div>
                        )}

                        {showFilterDropdown && (
                            <div
                                className="position-absolute bg-white shadow-lg p-4 rounded"
                                style={{ 
                                    top: "54px", 
                                    right: 0, 
                                    width: "350px", 
                                    zIndex: 70,
                                    borderRadius: '12px'
                                }}
                            >
                                <div className="mb-0">
                                    <h6 className="mb-3 fw-bold text-secondary">Фильтр по категориям</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <span 
                                                key={cat}
                                                onClick={() => handleApplyFilter(cat)}
                                                className={`badge rounded-pill p-2 px-3 ${selectedCategoryFilter === cat ? 'bg-primary text-white' : 'bg-light text-dark border border-secondary'}`}
                                                style={{ cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '0.9rem' }}
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}