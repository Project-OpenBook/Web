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
  comps: React.ReactNode[];
  dot?: boolean;
  button?: boolean;
}
// TODO: 최대개수 제한?
export default function CompCarousel({
  className,
  comps = [],
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
          {comps.map((comp, i) => (
            <div className="embla__slide h-full" key={i}>
              {comp}
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
