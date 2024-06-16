import { IconType } from "react-icons";
import { useRef } from "react";

interface Props {
  label: string;
  placeholder?: string;
  setAccountNumber: (value: string) => void;
  setAccountBankName: (value: string) => void;
  Icon: IconType;
  imageName?: string;
  value?: string;
}
export default function AccountInput({
  label,
  placeholder,
  setAccountBankName,
  Icon,
  setAccountNumber,
}: Props) {
  const banks = [
    "국민은행",
    "신한은행",
    "하나은행",
    "우리은행",
    "기업은행",
    "농협은행",
    "산업은행",
    "수출입은행",
    "부산은행",
    "대구은행",
    "광주은행",
    "전북은행",
    "제주은행",
    "SC제일은행",
    "씨티은행",
    "카카오뱅크",
  ];

  return (
    <div className="flex gap-2 items-center h-full w-1/2">
      <div className="flex flex-col w-full">
        <div className="flex gap-2 items-center h-full">
          <Icon size={25} color="#0064FF" />
          <label htmlFor={label} className="font-bold">
            {label}
          </label>
        </div>
        <div className="flex w-full">
          <input
            placeholder={placeholder}
            type="text"
            className="h-10 border-b-2 pl-1 mb-5 w-3/4"
            onChange={(e) => setAccountBankName(e.target.value)}
          />
          <select
            className="h-10 w-1/4 mb-4"
            onChange={(e) => {
              setAccountNumber(e.target.value);
            }}
          >
            {banks.map((bank) => {
              return <option value={bank}>{bank}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
