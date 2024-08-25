import { Link } from "react-router-dom";
import { useEventNotice } from "../../Hooks/Event/useEventNotice";
import NoticeCard from "../NoticeCard";

interface Props {
  eventId: number;
}

export default function EventNotice({ eventId }: Props) {
  const { data } = useEventNotice(eventId);

  if (!data) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold my-1">소식</h2>
        <Link to={`notice`}>더보기</Link>
      </div>
      <div className="flex flex-col w-full border-4 border-blue-200 p-2 rounded-md min-h-44">
        {data?.pages[0].content.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data?.pages.map((notices) =>
              notices.content.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            )}
          </div>
        ) : (
          <p className="mx-auto my-auto">소식이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
