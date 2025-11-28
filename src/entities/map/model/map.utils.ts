type Coordinate = {
  lat: number;
  lng: number;
};

/**
 * 여러 좌표의 정중앙(centroid) 반환
 * - 단순 평균값 기반
 */
export function getCenterCoordinate(coords: Coordinate[]): Coordinate {
  if (coords.length === 0) {
    throw new Error("좌표 배열이 비어 있습니다.");
  }

  const sum = coords.reduce(
    (acc, cur) => {
      acc.lat += cur.lat;
      acc.lng += cur.lng;
      return acc;
    },
    { lat: 0, lng: 0 },
  );

  return {
    lat: sum.lat / coords.length,
    lng: sum.lng / coords.length,
  };
}

const toRad = (v: number) => (v * Math.PI) / 180;

function calculateDistance(a: Coordinate, b: Coordinate): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

function getMaxDistance(coords: Coordinate[]): number {
  let max = 0;

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const dist = calculateDistance(coords[i], coords[j]);
      if (dist > max) max = dist;
    }
  }
  return max;
}

export function getMapLevel(coords: Coordinate[]): number {
  const maxDistanceKm = getMaxDistance(coords);

  if (maxDistanceKm < 10) return 6;
  if (maxDistanceKm < 15) return 7;
  if (maxDistanceKm < 20) return 8;
  if (maxDistanceKm < 50) return 9;
  if (maxDistanceKm < 100) return 10;
  return 11;
}
