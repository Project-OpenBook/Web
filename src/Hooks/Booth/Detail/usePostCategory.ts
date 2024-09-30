import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";
import { useState } from "react";

interface CategoryData {
  name: string;
  description: string;
}

const fetchCategoryData = (
  categoryData: CategoryData,
  boothId: string
): Promise<void> => {
  const token = getAccessToken();
  let formData = new FormData();
  formData.append("name", categoryData.name);
  formData.append("description", categoryData.description);
  const response = fetch(
    `http://52.79.91.214:8080/booths/${boothId}/product-category`,
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

export const usePostCategory = (boothId: string) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchCategoryData(
        {
          name,
          description,
        },
        boothId
      ),
    onError: () => {
      alert("카테고리 등록에 실패했습니다.");
    },
  });

  return {
    mutate,
    setDescription,
    setName,
    name,
    description,
  };
};
