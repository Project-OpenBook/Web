import noImage from "../../../../images/noimage.png";

interface Timeslot {
  id: number;
  times: string;
  status: string;
}

interface Props {
  ServiceData: {
    id: number;
    name: string;
    description: string | null;
    date: string;
    details: Timeslot[];
    price: number;
    imageUrl: string | null;
    boothManagerId: number;
  };
}

export default function ServiceInfoCard(service: Props) {
  return (
    <div className="w-full border p-2 rounded-lg flex relative bg-white hover:shadow-sm">
      <img
        src={service.ServiceData.imageUrl || noImage}
        className="w-32 h-32 object-cover rounded-lg"
        alt={service.ServiceData.name}
      />
      <div className="flex flex-col justify-between flex-grow pl-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">
              {service.ServiceData.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {service.ServiceData.date}
            </p>
            <p className="text-xl font-semibold text-gray-800">
              {service.ServiceData.price.toLocaleString()}원
            </p>
          </div>
          <div className="flex gap-2">
            {/* <button className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-500 rounded-md hover:bg-blue-50">
              수정
            </button> */}
            <button className="px-3 py-1 text-sm font-medium text-white rounded-md bg-blue-400 hover:bg-blue-500">
              예약 내용 보기
            </button>
            <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded-md hover:bg-red-50">
              삭제
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-3 line-clamp-2">
          {service.ServiceData.description || "설명이 없습니다."}
        </p>
      </div>
    </div>
  );
}
