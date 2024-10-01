export interface AprovalModalData {
  description: string;
  location?: string;
  name: string;
  status: string;
  registerDate: string;
  id: number;
}
interface Props {
  data: AprovalModalData;
  onClose: () => void;
  onAprove: () => void;
  onReject: () => void;
}
export default function AprovalDetailModal({
  onClose,
  data,
  onAprove,
  onReject,
}: Props) {
  const { description, location, name, registerDate, status } = data;
  return (
    <div
      className="fixed w-screen h-screen flex items-center justify-center top-0 left-0 bg-black/10"
      onMouseUp={(e) => {
        onClose();
        e.preventDefault();
      }}
    >
      <div
        className="flex flex-col items-start bg-white w-full max-w-screen-md mx-10 p-4 rounded-md shadow-sm"
        onMouseUp={(e) => e.stopPropagation()}
      >
        <h2 className="py-2 text-2xl font-bold">{name}</h2>
        <p>등록일: {registerDate}</p>
        {location && <p>장소: {location}</p>}
        <div>
          <p className="text-start">설명:</p>
          <p className="pl-2">{description}</p>
        </div>
        <p>
          상태:{" "}
          <span
            className={`${
              status === "APPROVE"
                ? "text-green-500"
                : status === "REJECT"
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {status}
          </span>
        </p>
        <div className="flex ml-auto">
          <button
            className="w-1/2 text-white bg-green-400 shadow-md hover:underline mr-2 border rounded-md px-2 whitespace-nowrap"
            onClick={() => onAprove()}
          >
            승인
          </button>
          <button
            className="w-1/2 text-white bg-red-400 shadow-md hover:underline border rounded-md px-2 whitespace-nowrap"
            onClick={() => onReject()}
          >
            반려
          </button>
        </div>
      </div>
    </div>
  );
}
