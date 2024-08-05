import ReviewStars from "./ReviewStars";

interface Props {
  review: {
    img: string;
    rating: number;
    text: string;
  };
}
export default function EventReview({ review }: Props) {
  return (
    <div className="flex gap-5 border-b border-blue-200 p-3 last:border-none">
      <img
        className="w-32 aspect-square border rounded-md"
        alt="리뷰 이미지"
        src={review.img}
      />
      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full h-10 items-center gap-4">
          <img src="" alt="프로필" className="w-10 h-10 rounded-full border" />
          <span>닉네임</span>
          <ReviewStars
            currentScore={review.rating}
            maxScore={5}
            className="ml-auto w-32"
          />
        </div>
        <div className="flex-1">{review.text}</div>
      </div>
    </div>
  );
}
