import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isError } from "util";
import { Modal_State } from "../../../Components/Booth/Regist/BoothRegistPage";

interface ReserveRegistData {
  name: string;
  description: string;
  price: string;
  image: File | null;
  times: string[];
  boothId: string;
  date: string[];
}

const fetchReserveInput = (
  reserveRegistData: ReserveRegistData
): Promise<void> => {
  const token = getAccessToken();
  console.log(reserveRegistData.boothId);
  let formData = new FormData();
  formData.append("name", reserveRegistData.name);
  formData.append("description", reserveRegistData.description);
  if (reserveRegistData.image) {
    formData.append("image", reserveRegistData.image);
  }
  formData.append("price", reserveRegistData.price);
  reserveRegistData.times.forEach((time) => {
    formData.append("times", time);
  });
  reserveRegistData.date.forEach((date) => {
    formData.append("dates", date);
  });
  const response = fetch(
    `http://52.79.91.214:8080/booths/${reserveRegistData.boothId}/reservation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });

  return response;
};

export const useReserveInput = (setModalState: (state: string) => void) => {
  const { boothId } = useParams() as { boothId: string };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [timeList, setTimeList] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [imageName, setImageName] = useState("X");

  const resetVar = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
    setTimeList([]);
    setSelectedDates([]);
    setImageName("X");
  };

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: () =>
      fetchReserveInput({
        name,
        description,
        image,
        price,
        boothId,
        times: timeList,
        date: selectedDates,
      }),

    onError: () => {
      alert("서비스 등록에 실패했습니다.");
    },
    onSuccess: () => {
      alert("서비스가 등록되었습니다.");
      resetVar();
      setModalState(Modal_State.serviceManage);
    },
  });

  return {
    mutate,
    setTimeList,
    selectedDates,
    timeList,
    setSelectedDates,
    setDescription,
    setImage,
    setName,
    name,
    description,
    image,
    price,
    setPrice,
    imageName,
    setImageName,
    isError,
    isSuccess,
  };
};
