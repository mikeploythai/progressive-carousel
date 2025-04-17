import { createContext } from "react";

type CarouselContextProps = {
  id: string;
  trackRef: React.RefObject<HTMLDivElement | null>;
  numOfSlides: number;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
