import useEmblaCarousel from "embla-carousel-react";
import {
  DotButton,
  NextButton,
  PrevButton,
  useDotButton,
  usePrevNextButtons,
} from "../../Hooks/useCarouselDot";

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
      <div className={`embla overflow-hidden ${className}`} ref={emblaRef}>
        <div className="embla__container h-full">
          {imgs.map((img, i) => (
            <div className="embla__slide h-full" key={img + i}>
              <img
                src={img}
                alt="케러셀 이미지"
                className="h-full w-full object-contain"
              />
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
