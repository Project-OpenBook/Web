import noimage from "../../../images/noimage.png";

interface Timeslot {
  id: number;
  times: string;
  status: string;
}

interface Props {
  serviceData: {
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

export default function ServiceInfo(service: Props) {
  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = noimage;
  };

  return (
    <div className="flex rounded-lg shadow-lg p-5 bg-gradient-to-r from-white via-gray-100 to-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
        src={service.serviceData.imageUrl || noimage}
        alt="서비스 이미지"
        onError={onErrorImg}
      />
      <div className="flex flex-col w-2/3 gap-3 ml-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          {service.serviceData.name}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {service.serviceData.description || "설명이 없습니다."}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-gray-700">
            <span className="font-medium">날짜:</span>{" "}
            {service.serviceData.date}
          </div>
          <div className="text-gray-900 font-bold text-lg">
            {service.serviceData.price.toLocaleString()} 원
          </div>
        </div>
      </div>
    </div>
  );
}
