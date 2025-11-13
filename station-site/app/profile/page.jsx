"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./profile.module.css";

const UserIcon = '👤';
const FavoritesIcon = '⭐';
const SettingsIcon = '⚙️';
const LogoutIcon = '🚪';
const DeleteIcon = '❌';

export default function ProfilePage() {
  const { currentUser, isAuthenticated, logout, removeFavorite } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <>
            <h3 className={styles.sectionTitle}>Основные данные</h3>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Имя пользователя:</span>
              <span className={styles.dataValue}>{currentUser.username}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Email:</span>
              <span className={styles.dataValue}>{currentUser.email}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Дата регистрации:</span>
              <span className={styles.dataValue}>01.01.2024 (Имитация)</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Статус:</span>
              <span className={styles.dataValue}>Активный пользователь</span>
            </div>
          </>
        );
      case 'favorites':
        const favorites = currentUser.favorites || [];
        return (
          <>
            <h3 className={styles.sectionTitle}>Избранные новости ({favorites.length})</h3>
            {favorites.length === 0 ? (
              <p style={{ color: '#888', fontStyle: 'italic' }}>У вас пока нет избранных новостей. Добавьте что-нибудь интересное!</p>
            ) : (
              <div className={styles.favoritesList}>
                {favorites.map((news) => (
                  <div key={news.id} className={styles.favoriteItem}>
                    <div>
                      <a href={`/statya/${news.id}`} className={styles.newsTitle}>{news.title}</a>
                      <p className={styles.newsMeta}>Категория: {news.category} | Дата: {news.date}</p>
                    </div>
                    <button 
                      className={styles.removeBtn} 
                      onClick={() => removeFavorite(news.id)}
                      title="Удалить из избранного"
                    >
                      {DeleteIcon}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      case 'settings':
        return (
          <>
            <h3 className={styles.sectionTitle}>Настройки аккаунта</h3>
            <p style={{ color: '#888' }}>
              Здесь можно было бы реализовать смену пароля, обновление email или настройку уведомлений.
              (Имитация)
            </p>
            <button className={styles.logoutBtn} style={{ background: '#109be9', marginTop: '20px' }}>
              Изменить пароль
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.profilePage}>
        <div className={styles.welcomeHeader}>
          <h2>Личный кабинет</h2>
          <p>Добро пожаловать, {currentUser.username}! Управляйте вашим профилем и избранным контентом.</p>
        </div>

        <div className={styles.profileLayout}>
          <aside className={styles.sidebar}>
            <a
              className={`${styles.navLink} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <span className={styles.icon}>{UserIcon}</span> Информация о профиле
            </a>
            <a
              className={`${styles.navLink} ${activeTab === 'favorites' ? styles.active : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <span className={styles.icon}>{FavoritesIcon}</span> Избранные новости
            </a>
            <a
              className={`${styles.navLink} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className={styles.icon}>{SettingsIcon}</span> Настройки
            </a>
            
            <a className={styles.navLink} onClick={logout}>
              <span className={styles.icon}>{LogoutIcon}</span> Выйти
            </a>
          </aside>

          <main className={styles.content}>
            {renderContent()}
            
            {activeTab === 'info' && (
              <button onClick={logout} className={styles.logoutBtn}>
                Выйти из аккаунта
              </button>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}