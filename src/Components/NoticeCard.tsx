import { EventNotice } from "../Hooks/Event/useEventNotice";

interface Props {
  notice: EventNotice;
}
export default function NoticeCard({ notice }: Props) {
  const { content, title, imageUrl } = notice;
  return (
    <div className="flex flex-col gap-1 shadow-md p-2">
      <img
        src={imageUrl}
        alt="noticeImage"
        className="w-full h-44 shadow-inner border object-contain"
      />
      <div className="font-bold">{title}</div>
      <div>{content}</div>
    </div>
  );
}
