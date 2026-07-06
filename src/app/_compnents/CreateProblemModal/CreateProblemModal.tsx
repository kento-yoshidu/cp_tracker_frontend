"use client";

import { SubmitEvent, useState } from "react";
import { CreateProblemInput } from "@/types";
import BasicModal from "../BasicModal/BasicModal";
import Button from "../Button/Button";
import styles from "./createProblemModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateProblemInput) => void;
};

const PLATFORMS = ["AtCoder", "AOJ"] as const;

const initialForm = {
  platform: PLATFORMS[0] as string,
  url: "",
  title: "",
  tags: "",
  difficulty: "",
};

export default function CreateProblemModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (key: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      platform: form.platform,
      url: form.url,
      title: form.title,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      difficulty: Number(form.difficulty),
    });

    setForm(initialForm);
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <BasicModal
      open={open}
      title="問題を追加する"
      onClose={handleClose}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <label className={styles.field}>
          <span>プラットフォーム</span>
          <select
            required
            value={form.platform}
            onChange={handleChange("platform")}
          >
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>URL</span>
          <input
            type="url"
            required
            value={form.url}
            onChange={handleChange("url")}
            placeholder="https://atcoder.jp/contests/abc123/tasks/abc123_a"
          />
        </label>

        <label className={styles.field}>
          <span>タイトル</span>
          <input
            type="text"
            required
            value={form.title}
            onChange={handleChange("title")}
          />
        </label>

        <label className={styles.field}>
          <span>タグ（カンマ区切り）</span>
          <input
            type="text"
            value={form.tags}
            onChange={handleChange("tags")}
            placeholder="dp, greedy"
          />
        </label>

        <label className={styles.field}>
          <span>難易度</span>
          <input
            type="number"
            required
            value={form.difficulty}
            onChange={handleChange("difficulty")}
            placeholder="800"
          />
        </label>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            title="キャンセル"
            onClick={handleClose}
          />

          <Button
            variant="primary"
            title="追加する"
            type="submit"
          />
        </div>
      </form>
    </BasicModal>
  );
}
