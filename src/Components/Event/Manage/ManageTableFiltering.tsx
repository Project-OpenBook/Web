interface Props {
  setFilterStatus: (status: ManageFilterStatus) => void;
}

export type ManageFilterStatus = "waiting" | "approved" | "rejected" | "all";

export default function ManageTableFiltering({ setFilterStatus }: Props) {
  return (
    <div className="flex items-center ml-auto gap-5">
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="filtering"
          value={"all"}
          defaultChecked
          onChange={() => {
            setFilterStatus("all");
          }}
        />
        모두보기
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="filtering"
          value={"waiting"}
          onChange={() => {
            setFilterStatus("waiting");
          }}
        />
        대기 중
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="filtering"
          value={"rejected"}
          onChange={() => {
            setFilterStatus("rejected");
          }}
        />
        반려
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="filtering"
          value={"approved"}
          onChange={() => {
            setFilterStatus("approved");
          }}
        />
        승인
      </label>
    </div>
  );
}
