import { useState } from "react";
import { useInput } from "../../Hooks/useInput";
import EventReview from "./EventReview";
import ReviewStars from "./ReviewStars";
import { CiImageOn } from "react-icons/ci";
import { FaX } from "react-icons/fa6";
import { getAccessToken } from "../../Api/Util/token";
import { useEventReview } from "../../Hooks/useReview";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  eventId: number;
}

const tempReviews = [
  {
    img: "",
    rating: 3,
    text: "리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용 리뷰내용",
  },
  {
    img: "",
    rating: 1.5,
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

const addReview = (
  id: number,
  star: number,
  content: string,
  images: File[]
) => {
  const form = new FormData();
  form.append("event_id", `${id}`);
  form.append("star", `${star}`);
  form.append("content", content);
  images.forEach((img) => {
    form.append("images", img);
  });

  return fetch(`http://52.79.91.214:8080/event/review`, {
    method: "post",
    body: form,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export default function EventReviewList({ eventId }: Props) {
  const [currentScore, setCurrentScore] = useState(INIT_STAR_SCORE);
  const [reviewImages, setReviewImages] = useState<File[]>([]);

  const { error, handleSubmit, onchange, value } = useInput({
    init: "",
    submitCallback(value) {
      addReview(eventId, currentScore, value, reviewImages)
        .then(() => {
          setCurrentScore(INIT_STAR_SCORE);
          setReviewImages([]);
          refetch();
        })
        .catch(() => {
          alert("등록에 실패하였습니다");
        });
    },
    validateCallback: () => {
      if (currentScore === 0) return false;
      return true;
    },
  });

  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useEventReview(eventId);

  const handleLayoutImagesChange = (e: any) => {
    const images = [...reviewImages, ...e.target.files].splice(0, 3);
    // @ts-ignore
    setReviewImages(images);
  };

  const onDeleteReviewImg = (index: number) => {
    const imgs = reviewImages.filter((_, i) => index !== i);
    setReviewImages(imgs);
  };

  const onMouseMoveStar = (e: any, scoreOnMouse: number) => {
    setCurrentScore(scoreOnMouse);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="mb-4 text-2xl font-extrabold">리뷰</h2>
      <div className="flex w-full gap-5 items-center">
        {/* <img src="" alt="프로필" className="w-10 h-10 rounded-full border" /> */}
        <form
          className={`rounded-md flex flex-1 flex-col gap-2`}
          onSubmit={handleSubmit}
        >
          <ReviewStars
            currentScore={currentScore}
            maxScore={INIT_STAR_SCORE}
            onMouseMoveStar={onMouseMoveStar}
          />
          <div>
            <label className="grid grid-cols-3 gap-2">
              <input
                type="file"
                name="layoutImages"
                multiple
                onChange={handleLayoutImagesChange}
                hidden
              />
              {reviewImages.length < 3 && <CiImageOn size={46} />}
            </label>
            <div className="flex gap-2">
              {reviewImages.map((src, i) => (
                <div className="relative" key={src.name}>
                  <img src={URL.createObjectURL(src)} alt="리뷰이미지" />
                  <FaX
                    className="absolute top-2 right-2"
                    onClick={() => onDeleteReviewImg(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className={`p-2 flex-1 border border-r-0 ${
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
      <InfiniteScroll
        dataLength={reviews?.pages[0].numberOfElements ?? 5}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4 className="text-center my-4">로딩 중...</h4>}
        endMessage={
          <p className="text-center font-bold my-4">모든 리뷰를 불러왔습니다</p>
        }
        className="w-full max-w-screen-lg shadow-xl h-full p-2 pt-10 mx-auto rounded-md"
      >
        <section className="w-full flex flex-col gap-4">
          {/* <RadioButtons sortOrder={eventSort} onSortOrderChange={setEventSort} /> */}

          {reviews?.pages.map((reviews) =>
            reviews.content.map((review) => <EventReview review={review} />)
          )}
        </section>
      </InfiniteScroll>
    </div>
  );
}
