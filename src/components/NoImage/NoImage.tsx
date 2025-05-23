import css from "./NoImage.module.css";

interface NoImageProps {
  title: string;
}

export default function NoImage({ title }: NoImageProps) {
  return (
    <div className={css.container}>
      <h3 className={css.title}>{title}</h3>
      <p className={css.text}>📷 No image available</p>
    </div>
  );
}
