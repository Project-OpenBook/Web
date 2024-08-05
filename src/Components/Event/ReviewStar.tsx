import { useMemo } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { STAR_SCORE_UNIT } from "./EventReviewList";

interface Props {
  currentScore: number;
  starOrderNumber: number;
  onMouseMoveStar: (e: any, orderStarNumber: number) => void;
}

export default function ReviewStar({
  currentScore,
  starOrderNumber,
  onMouseMoveStar,
}: Props) {
  const Star = useMemo(() => {
    return currentScore >= starOrderNumber
      ? IoIosStar
      : currentScore === starOrderNumber - STAR_SCORE_UNIT
      ? IoIosStarHalf
      : IoIosStarOutline;
  }, [currentScore, starOrderNumber]);

  return (
    <Star
      color="orange"
      size={35}
      onMouseMove={(e) => {
        onMouseMoveStar(e, starOrderNumber);
      }}
    />
  );
}
