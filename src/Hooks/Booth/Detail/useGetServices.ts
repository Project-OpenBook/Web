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

interface ReservationDate {
  date: string;
  times: ReservationTime[];
}

interface ReservationTime {
  id: number;
  times: string;
  status: "EMPTY" | "RESERVED" | string;
}

const fetchServiceData = (boothId: string): Promise<ServiceData[]> => {
  const token = getAccessToken();
  const response = fetch(
    `http://52.79.91.214:8080/booths/${boothId}/reservations`,
    //`http://52.79.91.214:8080/booths/68/reservations`,
    {
      method: "GET",
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });
  return response;
};

export function useGetServiceList(boothId: string) {
  const { isLoading, isError, data } = useQuery<ServiceData[]>({
    queryKey: ["getServiceList", boothId],
    queryFn: () => fetchServiceData(boothId),
  });
  return { isLoading, isError, data };
}
