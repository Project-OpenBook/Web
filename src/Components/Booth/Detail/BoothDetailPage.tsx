import { MdAnnouncement } from "react-icons/md";
import { BsBasketFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import ProductInfo from "./ProductInfo";
import ServiceInfo from "./ServiceInfo";
import Tag from "./Tag";
import NoticeEvent from "./NoticeEvent";
import Location from "./Location";
import Time from "./Time";
import { useParams } from "react-router-dom";
import { useGetBoothDetail } from "../../../Hooks/Booth/useGetBoothDetail";
import EventName from "./EventName";
import { Modal_State } from "../Regist/BoothRegistPage";
import { useState } from "react";
import Modal from "../../Util/Modal";
import ServiceManagementPage from "../Regist/Service/ServiceManagementPage";
import ServiceInfoInputPage from "../Regist/Service/ServiceInfoInputPage";
import ServiceTimeAdd from "../Regist/Service/ServiceTimeAdd";
import ManageProducts from "./Regist/Products/ManageProducts";
import GoodsInfoInputPage from "./Regist/Products/GoodsInfoInputPage";
import BoothNotice from "./BoothNotice";

export default function BoothDetailPage() {
  const [modalState, setModalState] = useState(Modal_State.none);
  let { boothId } = useParams();

  const { isError, data, isLoading } = useGetBoothDetail(boothId ?? "");
  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const renderProductManage = () => {
    if (data?.isUserManager) {
      return (
        <div
          onClick={() => setModalState(Modal_State.goodsManage)}
          className="w-15 inline-flex shadow-md px-2 rounded-md text-white text-center bg-[#401F71]"
        >
          물품 관리
        </div>
      );
    }
  };

  const renderServiceManage = () => {
    if (data?.isUserManager) {
      return (
        <div
          onClick={() => setModalState(Modal_State.serviceManage)}
          className="w-15 inline-flex shadow-md px-2 rounded-md text-white text-center bg-[#401F71]"
        >
          서비스 관리
        </div>
      );
    }
  };

  const tmpGoods = ["1", "2", "3"];
  const tmpServices = ["1", "2", "3"];

  return (
    <div className="flex justify-center text-xl">
      {data ? (
        <div className="shadow-md w-full max-w-screen-xl m-2 flex flex-col items-center my-10 pb-5 p-2">
          <div className="flex flex-col mt-10 items-center gap-4">
            <div className="text-3xl font-bold my-5 flex">
              <div>{data.name} </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-center gap-5">
              <img
                className="w-full lg:w-60"
                src={data.mainImageUrl}
                alt="부스 이미지"
              />
              <div className="flex flex-col">
                <div className="flex flex-col h-2/3 gap-3 mt-2">
                  <div>
                    <div className="flex gap-2 flex-col md:flex-row">
                      <div className="font-bold text-nowrap">행사명 : </div>
                      <EventName text={data.eventName} />
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 flex-col md:flex-row">
                      <div className="font-bold text-nowrap">부스위치 : </div>
                      <div className="flex gap-2 flex-wrap">
                        {data.location.map((loc, index) => (
                          <Location
                            key={index}
                            text={`${loc.classification} ${loc.number}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <div className="font-bold text-nowrap">
                      부스 운영시간 :{" "}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Time text={data.openTime} />
                      <span> ~ </span>
                      <Time text={data.closeTime} />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="font-bold text-nowrap">부스 태그 : </div>
                    <div className="flex w-full gap-3 flex-wrap">
                      <Tag text="로맨스" />
                      <Tag text="액션" />
                      <Tag text="공포" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <div className="font-bold">부스 설명</div>
                    <div>{data.description}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <BoothNotice boothId={+(boothId ?? 0)} />
            </div>

            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex gap-2 items-center w-full">
                <BsBasketFill size={25} color="#0064FF" />
                <div className="font-bold">판매 상품</div>
                <div className="flex ml-auto gap-2">
                  <button>{renderProductManage()} </button>
                  <button className="ml-auto bg-[#0064FF] text-white rounded-md px-2 ">
                    모두 보기
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {tmpGoods.map((goods) => {
                  return <ProductInfo />;
                })}
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex gap-2 items-center w-full">
                <FaClock size={25} color="#0064FF" />
                <div className="font-bold">서비스 예약</div>
                <div className="flex ml-auto gap-2">
                  <button>{renderServiceManage()} </button>
                  <button className="ml-auto bg-[#0064FF] text-white rounded-md px-2 ">
                    모두 보기
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {tmpServices.map((service) => {
                  return <ServiceInfo />;
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {modalState !== "none" && (
        <Modal width="w-3/4" isOpen={true}>
          {modalState === Modal_State.goodsManage && (
            <ManageProducts setModalState={setModalState} />
          )}
          {modalState === Modal_State.goodsInput && (
            <GoodsInfoInputPage setModalState={setModalState} />
          )}
          {modalState === Modal_State.serviceManage && (
            <ServiceManagementPage setModalState={setModalState} />
          )}
          {modalState === Modal_State.serviceInput && (
            <ServiceInfoInputPage setModalState={setModalState} />
          )}
          {modalState === Modal_State.serviceTime && (
            <ServiceTimeAdd
              startDate={new Date(2024, 5, 23)}
              endDate={new Date(2024, 5, 30)}
            />
          )}
          {modalState === Modal_State.serviceInput && (
            <ServiceInfoInputPage setModalState={setModalState} />
          )}
        </Modal>
      )}
    </div>
  );
}
