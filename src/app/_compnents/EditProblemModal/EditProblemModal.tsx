"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import updateProblemClient from "@/app/apis/updateProblem.client";
import type { Problem, UpdateProblemInput } from "@/types";
import BasicModal from "../BasicModal/BasicModal";
import Button from "../Button/Button";
import styles from "../CreateProblemModal/createProblemModal.module.css";
import FullScreenLoading from "../UI/FullScreenLoading";
import SnackBar from "../UI/SnackBar";

type Props = {
  problem: Problem;
  onClose: () => void;
};

const PLATFORMS = ["AtCoder", "AOJ"] as const;

export default function EditProblemModal({ problem, onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    platform: problem.platform,
    url: problem.url,
    title: problem.title,
    tags: problem.tags.join(", "),
    difficulty: problem.difficulty?.toString() ?? "",
  });

  const [snackBar, setSnackBar] = useState<{
    isOpen: boolean;
    title: string;
    variant: "success" | "error";
  }>({
    isOpen: false,
    title: "",
    variant: "success",
  });

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const updateProblemMutation = useMutation({
    mutationFn: (input: UpdateProblemInput) =>
      updateProblemClient(problem.id, input),
    onSuccess: () => {
      onClose();
      router.refresh();
      setSnackBar({
        isOpen: true,
        title: "問題を更新しました",
        variant: "success",
      });
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProblemMutation.mutate({
      platform: form.platform,
      url: form.url,
      title: form.title,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      difficulty: Number(form.difficulty),
    });
  };

  return (
    <>
      <BasicModal
        open
        title="問題を編集する"
        onClose={onClose}
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
                <option
                  key={platform}
                  value={platform}
                >
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
              onClick={onClose}
            />

            <Button
              variant="primary"
              title="更新する"
              type="submit"
            />
          </div>
        </form>
      </BasicModal>

      {updateProblemMutation.isPending && <FullScreenLoading />}

      <SnackBar
        title={snackBar.title}
        variant={snackBar.variant}
        isOpen={snackBar.isOpen}
        onClose={() => setSnackBar((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
