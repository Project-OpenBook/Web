import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRadioChecks } from "../../Hooks/useRadioChecks";
import { getAccessToken } from "../../Api/Util/token";
import PageNation from "../Util/PageNation";
import { useSearchParams } from "react-router-dom";
import PleaseLogin from "../Login/PleaseLogin";
import { useAproval } from "../../Hooks/useAproval";
import { format } from "date-fns";
import AprovalDetailModal, { AprovalModalData } from "./AprovalDetailModal";

interface EventAprovalType {
  content: Array<{
    id: number;
    description: string;
    location: string;
    name: string;
    openDate: string;
    status: string;
    registerDate: string;
  }>;
  pageNumber: number;
  totalPages: number;
}

const fetcher = (page: number) =>
  fetch(
    `http://52.79.91.214:8080/admin/events?page=${
      page - 1
    }&status=all&sort=registeredAt%2CDESC`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  ).then((response) => response.json());

const setEventState = (id: number, status: string) =>
  fetch(`http://52.79.91.214:8080/admin/events/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ status }),
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });

export const getSlicingText = (text: string, lastIndex: number) => {
  const sliceText = text.slice(0, lastIndex);
  return text.length > sliceText.length ? `${sliceText}...` : sliceText;
};

// TODO: 관리자 계정이 아닐경우 return
export default function EventAproval() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [modalData, setModalData] = useState<AprovalModalData | null>(null);
  const { data, isError, refetch } = useQuery<EventAprovalType>({
    queryKey: ["event-aproval"],
    queryFn: () => fetcher(+page),
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
  } = useAproval(setEventState, refetch);

  const changeStates = (state: "APPROVE" | "REJECT") => {
    if (!data?.content) return console.error("행사를 찾을 수 없음");
    const eventIds = data.content
      .filter((_, index) => checkList[index])
      .map((event) => event.id);

    cs(eventIds, state);
  };

  useEffect(() => {
    refetch();
    disableAllCheck();
  }, [refetch, page, disableAllCheck]);

  if (!getAccessToken()) {
    return <PleaseLogin />;
  }

  if (isError) return <>행사 요청 데이터를 가져오는데 실패했습니다.</>;

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
          <table className="bg-white border-y border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="py-2 w-1">
                  <input
                    type="checkbox"
                    checked={isCheckAll}
                    onChange={clickCheckAll}
                  />
                </th>
                <th className="py-2 px-4">행사명</th>
                <th className="py-2 px-4">행사 장소</th>
                <th className="py-2 px-4">행사 신청일</th>
                <th className="py-2 px-4">행사 설명</th>
                <th className="py-2 px-4">상태</th>
                <th className="py-2 px-4">관리</th>
              </tr>
            </thead>
            <tbody>
              {data?.content?.map((booth, index) => (
                <tr
                  key={index}
                  className="text-center text-nowrap hover:bg-blue-50 hover:cursor-pointer"
                  onClick={() => {
                    setShouldOpenModal(true);
                    setModalData({
                      description: booth.description,
                      location: booth.location,
                      name: booth.name,
                      registerDate: booth.registerDate,
                      status: booth.status,
                      id: booth.id,
                    });
                  }}
                >
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        clickCheckbox(e, index);
                      }}
                      checked={checkList[index] ?? false}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-nowrap">
                    {booth.name}
                  </td>
                  <td className="py-2 px-4 border-b">{booth.location}</td>
                  <td className="py-2 px-4 border-b">
                    {format(new Date(booth.registerDate), "yyyy-MM-dd")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {getSlicingText(booth.description, 20)}
                  </td>
                  <td
                    className={`py-2 px-4 border-b ${
                      booth.status === "REJECT"
                        ? "text-red-500"
                        : booth.status === "APPROVE"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {booth.status}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="w-1/2 text-white bg-green-400 shadow-md hover:underline mr-2 border rounded-md px-2 whitespace-nowrap"
                      onClick={(e) => {
                        onAprove(booth.id);
                        e.stopPropagation();
                      }}
                    >
                      승인
                    </button>
                    <button
                      className="w-1/2 text-white bg-red-400 shadow-md hover:underline border rounded-md px-2 whitespace-nowrap"
                      onClick={(e) => {
                        onReject(booth.id);
                        e.stopPropagation();
                      }}
                    >
                      반려
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {data && (
        <PageNation
          maxPage={data.totalPages ?? 1}
          showPage={5}
          className="mt-5"
        />
      )}

      {shouldOpenModal && modalData && (
        <AprovalDetailModal
          data={{
            description: modalData.description,
            location: modalData.location,
            name: modalData.name,
            registerDate: format(
              new Date(modalData.registerDate),
              "yyyy-MM-dd"
            ),
            status: modalData.status,
            id: modalData.id,
          }}
          onClose={() => setShouldOpenModal(false)}
          onAprove={() => {
            setShouldOpenModal(false);
            onAprove(modalData.id);
          }}
          onReject={() => {
            setShouldOpenModal(false);
            onReject(modalData.id);
          }}
        />
      )}
    </div>
  );
}
