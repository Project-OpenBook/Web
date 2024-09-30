import { ChangeEvent } from "react";
import { BoothAprovalContent } from "./BoothAproval";

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
  return (
    <tbody>
      {booths?.map((booth, index) => (
        <tr key={index} className="text-center">
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
          <td className="py-2 px-4 border-b">{booth.description}</td>
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
              className="w-full text-white bg-green-400 hover:underline mr-2 border rounded-md px-2 whitespace-nowrap"
              onClick={() => onAprove(booth.id)}
            >
              승인
            </button>
            <button
              className="w-full text-white bg-red-400 hover:underline border rounded-md px-2 whitespace-nowrap"
              onClick={() => onReject(booth.id)}
            >
              반려
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
