import { useEffect, useRef, useState } from "react";
import MainBanner1 from "./1.png";
import MainBanner2 from "./2.png";
import MainBanner3 from "./3.png";

interface Props {
  bannerIndex: number;
  setBannerIndex: (index: number) => void;
}
export default function MainBanner({bannerIndex, setBannerIndex}: Props) {
  const bannerList = [MainBanner1, MainBanner2, MainBanner3];
  const ref = useRef<HTMLDivElement>(null);

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
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [bannerIndex]);

  return (
    <div
      className="relative flex w-full overflow-hidden max-w-screen-xl mx-auto"
      ref={ref}
    >
      {bannerList.map((banner, index) => (
        <img
          src={banner}
          alt="메인"
          key={index}
          style={{
            transform: `translateX(-${bannerScreenWidth * bannerIndex}px)`,
            transition: "transform 0.5s ease",
          }}
        />
      ))}
    </div>
  );
}
