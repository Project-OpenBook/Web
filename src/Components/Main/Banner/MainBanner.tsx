import { useCallback, useEffect, useRef, useState } from "react";
import MainBanner1 from "./1.png";
import MainBanner2 from "./2.png";
import MainBanner3 from "./3.png";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

interface Props {
  bannerIndex: number;
  setBannerIndex: (index: number) => void;
}
export default function MainBanner({ bannerIndex, setBannerIndex }: Props) {
  const bannerList = [MainBanner1, MainBanner2, MainBanner3];
  const ref = useRef<HTMLDivElement>(null);
  const imgref = useRef<HTMLImageElement>(null);

  const [bannerScreenWidth, setBannerScreenWidth] = useState(0);

  useEffect(() => {
    const resetBannerWidth = () => {
      if (ref.current) {
        setBannerScreenWidth(ref.current.offsetWidth);
      }
    };
    resetBannerWidth();

    window.addEventListener("resize", resetBannerWidth);

    return () => {
      window.removeEventListener("resize", resetBannerWidth);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (bannerIndex + 1) % 3;
      setBannerIndex(nextIndex);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [bannerIndex]);

  const resizeBanner = useCallback(() => {
    const h = window.innerHeight;
    const MIN_HEADER_HEIGHT = 100;

    if (ref.current) ref.current.style.height = h - MIN_HEADER_HEIGHT + "px";
  }, []);

  useEffect(() => {
    resizeBanner();
    window.addEventListener("resize", resizeBanner);

    return () => {
      window.removeEventListener("resize", resizeBanner);
    };
  }, [resizeBanner]);

  return (
    <div className="relative flex w-full overflow-hidden" ref={ref}>
      {bannerList.map((banner, index) => (
        <img
          ref={imgref}
          src={banner}
          alt="메인"
          key={index}
          className="absolute flex-1 object-cover lg:object-contain"
          style={{
            transform: `translateX(-${bannerScreenWidth * bannerIndex}px)`,
            transition: "transform 0.5s ease",
            left: index * bannerScreenWidth,
            height: ref.current?.offsetHeight,
            width: ref.current?.offsetWidth,
          }}
        />
      ))}

      <button className="absolute right-5 top-1/2">
        <FaRegArrowAltCircleRight size={60} color="white" />
      </button>

      <button className="absolute left-5 top-1/2">
        <FaRegArrowAltCircleLeft size={60} color="white" />
      </button>
    </div>
  );
}
