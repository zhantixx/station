import styles from './statya.module.css';

export default function StatyaPage() {
  const logo = "/image/logo.JPG";
  const articles = [
    {
      img: "/image/photo1.JPG",
      title: "Как современные технологии и онлайн-платформы меняют образование",
      text: "Онлайн-обучение и цифровые инструменты уже давно стали частью нашей жизни. Сегодня студенты могут получать знания из любой точки мира.",
      author: "Нурсултан Ермеков",
      time: "2 часа назад"
    },
    {
      img: "/image/photo2.jpg",
      title: "Будущее искусственного интеллекта",
      text: "ИИ активно внедряется во все сферы: от медицины до бизнеса. Но сможет ли он заменить человека или останется только инструментом?",
      author: "Динара Сарсенова",
      time: "Вчера"
    },
    {
      img: "/image/photo3.jpg",
      title: "5 советов, как улучшить продуктивность",
      text: "Планирование дня, работа по методу Pomodoro и правильный отдых помогут вам достигать целей быстрее.",
      author: "Арман Бекжанов",
      time: "3 дня назад"
    }
  ];

  const popularWeek = [
    {img:"/image/photo4.jpg", text:"7 способов уменьшить изменение климата", time:"3 часа назад"},
    {img:"/image/photo5.jpg", text:"Почему киты не болеют раком", time:"12 часов назад"},
    {img:"/image/photo6.jpeg", text:"Маленькая луна рядом может стать ступенькой к Марсу", time:"1 день назад"},
    {img:"/image/photo7.jpg", text:"Apple представила iPhone 17 с полностью голографическим экраном", time:"2 дня назад"}
  ];

  const popularMonth = [
    {img:"/image/photo8.JPG", text:"ИИ обыграл чемпионов мира по шахматам", time:"1 нед назад"},
    {img:"/image/photo9.JPG", text:"Netflix запускает сериал по Айтматову", time:"1 нед назад"},
    {img:"/image/photo10.jpg", text:"Археологи нашли древний город в пустыне Сахара", time:"2 нед назад"},
    {img:"/image/photo11.jpg", text:"SpaceX запустила ракету с 120 спутниками", time:"1 мес назад"}
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="Лого" className={styles.logoImg}/>
          <div className={styles.logoText}>Station</div>
          <nav className={styles.nav}>
            <a href="/news">Главная</a>
            <a href="/statya" className={styles.active}>Статьи</a>
            <a href="/sports">Спорт</a>
            <a href="/about">О нас</a>
          </nav>
        </div>
        <div className={styles.headerRight}>
          <input type="text" placeholder="Поиск..." className={styles.search}/>
          <button className={styles.loginBtn}>Войти</button>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.articles}>
          <h2>Статьи</h2>
          {articles.map((art, i) => (
            <article key={i} className={styles.post}>
              <img src={art.img} alt={art.title} className={styles.postImg}/>
              <div className={styles.postContent}>
                <h3>{art.title}</h3>
                <p>{art.text}</p>
                <span className={styles.author}>{art.author}</span> • <span className={styles.time}>{art.time}</span>
              </div>
            </article>
          ))}
          <div className={styles.pagination}>
            <a href="#" className={styles.active}>1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">›</a>
            <a href="#">»</a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.popular}>
            <h3>Популярное за неделю</h3>
            <ul>
              {popularWeek.map((p,i) => (
                <li key={i}>
                  <img src={p.img} className={styles.popImg}/>
                  <div className={styles.popText}>
                    <span>{p.time}</span>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.popmonth}>
            <h3>Популярное за месяц</h3>
            <ul>
              {popularMonth.map((p,i)=>(
                <li key={i}>
                  <img src={p.img} className={styles.popmonthImg}/>
                  <div className={styles.popmonthText}>
                    <span>{p.time}</span>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <img src={logo}/>
              <div className={styles.logoText}>Station</div>
            </div>
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
    </>
  );
}