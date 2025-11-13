import styles from './sports.module.css';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ArticleItem from "@/components/ArticleCard.jsx"; 

export default function SportsPage() {
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
      <Header activePage="sports" />

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Новости спорта</h2>
        <div className={styles.cards}>
          {newsItems.map((item, index) => (
            <ArticleItem
              key={index}
              img={item.img}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
