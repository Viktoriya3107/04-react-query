import type{ FormEvent } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("query") as HTMLInputElement;

    if (!input.value.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    onSubmit(input.value.trim());
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input name="query" className={css.input} placeholder="Search movies..." />
      <button type="submit">Search</button>
    </form>
  );
}