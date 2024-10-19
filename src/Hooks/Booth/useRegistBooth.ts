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
  tagNames?: string[];
}

const fetchSignUp = (boothRegistData: BoothRegistData): Promise<void> => {
  const formatTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}:00`;
  };

  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", boothRegistData.name);
  formData.append("linkedEvent", boothRegistData.linkedEvent);
  formData.append("openTime", formatTime(boothRegistData.openTime));
  formData.append("closeTime", formatTime(boothRegistData.endTime));
  formData.append("description", boothRegistData.description);
  formData.append("accountNumber", boothRegistData.accountNumber);
  formData.append("accountBankName", boothRegistData.accountBankName);
  boothRegistData.selectedSeatIds.forEach((location) => {
    formData.append("requestAreas", location.toString());
  });
  boothRegistData.tagNames?.forEach((tag) => {
    formData.append("tags", tag);
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
  const [openTime, setOpenTime] = useState("2024-10-01T00:00");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [endTime, setEndTime] = useState("2024-10-01T00:00");
  const [name, setName] = useState("");
  const [tagNames, setTagNames] = useState<string[]>([]);
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
        tagNames,
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
    tagNames,
    setTagNames,
    accountBankName,
    mainImage,
    openTime,
    endTime,
  };
};
