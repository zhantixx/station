import { users } from "../../data/users";
import Header from "../../../components/Header"; // Обновленный путь
import Footer from "../../../components/Footer"; // Обновленный путь

export default async function UserPage({ params }) {
  // Разрешаем params (Next.js 13+)
  const resolvedParams = await params; 
  const userId = Number(resolvedParams.id);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return (
      <main className="text-center py-5">
        <h1>Пользователь не найден</h1>
      </main>
    );
  }

// ✅ Получаем статьи напрямую из объекта пользователя
  const userArticles = user.posts || [];
  
  return (
    <>
      <Header />
      
      <main className="container py-5">
        
        {/* 1. Блок профиля (СВЕРХУ) */}
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
            <p className="text-muted mb-0">{user.subtitle || 'Редактор'}</p>
          </div>
        </div>

        {/* 2. Основная двухколоночная секция */}
        <div className="row mb-5 g-5"> 
          
          {/* Колонка "Фото" - Слева */}
          <div className="col-md-5"> 
            <div className="bg-light d-flex justify-content-center align-items-center rounded-3" style={{ height: '400px', backgroundColor: '#e0e0e0' }}> 
              <span className="text-muted fs-2">Фото</span>
            </div>
          </div>

          {/* Колонка "Обо Мне" - Справа */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">Обо Мне</h2>
            {/* Динамический контент: fullBio, разделенные по абзацам */}
            <p className="mb-3">
              **{user.bio}**
            </p>
            {user.fullBio && user.fullBio.map((paragraph, index) => (
                <p key={index} className="mb-3">{paragraph}</p>
            ))}
            {!user.fullBio && (
              <p className="mb-3 text-muted">
                Дополнительная информация о пользователе пока не добавлена.
              </p>
            )}
          </div>
        </div>

        {/* 3. Секция "Мои статьи" - Ниже, занимает всю ширину */}
        <h3 className="fw-bold mb-4">Мои статьи</h3>
        {userArticles.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {userArticles.map(article => (
              <div className="col" key={article.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={article.image || "/image/placeholder.png"}
                    className="card-img-top rounded" 
                    alt="Article thumbnail"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body px-0 py-2">
                    <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>{article.category}</p>
                    <h5 className="card-title fw-bold" style={{ fontSize: '1.0rem' }}>{article.title}</h5> 
                    <p className="card-text">
                      <small className="text-muted">{article.time}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">У этого пользователя пока нет опубликованных статей.</p>
        )}
      </main>
      
      <Footer />
    </>
  );
}