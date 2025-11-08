"use client";
import React from "react";
import styles from "./news.module.css";

export default function NewsPage() {
  return (
    <div className={styles["page-wrapper"]}>

      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <div className={styles["logo-img"]}>
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
        <div className={styles["header-right"]}>
          <input type="text" className={styles.search} placeholder="Поиск..." />
          <button className={styles["login-btn"]}>Войти</button>
        </div>
      </header>

      <main className={styles["main-content"]}>
        <section className={styles["hero-section"]}>
          <div className={styles["hero-container"]}>
            <span className={styles["hero-category"]}>Innovation</span>
            <span className={styles["hero-category"]}>2 Hours ago</span>
            <h1 className={styles["hero-title"]}>
              Charge Two Devices at the Same Time With This Magnetic Wireless Charging Dock
            </h1>
            <div className={styles["hero-sub-items"]}>
              <div className={styles["hero-sub-item"]}>
                <div className={styles["hero-sub-item-image"]}></div>
                <p className={styles["hero-sub-item-text"]}>
                  Charge Two Devices at the Same Time With This Magnetic Wireless Charging Dock
                </p>
              </div>
              <div className={styles["hero-sub-item"]}>
                <div className={styles["hero-sub-item-image"]}></div>
                <p className={styles["hero-sub-item-text"]}>
                  Tiny moon rover could be a stepping stone to Mars
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles["footer-container"]}>
          <div className={styles["footer-left"]}>
            <div className={styles["footer-logo"]}>
              <img src="/image/logo.JPG" alt="Лого Station" />
              <div className={styles.logo}>Station</div>
            </div>
            <p>Station — актуальные новости и аналитика. Мы помогаем быть в курсе главных событий.</p>
          </div>
          <div className={styles["footer-links"]}>
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

    </div>
  );
}