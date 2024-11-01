import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";
import { useEffect, useRef, useState } from "react";

interface MyInfo {
  email: string;
  id: number;
  name: string;
  nickname: string;
}

const INPUT_CLASSNAME = "border rounded-md p-1 bg-sky-50";
const P_CLASSNAME = "p-1";

const fetcher = () => {
  return fetch("http://52.79.91.214:8080/manage/profile", {
    method: "get",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("내 정보를 가져오는데 실패했습니다.");
      }
    })
    .catch((err) => {
      alert(err);
    });
};

export default function Profile() {
  const { data, isSuccess } = useQuery<MyInfo>({
    queryKey: ["myinfo"],
    queryFn: fetcher,
  });
  const [infoData, setInfoData] = useState<MyInfo | undefined>(data);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setInfoData(data);
  }, [data, isSuccess]);

  const onUpdate = () => {
    if (!infoData) return;

    const form = new FormData();
    form.append("email", infoData?.email);
    form.append("nickname", infoData?.nickname);
    form.append("name", infoData?.name);

    fetch(`http://52.79.91.214:8080/manage/profile`, {
      method: "PATCH",
      body: form,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("수정하는데 문제가 발생했습니다. 다시 시도해주세요");
        }
      })
      .catch(alert);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof MyInfo
  ) => {
    if (!infoData) return;

    setInfoData({
      ...infoData,
      [key]: e.target.value,
    });
  };

  if (!infoData)
    return (
      <div className="w-full p-10 text-xl">내 정보를 가져올 수 없습니다.</div>
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-x-4 flex-wrap">
        <p>이메일</p>
        {isEditing ? (
          <input
            value={infoData.email}
            onChange={(e) => onChange(e, "email")}
            className={INPUT_CLASSNAME}
          />
        ) : (
          <p className={P_CLASSNAME}>{infoData.email}</p>
        )}
      </div>
      <div className="flex gap-x-4 flex-wrap items-center">
        <p>이름</p>
        {isEditing ? (
          <input
            value={infoData.name}
            onChange={(e) => onChange(e, "name")}
            className={INPUT_CLASSNAME}
          />
        ) : (
          <p className={P_CLASSNAME}>{infoData.name}</p>
        )}
      </div>
      <div className="flex gap-x-4 flex-wrap items-center">
        <p>닉네임</p>
        {isEditing ? (
          <input
            value={infoData.nickname}
            onChange={(e) => onChange(e, "nickname")}
            className={INPUT_CLASSNAME}
          />
        ) : (
          <p className={P_CLASSNAME}>{infoData.nickname}</p>
        )}
      </div>
      <button
        className={`w-fit ml-auto px-3 py-2 text-xl rounded-md text-white shadow-md ${
          isEditing ? "bg-green-500" : "bg-blue-400"
        }`}
        onClick={() => {
          if (isEditing) {
            onUpdate();
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "완료" : "수정"}
      </button>
    </div>
  );
}
