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

export default function BoothDetailPage() {
  let { id } = useParams();

  const { isError, data, isLoading } = useGetBoothDetail(id ?? "");
  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const tmpGoods = ["1", "2", "3"];
  const tmpServices = ["1", "2", "3"];

  return (
    <div className="flex justify-center text-xl">
      {data ? (
        <div className="shadow-md w-full max-w-screen-xl m-2 flex flex-col items-center my-10 pb-5 p-2">
          <div className="flex flex-col mt-10 items-center gap-4">
            <div className="text-3xl font-bold my-5">{data.name}</div>
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
              <div className="flex gap-1 items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <MdAnnouncement size={25} color="#0064FF" />
                  <div className="font-bold">공지사항/이벤트</div>
                </div>
                <button className="ml-auto bg-[#0064FF] text-white rounded-md px-2 ">
                  모두 보기
                </button>
              </div>
              <div className="w-full flex flex-col gap-4 shadow-md px-4 py-6 rounded-md">
                <NoticeEvent text="이벤트 1" type="event" />
                <NoticeEvent text="공지사항 1" type="notice" />
                <NoticeEvent text="공지사항 2" type="notice" />
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex gap-2 items-center w-full">
                <BsBasketFill size={25} color="#0064FF" />
                <div className="font-bold">판매 상품</div>
                <button className="ml-auto bg-[#0064FF] text-white rounded-md px-2 ">
                  모두 보기
                </button>
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
                <button className="ml-auto bg-[#0064FF] text-white rounded-md px-2 ">
                  모두 보기
                </button>
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
    </div>
  );
}
