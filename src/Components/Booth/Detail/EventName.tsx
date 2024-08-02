interface Props {
  text: string;
}

export default function EventName({ text }: Props) {
  return (
    <div className="w-15 inline-flex shadow-md px-2 rounded-md text-white text-center bg-orange-400 text-nowrap">
      {text}
    </div>
  );
}
