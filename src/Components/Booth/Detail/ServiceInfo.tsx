import noimage from "../../../images/noimage.png";

interface Props {
  serviceData: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    reservations: ReservationDate[];
  };
}

interface ReservationDate {
  date: string;
  times: ReservationTime[];
}

interface ReservationTime {
  id: number;
  times: string;
  status: "EMPTY" | "RESERVED" | string;
}

export default function ServiceInfo({ serviceData }: Props) {
  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = noimage;
  };

  return (
    <div className="flex rounded-lg shadow-lg p-5 bg-gradient-to-r from-white via-gray-100 to-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
        src={serviceData.imageUrl || noimage}
        alt="서비스 이미지"
        onError={onErrorImg}
      />
      <div className="flex flex-col w-2/3 gap-3 ml-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          {serviceData.name}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {serviceData.description || "설명이 없습니다."}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-gray-700">
            <span className="font-medium">날짜: </span>
          </div>
          <div className="text-gray-900 font-bold text-lg">
            {serviceData.price} 원
          </div>
        </div>
      </div>
    </div>
  );
}
