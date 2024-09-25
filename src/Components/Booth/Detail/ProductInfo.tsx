export default function ProductInfo() {
  return (
    <div className="flex rounded-md justify-center items-center gap-5 p-3 shadow-md">
      <img
        className="w-1/6"
        src="https://via.placeholder.com/96"
        alt="부스 이미지"
      />
      <div className="flex flex-col w-5/6 gap-3">
        <div>물품명 : 간장 닭꼬치</div>
        <div>재고 : 100 개</div>
        <div>설명 : 매운 닭꼬치입니다.</div>
        <div>가격 : 3000 원</div>
      </div>
    </div>
  );
}
