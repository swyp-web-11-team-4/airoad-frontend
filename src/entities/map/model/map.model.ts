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
  category?: string;
}

export interface MarkerFilterOption {
  label: string;
  value: string;
  labelColor: string;
}
