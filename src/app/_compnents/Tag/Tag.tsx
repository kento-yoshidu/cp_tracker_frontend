import { getTagColor } from "@/lib/tagColors";
import styles from "./tag.module.css";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tagName: string;
  // setSelectedTag: Dispatch<SetStateAction<string | null>>;
  onClick: () => void;
};

export default function Tag({
  tagName,
  // setSelectedTag,
  onClick,
}: Props) {
  const { bg, text } = getTagColor(tagName);

  return (
    <div
      className={styles.wrapper}
      style={{ background: bg, color: text }}
      onClick={onClick}
    >
      <p>{tagName}</p>
    </div>
  );
}
