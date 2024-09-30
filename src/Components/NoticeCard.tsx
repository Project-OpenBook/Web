import { Notice } from "../Hooks/Event/useEventNotice";

interface Props {
  notice: Notice;
  alignType?: "column" | "row";
}
export default function NoticeCard({ notice, alignType = "column" }: Props) {
  const { content, title, imageUrl, type } = notice;

  if (alignType === "row") {
    return (
      <div className={`flex flex-col p-2 pb-4 border-b-2 last:border-none`}>
        <h2 className="font-semibold text-sm py-2">
          {type === "EVENT" ? "💛이벤트" : "📢공지"}
        </h2>
        <div className={`flex flex-row gap-4`}>
          <img
            src={imageUrl}
            alt="noticeImage"
            className="h-24 aspect-square shadow-inner border object-contain rounded-md"
          />
          <div className="flex flex-col gap-1">
            <div className="font-bold">{title}</div>
            <div className="line-clamp-4">{content}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center p-2 pb-4 border-b-2 last:border-none w-full`}
    >
      <div className={`flex flex-col gap-1 w-full max-w-[80%]`}>
        <h2 className="font-bold py-2">
          {type === "EVENT" ? "💛이벤트" : "📢공지"}
        </h2>
        <div className="flex flex-col w-full gap-2">
          <img
            src={imageUrl}
            alt="noticeImage"
            className="h-52 aspect-video max-w-80 shadow-inner border object-contain rounded-md mx-auto"
          />
          <div className="font-bold">{title}</div>
          <div className="line-clamp-4">{content}</div>
        </div>
      </div>
    </div>
  );
}
