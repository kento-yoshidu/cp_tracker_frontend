import { getTagColor } from "@/lib/tagColors";
import styles from "./tag.module.css";

type Props = {
  tagName: string;
  onClick?: () => void;
};

export default function Tag({ tagName, onClick }: Props) {
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
