"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const COPIES = 3;
const AUTO_PLAY_MS = 2000;

function getSetWidth(el: HTMLElement, productCount: number): number {
  // One product set spans exactly `productCount` card steps. Deriving the set
  // width from the measured card step (rather than scrollWidth / COPIES) keeps
  // the loop's wrap points aligned to card boundaries, so cards never drift and
  // rest flush against the viewport frame instead of skewing to one side.
  return getItemStep(el) * productCount;
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

function getItemStep(el: HTMLElement): number {
  const first = el.children[0] as HTMLElement | undefined;
  const second = el.children[1] as HTMLElement | undefined;
  if (first && second) return second.offsetLeft - first.offsetLeft;
  // Fallback before items are measurable: approximate one viewport of content.
  return el.clientWidth;
}

// How far (px, signed) the card nearest the frame's left edge sits from that
// edge. offsetLeft/step math is integer-rounded, but real card widths are
// fractional, so a card at rest can land a pixel or two inside the frame and
// get its border clipped. Adding this drift to scrollLeft lands the card
// pixel-flush against the viewport frame instead.
function getFrameDrift(el: HTMLElement): number {
  const frameLeft = el.getBoundingClientRect().left + el.clientLeft;
  let drift = 0;
  let nearest = Infinity;
  for (const child of el.children) {
    const d = (child as HTMLElement).getBoundingClientRect().left - frameLeft;
    if (Math.abs(d) < nearest) {
      nearest = Math.abs(d);
      drift = d;
    }
  }
  return drift;
}

export default function ProductCarousel({
  products,
  featured = false,
}: {
  products: Product[];
  featured?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const autoPlayEnabledRef = useRef(true);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoPlay = useCallback(() => {
    autoPlayEnabledRef.current = false;
    if (autoPlayTimerRef.current !== null) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const applyNormalize = useCallback(
    (adjustDragOrigin = false) => {
      const el = scrollRef.current;
      if (!el) return;
      const setWidth = getSetWidth(el, products.length);
      const delta = normalizeScroll(el, setWidth);
      if (adjustDragOrigin && delta !== 0) {
        dragStartScrollLeft.current += delta;
      }
    },
    [products.length]
  );

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || products.length === 0) return;
    const step = getItemStep(el);
    if (step <= 0) return;
    const index =
      ((Math.round(el.scrollLeft / step) % products.length) +
        products.length) %
      products.length;
    setActiveIndex(index);
  }, [products.length]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || products.length === 0) return;

    const init = () => {
      el.scrollLeft = getSetWidth(el, products.length);
      el.scrollLeft = Math.round(el.scrollLeft + getFrameDrift(el));
      updateActiveIndex();
    };

    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, [products, updateActiveIndex]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;
      const step = getItemStep(el);
      // Fold any accumulated sub-pixel drift into the target so every rest
      // lands exactly on a card boundary — no clipped edge cards.
      const drift = getFrameDrift(el);
      const target = Math.round(
        el.scrollLeft + drift + (direction === "left" ? -step : step)
      );
      animateScrollTo(el, target, 600, animationFrame, () => applyNormalize());
    },
    [applyNormalize]
  );

  useEffect(() => {
    if (products.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      autoPlayEnabledRef.current = false;
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      if (!autoPlayEnabledRef.current || isDragging.current) return;
      if (animationFrame.current !== null) return;
      scroll("right");
    }, AUTO_PLAY_MS);

    return () => {
      if (autoPlayTimerRef.current !== null) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [products.length, scroll]);

  function handleNavClick(direction: "left" | "right") {
    stopAutoPlay();
    scroll(direction);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    stopAutoPlay();
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
    if (!isDragging.current) return;
    isDragging.current = false;
    applyNormalize();
    const el = scrollRef.current;
    if (el && animationFrame.current === null) {
      const target = Math.round(el.scrollLeft + getFrameDrift(el));
      animateScrollTo(el, target, 260, animationFrame, () => applyNormalize());
    }
    updateActiveIndex();
  }

  function handleUserScroll() {
    applyNormalize(isDragging.current);
    updateActiveIndex();
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
    <div className={featured ? 'featured-carousel' : 'relative'}>
      {featured ? (
        <button
          type="button"
          onClick={() => handleNavClick('left')}
          aria-label="เลื่อนดูสินค้าก่อนหน้า"
          className="featured-carousel__nav featured-carousel__nav--prev"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : null}

      <div className={featured ? 'featured-carousel__viewport' : undefined}>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onClickCapture={handleClickCapture}
          onDragStart={(e) => e.preventDefault()}
          onTouchStart={stopAutoPlay}
          onWheel={stopAutoPlay}
          onScroll={handleUserScroll}
          className={
            featured
              ? 'featured-carousel__track flex cursor-grab gap-3 overflow-x-auto active:cursor-grabbing sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              : 'flex cursor-grab gap-3 overflow-x-auto pb-2 active:cursor-grabbing sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }
        >
          {Array.from({ length: COPIES }, (_, copyIndex) =>
            products.map((product) => (
              <div
                key={`${copyIndex}-${product.id}`}
                className={
                  featured
                    ? 'w-full shrink-0 select-none sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]'
                    : 'w-full shrink-0 select-none sm:w-[31.5%] lg:w-[23.5%]'
                }
              >
                <ProductCard product={product} actionMenu />
              </div>
            ))
          )}
        </div>
      </div>

      {featured ? (
        <button
          type="button"
          onClick={() => handleNavClick('right')}
          aria-label="เลื่อนดูสินค้าถัดไป"
          className="featured-carousel__nav featured-carousel__nav--next"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : null}

      {featured ? (
        <div className="featured-carousel__dots" aria-hidden="true">
          {products.map((product, index) => (
            <span
              key={product.id}
              className={`featured-carousel__dot${index === activeIndex ? ' featured-carousel__dot--active' : ''}`}
            />
          ))}
        </div>
      ) : null}

      {!featured ? (
        <>
          <button
            type="button"
            onClick={() => handleNavClick('left')}
            aria-label="เลื่อนดูสินค้าก่อนหน้า"
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-card p-2 text-graphite shadow-sm transition duration-200 hover:border-accent-200 hover:text-accent sm:flex"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('right')}
            aria-label="เลื่อนดูสินค้าถัดไป"
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-card p-2 text-graphite shadow-sm transition duration-200 hover:border-accent-200 hover:text-accent sm:flex"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
