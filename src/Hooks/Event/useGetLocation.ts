import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";

interface Area {
  id: number;
  classification: string;
  status: "EMPTY" | "WAITING" | "COMPLETE";
  number: string;
}

interface Areas {
  [key: string]: Area[];
}

interface LayoutData {
  id: string;
  imageUrl: string;
  type: "ALPHABET" | "NUMBER";
  areas: Areas;
}

const fetchLocationData = (eventId: string): Promise<LayoutData> => {
  const token = getAccessToken();
  const response = fetch(
    `http://52.79.91.214:8080/events/${eventId}/layout/status`,
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

export function useGetLocation(eventId: string) {
  const { isLoading, isError, data } = useQuery<LayoutData>({
    queryKey: ["getLocation", eventId],
    queryFn: () => fetchLocationData(eventId),
  });
  return { isLoading, isError, data };
}
