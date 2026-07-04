"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const COPIES = 3;

function getSetWidth(el: HTMLElement): number {
  return el.scrollWidth / COPIES;
}

function normalizeScroll(el: HTMLElement, setWidth: number): number {
  const before = el.scrollLeft;
  if (el.scrollLeft < setWidth) {
    el.scrollLeft += setWidth;
  } else if (el.scrollLeft >= 2 * setWidth) {
    el.scrollLeft -= setWidth;
  }
  return el.scrollLeft - before;
}

function animateScrollTo(
  el: HTMLElement,
  target: number,
  duration: number,
  frameRef: { current: number | null },
  onComplete?: () => void
) {
  if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

  const start = el.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    el.scrollLeft = start + change * eased;
    if (t < 1) {
      frameRef.current = requestAnimationFrame(step);
    } else {
      frameRef.current = null;
      onComplete?.();
    }
  }

  frameRef.current = requestAnimationFrame(step);
}

function getItemStep(el: HTMLElement, productCount: number): number {
  const first = el.children[0] as HTMLElement | undefined;
  const second = el.children[1] as HTMLElement | undefined;
  if (first && second) return second.offsetLeft - first.offsetLeft;
  const setWidth = getSetWidth(el);
  return productCount > 0 ? setWidth / productCount : el.clientWidth;
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const applyNormalize = useCallback((adjustDragOrigin = false) => {
    const el = scrollRef.current;
    if (!el) return;
    const setWidth = getSetWidth(el);
    const delta = normalizeScroll(el, setWidth);
    if (adjustDragOrigin && delta !== 0) {
      dragStartScrollLeft.current += delta;
    }
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || products.length === 0) return;

    const init = () => {
      el.scrollLeft = getSetWidth(el);
    };

    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, [products]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const step = getItemStep(el, products.length);
    const target = el.scrollLeft + (direction === "left" ? -step : step);
    animateScrollTo(el, target, 600, animationFrame, () => applyNormalize());
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    e.preventDefault();
    isDragging.current = true;
    dragMoved.current = false;
    dragStartX.current = e.pageX;
    dragStartScrollLeft.current = el.scrollLeft;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el || !isDragging.current) return;
    const dx = e.pageX - dragStartX.current;
    if (Math.abs(dx) > 4) dragMoved.current = true;
    el.scrollLeft = dragStartScrollLeft.current - dx;
    applyNormalize(true);
  }

  function endDrag() {
    isDragging.current = false;
    applyNormalize();
  }

  function handleClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMoved.current = false;
    }
  }

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onScroll={() => applyNormalize(isDragging.current)}
        className="flex cursor-grab gap-3 overflow-x-auto pb-2 active:cursor-grabbing sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COPIES }, (_, copyIndex) =>
          products.map((product) => (
            <div
              key={`${copyIndex}-${product.id}`}
              className="w-[47%] shrink-0 select-none sm:w-[31.5%] lg:w-[23.5%]"
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="เลื่อนดูสินค้าก่อนหน้า"
        className="absolute -left-3 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-card p-2 text-secondary shadow-md transition duration-200 hover:text-accent sm:flex"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="เลื่อนดูสินค้าถัดไป"
        className="absolute -right-3 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-card p-2 text-secondary shadow-md transition duration-200 hover:text-accent sm:flex"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
