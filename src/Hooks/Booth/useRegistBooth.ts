import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAccessToken } from "../../Api/Util/token";
interface BoothRegistData {
  linkedEvent: string;
  openTime: string;
  endTime: string;
  mainImage?: File | null;
  selectedSeatIds: number[];
  name: string;
  description: string;
  accountNumber: string;
  accountBankName: string;
}

const fetchSignUp = (boothRegistData: BoothRegistData): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", boothRegistData.name);
  formData.append("linkedEvent", boothRegistData.linkedEvent);
  formData.append("openTime", boothRegistData.openTime);
  formData.append("closeTime", boothRegistData.endTime);
  formData.append("description", boothRegistData.description);
  formData.append("accountNumber", boothRegistData.accountNumber);
  formData.append("accountBankName", boothRegistData.accountBankName);
  boothRegistData.selectedSeatIds.forEach((location) => {
    formData.append("layoutAreas", location.toString());
  });

  if (boothRegistData.mainImage) {
    formData.append("mainImage", boothRegistData.mainImage);
  }
  const response = fetch("http://52.79.91.214:8080/booths", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  }).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });

  return response;
};

export const useRegisteBooth = (initBoothName?: string) => {
  const navi = useNavigate();
  const [description, setDescription] = useState("");
  const [linkedEvent, setLinkedEvent] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  const [accountBankName, setAccountBankName] = useState("");
  const [boothName, setBoothName] = useState(initBoothName ?? "");

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchSignUp({
        name,
        description,
        linkedEvent,
        openTime,
        endTime,
        accountNumber,
        mainImage,
        accountBankName,
        selectedSeatIds,
      }),

    onError: () => {
      alert("부스 신청에 실패했습니다.");
    },
    onSuccess: () => {
      alert("부스가 신청되었습니다.");
      navi("/");
    },
  });

  return {
    mutate,
    setName,
    setMainImage,
    setOpenTime,
    setEndTime,
    setDescription,
    setAccountNumber,
    boothName,
    setAccountBankName,
    setLinkedEvent,
    setSelectedSeatIds,
    selectedSeatIds,
  };
};
