import styles from './sports.module.css';

export default function SportsPage() {
  const logo = "/image/logo.JPG";
  const newsItems = [
    {
      img: "/image/championsleague.jpg",
      title: "«Манчестер Сити» уверенно стартовал в Лиге чемпионов",
      text: "Английский клуб разгромил соперника со счётом 4:0. Хет-трик оформил Эрлинг Холанд.",
    },
    {
      img: "/image/kairat.jpg",
      title: "ФК «Кайрат» вышел в финал Кубка Казахстана",
      text: "Алматинская команда победила «Астану» по сумме двух матчей и теперь сразится за главный трофей страны.",
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoBlock}>
          <img src={logo} alt="Лого" className={styles.logoImg} />
          <div className={styles.logoText}>Station</div>
        </div>
        <nav className={styles.nav}>
          <a href="/news">Главная</a>
          <a href="/statya">Статьи</a>
          <a href="/sports" className={styles.active}>Спорт</a>
          <a href="/about">О нас</a>
        </nav>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Новости спорта</h2>
        <div className={styles.cards}>
          {newsItems.map((item, index) => (
            <article key={index} className={styles.card}>
              <img src={item.img} alt={item.title} className={styles.image} />
              <div className={styles.text}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <img src={logo} alt="Лого Station" />
              <div className={styles.logoText}>Station</div>
            </div>
            <p>© 2025 Station — все права защищены.</p>
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
    </>
  );
}
