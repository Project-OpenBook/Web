import { useEffect, useState } from "react";

interface Option {
  onScrollDownToEnd?: () => void;
  offset?: number;
}

export function useScrollDown({ onScrollDownToEnd, offset = 0 }: Option) {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isEndOfScroll =
        window.innerHeight + window.scrollY + offset >=
        document.body.offsetHeight;
      setIsScrollDown(isEndOfScroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isScrollDown) {
      onScrollDownToEnd && onScrollDownToEnd();
    }
  }, [isScrollDown, onScrollDownToEnd]);

  return isScrollDown;
}
