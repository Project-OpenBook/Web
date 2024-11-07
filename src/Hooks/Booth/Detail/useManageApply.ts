import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useState } from "react";

const fetchApplyData = (detail_id: string, approve: string): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();
  formData.append("status", approve);
  console.log(token);

  const response = fetch(
    `http://52.79.91.214:8080/manage/booths/reserve/${detail_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: formData,
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });

  return response;
};

export const useManageApply = () => {
  const [approve, setApprove] = useState<"COMPLETE" | "EMPTY" | "">("");
  const { mutate } = useMutation({
    mutationFn: (detail_id: string) => fetchApplyData(detail_id, approve),
    onSuccess: () => {
      alert("변경되었습니다.");
    },
    onError: () => {
      alert("변경에 실패하였습니다.");
    },
  });

  return { mutate, setApprove };
};
