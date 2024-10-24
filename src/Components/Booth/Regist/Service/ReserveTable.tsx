interface CategoryModalProps {
  onClose: () => void;
}

export default function ReserveTable({ onClose }: CategoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white w-1/2 p-6 rounded-lg shadow-lg relative">
        <div className="font-bold text-xl mb-4">예약 현황</div>

        {/* 기존 카테고리 리스트 */}
        <div className="flex justify-between gap-2">
          <div className="mb-4">
            <h3 className="font-semibold">날짜</h3>
            <div>asdfasdf</div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">시간대</h3>
            <div>asdfasdf</div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-10 py-2 rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
