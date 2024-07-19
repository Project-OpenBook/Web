export default function PurchaseDetails() {
  const tmpList = [
    {
      name: "구매 물품 명",
      booth: "부스명",
      event: "행사명",
      price: "10,000$",
      count: "1",
    },
    {
      name: "구매 물품 명",
      booth: "부스명",
      event: "행사명",
      price: "15,000$",
      count: "2",
    },
    {
      name: "구매 물품 명",
      booth: "부스명",
      event: "행사명",
      price: "2,000$",
      count: "1",
    },
    {
      name: "구매 물품 명",
      booth: "부스명",
      event: "행사명",
      price: "6,000$",
      count: "4",
    },
    {
      name: "구매 물품 명",
      booth: "부스명",
      event: "행사명",
      price: "200$",
      count: "2",
    },
  ];
  return (
    <section className="flex flex-col">
      {tmpList.map(({ booth, event, name, price, count }) => (
        <div
          key={name}
          className="flex items-center gap-6 p-2 border-b last:border-none"
        >
          <img src="/logo192.png" alt="aa" width={50} height={50} />
          <p>{name}</p>
          <p>{booth}</p>
          <p>{event}</p>
          <p className="ml-auto">{price}</p>
          <p className="">{count}</p>
        </div>
      ))}
    </section>
  );
}
