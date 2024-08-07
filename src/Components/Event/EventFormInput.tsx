import { IconType } from "react-icons";

interface Props {
  placeholder: string;
  label: string;
  required?: boolean;
  onChange: (e: any) => void;
  name: string;
  DateInput?: boolean;
  Icon: IconType;
  value?: string;
  labelClassName?: string;
}
export default function EventFormInput({
  placeholder,
  required = false,
  onChange,
  name,
  DateInput = false,
  label,
  Icon,
  value,
  labelClassName,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-2 items-center">
        <Icon size={20} />
        <span className={labelClassName}>{label}</span>
      </div>

      <input
        className="border rounded-md p-1 w-full"
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        type={DateInput ? "date" : "text"}
        value={value}
      />
    </div>
  );
}
