"use client";

import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerLogo}>
            <img src="/image/logo.JPG" alt="Лого Station" />
            <div className={styles.logo}>Station</div>
          </div>
          <p>
            Station — актуальные новости и аналитика. Мы помогаем быть в курсе главных событий.
          </p>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <h4>Компания</h4>
            <a href="/about">О нас</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Контакты</a>
          </div>
          <div>
            <h4>Социальные сети</h4>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
