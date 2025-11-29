'use client';

import { users } from "../../data/users";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useParams, useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const params = useParams(); 

  const userId = Number(params.id); 
  const user = users.find(u => u.id === userId);

  if (!user) {
    return (
      <main className="text-center py-5">
        <h1>Пользователь не найден</h1>
      </main>
    );
  }

  const userArticles = user.posts || [];

  return (
    <>
      <Header />

      <main className="container py-5">

         <div className="mb-4">
    <button
      className="btn d-flex align-items-center gap-2"
      onClick={() => router.back()}
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: "8px 14px",
        border: "1px solid #ddd",
      }}
    >
      <img src="/image/back.png" alt="Назад" width={20} height={20} />
      <span className="fw-medium">Назад</span>
    </button>
  </div>

        <div className="d-flex align-items-center mb-5 p-4 rounded-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="rounded-circle me-3"
            width={80}
            height={80}
            style={{ objectFit: 'cover', backgroundColor: 'lightgreen' }}
          />
          <div>
            <h1 className="fs-3 fw-bold mb-0">{user.name}</h1>
            <p className="text-muted mb-0">{user.subtitle || "Редактор"}</p>
          </div>
        </div>

        <div className="row mb-5 g-5">
          <div className="col-md-5">
            <div
              className="bg-light d-flex justify-content-center align-items-center rounded-3"
              style={{ height: "400px", overflow: "hidden" }}
            >
              <img
                src={user.profileImage || user.avatar}
                alt={`Фото профиля ${user.name}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-7">
            <h2 className="fw-bold mb-3">Обо Мне</h2>

            <p className="mb-3">
              <strong>{user.bio}</strong>
            </p>

            {user.fullBio ? (
              user.fullBio.map((paragraph, index) => (
                <p key={index} className="mb-3">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted">Информация пока не добавлена.</p>
            )}
          </div>
        </div>

        {user.contacts && (
          <div className="mt-5 pt-3 border-top">
            <h3 className="fw-bold mb-3 fs-5">Контакты и Соцсети</h3>

            <div className="row g-2">
              {user.contacts.email && (
                <div className="col-lg-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <span className="me-2">📩</span>
                    <a
                      href={`mailto:${user.contacts.email}`}
                      className="text-decoration-none text-dark small fw-medium"
                    >
                      Email
                    </a>
                  </div>
                </div>
              )}

              {user.contacts.phone && (
                <div className="col-lg-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <span className="me-2">📱</span>
                    <span className="text-dark small fw-medium">
                      {user.contacts.phone}
                    </span>
                  </div>
                </div>
              )}

              {user.contacts.linkedin && (
                <div className="col-lg-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <span className="me-2">🔗</span>
                    <a
                      href={user.contacts.linkedin}
                      target="_blank"
                      className="text-decoration-none text-dark small fw-medium"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              )}

              {user.contacts.twitter && (
                <div className="col-lg-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <span className="me-2">🐦</span>
                    <a
                      href={user.contacts.twitter}
                      target="_blank"
                      className="text-decoration-none text-dark small fw-medium"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <h3 className="fw-bold mb-4 mt-5 pt-3 border-top">Мои статьи</h3>

        {userArticles.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {userArticles.map(article => (
              <div className="col" key={article.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={article.image}
                    className="card-img-top rounded"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body px-0 py-2">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                      {article.category}
                    </p>
                    <h5 className="card-title fw-bold" style={{ fontSize: "1rem" }}>
                      {article.title}
                    </h5>
                    <p className="text-muted small">{article.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">У пользователя пока нет статей.</p>
        )}
      </main>

      <Footer />
    </>
  );
}
