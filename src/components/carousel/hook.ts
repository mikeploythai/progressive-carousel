import useMediaQuery from "@/hooks/use-media-query";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
  const scrollRafId = useRef<number | null>(null);

  const updateButtonStates = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;

    setIsPreviousDisabled(scrollLeft <= 0);
    setIsNextDisabled(
      scrollLeft + clientWidth >= scrollWidth - SCROLL_END_TOLERANCE
    );
  }, [carouselTrackRef]);

  const getVisibleSlides = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) return [];

    const slides = Array.from(track.children);
    const trackRect = track.getBoundingClientRect();

    return slides.filter((slide) => {
      const slideRect = slide.getBoundingClientRect();

      return (
        slideRect.left >= trackRect.left && slideRect.right <= trackRect.right
      );
    });
  }, [carouselTrackRef]);

  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const scrollToSlide = useCallback(
    (slide: Element) => {
      const track = carouselTrackRef.current;
      if (!track) return;

      track.focus({ preventScroll: true });

      const targetScroll =
        slide.getBoundingClientRect().left -
        track.getBoundingClientRect().left +
        track.scrollLeft;

      if (prefersReducedMotion) {
        track.scrollTo({
          left: targetScroll,
          behavior: "auto",
        });
      } else {
        if (scrollRafId.current !== null)
          cancelAnimationFrame(scrollRafId.current);

        scrollRafId.current = requestAnimationFrame(() => {
          track.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });

          scrollRafId.current = null;
        });
      }
    },
    [carouselTrackRef, prefersReducedMotion]
  );

  const scrollToPrevious = useCallback(() => {
    if (isPreviousDisabled) return;

    const track = carouselTrackRef.current;
    if (!track) return;

    const visibleSlides = getVisibleSlides();
    if (visibleSlides.length === 0) return;

    const firstVisibleSlide = visibleSlides[0];
    const previousSlide = firstVisibleSlide.previousElementSibling;

    scrollToSlide(previousSlide!);
  }, [carouselTrackRef, getVisibleSlides, isPreviousDisabled, scrollToSlide]);

  const scrollToNext = useCallback(() => {
    if (isNextDisabled) return;

    const track = carouselTrackRef.current;
    if (!track) return;

    const visibleSlides = getVisibleSlides();
    if (visibleSlides.length === 0) return;

    const firstVisibleSlide = visibleSlides[0];
    const nextSlide = firstVisibleSlide.nextElementSibling;

    scrollToSlide(nextSlide!);
  }, [carouselTrackRef, getVisibleSlides, isNextDisabled, scrollToSlide]);

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

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(track);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("keydown", handleKeyDown);
      resizeObserver.unobserve(track);
    };
  }, [carouselTrackRef, scrollToNext, scrollToPrevious, updateButtonStates]);

  return { scrollToPrevious, scrollToNext, isPreviousDisabled, isNextDisabled };
};

export default useCarouselControls;
