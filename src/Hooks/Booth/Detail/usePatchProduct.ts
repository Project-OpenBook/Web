import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useState } from "react";

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

const fetchPatchData = (
  product: Product,
  categoryId: string
): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", product.name);
  //formData.append("categoryId", product.categoryId);
  formData.append("categoryId", "37");
  formData.append("description", product.description);
  if (product.images !== null) {
    product.images.forEach((image) => {
      formData.append("images", image.url);
    });
  }
  formData.append("price", product.price.toString());
  formData.append("stock", product.stock.toString());
  const response = fetch(
    `http://52.79.91.214:8080/booths/products/${product.id}`,
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

export const usePatchProduct = (product: Product, categoryId2: string) => {
  const [categoryId, setCategoryId] = useState("none");
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [images, setImages] = useState<File[] | null>(null);
  const { mutate } = useMutation({
    mutationFn: () => fetchPatchData(product, categoryId2),
    onSuccess: () => {
      alert("물품이 성공적으로 수정되었습니다.");
    },
    onError: () => {
      alert("물품 수정에 실패했습니다.");
    },
  });

  return {
    mutate,
    categoryId,
    description,
    images,
    name,
    stock,
    price,
    setCategoryId,
    setDescription,
    setImages,
    setName,
    setStock,
    setPrice,
    categoryId2,
  };
};
