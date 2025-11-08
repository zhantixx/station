// app/about/page.jsx
import React from "react";
import styles from "./about.module.css";

const About = () => {
  const logo = "/image/logo.JPG";
  const missionImg = "/image/mission.jpg";
  const teamImg = "/image/team.jpg";
  const operImg = "/image/oper.png";
  const objectImg = "/image/object.png";
  const udobImg = "/image/udob.png";

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="Лого" className={styles.logoImg} />
          <div className={styles.logo}>Station</div>
          <nav className={styles.nav}>
            <a href="/news">Главная</a>
            <a href="/statya">Статьи</a>
            <a href="/sports">Спорт</a>
            <a href="/about" className={styles.active}>О нас</a>
          </nav>
        </div>
        <div className={styles.headerRight}>
          <input type="text" className={styles.search} placeholder="Поиск..." />
          <button className={styles.loginBtn}>Войти</button>
        </div>
      </header>

      {/* Миссия */}
      <section className={`${styles.section} ${styles.mission}`}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Наша миссия</h2>
            <p><strong>Station</strong> — современный новостной портал, который ежедневно рассказывает о главных событиях Казахстана и мира. Мы стремимся к точности и качеству информации.</p>
            <a href="#" className={styles.btn}>Подробнее о проекте</a>
          </div>
          <div className={styles.image}>
            <img src={missionImg} alt="Наша миссия" />
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.image}>
            <img src={teamImg} alt="Наша команда" />
          </div>
          <div className={styles.text}>
            <h2>Кто мы</h2>
            <p>Команда Station — это журналисты, редакторы, дизайнеры и разработчики, которые любят своё дело. Мы создаем контент для каждого, кто хочет быть в курсе событий.</p>
          </div>
        </div>
      </section>

      {/* Карточки преимуществ */}
      <section className={styles.cardsSection}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <img src={operImg} alt="Оперативность" className={styles.cardIcon} />
              <h3>Оперативность</h3>
              <p>Новости публикуются сразу после проверки фактов. Вы всегда получаете актуальную информацию.</p>
            </div>
            <div className={styles.card}>
              <img src={objectImg} alt="Объективность" className={styles.cardIcon} />
              <h3>Объективность</h3>
              <p>Мы не гонимся за сенсациями, а даём читателю честную картину происходящего.</p>
            </div>
            <div className={styles.card}>
              <img src={udobImg} alt="Удобный формат" className={styles.cardIcon} />
              <h3>Удобный формат</h3>
              <p>Адаптивный дизайн, лаконичные тексты и мультимедиа — для удобного чтения на любом устройстве.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLeft}>
            <img src={logo} alt="Лого Station" className={styles.footerLogo} />
            <p>Station — актуальные новости и аналитика. Мы помогаем быть в курсе главных событий.</p>
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
    </div>
  );
};

export default About;
