"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [showCategories, setShowCategories] = useState(false); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAuthClick = () => {
    router.push(isAuthenticated ? "/profile" : "/login");
  };


  const categories = [
    "Политика",
    "Спорт",
    "Технологии",
    "Игры",
    "Музыка",
    "Финансы",
    "Путешествия",
    "Культура",
    "Кино",
    "Здоровье",
    "Наука",
    "Образование",
  ];

 
  const categoryRoutes = {
    "Политика": "/politics",
    "Спорт": "/sports",
    "Технологии": "/tech",
    "Игры": "/games",
    "Музыка": "/music",
    "Финансы": "/finance",
    "Путешествия": "/travel",
    "Культура": "/culture",
    "Кино": "/movies",
    "Здоровье": "/health",
    "Наука": "/science",
    "Образование": "/education",
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

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <nav className={styles.navbarTop}>
          <a href="/news" className={styles.logo}>
            <img src="/image/logo header.png" alt="Лого" className={styles.logoImage} />
            <span>Station</span>
          </a>

          <ul className={styles.navLinks}>
            <li><a href="/news" className={styles.active}>Главная</a></li>
            <li><a href="/statya">Статьи</a></li>

        
            <li className={styles.categoriesWrapper}>
              <span
                className={styles.categoriesButton}
                onClick={() => setShowCategories((prev) => !prev)}
              >
                Категории ▾
              </span>

              {showCategories && (
                <div className={styles.categoriesDropdown}>
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className={styles.categoryItem}
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li><a href="/about">О нас</a></li>
          </ul>

          <button className={styles.loginButton} onClick={handleAuthClick}>
            {isAuthenticated ? "Личный кабинет" : "Войти"}
          </button>
        </nav>

        <div className={styles.divider}></div>

        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <img src="/image/search.png" className={styles.searchIcon} alt="search" />
            <input
              type="text"
              placeholder="Поиск по теме..."
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
