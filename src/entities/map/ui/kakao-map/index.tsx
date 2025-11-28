import { Box, Flex } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { Map as KakaoMapComponent, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { env } from "@/shared/config";
import { ShinyText } from "@/shared/ui";
import type { MapPosition, MarkerFilterOption, MarkerOptions } from "../../model";
import * as styles from "./index.css";
import { KakaoMapFilter } from "./kakao-map-filter";

interface KakaoMapProps {
  center: MapPosition;
  level?: number;
  markers?: MarkerOptions[];
  filterOptions?: MarkerFilterOption[];
  onMapLoad?: (map: kakao.maps.Map) => void;
}

export const KakaoMap = ({
  center,
  level = 3,
  markers = [],
  filterOptions = [],
  onMapLoad,
}: KakaoMapProps) => {
  const [loading] = useKakaoLoader({
    appkey: env.KAKAO_MAP_APP_KEY,
  });

  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    filterOptions.map((option) => option.value),
  );

  const filteredMarkers = useMemo(() => {
    if (selectedFilters.length === 0) {
      return [];
    }

    return markers.filter((marker) => {
      if (!marker.category) {
        return true;
      }
      return selectedFilters.includes(marker.category);
    });
  }, [markers, selectedFilters]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  if (loading) return <KakaoMapLoading />;

  return (
    <Box position="relative" width="100%" height="100%">
      {filterOptions.length > 0 && (
        <KakaoMapFilter
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      )}
      <KakaoMapComponent
        center={{ lat: center.lat, lng: center.lng }}
        level={level}
        className={styles.mapContainer}
        onCreate={onMapLoad}
      >
        {filteredMarkers.map((marker, index) => (
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
    </Box>
  );
};

export const KakaoMapLoading = () => {
  return (
    <Flex flexGrow="1" justify="center" align="center">
      <ShinyText>일정을 불러오는 중입니다 ...</ShinyText>
    </Flex>
  );
};
