interface Props {
  header: string;
  side?: string;
  children: React.ReactNode;
}
export default function RequestLayout({ children, header, side }: Props) {
  return (
    <section className="flex min-h-screen justify-center" onSubmit={() => {}}>
      <div className="w-full max-w-screen-lg border h-full p-10">
        <div className="flex items-center gap-20 border-b p-7">
          <h2 className="font-extrabold text-4xl">{header}</h2>
          {/* <span className="font-bold text-2xl">{"행사명"}</span> */}
        </div>
        <div className="flex">
          {side && (
            <div className="w-32 h-80 border-r p-4 font-bold">{side}</div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
