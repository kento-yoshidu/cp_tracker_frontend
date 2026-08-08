"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import loginClient from "../apis/login.client";

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await loginClient(username, password);

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <label htmlFor="username">ユーザー名</label>
      <input
        id="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">パスワード</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={handleLogin}
      >
        ログイン
      </button>
    </>
  );
}
