import { useState } from "react";
import { useInput } from "../../Hooks/useInput";
import EventReview from "./EventReview";
import ReviewStar from "./ReviewStar";

const tempReviews = [
  {
    img: "",
    rating: 5,
    text: "리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용",
  },
  {
    img: "",
    rating: 5,
    text: "리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 ",
  },
  {
    img: "",
    rating: 5,
    text: "리뷰내용 리뷰내용 리뷰내용 ",
  },
];

const INIT_STAR_SCORE = 5;
export const STAR_SCORE_UNIT = 0.5;

export default function EventReviewList() {
  const [currentScore, setCurrentScore] = useState(INIT_STAR_SCORE);
  const { error, handleSubmit, onchange, value } = useInput({
    init: "",
    submitCallback(value) {
      console.log(value, currentScore);
      setCurrentScore(INIT_STAR_SCORE);
    },
    validateCallback: () => {
      if (currentScore === 0) return false;
      return true;
    },
  });

  const onMouseMoveStar = (e: any, orderStarNumber: number) => {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    if (mouseX < rect.width / 2) {
      setCurrentScore(orderStarNumber - STAR_SCORE_UNIT);
    } else {
      setCurrentScore(orderStarNumber);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="mb-4 text-2xl font-extrabold">리뷰</h2>
      <div className="flex w-full gap-5 items-center">
        <img src="" alt="프로필" className="w-10 h-10 rounded-full border" />
        <form
          className={`rounded-md flex flex-1 flex-col gap-2`}
          onSubmit={handleSubmit}
        >
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((v) => {
              return (
                <ReviewStar
                  key={v}
                  currentScore={currentScore}
                  starOrderNumber={v}
                  onMouseMoveStar={onMouseMoveStar}
                />
              );
            })}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className={`p-2 flex-1 border ${
                error ? "border-red-700" : "border-blue-200"
              }`}
              placeholder="내용을 입력하세요"
              onChange={onchange}
              value={value}
            />
            <button className="p-2 px-7 border" type="submit">
              입력
            </button>
          </div>
        </form>
      </div>
      <div className="w-full border border-blue-400" />
      {tempReviews.map((review, i) => (
        <EventReview key={i} review={review} />
      ))}
    </div>
  );
}
