import { useEffect, useState } from "react";

interface Option {
  onScrollDownToEnd?: () => void;
  offset?: number;
}

export function useScrollDown({ onScrollDownToEnd, offset = 0 }: Option) {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + offset >=
        document.body.offsetHeight
      ) {
        setIsScrollDown(true);
        onScrollDownToEnd && onScrollDownToEnd();
      } else {
        setIsScrollDown(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrollDown;
}
