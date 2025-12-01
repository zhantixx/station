"use client";

import React from "react";
import { Pagination as BSPagination } from "react-bootstrap"; 

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const items = [];
  const maxPagesToShow = 5; 

  const halfMaxPages = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <BSPagination.Item 
        key={number} 
        active={number === currentPage} 
        onClick={() => onPageChange(number)}
        className={number === currentPage ? 'custom-blue-active' : 'custom-blue-item'}
      >
        {number}
      </BSPagination.Item>,
    );
  }

  return (
    <>
      {/* Кастомные стили для достижения светло-голубого дизайна. 
        Мы используем чистый, не темный голубой цвет (#60a5fa - light-blue-500 в Tailwind).
      */}
      <style jsx global>{`
        /* Основной цвет для активной страницы и hover акцента */
        .blue-primary {
          --pagination-active-color: #60a5fa; /* Чистый, не темный голубой */
          --pagination-hover-bg: #eff6ff; /* Очень светлый голубой фон при наведении */
          --pagination-hover-border: #93c5fd; /* Более светлый голубой для рамки */
        }
        
        .pagination {
          --bs-pagination-color: #4b5563; /* Серый текст для неактивных */
          --bs-pagination-focus-box-shadow: none;
        }

        /* Общие стили для всех кнопок пагинации */
        .page-item .page-link {
          border-radius: 6px !important; /* Мягкие углы */
          margin: 0 4px;
          transition: all 0.2s ease-in-out;
          border-color: #e5e7eb; /* Светлая рамка */
        }

        /* 1. Активная страница: Светло-голубой фон и белый текст */
        .custom-blue-active .page-link {
          background-color: var(--pagination-active-color);
          border-color: var(--pagination-active-color);
          color: white;
          font-weight: 600;
        }
        
        /* 2. Наведение на неактивную страницу */
        .custom-blue-item .page-link:hover,
        .page-item:not(.disabled) .page-link:hover {
          color: var(--pagination-active-color); /* Голубой текст */
          background-color: var(--pagination-hover-bg); /* Очень светлый голубой фон */
          border-color: var(--pagination-hover-border);
        }

        /* 3. Кнопки Prev/Next */
        .page-item:first-child .page-link,
        .page-item:last-child .page-link {
            border-radius: 6px !important;
        }

        /* Цвет иконок Prev/Next при наведении */
        .page-item:not(.disabled) .page-link:hover {
             color: var(--pagination-active-color); 
        }
        
      `}</style>
      
      {/* Добавляем класс blue-primary для применения кастомных CSS переменных */}
      <BSPagination className="justify-content-center my-4 blue-primary">
        
        <BSPagination.Prev 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          style={{ borderRadius: '6px', margin: '0 4px' }}
        />

        {startPage > 1 && <BSPagination.Ellipsis />}

        {items}

        {endPage < totalPages && <BSPagination.Ellipsis />}
        {totalPages > 1 && endPage < totalPages && (
          <BSPagination.Item onClick={() => onPageChange(totalPages)} className="custom-blue-item">
            {totalPages}
          </BSPagination.Item>
        )}


        <BSPagination.Next 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          style={{ borderRadius: '6px', margin: '0 4px' }}
        />
      </BSPagination>
    </>
  );
}