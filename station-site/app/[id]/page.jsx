"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { posts } from "../data/posts";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Comments from "../../components/Comments";
import RecommendationsSection from "../../components/RecommendSection";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ArticlePage() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!params?.id) return;

    const postId = Number(params.id);
    const found = posts.find((p) => p.id === postId);
    setPost(found || null);
  }, [params]);

  if (!post) {
    return (
      <main className="text-center py-5">
        <h1>Пост не найден</h1>
      </main>
    );
  }

  return (
    <>
      <Header />

      <div className="container my-5">
        {/* Hero Section */}
        <div className="position-relative mb-5 rounded overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="img-fluid w-100"
            style={{ maxHeight: "600px", objectFit: "cover" }}
          />
          <button
            className="btn btn-light position-absolute top-0 start-0 m-3 rounded-circle"
            onClick={() => history.back()}
          >
            <img src="/image/back.png" alt="Назад" width={20} height={20} />
          </button>
          <div
            className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
            }}
          >
            <div className="mb-2 text-uppercase small">
              <span className="me-3">{post.category}</span>
              <span>{post.time}</span>
            </div>
            <h1 className="fw-bold display-5">{post.title}</h1>
            <div className="d-flex align-items-center justify-content-between mt-3 flex-wrap">
              <div className="d-flex align-items-center">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="rounded-circle me-2"
                    width={35}
                    height={35}
                  />
                )}
                <span className="fw-bold">{post.author.name}</span>
              </div>
              <div className="d-flex gap-3 mt-2 mt-md-0">
                <span className="d-flex align-items-center gap-1">
                  <img src="/image/love.png" alt="Лайк" width={18} height={18} /> 521K
                </span>
                <span
                  className="d-flex align-items-center gap-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const comments = document.getElementById("comments-section");
                    if (comments) comments.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img src="/image/comment.png" alt="Коммент" width={18} height={18} /> 213
                </span>
                <span className="d-flex align-items-center gap-1">
                  <img src="/image/share.png" alt="Поделиться" width={18} height={18} /> 80
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="row mb-5">
          <div className="col-12">
            {post.content.map((p, i) => (
              <p key={i} className="fs-5 text-secondary mb-3">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Inline Image Section */}
        <div className="row mb-5">
          <div className="col-12">
            <img
              src={post.inlineImage}
              alt="Inline"
              className="img-fluid rounded mb-3"
            />
            {post.inlineText && <p className="fs-5 text-secondary">{post.inlineText}</p>}
            {post.inlineText2 && <p className="fs-5 text-secondary">{post.inlineText2}</p>}
            {post.inlineText3 && <p className="fs-5 text-secondary">{post.inlineText3}</p>}
            {post.inlineText4 && <p className="fs-5 text-secondary">{post.inlineText4}</p>}
          </div>
        </div>

        {/* Recommendations Section */}
        <RecommendationsSection
          recommendations={[
            { img: "рек1.JPG", title: "7 инициатив по защите экологии в Казахстане, стартовавших в 2025", meta: "EcoNews - 3 дня назад" },
            { img: "рек2.JPG", title: "Astana Marathon 2025 собрал рекордное количество участников", meta: "Sports.kz - 5 дней назад" },
            { img: "рек3.jpg", title: "Казахстанские ученые создали биоразлагаемый пластик", meta: "KazScience - 2 дня назад" },
            { img: "rec4.JPG", title: "Культурный фестиваль «Мәңгілік Ел» привлек тысячи гостей", meta: "Culture.kz - 6 дней назад" },
          ]}
        />
      </div>

      {/* Comments */}
      <Comments initialComments={post.comments} />

      <Footer />
    </>
  );
}
