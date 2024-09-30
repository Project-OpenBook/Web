import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

const fetchDeleteData = (product_id: string): Promise<void> => {
  const token = getAccessToken();
  const response = fetch(
    `http://52.79.91.214:8080/booths/products/${product_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });

  return response;
};

export const useDeleteProduct = (productId: string) => {
  const { mutate } = useMutation({
    mutationFn: () => fetchDeleteData(productId),
    onSuccess: () => {
      alert("물품이 성공적으로 삭제되었습니다.");
    },
    onError: () => {
      alert("물품 삭제에 실패했습니다.");
    },
  });

  return {
    mutate,
  };
};
