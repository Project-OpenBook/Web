import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useState } from "react";

interface BoothData {
  id: number;
  name: string;
  openData: string;
  closeData: string;
  location: LocationData[];
  description: string;
  mainImageUrl: string;
  tags: string[];
  eventId: number;
  eventName: string;
  event: {
    id: string;
    name: string;
    manager: {
      id: string;
      nickname: string;
      role: string;
    };
  };
  isUserManager: boolean;
  manager: {
    id: string;
    nickname: string;
    role: string;
  };
}

interface LocationData {
  classification: string;
  number: string;
}

interface PatchData {
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  mainImage: string;
  accountBankName: string;
  accountNumber: string;
  tags: string[];
}

const fetchPatchData = (
  patchData: PatchData,
  boothId: string
): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", patchData.name);
  formData.append("description", patchData.description);
  if (patchData.mainImage !== null) {
    formData.append("mainImage", patchData.mainImage);
  }
  formData.append("openTime", patchData.openTime);
  formData.append("closeTime", patchData.closeTime);
  patchData.tags.map((tag) => {
    formData.append("tags", tag);
  });
  formData.append("accountBankName", patchData.accountBankName);
  formData.append("accountNumber", patchData.accountNumber);
  const response = fetch(`http://52.79.91.214:8080/booths/${boothId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
  }).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });

  return response;
};

export const usePatchBooth = (boothData: BoothData, boothId: string) => {
  const [name, setName] = useState(boothData.name);
  const [description, setDescription] = useState(boothData.description);
  const [openTime, setOpenTime] = useState(boothData.openData);
  const [closeTime, setCloseTime] = useState(boothData.closeData);
  const [tags, setTags] = useState(boothData.tags);
  const [accountNumber, setAccountNumber] = useState("3333090884128");
  const [accountBankName, setAccountBankName] = useState("카카오뱅크");
  const [mainImage, setMainImage] = useState(boothData.mainImageUrl);
  const { mutate } = useMutation({
    mutationFn: () =>
      fetchPatchData(
        {
          name,
          accountBankName,
          accountNumber,
          closeTime,
          description,
          mainImage,
          openTime,
          tags,
        },
        boothId
      ),
    onSuccess: () => {
      alert("물품이 성공적으로 수정되었습니다.");
    },
    onError: () => {
      alert("물품 수정에 실패했습니다.");
    },
  });

  return {
    mutate,
    description,
    name,
    setDescription,
    setName,
    accountBankName,
    accountNumber,
    closeTime,
    tags,
    setTags,
    setAccountBankName,
    setAccountNumber,
    openTime,
    setOpenTime,
    setCloseTime,
    mainImage,
    setMainImage,
  };
};
