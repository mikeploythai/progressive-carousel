import clsx from "clsx";
import { useContext, useId, useRef } from "react";
import CarouselContext from "./context";
import useCarouselControls from "./hook";
import styles from "./styles.module.css";

const Carousel = (props: React.ComponentProps<"div">) => {
  const carouselId = useId();
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  return (
    <CarouselContext.Provider value={{ carouselId, carouselTrackRef }}>
      <div {...props} />
    </CarouselContext.Provider>
  );
};

interface CarouselTrackProps extends React.ComponentProps<"div"> {
  track?: Omit<
    React.ComponentPropsWithoutRef<"div">,
    "children" | "tabIndex" | "role" | "aria-label" | "aria-roledescription"
  >;
}

const CarouselTrack = ({
  track = {},
  className,
  children,
  ...containerProps
}: CarouselTrackProps) => {
  const store = useContext(CarouselContext);
  if (!store)
    throw new Error("CarouselTrack must be used within a CarouselContext");

  const { carouselId, carouselTrackRef } = store;
  const { className: trackClassName, ...trackProps } = track;

  return (
    <div
      className={clsx(styles.carousel__trackContainer, className)}
      {...containerProps}
    >
      <div
        ref={carouselTrackRef}
        tabIndex={0}
        role="region"
        className={clsx(styles.carousel__track, trackClassName)}
        aria-label={`Carousel track for carousel ${carouselId}`}
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
} & Omit<React.ComponentPropsWithoutRef<T>, "as">;

const CarouselSlide = <T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CarouselSlideProps<T>) => {
  const store = useContext(CarouselContext);
  if (!store)
    throw new Error("CarouselSlide must be used within a CarouselContext");

  const Component: React.ElementType = as ?? "div";

  return (
    <Component className={clsx(styles.carousel__slide, className)} {...props} />
  );
};

interface CarouselControlsProps
  extends Omit<React.ComponentProps<"div">, "role" | "aria-label"> {
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
  className,
  control = {},
  ...containerProps
}: CarouselControlsProps) => {
  const store = useContext(CarouselContext);
  if (!store)
    throw new Error("CarouselControls must be used within a CarouselContext");

  const { carouselId } = store;
  const { className: controlClassName, ...controlProps } = control;
  const { scrollToPrevious, scrollToNext, isPreviousDisabled, isNextDisabled } =
    useCarouselControls();

  return (
    <div
      role="group"
      className={clsx(styles.carousel__controlsContainer, className)}
      aria-label={`Carousel controls for carousel ${carouselId}`}
      {...containerProps}
    >
      <button
        type="button"
        className={clsx(styles.carousel__control, controlClassName)}
        onClick={scrollToPrevious}
        disabled={isPreviousDisabled}
        aria-label="Previous carousel slide"
        aria-controls={carouselId}
        {...controlProps}
      >
        &lsaquo;
      </button>

      <button
        type="button"
        className={clsx(styles.carousel__control, controlClassName)}
        onClick={scrollToNext}
        disabled={isNextDisabled}
        aria-label="Next carousel slide"
        aria-controls={carouselId}
        {...controlProps}
      >
        &rsaquo;
      </button>
    </div>
  );
};

export { Carousel, CarouselControls, CarouselSlide, CarouselTrack };
