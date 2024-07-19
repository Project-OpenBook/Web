export default function Profile() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-x-4 flex-wrap">
        <p>이메일</p>
        <p>asdasd@gmail.com</p>
      </div>
      <div className="flex gap-x-4 flex-wrap">
        <p>닉네임</p>
        <p>군감</p>
      </div>
      <div className="flex gap-x-4 flex-wrap items-center">
        <p>프로필</p>
        <img src="/logo192.png" alt="profile" width={40} height={40} />
      </div>
      <button
        disabled
        className="w-fit ml-auto px-2 py-1 bg-blue-400 rounded-md text-white shadow-md"
      >
        수정
      </button>
    </div>
  );
}
