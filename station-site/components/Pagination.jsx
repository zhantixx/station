"use client";

import React, { useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        {/* Prev */}
        <button
          className={`${styles.pageLink} ${styles.prevNext} ${
            currentPage === 1 ? styles.disabled : ""
          }`}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#x2039;
        </button>

        {/* Page numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`${styles.pageLink} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          className={`${styles.pageLink} ${styles.prevNext} ${
            currentPage === totalPages ? styles.disabled : ""
          }`}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#x203A;
        </button>
      </div>
    </div>
  );
}
