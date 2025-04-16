import { createContext } from "react";

type CarouselContextProps = {
  carouselId: string;
  carouselTrackRef: React.RefObject<HTMLDivElement | null>;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
