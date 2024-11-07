import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

interface ServiceData {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  reservations: ReservationDate[];
}

interface ApplyUser {
  id: string;
  name: string;
  nickname: string;
  role: string;
}

interface ReservationDate {
  date: string;
  times: ReservationTime[];
}

interface ReservationTime {
  id: number;
  times: string;
  status: "EMPTY" | "RESERVED" | string;
  applyUser?: ApplyUser;
}

const fetchServiceAdminData = (boothId: string): Promise<ServiceData[]> => {
  const token = getAccessToken();
  const response = fetch(
    `http://52.79.91.214:8080/manage/booths/${boothId}/reservations`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });
  return response;
};

export function useGetServiceAdmin(boothId: string) {
  const { isLoading, isError, data } = useQuery<ServiceData[]>({
    queryKey: ["getServiceAdmin", boothId],
    queryFn: () => fetchServiceAdminData(boothId),
  });
  return { isLoading, isError, data };
}
