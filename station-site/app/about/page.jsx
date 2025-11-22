import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.page}>
      <Header />

      <section className={`${styles.section} ${styles.mission}`}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Наша миссия</h2>
            <p>
              <strong>Station</strong> — современный новостной портал, который ежедневно рассказывает о главных событиях Казахстана и мира. Мы стремимся к точности и качеству информации.
            </p>
            <a href="/about/project" className={styles.btn}>Подробнее о проекте</a>
          </div>
          <div className={styles.image}>
            <img src="/image/mission.jpg" alt="Наша миссия" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.image}>
            <img src="/image/team.jpg" alt="Наша команда" />
          </div>
          <div className={styles.text}>
            <h2>Кто мы</h2>
            <p>
              Команда Station — это журналисты, редакторы, дизайнеры и разработчики, которые любят своё дело. Мы создаем контент для каждого, кто хочет быть в курсе событий.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <img src="/image/oper.png" alt="Оперативность" className={styles.cardIcon} />
              <h3>Оперативность</h3>
              <p>Новости публикуются сразу после проверки фактов. Вы всегда получаете актуальную информацию.</p>
            </div>

            <div className={styles.card}>
              <img src="/image/object.png" alt="Объективность" className={styles.cardIcon} />
              <h3>Объективность</h3>
              <p>Мы не гонимся за сенсациями, а даём читателю честную картину происходящего.</p>
            </div>

            <div className={styles.card}>
              <img src="/image/udob.png" alt="Удобство" className={styles.cardIcon} />
              <h3>Удобство</h3>
              <p>Читаете где угодно: на телефоне, планшете или компьютере. Всё адаптировано под вас.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;