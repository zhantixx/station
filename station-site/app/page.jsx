import React from "react";
import styles from "./news.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroItem from "@/components/HeroItem";

export default function NewsPage() {
  const heroItems = [
    {
      category: "Innovation",
      time: "2 Hours ago",
      title: "Charge Two Devices at the Same Time With This Magnetic Wireless Charging Dock",
      imageText: "Charge Two Devices at the Same Time With This Magnetic Wireless Charging Dock"
    },
    {
      category: "Science",
      time: "1 Day ago",
      title: "Tiny moon rover could be a stepping stone to Mars",
      imageText: "Tiny moon rover could be a stepping stone to Mars"
    }
  ];

  return (
    <div className={styles["page-wrapper"]}>
      <Header />

      <main className={styles["main-content"]}>
        <section className={styles["hero-section"]}>
          <div className={styles["hero-container"]}>
            {heroItems.map((item, i) => (
              <HeroItem
                key={i}
                category={item.category}
                time={item.time}
                title={item.title}
                imageText={item.imageText}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
