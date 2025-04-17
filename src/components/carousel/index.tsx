"use client";

import clsx from "clsx";
import { useContext, useId, useRef } from "react";
import CarouselContext from "./context";
import useCarouselControls from "./hook";
import styles from "./styles.module.css";

interface CarouselProps extends React.ComponentProps<"div"> {
  numOfSlides: number;
}

const Carousel = ({ numOfSlides, ...props }: CarouselProps) => {
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <CarouselContext.Provider value={{ id, trackRef, numOfSlides }}>
      <div {...props} />
    </CarouselContext.Provider>
  );
};

interface CarouselContentProps extends React.ComponentProps<"div"> {
  track?: Omit<
    React.ComponentPropsWithoutRef<"div">,
    "children" | "tabIndex" | "role" | "aria-label" | "aria-roledescription"
  >;
}

const CarouselContent = ({
  track = {},
  className,
  children,
  ...props
}: CarouselContentProps) => {
  const ctx = useContext(CarouselContext);
  if (!ctx)
    throw new Error("CarouselContent must be used within a CarouselContext");

  const { id, trackRef } = ctx;
  const { className: trackClassName, ...trackProps } = track;

  return (
    <div className={clsx(styles.carousel__content, className)} {...props}>
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        className={clsx(styles.carousel__track, trackClassName)}
        aria-label={`Content for carousel ${id}`}
        aria-roledescription="carousel"
        {...trackProps}
      >
        {children}
      </div>
    </div>
  );
};

type CarouselSlideProps<T extends React.ElementType> = {
  as?: T;
  slideNum: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "slideNum" | "aria-label">;

const CarouselSlide = <T extends React.ElementType>({
  as,
  slideNum,
  className,
  ...props
}: CarouselSlideProps<T>) => {
  const ctx = useContext(CarouselContext);
  if (!ctx)
    throw new Error("CarouselSlide must be used within a CarouselContext");

  const { id, numOfSlides } = ctx;
  const Component: React.ElementType = as ?? "div";

  return (
    <Component
      className={clsx(styles.carousel__slide, className)}
      aria-label={`Slide ${slideNum} of ${numOfSlides} in carousel ${id}`}
      {...props}
    />
  );
};

interface CarouselControlsProps
  extends Omit<
    React.ComponentProps<"div">,
    "children" | "role" | "aria-label"
  > {
  control?: Omit<
    React.ComponentPropsWithoutRef<"button">,
    | "children"
    | "type"
    | "onClick"
    | "disabled"
    | "aria-label"
    | "aria-controls"
  >;
}

const CarouselControls = ({
  control: controlProps = {},
  ...props
}: CarouselControlsProps) => {
  const ctx = useContext(CarouselContext);
  if (!ctx)
    throw new Error("CarouselControls must be used within a CarouselContext");

  const { id } = ctx;
  const { scrollToPrev, scrollToNext, isPrevDisabled, isNextDisabled } =
    useCarouselControls();

  return (
    <div role="group" aria-label={`Controls for carousel ${id}`} {...props}>
      <button
        type="button"
        onClick={scrollToPrev}
        disabled={isPrevDisabled}
        aria-label="Previous slide"
        aria-controls={id}
        {...controlProps}
      >
        &lsaquo;
      </button>

      <button
        type="button"
        onClick={scrollToNext}
        disabled={isNextDisabled}
        aria-label="Next slide"
        aria-controls={id}
        {...controlProps}
      >
        &rsaquo;
      </button>
    </div>
  );
};

export { Carousel, CarouselContent, CarouselControls, CarouselSlide };
