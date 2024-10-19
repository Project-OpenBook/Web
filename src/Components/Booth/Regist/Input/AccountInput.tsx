import { IconType } from "react-icons";
import { BANK_LIST } from "../../../../Constants/BankList";

interface Props {
  label: string;
  placeholder?: string;
  accountNumber?: string;
  accountBankName?: string;
  setAccountNumber: (value: string) => void;
  setAccountBankName: (value: string) => void;
  Icon: IconType;
}
export default function AccountInput({
  label,
  placeholder,
  setAccountBankName,
  Icon,
  setAccountNumber,
  accountBankName,
  accountNumber,
}: Props) {
  return (
    <div className="flex gap-2 items-center h-full w-full max-w-screen-sm">
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
            onChange={(e) => setAccountNumber(e.target.value)}
            value={accountNumber}
          />
          <select
            className="h-10 w-1/4 mb-4 border-black border-2 rounded-md"
            onChange={(e) => {
              setAccountBankName(e.target.value);
            }}
            value={accountBankName}
          >
            {BANK_LIST.map((bank) => {
              return <option value={bank}>{bank}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
