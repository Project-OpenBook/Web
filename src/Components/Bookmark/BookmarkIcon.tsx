import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { getAccessToken } from "../../Api/Util/token";

interface Props {
  isBookmark: boolean;
  type: "EVENT" | "BOOTH";
  id: number;
  className?: string;
  refetch: () => void;
}

export default function BookmarkIcon({
  isBookmark,
  type,
  id,
  className,
  refetch,
}: Props) {
  const onAddBookmark = () => {
    fetch(`http://52.79.91.214:8080/bookmark`, {
      method: "POST",
      body: JSON.stringify({
        type,
        resourceId: id,
        alarmSet: false,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }).then(() => refetch());
  };

  const onDeleteBookmark = () => {
    fetch(`http://52.79.91.214:8080/bookmark`, {
      method: "DELETE",
      body: JSON.stringify({
        type,
        resourceId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }).then(() => refetch());
  };

  return (
    <div className={`flex items-center ml-auto ${className}`}>
      북마크
      {/* TODO: 특정 ID의 행사 또는 부스가 북마크 상태인지 확인하는 API 구현 후 주석해제하기 */}
      {isBookmark ? (
        <FaBookmark onClick={onDeleteBookmark} className="cursor-pointer" />
      ) : (
        <FaRegBookmark onClick={onAddBookmark} className="cursor-pointer" />
      )}
      {/* <FaBookmark onClick={onDeleteBookmark} className="cursor-pointer" />
      <FaRegBookmark onClick={onAddBookmark} className="cursor-pointer" /> */}
    </div>
  );
}
