// Kakao Map API Types
export interface MapPosition {
  lat: number;
  lng: number;
}

export interface MarkerOptions {
  position: MapPosition;
  title?: string;
  image?: {
    src: string;
    size: { width: number; height: number };
  };
}

// Kakao Maps API Type Declarations
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
        MarkerImage: new (src: string, size: KakaoSize, options?: unknown) => KakaoMarkerImage;
        Size: new (width: number, height: number) => KakaoSize;
      };
    };
  }

  interface KakaoLatLng {
    getLat: () => number;
    getLng: () => number;
  }

  interface KakaoMapOptions {
    center: KakaoLatLng;
    level?: number;
  }

  interface KakaoMap {
    setCenter: (latlng: KakaoLatLng) => void;
    getCenter: () => KakaoLatLng;
    setLevel: (level: number, options?: { animate: boolean }) => void;
    getLevel: () => number;
    panTo: (latlng: KakaoLatLng) => void;
  }

  interface KakaoMarkerOptions {
    position: KakaoLatLng;
    map?: KakaoMap;
    title?: string;
    image?: KakaoMarkerImage;
  }

  interface KakaoMarker {
    setMap: (map: KakaoMap | null) => void;
    getPosition: () => KakaoLatLng;
    setPosition: (position: KakaoLatLng) => void;
    setTitle: (title: string) => void;
  }

  interface KakaoMarkerImage {
    // MarkerImage methods if needed
  }

  interface KakaoSize {
    // Size methods if needed
  }
}
