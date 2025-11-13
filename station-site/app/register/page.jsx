"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import styles from "../auth.module.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (register(username, email, password)) {
      router.push("/profile");
    } else {
      setError("Имя пользователя или Email уже заняты.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Регистрация</h2>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Пароль (мин. 6 символов)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitBtn}>
            Зарегистрироваться
          </button>
        </form>
        <p className={styles.switchText}>
          Уже есть аккаунт? <a href="/" className={styles.switchLink}>Войти</a>
        </p>
      </div>
    </div>
  );
}