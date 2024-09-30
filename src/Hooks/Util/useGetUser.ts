import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";

export interface UserData {
  id: string;
  nickname: string;
  role: string;
  expires_in: string;
}

const fetchUserData = (): Promise<UserData> => {
  const token = getAccessToken();
  const response = fetch(`http://52.79.91.214:8080/user/access_token_info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });
  return response;
};

export default function useGetUser() {
  const { data } = useQuery<UserData>({
    queryKey: ["getUserData"],
    queryFn: () => fetchUserData(),
  });

  return { data };
}
