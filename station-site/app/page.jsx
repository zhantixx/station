"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import styles from "./auth.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(username, password)) {
      router.push("/profile");
    } else {
      setError("Неверное имя пользователя или пароль.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Вход в Station</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorText}>{error}</p>}
          
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitBtn}>
            Войти
          </button>
        </form>
        <p className={styles.switchText}>
          Нет аккаунта? <a href="/register" className={styles.switchLink}>Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
}