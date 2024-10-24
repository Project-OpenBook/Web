import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useState } from "react";
import noImage from "../../../images/noimage.png";
import { useCategoryGoodsInfinite } from "./useGetGoodsCategory";
import { useGetGoodsList } from "./useGetGoods";

interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: Image[];
}

interface Image {
  id: string;
  url: string;
}

interface PatchData {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: File[] | null | string;
}

const fetchPatchData = (
  patchData: PatchData,
  categoryId: string
): Promise<void> => {
  function isFileArray(value: unknown): value is File[] {
    return Array.isArray(value) && value.every((item) => item instanceof File);
  }

  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", patchData.name);
  formData.append("categoryId", categoryId);
  formData.append("description", patchData.description);
  if (isFileArray(patchData.images)) {
    patchData.images.forEach((image) => {
      formData.append("images", image);
    });
  }
  formData.append("price", patchData.price.toString());
  formData.append("stock", patchData.stock.toString());
  const response = fetch(
    `http://52.79.91.214:8080/booths/products/${patchData.id}`,
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

export const usePatchProduct = (product: Product, categoryId: string) => {
  const [categoryId2, setCategoryId2] = useState(categoryId);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [images, setImages] = useState<File[] | null | string>(
    product.images[0]?.url || noImage
  );
  const id = product.id;
  const { refetch } = useCategoryGoodsInfinite(categoryId2);
  const { refetch: total } = useGetGoodsList("98");
  const { mutate } = useMutation({
    mutationFn: () =>
      fetchPatchData(
        { name, description, id, images, price, stock },
        categoryId2
      ),
    onSuccess: () => {
      alert("물품이 성공적으로 수정되었습니다.");
      refetch();
      total();
    },
    onError: () => {
      alert("물품 수정에 실패했습니다.");
    },
  });

  return {
    mutate,
    description,
    images,
    name,
    stock,
    price,
    setCategoryId2,
    setDescription,
    setImages,
    setName,
    setStock,
    setPrice,
    categoryId2,
  };
};
