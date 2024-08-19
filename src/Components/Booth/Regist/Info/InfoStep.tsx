import { warn } from "console";

interface Props {
  classname: string;
  img?: string;
  description: string;
  step: string;
  warn?: string;
}

export default function InfoStep({
  classname,
  description,
  step,
  img,
  warn,
}: Props) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="font-semibold">STEP {step}</div>
      <div className={classname}>asdfasdf</div>

      <div>{description}</div>
      {warn && <div className="text-red-500">* {warn}</div>}
    </div>
  );
}
