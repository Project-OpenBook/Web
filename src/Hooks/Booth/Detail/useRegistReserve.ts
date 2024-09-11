import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

export const useReserveInput = () => {
  const navi = useNavigate();
  const { boothId } = useParams() as { boothId: string };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [times, setTimes] = useState([]);
  const [date, setDate] = useState([]);

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchReserveInput({
        name,
        description,
        image,
        price,
        boothId,
        times,
        date,
      }),

    onError: () => {
      alert("상품 등록에 실패했습니다.");
    },
    onSuccess: () => {
      alert("상품이 등록되었습니다.");
      navi("/");
    },
  });

  return {
    mutate,
    setTimes,
    date,
    times,
    setDate,
    setDescription,
    setImage,
    setName,
    setPrice,
  };
};
