"use client";

import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={`${styles.footerColumn} ${styles.footerBrand}`}>
          <a href="/" className={styles.footerLogo}>
            <img src="/image/logo footer.png" alt="Лого Station" className={styles.logoImage} />
            <span>Station</span>
          </a>
          <p className={styles.brandDescription}>
            Station — актуальные новости и аналитика. Мы помогаем быть в курсе главных событий.
          </p>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Компания</h4>
          <ul className={styles.footerLinks}>
            <li><a href="/about">О нас</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Социальные сети</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerDivider}></div>
    </footer>
  );
}
