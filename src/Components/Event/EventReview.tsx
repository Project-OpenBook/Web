import { useState } from "react";
import { getAccessToken } from "../../Api/Util/token";
import { useAuth } from "../../Hooks/useAuth";
import { Review } from "../../Hooks/useReview";
import ReviewStars from "./ReviewStars";
import { format } from "date-fns";

interface Props {
  review: Review;
  refetch: () => void;
}

export default function EventReview({ review, refetch }: Props) {
  const { id } = useAuth();
  const imgUrl = review.images && review.images[0]?.url;

  const isMyReview = review.reviewer.id === id;

  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(review.content);

  const onDeleteReview = () => {
    fetch(`http://52.79.91.214:8080/event/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          refetch();
        } else {
          console.log(res);

          throw new Error();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const onClickEdit = () => {
    if (isEditing) {
      // TODO: 수정하는 쿼리를 날리기
      fetch("").then(() => {
        refetch();
        setIsEditing(!isEditing);
      });
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="flex gap-5 border-b border-blue-200 pb-2 px-2 last:border-none">
      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full h-10 items-center gap-4">
          <span className="font-bold">{review.reviewer.nickname}</span>
          <ReviewStars
            currentScore={review.star}
            maxScore={5}
            className="ml-auto w-32"
          />
        </div>

        <div className="flex flex-col flex-1 gap-2">
          {isEditing ? (
            <textarea className="border">{editingContent}</textarea>
          ) : (
            <p>{review.content}</p>
          )}
          <img
            className={`w-32 aspect-square border rounded-md ${
              imgUrl ?? "hidden"
            }`}
            alt="리뷰 이미지"
            src={imgUrl}
          />
          <div className="flex">
            <p className="mr-auto text-black/50">
              {format(new Date(review.registerDate), "yyyy-MM-dd hh:mm")}
            </p>
            <div
              className={`flex items-center mt-auto gap-2 ${
                isMyReview || "hidden"
              }`}
            >
              <button className="text-green-600" onClick={onClickEdit}>
                수정
              </button>
              <button onClick={onDeleteReview} className="text-red-500">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
