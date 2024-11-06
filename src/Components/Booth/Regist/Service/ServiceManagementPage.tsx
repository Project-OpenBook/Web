import ServiceInfoCard from "./ServiceInfoCard";
import { Modal_State } from "../BoothRegistPage";
import { useParams } from "react-router-dom";
import { useGetServiceList } from "../../../../Hooks/Booth/Detail/useGetServices";
import { useGetServiceAdmin } from "../../../../Hooks/Booth/Detail/useGetReserveAdmin";
interface Props {
  setModalState: (state: string) => void;
  isManager: boolean;
}

export default function ServiceManagementPage({
  setModalState,
  isManager,
}: Props) {
  let { boothId } = useParams();
  const {
    isError,
    data: userServiceList,
    isLoading,
  } = useGetServiceList(boothId ?? "");
  const { data: adminServiceList } = useGetServiceAdmin(boothId ?? "");
  console.log(adminServiceList);

  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (!userServiceList) return <div>로딩중입니다...</div>;

  const handleConfirm = () => {
    setModalState(Modal_State.none);
  };

  return (
    <div className="flex flex-col mx-auto p-6 w-full ">
      <div className="flex justify-between items-center mb-10 w-full">
        <h1 className="text-2xl font-bold mx-auto">서비스 목록</h1>
        {isManager && (
          <button
            onClick={() => {
              setModalState(Modal_State.serviceInput);
            }}
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
          >
            서비스 추가
          </button>
        )}
      </div>

      {/* 스크롤 영역 */}
      <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-96">
        {userServiceList.map((service, index) => (
          <ServiceInfoCard
            serviceData={service}
            key={index}
            isManager={isManager}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4 w-full">
        <button
          onClick={handleConfirm}
          className="w-1/4 bg-blue-500 text-white py-2 rounded"
        >
          확인
        </button>
      </div>
    </div>
  );
}
