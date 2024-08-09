import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Props {
  location: string;
}

export default function KakaoMap({ location }: Props) {
  const [map, setMap] = useState<kakao.maps.services.PlacesSearchResult>([]);

  useEffect(() => {
    try {
      const place = new window.kakao.maps.services.Places();
      place.keywordSearch(location, (result) => {
        if (result.length === 0) return;
        setMap(result);
      });
    } catch (error) {
      console.error(
        "카카오 토큰이 없습니다. env 파일을 추가해주세요. 토큰은 노션에 업로드됨."
      );
    }
  }, []);

  const lat = +map[0]?.y;
  const lng = +map[0]?.x;

  if (!lat || !lat) return <></>;

  return (
    <Map className="h-80" center={{ lat, lng }}>
      <MapMarker position={{ lat, lng }} />
    </Map>
  );
}
