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
    <div className="border p-4 rounded-lg flex shadow-md relative">
      <img
        src={service.ServiceData.imageUrl || noImage}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between flex-grow pl-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">
              {service.ServiceData.name} {service.ServiceData.date}
            </h3>
            <p className="text-xl text-gray-800">
              {service.ServiceData.price.toLocaleString()}원
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-500 hover:text-blue-700 text-sm">
              수정
            </button>
            <button className="text-red-500 hover:text-red-700 text-sm">
              삭제
            </button>
          </div>
        </div>
        <p className="text-gray-600">{service.ServiceData.description}</p>
      </div>
    </div>
  );
}
