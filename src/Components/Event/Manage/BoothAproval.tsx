import { getAccessToken } from "../../../Api/Util/token";
import { useQuery } from "@tanstack/react-query";
import { useRadioChecks } from "../../../Hooks/useRadioChecks";
import { useParams, useSearchParams } from "react-router-dom";
import PageNation from "../../Util/PageNation";
import { Event, eventFetcher } from "../EventDetail";
import BoothAprovalTable from "./BoothAprovalTable";
import { useAproval } from "../../../Hooks/useAproval";
import { useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth";

export type BoothAprovalContent = Array<{
  id: number;
  name: string;
  registrationDate: string;
  description: string;
  status: string;
  boothLocationData: Array<{
    classification: string;
    number: string;
  }>;
}>;
export interface BoothAprovalType {
  totalPages: number;
  pageNumber: number;
  content: Array<{
    id: number;
    name: string;
    registrationDate: string;
    description: string;
    status: string;
    boothLocationData: Array<{
      classification: string;
      number: string;
    }>;
  }>;
}

const fetcher = (eventId: string | undefined) => {
  if (!eventId) return Promise.reject();
  return fetch(`http://52.79.91.214:8080/events/${eventId}/managed/booths`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });
};

const setBoothState = (boothId: number, status: string) =>
  fetch(`http://52.79.91.214:8080/events/booths/${boothId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ boothStatus: status }),
  })
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

export default function BoothAproval() {
  const { id } = useParams();
  const { id: userId } = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const { data, isError, refetch } = useQuery<BoothAprovalType>({
    queryKey: ["event-aproval"],
    enabled: !!id,
    queryFn: () => fetcher(id), //TODO: page 추가
  });

  const {
    data: eventData,
    isError: eventError,
    isLoading: eventLoading,
  } = useQuery<Event>({
    queryKey: ["event", id],
    enabled: !!id,
    queryFn: () => eventFetcher(id),
    retry: 1,
  });

  const {
    checkList,
    clickCheckAll,
    clickCheckbox,
    isCheckAll,
    disableAllCheck,
  } = useRadioChecks(data?.content?.length ?? 1);
  const {
    changeStates: cs,
    onAprove,
    onReject,
  } = useAproval(setBoothState, refetch);

  useEffect(() => {
    refetch();
    disableAllCheck();
  }, [refetch, page, disableAllCheck]);

  const changeStates = (state: "APPROVE" | "REJECT") => {
    if (!data?.content) return console.error("행사를 찾을 수 없음");
    const eventIds = data.content
      .filter((_, index) => checkList[index])
      .map((event) => event.id);

    cs(eventIds, state);
  };

  if (!userId) return <>Loading...</>;
  if (!eventLoading && eventData?.eventManager.id !== userId) {
    alert("행사 관리자만 이용 가능합니다");
    window.history.back();
  }
  if (!data || isError) return <>부스 데이터를 찾을 수 없습니다.</>;

  return (
    <div className="flex-1 w-full flex flex-col p-2">
      <div className="w-full inline-flex gap-3 p-2">
        <button
          className="border p-2 px-4 rounded-md font-bold text-white bg-green-400"
          onClick={() => changeStates("APPROVE")}
        >
          승인
        </button>
        <button
          className="border p-2 px-4 rounded-md font-bold text-white bg-red-400"
          onClick={() => changeStates("REJECT")}
        >
          반려
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="container mx-auto">
          {data.content.length === 0 ? (
            <div className="text-center text-2xl bold mt-20">
              신청된 부스가 없습니다😂
            </div>
          ) : (
            <table className="w-[800px] bg-white border-y border-gray-200">
              <thead>
                <tr className="border-b">
                  <th className="py-2 w-1">
                    <input
                      type="checkbox"
                      checked={isCheckAll}
                      onChange={clickCheckAll}
                    />
                  </th>
                  <th className="py-2 px-4">부스명</th>
                  <th className="py-2 px-4">부스 위치</th>
                  <th className="py-2 px-4">부스 신청일</th>
                  <th className="py-2 px-4">부스 설명</th>
                  <th className="py-2 px-4">상태</th>
                  <th className="py-2 px-4">관리</th>
                </tr>
              </thead>

              <BoothAprovalTable
                booths={data?.content}
                checkList={checkList}
                clickCheckbox={clickCheckbox}
                onAprove={onAprove}
                onReject={onReject}
              />
            </table>
          )}
        </div>
      </div>
      {data && (
        <PageNation
          maxPage={data.totalPages ?? 1}
          showPage={5}
          className="mt-5"
        />
      )}
    </div>
  );
}
