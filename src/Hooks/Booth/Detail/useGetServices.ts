import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

interface Timeslot {
  id: number;
  times: string;
  status: string;
}

interface ReserveInfo {
  date: string;
  times: Timeslot[];
}

interface ServiceData {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  boothManagerId: number;
  reserveInfo: ReserveInfo[];
}

const fetchServiceData = (boothId: string): Promise<ServiceData[]> => {
  const token = getAccessToken();
  const response = fetch(
    `http://52.79.91.214:8080/booths/${boothId}/reservations`,
    //`http://52.79.91.214:8080/booths/68/reservations`,
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

export function useGetServiceList(boothId: string) {
  const { isLoading, isError, data } = useQuery<ServiceData[]>({
    queryKey: ["getServiceList", boothId],
    queryFn: () => fetchServiceData(boothId),
  });
  return { isLoading, isError, data };
}
