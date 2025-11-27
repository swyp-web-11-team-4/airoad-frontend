import { Map as KakaoMapComponent, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { env } from "@/shared/config";
import type { MapPosition, MarkerOptions } from "../../model";
import * as styles from "./index.css";

interface KakaoMapProps {
  center: MapPosition;
  level?: number;
  markers?: MarkerOptions[];
  onMapLoad?: (map: kakao.maps.Map) => void;
}

export const KakaoMap = ({ center, level = 3, markers = [], onMapLoad }: KakaoMapProps) => {
  useKakaoLoader({
    appkey: env.KAKAO_MAP_APP_KEY,
  });

  return (
    <KakaoMapComponent
      center={{ lat: center.lat, lng: center.lng }}
      level={level}
      className={styles.mapContainer}
      onCreate={onMapLoad}
    >
      {markers.map((marker, index) => (
        <MapMarker
          key={`${marker.position.lat}-${marker.position.lng}-${index}`}
          position={{ lat: marker.position.lat, lng: marker.position.lng }}
          title={marker.title}
          image={
            marker.image
              ? {
                  src: marker.image.src,
                  size: {
                    width: marker.image.size.width,
                    height: marker.image.size.height,
                  },
                }
              : undefined
          }
        />
      ))}
    </KakaoMapComponent>
  );
};
