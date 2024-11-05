import { useRef, useState } from "react";
import { useInput } from "../../Hooks/useInput";
import EventReview from "./EventReview";
import ReviewStars from "./ReviewStars";
import { CiImageOn } from "react-icons/ci";
import { FaX } from "react-icons/fa6";
import { getAccessToken } from "../../Api/Util/token";
import { useReview } from "../../Hooks/useReview";
import InfiniteScroll from "react-infinite-scroll-component";
import { useScrollDown } from "../../Hooks/useScrollDown";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export type ContentType = "events" | "booth";
interface Props {
  id: number;
  type: ContentType;
}

const INIT_STAR_SCORE = 5;
export const STAR_SCORE_UNIT = 0.5;

const addReview = (
  type: ContentType,
  id: number,
  star: number,
  content: string,
  images: File[]
) => {
  const idKey = type === "events" ? "event_id" : "booth_id";
  const contentType = type === "events" ? "event" : "booths";
  const form = new FormData();
  form.append(idKey, `${id}`);
  form.append("star", `${star}`);
  form.append("content", content);
  images.forEach((img) => {
    form.append("images", img);
  });

  return fetch(`http://52.79.91.214:8080/${contentType}/review`, {
    method: "post",
    body: form,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export default function ReviewList({ id, type: contentType }: Props) {
  const [currentScore, setCurrentScore] = useState(INIT_STAR_SCORE);
  const [reviewImages, setReviewImages] = useState<File[]>([]);

  const { error, handleSubmit, onchange, value } = useInput({
    init: "",
    submitCallback(value) {
      addReview(contentType, id, currentScore, value, reviewImages)
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
          }
          setCurrentScore(INIT_STAR_SCORE);
          setReviewImages([]);
          refetch();
        })
        .catch((error: any) => {
          alert(`등록에 실패하였습니다: ${error}`);
        });
    },
    validateCallback: () => {
      if (currentScore === 0) return false;
      return true;
    },
  });

  const imgRef = useRef<HTMLInputElement>(null);

  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useReview(contentType, id);

  useScrollDown({
    offset: 1,
    onScrollDownToEnd: fetchNextPage,
  });

  const handleLayoutImagesChange = (e: any) => {
    const images = [...reviewImages, ...e.target.files].splice(0, 3);

    setReviewImages(images);
  };

  const onDeleteReviewImg = (index: number) => {
    const imgs = reviewImages.filter((_, i) => index !== i);

    if (imgRef.current) {
      imgRef.current.value = "";
    }

    setReviewImages(imgs);
  };

  const onMouseMoveStar = (e: any, scoreOnMouse: number) => {
    setCurrentScore(scoreOnMouse);
  };

  const hasReview = reviews && reviews?.pages[0].content.length >= 1;

  const { id: userId } = useAuth();
  const navi = useNavigate();

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

          <div className="flex items-center">
            <label className="grid">
              <input
                type="file"
                name="layoutImages"
                multiple
                onChange={handleLayoutImagesChange}
                hidden
                ref={imgRef}
              />
              {reviewImages.length < 3 && <CiImageOn size={46} />}
            </label>
            <input
              type="text"
              className={`p-2 flex-1 border border-r-0 ${
                error ? "border-red-700" : "border-blue-200"
              }`}
              placeholder={
                userId ? "내용을 입력하세요" : "로그인 후 이용해주세요"
              }
              onChange={onchange}
              value={value}
              onClick={() => {
                if (!userId) {
                  navi("/login");
                }
              }}
            />
            <button className="p-2 px-7 border" type="submit">
              입력
            </button>
          </div>
          <div>
            <div
              className={`flex gap-2 border-2 p-2 ${
                reviewImages.length === 0 && "hidden"
              }`}
            >
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
        </form>
      </div>
      <div className="w-full border border-blue-400" />
      {hasReview ? (
        <InfiniteScroll
          dataLength={reviews?.pages[0].numberOfElements ?? 5}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4 className="text-center my-4">로딩 중...</h4>}
          endMessage={
            <p className="text-center font-bold my-4">
              모든 리뷰를 불러왔습니다
            </p>
          }
          className="w-full max-w-screen-lg shadow-xl h-full p-2 pt-2 mx-auto rounded-md"
        >
          <section className="w-full flex flex-col">
            {/* <RadioButtons sortOrder={eventSort} onSortOrderChange={setEventSort} /> */}
            {reviews?.pages.map((reviewss) =>
              reviewss.content.map((review) => {
                return <EventReview review={review} refetch={refetch} />;
              })
            )}
          </section>
        </InfiniteScroll>
      ) : (
        <p className="w-full max-w-screen-lg shadow-xl h-full p-14 mx-auto rounded-md text-center">
          첫 번째 리뷰를 남겨주세요!
        </p>
      )}
    </div>
  );
}
