import BoothAproval from "./BoothAproval";

export default function EventManage() {
  return (
    <section
      className="flex min-h-screen justify-center my-10"
      onSubmit={() => {}}
    >
      <div className="w-full max-w-screen-lg border h-full p-10">
        <div className="flex items-center gap-20 border-b p-7">
          <h2 className="font-extrabold text-4xl">행사 관리</h2>
          <span className="font-bold text-2xl">{"행사명"}</span>
        </div>
        <div className="flex">
          <div className="w-32 h-80 border-r p-4 font-bold">부스 신청 현황</div>
          <BoothAproval />
        </div>
      </div>
    </section>
  );
}
