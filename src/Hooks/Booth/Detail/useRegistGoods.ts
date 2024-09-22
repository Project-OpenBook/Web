import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface GoodsRegistData {
  categoryId: string;
  name: string;
  description: string;
  stock: string;
  price: string;
  images: File[] | null;
  boothId: string;
}

const fetchGoodsInput = (goodsRegistData: GoodsRegistData): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", goodsRegistData.name);
  formData.append("categoryId", "1");
  formData.append("description", goodsRegistData.description);
  if (goodsRegistData.images !== null) {
    goodsRegistData.images.forEach((image) => {
      formData.append("images", image);
    });
  }
  formData.append("price", goodsRegistData.price);
  formData.append("stock", goodsRegistData.stock);
  const response = fetch(
    `http://52.79.91.214:8080/booths/${goodsRegistData.boothId}/products`,
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

export const useGoodsInput = (setModalState: (state: string) => void) => {
  const { boothId } = useParams() as { boothId: string };
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[] | null>(null);

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchGoodsInput({
        name,
        description,
        categoryId,
        images,
        price,
        stock,
        boothId,
      }),

    onError: () => {
      alert("상품 등록에 실패했습니다.");
    },
    onSuccess: () => {
      alert("상품이 등록되었습니다.");
    },
  });

  return {
    mutate,
    setCategoryId,
    setDescription,
    setImages,
    setName,
    setStock,
    setPrice,
  };
};
