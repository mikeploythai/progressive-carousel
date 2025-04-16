import useMediaQuery from "@/hooks/use-media-query";
import { useCallback, useContext, useEffect, useState } from "react";
import CarouselContext from "./context";

const SCROLL_END_TOLERANCE = 1;

const useCarouselControls = () => {
  const store = useContext(CarouselContext);
  if (!store)
    throw new Error(
      "useCarouselControls must be used within a CarouselContext"
    );

  const { carouselTrackRef } = store;
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const updateButtonStates = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;

    setIsPreviousDisabled(scrollLeft <= 0);
    setIsNextDisabled(
      scrollLeft + clientWidth >= scrollWidth - SCROLL_END_TOLERANCE
    );
  }, [carouselTrackRef]);

  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const scrollToPrevious = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    track.focus({ preventScroll: true });

    track.scrollBy({
      left: -track.clientWidth,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [carouselTrackRef, prefersReducedMotion]);

  const scrollToNext = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    track.focus({ preventScroll: true });

    track.scrollBy({
      left: track.clientWidth,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [carouselTrackRef, prefersReducedMotion]);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    updateButtonStates();

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        updateButtonStates();
        rafId = null;
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== track && !track.contains(e.target as Node)) return;

      let isHandled = false;

      if (e.key === "ArrowLeft") {
        scrollToPrevious();
        isHandled = true;
      } else if (e.key === "ArrowRight") {
        scrollToNext();
        isHandled = true;
      }

      if (isHandled) e.preventDefault();
    };

    track.addEventListener("keydown", handleKeyDown);

    const resizeObserver = new ResizeObserver(updateButtonStates);
    resizeObserver.observe(track);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("keydown", handleKeyDown);
      resizeObserver.unobserve(track);
    };
  }, [scrollToNext, scrollToPrevious, carouselTrackRef, updateButtonStates]);

  return { scrollToPrevious, scrollToNext, isPreviousDisabled, isNextDisabled };
};

export default useCarouselControls;
