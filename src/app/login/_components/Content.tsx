"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import loginClient from "@/app/apis/login.client";
import styles from "./contents.module.css";

export default function Content() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginClient(username, password);
      router.push("/");
      router.refresh();
    } catch {
      setError("ユーザー名またはパスワードが正しくありません。");
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>ログイン</h2>
        </div>

        <form
          className={styles.form}
          onSubmit={handleLogin}
        >
          <label
            className={styles.field}
            htmlFor="username"
          >
            ユーザー名
            <input
              id="username"
              className={styles.input}
              autoComplete="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label
            className={styles.field}
            htmlFor="password"
          >
            パスワード
            <input
              id="password"
              className={styles.input}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={loading || !username || !password}
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}
