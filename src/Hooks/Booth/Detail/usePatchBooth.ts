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
  tags: { id: string; name: string }[];
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
  accountNumber: string;
  accountBankName: string;
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
  mainImageUrl: File | string | null;
  accountBankName: string;
  accountNumber: string;
  tagToAdd: string[];
  tagToDelete: string[];
}

const fetchPatchData = (
  patchData: PatchData,
  boothId: string
): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();

  const formatTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}:00`;
  };

  formData.append("name", patchData.name);
  formData.append("description", patchData.description);
  if (patchData.mainImageUrl !== null) {
    formData.append("mainImage", patchData.mainImageUrl);
  }
  formData.append("openTime", formatTime(patchData.openTime));
  formData.append("closeTime", formatTime(patchData.closeTime));
  patchData.tagToAdd.forEach((addTags) => {
    formData.append("tagToAdd", addTags);
  });
  patchData.tagToDelete.forEach((delTags) => {
    formData.append("tagToDelete", delTags);
  });
  formData.append("accountBankName", patchData.accountBankName);
  formData.append("accountNumber", patchData.accountNumber);
  const response = fetch(`http://52.79.91.214:8080/booths/${boothId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    body: formData,
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
  const [tagNames, setTagNames] = useState(
    boothData.tags.map((tag) => {
      return tag.name;
    })
  );
  const [tags, setTags] = useState(boothData.tags);
  const [tagToAdd, setTagToAdd] = useState<string[]>([]);
  const [tagToDelete, setTagToDelete] = useState<string[]>([]);
  const [accountNumber, setAccountNumber] = useState<string>(
    boothData.accountNumber
  );
  const [accountBankName, setAccountBankName] = useState<string>(
    boothData.accountBankName
  );
  const [mainImageUrl, setMainImageUrl] = useState<File | string | null>(
    boothData.mainImageUrl
  );
  const { mutate } = useMutation({
    mutationFn: () =>
      fetchPatchData(
        {
          name,
          accountBankName,
          accountNumber,
          closeTime,
          description,
          mainImageUrl,
          openTime,
          tagToAdd,
          tagToDelete,
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
    mainImageUrl,
    setMainImageUrl,
    setTagToAdd,
    setTagToDelete,
    tagToAdd,
    tagToDelete,
    tagNames,
    setTagNames,
  };
};
