import useEmblaCarousel from "embla-carousel-react";
import {
  DotButton,
  NextButton,
  PrevButton,
  useDotButton,
  usePrevNextButtons,
} from "../../Hooks/useCarouselDot";
import EventCard from "../Event/List/EventCard";

interface Props {
  className?: String;
  imgs: string[];
  dot?: boolean;
  button?: boolean;
}
// TODO: 최대개수 제한?
export default function Carousel({
  className,
  imgs = [],
  dot = true,
  button = true,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className={`embla overflow-visible ${className}`} ref={emblaRef}>
        <div className="embla__container h-full">
          {imgs.map((img, i) => (
            <div className="embla__slide h-full" key={img + i}>
              {/* <div className="h-full w-full object-contain bg-white p-2 rounded-md "> */}
              {/* <img
                  src={img}
                  alt="케러셀 이미지"
                  className="h-[80%] w-full object-contain"
                />
                <p className="flex items-center justify-center border-t-2 mt-2">
                  ~~행사
                </p> */}
              <EventCard endDate="123" id={1} image={img} name="행사" />
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        {button && (
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}
        {dot && (
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
