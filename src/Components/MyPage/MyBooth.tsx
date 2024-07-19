import EventCard from "../Event/List/EventCard";

export default function MyBooth() {
  //   const tmp
  const tmpBoothList = [
    {
      endDate: "2024-00-00",
      id: 25,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A9%E1%84%85%E1%85%A2%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%AE%E1%84%89%E1%85%B3.png",
      name: "부스명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image: "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/booo.png",
      name: "부스명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A2%E1%84%80%E1%85%AE%E1%86%A8%E1%84%87%E1%85%AE%E1%84%89%E1%85%B3.png",
      name: "부스명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/f49d8fd1-7de5-4e9a-8c7e-4c4d7eca10d0%E1%84%8E%E1%85%B5%E1%84%86%E1%85%A2%E1%86%A8%E1%84%87%E1%85%AE%E1%84%89%E1%85%B3.png",
      name: "부스명",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/86eb0a5f-41e6-42e8-bd17-49d8e8460d4bmakaron.png",
      name: "부스명",
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
