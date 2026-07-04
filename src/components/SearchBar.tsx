"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  size?: "default" | "large";
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  size = "default",
  placeholder = "ค้นหาหมึกปริ้นเตอร์ ยี่ห้อ หรือรุ่นเครื่องพิมพ์...",
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

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-center gap-2 rounded-lg bg-card shadow-sm transition duration-200 focus-within:ring-2 focus-within:ring-accent/30 ${
        isLarge ? "p-2 pl-5 shadow-md" : "p-1.5 pl-4"
      } ${className}`}
    >
      <svg
        className={isLarge ? "h-6 w-6 text-muted-foreground" : "h-5 w-5 text-muted-foreground"}
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
        className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-navy-300 ${
          isLarge ? "py-2 text-base sm:text-lg" : "py-1.5 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 cursor-pointer rounded-full bg-accent font-medium text-on-primary transition duration-200 hover:bg-accent-hover ${
          isLarge ? "px-6 py-3 text-base" : "px-4 py-1.5 text-sm"
        }`}
      >
        ค้นหา
      </button>
    </form>
  );
}
