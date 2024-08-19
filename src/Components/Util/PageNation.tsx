import { Link, useSearchParams } from "react-router-dom";

interface Props {
  showPage: number;
  maxPage: number;
  className?: string;
}

export default function PageNation({ showPage, maxPage, className }: Props) {
  const [searchParams] = useSearchParams();
  const currnetPage = Number(searchParams.get("page") ?? 1);
  if (currnetPage <= 0 || currnetPage > maxPage) return <></>;

  const startPage = Math.floor((currnetPage - 1) / showPage) * showPage + 1;

  const page = new Array(showPage)
    .fill(0)
    .map((_, i) => i + startPage)
    .filter((p) => p !== 0 && p <= maxPage);

  const prevPage = page[0] - 1 <= 0 ? null : page[0] - 1;
  const nextPage =
    page[page.length - 1] + 1 > maxPage ? null : page[page.length - 1] + 1;

  return (
    <div className={`w-full flex gap-2 justify-center text-2xl ${className}`}>
      {prevPage && <Link to={`?page=${1}`}>{`<<`}</Link>}
      {prevPage && <Link to={`?page=${prevPage}`}> {`<`} </Link>}
      {page.map((i) => (
        <Link
          to={`?page=${i}`}
          className={`${+currnetPage === i && "font-bold"}`}
          key={i}
        >
          {i}
        </Link>
      ))}
      {nextPage && <Link to={`?page=${nextPage}`}>{`>`}</Link>}
      {nextPage && <Link to={`?page=${maxPage}`}>{`>>`}</Link>}
    </div>
  );
}
