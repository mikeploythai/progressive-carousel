import useMediaQuery from "@/hooks/use-media-query";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import CarouselContext from "./context";

const useCarouselControls = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx)
    throw new Error(
      "useCarouselControls must be used within a CarouselContext",
    );

  const { trackRef } = ctx;
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState<Element[]>([]);
  const slidesRef = useRef<Element[]>([]);
  const rafIdRef = useRef<number | null>(null);

  const updateButtonStates = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

    rafIdRef.current = requestAnimationFrame(() => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      const tolerance = 1;

      setIsPrevDisabled(scrollLeft <= tolerance);
      setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth - tolerance);
      rafIdRef.current = null;
    });
  }, [trackRef]);

  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const scrollToSlide = useCallback(
    (slide: Element) => {
      const track = trackRef.current;
      if (!track) return;

      track.focus({ preventScroll: true });

      const left =
        slide.getBoundingClientRect().left -
        track.getBoundingClientRect().left +
        track.scrollLeft;

      track.scrollTo({
        left,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion, trackRef],
  );

  const scrollToPrev = useCallback(() => {
    if (isPrevDisabled || visibleSlides.length === 0) return;

    const firstVisible = visibleSlides[0];
    const prevSlide = firstVisible?.previousElementSibling;
    if (prevSlide) scrollToSlide(prevSlide);
  }, [isPrevDisabled, visibleSlides, scrollToSlide]);

  const scrollToNext = useCallback(() => {
    if (isNextDisabled || visibleSlides.length === 0) return;

    const firstVisible = visibleSlides[0];
    const nextSlide = firstVisible?.nextElementSibling;
    if (nextSlide) scrollToSlide(nextSlide);
  }, [isNextDisabled, scrollToSlide, visibleSlides]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    slidesRef.current = Array.from(track.children);
    updateButtonStates();

    const observer = new IntersectionObserver(
      (entries) => {
        const currentSlides = slidesRef.current;

        const currentlyVisible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .sort((a, b) => {
            const aIndex = currentSlides.indexOf(a);
            const bIndex = currentSlides.indexOf(b);
            return aIndex - bIndex;
          });

        setVisibleSlides((prevVisible) => {
          if (
            currentlyVisible.length === prevVisible.length &&
            currentlyVisible.every((slide, i) => slide === prevVisible[i])
          )
            return prevVisible;

          return currentlyVisible;
        });
      },
      {
        root: track,
        threshold: 0.5,
      },
    );

    slidesRef.current.forEach((slide) => observer.observe(slide));

    track.addEventListener("scroll", updateButtonStates, { passive: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== track && !track.contains(e.target as Node)) return;
      let isHandled = false;

      if (e.key === "ArrowLeft") {
        scrollToPrev();
        isHandled = true;
      } else if (e.key === "ArrowRight") {
        scrollToNext();
        isHandled = true;
      }

      if (isHandled) e.preventDefault();
    };

    track.addEventListener("keydown", handleKeyDown);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

      observer.disconnect();
      track.removeEventListener("scroll", updateButtonStates);
      track.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollToNext, scrollToPrev, trackRef, updateButtonStates]);

  return { scrollToPrev, scrollToNext, isPrevDisabled, isNextDisabled };
};

export default useCarouselControls;
