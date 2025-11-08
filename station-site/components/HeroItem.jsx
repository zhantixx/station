"use client";
import React from "react";
import styles from "./HeroItem.module.css";

export default function HeroItem({ category, time, title, imageText }) {
  return (
    <div className={styles.heroItem}>
      <span className={styles.category}>{category}</span>
      <span className={styles.time}>{time}</span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.image}></div>
      <p className={styles.imageText}>{imageText}</p>
    </div>
  );
}
