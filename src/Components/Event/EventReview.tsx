import { Review } from "../../Hooks/useReview";
import ReviewStars from "./ReviewStars";

interface Props {
  review: Review;
}

export default function EventReview({ review }: Props) {
  const imgUrl = review.images[0]?.url;

  return (
    <div className="flex gap-5 border-b border-blue-200 p-3 last:border-none">
      <img
        className={`w-32 aspect-square border rounded-md ${imgUrl ?? "hidden"}`}
        alt="리뷰 이미지"
        src={review.images[0]?.url}
      />
      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full h-10 items-center gap-4">
          <span>{review.reviewer.nickname}</span>
          <ReviewStars
            currentScore={review.star}
            maxScore={5}
            className="ml-auto w-32"
          />
        </div>
        <div className="flex-1">{review.content}</div>
      </div>
    </div>
  );
}
