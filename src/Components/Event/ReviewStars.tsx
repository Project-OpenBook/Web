import { STAR_SCORE_UNIT } from "./EventReviewList";
import ReviewStar from "./ReviewStar";

interface Props {
  currentScore: number;
  maxScore: number;
  onMouseMoveStar?: (e: any, scoreOnMouse: number) => void;
  className?: string;
}

export default function ReviewStars({
  currentScore,
  maxScore,
  onMouseMoveStar,
  className,
}: Props) {
  const handleMouseMoveStar = (e: any, orderStarNumber: number) => {
    if (!onMouseMoveStar) {
      return;
    }
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    if (mouseX < rect.width / 2) {
      onMouseMoveStar(e, orderStarNumber - STAR_SCORE_UNIT);
    } else {
      onMouseMoveStar(e, orderStarNumber);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxScore }, (_, i) => i + 1).map((v) => {
        return (
          <ReviewStar
            key={v}
            currentScore={currentScore}
            starOrderNumber={v}
            onMouseMoveStar={handleMouseMoveStar}
          />
        );
      })}
    </div>
  );
}
