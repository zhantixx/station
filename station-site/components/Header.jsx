"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <nav className={styles.navbarTop}>
          <a href="/" className={styles.logo}>
            <img src="/image/logo header.png" alt="Лого" className={styles.logoImage} />
            <span>Station</span>
          </a>

          <ul className={styles.navLinks}>
            <li><a href="/news" className={styles.active}>Главная</a></li>
            <li><a href="/statya">Статьи</a></li>
            <li><a href="/sports">Спорт</a></li>
            <li><a href="/about">О нас</a></li>
          </ul>

          <button className={styles.loginButton} onClick={handleAuthClick}>
            {isAuthenticated ? "Личный кабинет" : "Войти"}
          </button>
        </nav>

        <div className={styles.divider}></div>

        <div className={styles.searchSection}>
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Поиск по теме что вы хотите найти"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
