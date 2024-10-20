import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";

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

export interface LocationData {
  classification: string;
  number: string;
}

const fetchBoothData = (boothId: string): Promise<BoothData> => {
  const response = fetch(`http://52.79.91.214:8080/booths/${boothId}`, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });
  return response;
};

export function useGetBoothDetail(boothId: string) {
  const { isLoading, isError, data } = useQuery<BoothData>({
    queryKey: ["getBoothDetail", boothId],
    queryFn: () => fetchBoothData(boothId),
  });
  return { isLoading, isError, data };
}
