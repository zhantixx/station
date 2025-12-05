'use client';

import { users } from "../../data/users";
import { articlesData } from "../../data/articles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useParams, useRouter } from "next/navigation";
import Link from 'next/link';

export default function UserPage() {
  const router = useRouter();
  const params = useParams();

  const userId = Number(params.id);
  const user = users.find(u => Number(u.id) === userId);

  if (!user) {
    return (
      <main className="text-center py-5">
        <h1>Пользователь не найден</h1>
      </main>
    );
  }

  const articlesMap = new Map();
  const allCategories = Object.values(articlesData);

  allCategories.forEach(category => {
    if (category.articles) {
      category.articles.forEach(article => {
        articlesMap.set(Number(article.id), article);
      });
    }
  });
  
  const userArticles = (user.posts || [])
    .map(postInfo => {
      const articleIdNumber = Number(postInfo.id);
      const fullArticle = articlesMap.get(articleIdNumber);
      if (fullArticle) {
        return fullArticle;
      }
      return postInfo;
    })
    .filter(article => article !== undefined);


  const isAuthor = user.role === 'author';
  const roleDisplay = isAuthor ? 'Редактор' : 'Пользователь';
  const subtitleText = user.subtitle;
  const statusClassName = 'text-primary fw-semibold';

  const activityData = user.activityStats || [];

  const renderActivityCard = (data, index) => (
    <div className="col-6 col-md-3" key={index}>
      <div className="card text-center h-100 p-3 shadow-sm border-0 transition-shadow">
        <div className="card-body p-0 d-flex flex-column justify-content-center">
          <i className={`bi ${data.icon} display-6 mb-2 ${data.color}`}></i>
          <h4 className="card-title fw-bolder mb-0 fs-3">{data.count}</h4>
          <p className="card-text text-muted small">{data.label}</p>
        </div>
      </div>
    </div>
  );

  const renderContactCard = (value, display, href, iconComponent, isSpan = false) => {
    if (!value) return null;

    const content = isSpan ? (
      <span className="text-dark small fw-medium">{display}</span>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-dark small fw-medium"
      >
        {display}
      </a>
    );

    return (
      <div className="col-lg-6 col-xl-3" key={display}>
        <div className="d-flex align-items-center p-3 rounded-3 bg-light contact-card transition-shadow">
          <span className="me-3 fs-5 text-primary">{iconComponent}</span>
          {content}
        </div>
      </div>
    );
  };


  return (
    <>
      <Header />

      <main className="container py-5">

        <div className="mb-5">
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={() => router.back()}
            style={{
              borderRadius: "50px",
              padding: "6px 16px",
            }}
          >
            <i className="bi bi-arrow-left"></i>
            <span className="fw-medium">Назад</span>
          </button>
        </div>


        <div className="p-4 mb-5 rounded-4 shadow-sm bg-white">
          <div className="d-flex align-items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className={`rounded-circle me-4 border border-3 border-primary`}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
            <div>
              <h1 className="fs-2 fw-bolder mb-0 text-dark">{user.name}</h1>

              <p className={`${statusClassName} mb-0`}>
                {roleDisplay}
              </p>

              {subtitleText && (
                <p className="text-muted small mb-0 mt-1">
                  {subtitleText}
                </p>
              )}

            </div>
          </div>
        </div>

        <div className="row mb-5 g-5">
          <div className="col-md-5">
            <div className="bg-light rounded-4 shadow-lg p-2">
              <img
                src={user.profileImage || user.avatar}
                alt={`Фото профиля ${user.name}`}
                className="w-100 h-100 rounded-3"
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-7">
            <h2 className="fw-bold mb-4 border-bottom pb-2">Обо Мне</h2>

            <blockquote className="blockquote border-start border-3 border-primary ps-3 mb-4">
              <p className="lead mb-0 text-dark">
                **{user.bio}**
              </p>
            </blockquote>

            {user.fullBio && user.fullBio.length > 0 ? (
              user.fullBio.map((paragraph, index) => (
                <p key={index} className="mb-3 text-secondary">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted">Информация пока не добавлена.</p>
            )}
          </div>
        </div>

        {activityData.length > 0 && !isAuthor && (
          <div className="mt-5 pt-4 border-top">
            <h3 className="fw-bold mb-4 fs-4 text-primary">Активность на Платформе</h3>
            <div className="row g-3">
              {activityData.map((data, index) => renderActivityCard(data, index))}
            </div>
          </div>
        )}

        {isAuthor && user.contacts && (
          <div className="mt-5 pt-4 border-top">
            <h3 className="fw-bold mb-4 fs-4 text-primary">Контакты и Соцсети</h3>

            <div className="row g-3">
              {renderContactCard(user.contacts.email, 'Email', `mailto:${user.contacts.email}`, <i className="bi bi-envelope-fill"></i>)}
              {renderContactCard(user.contacts.phone, user.contacts.phone, `tel:${user.contacts.phone.replace(/\s/g, '')}`, <i className="bi bi-telephone-fill"></i>, true)}
              {renderContactCard(user.contacts.linkedin, 'LinkedIn', user.contacts.linkedin, <i className="bi bi-linkedin"></i>)}
              {renderContactCard(user.contacts.twitter, 'Twitter', user.contacts.twitter, <i className="bi bi-twitter-x"></i>)}
            </div>
          </div>
        )}

        {(isAuthor || userArticles.length > 0) && (
          <>
            <h3 className="fw-bold mb-4 mt-5 pt-4 border-top">
              {isAuthor ? 'Мои статьи' : 'Избранные статьи'}
            </h3>

            {userArticles.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {userArticles.map(article => (
                  <div className="col" key={article.id}>
                    <Link href={`/article/${article.id}`} className="text-decoration-none">
                      <div className="card h-100 border-0 shadow-sm transition-shadow">
                        <img
                          src={article.heroImage || article.image}
                          className="card-img-top rounded-top"
                          alt={article.title}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                        <div className="card-body px-3 py-3">
                          <p className="text-primary fw-medium mb-1" style={{ fontSize: "0.85rem" }}>
                            {article.category}
                          </p>
                          <h5 className="card-title fw-bold text-dark" style={{ fontSize: "1.05rem" }}>
                            {article.title}
                          </h5>
                          <p className="text-muted small mt-2">{article.time}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">У пользователя пока нет статей.</p>
            )}
          </>
        )}
      </main>

      <style jsx global>{`
        .transition-shadow {
          transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .transition-shadow:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
        .contact-card:hover {
          background-color: #e9ecef !important;
        }
        .blockquote.border-start {
            border-left: 5px solid var(--bs-primary) !important;
        }
      `}</style>

      <Footer />
    </>
  );
}