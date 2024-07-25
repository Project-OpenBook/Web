import { useInput } from "../../Hooks/useInput";
import EventReview from "./EventReview";

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

export default function EventReviewList() {
  const { error, handleSubmit, onchange, value } = useInput({
    init: "",
    submitCallback(value) {
      console.log(value);
    },
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <span>리뷰</span>
      <div className="flex w-full gap-5">
        <img src="" alt="프로필" className="w-10 h-10 rounded-full border" />
        <form
          className={`border rounded-md flex flex-1 ${
            error ? "border-red-700" : "border-blue-200"
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="p-2 flex-1"
            placeholder="내용을 입력하세요"
            onChange={onchange}
            value={value}
          />
          <button className="p-2 px-7 border-l" type="submit">
            입력
          </button>
        </form>
      </div>
      <div className="w-full border border-blue-400" />
      {tempReviews.map((review, i) => (
        <EventReview key={i} review={review} />
      ))}
    </div>
  );
}
