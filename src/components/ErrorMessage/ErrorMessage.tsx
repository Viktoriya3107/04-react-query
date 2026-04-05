import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message = "An error occurred" }: ErrorMessageProps) {
  return <div className={css.error}>{message}</div>;
}