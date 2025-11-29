"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button } from "react-bootstrap";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "Политика","Спорт","Технологии","Игры","Музыка","Финансы",
    "Путешествия","Культура","Кино","Здоровье","Наука","Образование"
  ];

  const categoryRoutes = {
    "Политика": "/politics","Спорт": "/sports","Технологии": "/technologies",
    "Игры": "/games","Музыка": "/music","Финансы": "/finance",
    "Путешествия": "/travel","Культура": "/culture","Кино": "/movies",
    "Здоровье": "/health","Наука": "/science","Образование": "/education",
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

  return (
    <header style={{ backgroundColor: "#1e88e5", width: "100%" }}>
      <Container style={{ maxWidth: "1200px", padding: "0 20px" }}>
        <div className="d-flex align-items-center justify-content-between py-2">
          <a href="/" className="d-flex align-items-center text-white text-decoration-none" style={{ fontSize: "18px", fontWeight: "bold" }}>
            <img src="/image/logo header.png" alt="Лого" style={{ width: "20px", height: "20px", marginRight: "5px" }} />
            Station
          </a>

          <nav className="d-flex align-items-center gap-3">
            <a href="/" className="text-white" style={{ fontSize: "18px" }}>Главная</a>
            <a href="/statya" className="text-white" style={{ fontSize: "18px" }}>Статьи</a>

            <div className="position-relative">
              <span
                className="text-white"
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() => setShowCategories(!showCategories)}
              >
                Категории ▾
              </span>
              {showCategories && (
                <div
                  className="position-absolute bg-white shadow-sm p-2 rounded"
                  style={{ top: "30px", left: 0, width: "200px", zIndex: 50 }}
                >
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="py-1 px-2 rounded"
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

            <a href="/about" className="text-white" style={{ fontSize: "18px" }}>О нас</a>
          </nav>

          <Button variant="warning" onClick={handleAuthClick} style={{ fontSize: "18px" }}>
            {isAuthenticated ? "Личный кабинет" : "Войти"}
          </Button>
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
