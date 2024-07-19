import EventCard from "../Event/List/EventCard";

export default function MyEvent() {
  //   const tmp
  const tmpBoothList = [
    {
      endDate: "2024-00-00",
      id: 25,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A8%E1%84%87%E1%85%AE%E1%84%89%E1%85%B3.png",
      name: "행사명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/butflow.png",
      name: "행사명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg",
      name: "행사명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/639dd299-4fd6-4eea-92e9-bfbd2743503eevent.png",
      name: "행사명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/c7a6b55d-2aaa-45e6-b770-0118695c2d7b%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6.png",
      name: "행사명",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      {tmpBoothList.map((booth) => (
        <EventCard
          endDate={booth.endDate}
          id={booth.id}
          image={booth.image}
          name={booth.name}
        />
      ))}
    </section>
  );
}
