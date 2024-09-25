import { useState } from "react";
import { getAccessToken } from "../../Api/Util/token";
import { useAuth } from "../../Hooks/useAuth";
import { Review } from "../../Hooks/useReview";
import ReviewStars from "./ReviewStars";

interface Props {
  review: Review;
  refetch: () => void;
}

export default function EventReview({ review, refetch }: Props) {
  const { id } = useAuth();
  const imgUrl = review.images[0]?.url;

  const isMyReview = review.reviewer.id === id;

  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(review.content);

  const onDeleteReview = () => {
    fetch(`http://52.79.91.214:8080/event/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }).then(() => refetch());
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
        <div className="flex flex-col flex-1">
          {isEditing ? (
            <textarea className="border">{editingContent}</textarea>
          ) : (
            <p>{review.content}</p>
          )}
          <div
            className={`flex items-center ml-auto mt-auto gap-2 ${
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
  );
}
