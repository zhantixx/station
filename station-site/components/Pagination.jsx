"use client";

import React, { useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const [current, setCurrent] = useState(1);
  const pages = [1, 2, 3, 4, 5];

  const goPrev = () => {
    if (current > 1) setCurrent(current - 1);
  };

  const goNext = () => {
    if (current < pages.length) setCurrent(current + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        aria-label="Previous"
        onClick={goPrev}
        disabled={current === 1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {pages.map((n) => (
        <button
          key={n}
          className={`${styles.pageBtn} ${current === n ? styles.active : ""}`}
          onClick={() => setCurrent(n)}
        >
          {n}
        </button>
      ))}

      <button
        className={styles.pageBtn}
        aria-label="Next"
        onClick={goNext}
        disabled={current === pages.length}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
