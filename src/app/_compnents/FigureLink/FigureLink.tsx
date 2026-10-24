import styles from "./figureLink.module.css";

type Props = {
  href: string;
};

export default function FigureLink({ href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="解説図を開く"
      title="解説図を開く"
      className={styles.figureLink}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
        />
        <circle
          cx="9"
          cy="9"
          r="2"
        />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </a>
  );
}
