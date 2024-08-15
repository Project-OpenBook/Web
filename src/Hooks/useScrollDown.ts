import { useEffect, useState } from "react";

interface Option {
  onScrollDownToEnd?: () => void;
}

export function useScrollDown({ onScrollDownToEnd }: Option) {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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
