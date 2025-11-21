"use client";

import styles from './sports.module.css';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import SportPosts from "@/components/SportPosts.jsx";
import Pagination from "../../components/Pagination";
import { sportArticles, sportStreams } from "../data/sports";

export default function SportsPage() {
  return (
    <>
      <Header activePage="sports" />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Спорт</h1>
          <SportPosts posts={sportArticles} isStream={false} />

          <Pagination />

          <h2 className={styles.streamsTitle}>Трансляции</h2>
          <SportPosts posts={sportStreams} isStream={true} />

          <Pagination />
        </div>
      </main>

      <Footer />
    </>
  );
}
