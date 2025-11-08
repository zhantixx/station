"use client";

import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logoImg}>
          <img src="/image/logo.JPG" alt="Лого" />
        </div>
        <div className={styles.logo}>Station</div>
        <nav className={styles.nav}>
          <a href="/news" className={styles.active}>Главное</a>
          <a href="/statya">Статьи</a>
          <a href="/sports">Спорт</a>
          <a href="/about">О нас</a>
        </nav>
      </div>
      <div className={styles.headerRight}>
        <input type="text" className={styles.search} placeholder="Поиск..." />
        <button className={styles.loginBtn}>Войти</button>
      </div>
    </header>
  );
}
