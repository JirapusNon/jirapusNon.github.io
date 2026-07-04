"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  size?: "default" | "large";
  variant?: "light" | "dark";
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  size = "default",
  variant = "light",
  placeholder = "ค้นหารุ่นเครื่องพิมพ์ ยี่ห้อ หรือรหัสสินค้า...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  const isLarge = size === "large";
  const isDark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-center gap-2 rounded-lg border transition duration-200 focus-within:ring-2 focus-within:ring-accent/30 ${
        isDark
          ? "border-on-primary/15 bg-on-primary/5 focus-within:border-on-primary/30"
          : "border-border bg-card shadow-xs focus-within:border-accent-300"
      } ${isLarge ? "p-2 pl-4" : "p-1.5 pl-3"} ${className}`}
    >
      <svg
        className={`shrink-0 ${isLarge ? "h-5 w-5" : "h-4 w-4"} ${isDark ? "text-on-primary/50" : "text-graphite"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="ค้นหาสินค้า"
        className={`min-w-0 flex-1 bg-transparent outline-none ${
          isDark ? "text-on-primary placeholder:text-on-primary/40" : "placeholder:text-navy-300"
        } ${isLarge ? "py-2 text-base" : "py-1.5 text-sm"}`}
      />
      <button
        type="submit"
        className={`btn shrink-0 ${
          isDark ? "btn-line-solid" : "btn-accent"
        } ${isLarge ? "px-5 py-2.5 text-base" : "px-4 py-1.5 text-sm"}`}
      >
        ค้นหา
      </button>
    </form>
  );
}
