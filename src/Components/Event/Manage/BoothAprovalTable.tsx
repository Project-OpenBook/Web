import { ChangeEvent, useState } from "react";
import { BoothAprovalContent } from "./BoothAproval";
import { getSlicingText } from "../../Admin/EventAproval";
import AprovalDetailModal, {
  AprovalModalData,
} from "../../Admin/AprovalDetailModal";
import { format } from "date-fns";

interface Props {
  booths: BoothAprovalContent;
  clickCheckbox: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  checkList: boolean[];
  onAprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function BoothAprovalTable({
  booths,
  checkList,
  clickCheckbox,
  onAprove,
  onReject,
}: Props) {
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [modalData, setModalData] = useState<AprovalModalData | null>(null);

  return (
    <tbody>
      {booths?.map((booth, index) => (
        <tr
          key={index}
          className="text-center text-nowrap hover:bg-blue-50 hover:cursor-pointer"
          onClick={() => {
            setShouldOpenModal(true);
            setModalData({
              description: booth.description,
              name: booth.name,
              registerDate: booth.registrationDate,
              status: booth.status,
              id: booth.id,
            });
          }}
        >
          <td className="py-2 px-4 border-b">
            <input
              type="checkbox"
              onChange={(e) => clickCheckbox(e, index)}
              checked={checkList[index]}
            />
          </td>
          <td className="py-2 px-4 border-b text-nowrap">{booth.name}</td>
          <td className="py-2 px-4 border-b">
            {booth.boothLocationData?.map(({ classification, number }) => (
              <span>
                {classification}-{number}
              </span>
            ))}
          </td>
          <td className="py-2 px-4 border-b">{booth.registrationDate}</td>
          <td className="py-2 px-4 border-b">
            {getSlicingText(booth.description, 20)}
          </td>
          <td
            className={`py-2 px-4 border-b ${
              booth.status === "REJECT"
                ? "text-red-500"
                : booth.status === "APPROVE"
                ? "text-green-500"
                : "text-black"
            }`}
          >
            {booth.status}
          </td>
          <td className="py-2 px-4 border-b">
            <button
              className="w-1/2 text-white bg-green-400 hover:underline mr-2 border rounded-md px-2 whitespace-nowrap"
              onClick={() => onAprove(booth.id)}
            >
              승인
            </button>
            <button
              className="w-1/2 text-white bg-red-400 hover:underline border rounded-md px-2 whitespace-nowrap"
              onClick={() => onReject(booth.id)}
            >
              반려
            </button>
          </td>
        </tr>
      ))}
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
    </tbody>
  );
}
