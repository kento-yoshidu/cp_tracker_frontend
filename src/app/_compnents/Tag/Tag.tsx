import { getTagColor } from "@/lib/tagColors";
import styles from "./tag.module.css";

type Props = {
  tagName: string;
};

export default function Tag({ tagName }: Props) {
  const { bg, text } = getTagColor(tagName);

  return (
    <div
      className={styles.wrapper}
      style={{ background: bg, color: text }}
    >
      <p>{tagName}</p>
    </div>
  );
}
