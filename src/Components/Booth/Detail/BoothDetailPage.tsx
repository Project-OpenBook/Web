import { BsBasketFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import ProductInfo from "./ProductInfo";
import ServiceInfo from "./ServiceInfo";
import Tag from "./Tag";
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
import { useReserveInput } from "../../../Hooks/Booth/Detail/useRegistReserve";
import useGetUser from "../../../Hooks/Util/useGetUser";
import ReviewList from "../../Event/EventReviewList";
import { useGetGoodsList } from "../../../Hooks/Booth/Detail/useGetGoods";
import { useGetServiceList } from "../../../Hooks/Booth/Detail/useGetServices";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "../../Bookmark/BookmarkIcon";

export default function BoothDetailPage() {
  const [modalState, setModalState] = useState(Modal_State.none);
  let { boothId } = useParams();
  const { data: userData } = useGetUser();
  const navi = useNavigate();
  const {
    mutate,
    setName,
    setPrice,
    setDescription,
    setImage,
    name,
    description,
    price,
    imageName,
    setImageName,
    selectedDates,
    setSelectedDates,
    setTimeList,
    timeList,
  } = useReserveInput(setModalState);
  const { isError, data, isLoading } = useGetBoothDetail(boothId ?? "");
  const { data: services } = useGetServiceList(boothId ?? "");
  const { data: productData } = useGetGoodsList(boothId ?? "");
  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const isUserHaveAuth = () => {
    if (userData && userData.id === data?.manager.id) return true;
    return false;
  };

  const formatDate = (input: string): string => {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  const formatTime = (input: string): string => {
    const date = new Date(input);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours} : ${minutes}`;
  };

  const renderProductManage = () => {
    if (isUserHaveAuth()) {
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
    if (isUserHaveAuth()) {
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

  return (
    <div className="flex justify-center text-xl">
      {data ? (
        <div className="shadow-md w-full max-w-screen-xl m-2 flex flex-col items-center my-10 pb-5 p-2">
          <BookmarkIcon
            id={+(boothId ?? 0)}
            type="BOOTH"
            className="flex justify-end"
          />
          <div className="flex flex-col mt-10 items-center gap-4 lg:w-[900px]">
            <div className="relative w-full flex items-center justify-center my-5">
              <div className="absolute left-0">
                {isUserHaveAuth() && (
                  <button
                    onClick={() => navi(`/booth/patch/${boothId}`)}
                    className="bg-[#0064FF]  text-white rounded-md px-4 py-2"
                  >
                    부스 정보 수정
                  </button>
                )}
              </div>
              <div className="text-3xl font-bold">{data.name}</div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-5">
              <div className="w-1/2 bg-white flex justify-center">
                <img
                  className="w-full lg:w-60"
                  src={data.mainImageUrl}
                  alt="부스 이미지"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col h-2/3 gap-3 mt-2">
                  <div>
                    <div className="flex gap-2 flex-col md:flex-row">
                      <div className="font-bold text-nowrap">행사명 :</div>
                      <EventName text={data.event.name} />
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
                      부스 운영 날짜 :{" "}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Time text={formatDate(data.openData)} />
                      <span> ~ </span>
                      <Time text={formatDate(data.closeData)} />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <div className="font-bold text-nowrap">
                      부스 운영 시간 :{" "}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Time text={formatTime(data.openData)} />
                      <span> ~ </span>
                      <Time text={formatTime(data.closeData)} />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="font-bold text-nowrap">부스 태그 : </div>
                    <div className="flex w-full gap-3 flex-wrap">
                      {data.tags.map((tag) => {
                        return <Tag text={tag.name} />;
                      })}
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
              <div className="flex gap-2 items-center w-full pt-2">
                <BsBasketFill size={25} color="#0064FF" />
                <div className="font-bold">판매 상품</div>
                <div className="flex ml-auto gap-2">
                  <button>{renderProductManage()} </button>
                  {!isUserHaveAuth() && (
                    <button
                      onClick={() => setModalState(Modal_State.goodsManage)}
                      className="ml-auto bg-[#0064FF] text-white rounded-md px-2 "
                    >
                      모두 보기
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-row gap-2">
                {productData &&
                productData.length > 0 &&
                productData[0]?.products?.content?.length > 0 ? (
                  productData[0].products.content
                    .slice(0, 3)
                    .map((goods, index) => {
                      return <ProductInfo key={index} productData={goods} />;
                    })
                ) : (
                  <div className="my-10 text-center text-bold text-2xl">
                    등록된 상품이 없습니다.
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex gap-2 items-center w-full">
                <FaClock size={25} color="#0064FF" />
                <div className="font-bold">서비스 예약</div>
                <div className="flex ml-auto gap-2">
                  <button>{renderServiceManage()} </button>
                  {!isUserHaveAuth() && (
                    <button
                      onClick={() => setModalState(Modal_State.serviceManage)}
                      className="ml-auto bg-[#0064FF] text-white rounded-md px-2 "
                    >
                      모두 보기
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {services?.length === 0 && (
                  <div className="my-10 text-center text-bold text-2xl">
                    등록된 서비스가 없습니다.
                  </div>
                )}
                {services &&
                  services.slice(0, 3).map((service) => {
                    return <ServiceInfo serviceData={service} />;
                  })}
              </div>
            </div>
            <ReviewList id={+(boothId ?? 0)} type="booth" />
          </div>
        </div>
      ) : null}
      {modalState !== "none" && (
        <Modal width="w-3/4" isOpen={true}>
          {modalState === Modal_State.goodsManage && (
            <ManageProducts
              isManager={isUserHaveAuth()}
              setModalState={setModalState}
            />
          )}
          {modalState === Modal_State.goodsInput && (
            <GoodsInfoInputPage setModalState={setModalState} />
          )}
          {modalState === Modal_State.serviceManage && (
            <ServiceManagementPage
              isManager={isUserHaveAuth()}
              setModalState={setModalState}
            />
          )}
          {modalState === Modal_State.serviceInput && (
            <ServiceInfoInputPage
              mutate={mutate}
              imageName={imageName}
              setImageName={setImageName}
              setModalState={setModalState}
              description={description}
              name={name}
              price={price}
              setDescription={setDescription}
              setImage={setImage}
              setName={setName}
              setPrice={setPrice}
              selectedDates={selectedDates}
              timeList={timeList}
            />
          )}
          {modalState === Modal_State.serviceTime && (
            <ServiceTimeAdd
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              setTimeList={setTimeList}
              timeList={timeList}
              setModalState={setModalState}
              startDate={new Date(2024, 1, 1)}
              endDate={new Date(2025, 1, 30)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
