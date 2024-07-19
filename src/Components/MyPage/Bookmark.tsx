import BoothCard from "../Booth/List/BoothCard";

export default function Bookmark() {
  const tmpBoothList = [
    {
      endDate: "2024-00-00",
      id: 25,
      image:
        "https://openbookbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A8%E1%84%87%E1%85%AE%E1%84%89%E1%85%B3.png",
      name: "부스1",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvISbILWTN9TaMBJPhWKe9rWc6CwtRJZlWw&s",
      name: "부스1",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg",
      name: "부스1",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__0S6K2gnU_PqcvLpFU8SGYGyb7x2ZtoisQ&s",
      name: "부스1",
    },
    {
      endDate: "2024-00-00",
      id: 1,
      image:
        "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg",
      name: "부스1",
    },
  ];
  return (
    <section className="w-full grid grid-cols-2 gap-4">
      {/* {tmpBoothList.map((booth) => (
        // <BoothCard
        //   endDate={booth.endDate}
        //   id={booth.id}
        //   image={booth.image}
        //   name={booth.name}
        // />
      ))} */}
    </section>
  );
}
