import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useState } from "react";

const fetchApplyData = (reserveDetailId: string): Promise<void> => {
  const token = getAccessToken();

  const response = fetch(
    `http://52.79.91.214:8080/booths/reserve/${reserveDetailId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });

  return response;
};

export const useApplyReserve = () => {
  const { mutate } = useMutation({
    mutationFn: (reserveDetailId: string) => fetchApplyData(reserveDetailId),
    onSuccess: () => {
      alert("신청되었습니다.");
    },
    onError: () => {
      alert("신청에 실패하였습니다.");
    },
  });

  return { mutate };
};
