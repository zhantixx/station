import React from "react";
import { searchArticles } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ITEMS_PER_PAGE = 10;

function Pagination({ currentPage, totalPages, query, category }) {
  if (totalPages <= 1) return null;

  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category) params.set("category", category);
  const base = params.toString() ? `?${params.toString()}` : "";

  return (
    <nav className="mt-5 d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link href={`/search${base}&page=${currentPage - 1}`} className="page-link">
            «
          </Link>
        </li>

        {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((p) => (
          <li key={p} className={`page-item ${p === currentPage ? "active" : ""}`}>
            <Link href={`/search${base}&page=${p}`} className="page-link">
              {p}
            </Link>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <Link href={`/search${base}&page=${currentPage + 1}`} className="page-link">
            »
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;

  console.log("🔍 [Server] searchParams resolved:", params);

  const query = (params?.q || "").toString().trim();
  const categoryFilter = (params?.category || "").toString().trim();
  const page = Math.max(1, parseInt(params?.page || "1", 10));

  console.log(`🔍 Поиск: query="${query}", category="${categoryFilter}"`);

  let articles = [];
  if (query || categoryFilter) {
    articles = await searchArticles(query, categoryFilter);
    console.log(` Найдено статей: ${articles.length}`);
  } else {
    console.log("Нет параметров — поиск не выполняется");
  }

  const totalResults = articles.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Header />

      <div className="container py-5" style={{ maxWidth: "1200px", minHeight: "70vh" }}>
        <h1 className="mb-4 fw-bold text-primary">Результаты поиска</h1>

        <div className="mb-4 p-3 bg-light rounded">
          {query && <p><strong>Запрос:</strong> "{query}"</p>}
          {categoryFilter && <p><strong>Категория:</strong> {categoryFilter}</p>}
          {!query && !categoryFilter && (
            <p className="text-muted">Введите запрос в шапке сайта для поиска.</p>
          )}
          {(query || categoryFilter) && (
            <p>
              Найдено: <strong>{totalResults}</strong>{" "}
              {totalResults === 1 ? "статья" : "статей"}
            </p>
          )}
        </div>

        {(query || categoryFilter) && totalResults === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">Ничего не найдено 😔</h3>
            <p className="text-muted">
              Попробуйте изменить запрос или убрать фильтр по категории.
            </p>
            <Link href="/" className="btn btn-primary mt-3">
              На главную
            </Link>
          </div>
        )}

        {paginatedArticles.length > 0 && (
          <>
            <div className="row g-4">
              {paginatedArticles.map((article) => (
                <div key={article.id} className="col-md-6 col-lg-4">
                  <Link href={`/statya/${article.id}`} className="text-decoration-none">
                    <div className="card h-100 shadow-sm hover-shadow">
                      <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                        <Image
                          src={article.heroImage || "/image/default.jpg"}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                        {article.category && (
                          <div className="position-absolute bottom-0 start-0 p-3">
                            <span className="badge bg-primary text-white">
                              {article.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">{article.title}</h5>
                        <p className="card-text text-muted flex-grow-1">
                          {article.description
                            ? article.description.slice(0, 130) +
                              (article.description.length > 130 ? "..." : "")
                            : "Нет описания"}
                        </p>
                        <div className="text-end text-muted small">
                          {article.createdAt &&
                            new Date(article.createdAt).toLocaleDateString("ru-RU")}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              query={query}
              category={categoryFilter}
            />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}