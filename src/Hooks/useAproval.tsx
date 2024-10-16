import { useMutation } from "@tanstack/react-query";

interface Variables {
  id: number;
  status: "APPROVE" | "REJECT";
}

export function useAproval(
  fetcher: (id: number, status: string) => Promise<Response>,
  refetch?: () => void
) {
  const { mutateAsync } = useMutation<Response, Error, Variables>({
    mutationFn: ({ id, status }) => fetcher(id, status),
    onError: () => {
      alert("아이디나 비밀번호를 잘못 입력하였습니다.");
    },
  });

  const onAprove = (id: number) => {
    mutateAsync({ id, status: "APPROVE" }).then(() => {
      alert("승인 되었습니다");
      refetch && refetch();
    });
  };

  const onReject = (id: number) => {
    mutateAsync({ id, status: "REJECT" }).then(() => {
      alert("반려 되었습니다");
      refetch && refetch();
    });
  };

  const changeStates = async (
    eventIds: number[],
    status: "APPROVE" | "REJECT"
  ) => {
    Promise.all(eventIds.map((id) => mutateAsync({ id, status }))).then(
      () => refetch && refetch()
    );
  };

  return { onAprove, onReject, changeStates };
}
