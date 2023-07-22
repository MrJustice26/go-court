import { GeoPoint } from "@/types";

const formatDistance = (distanceInKM: number) => {
  if (distanceInKM < 1) {
    return `${Math.ceil(distanceInKM * 1000)} m`;
  }

  if (distanceInKM > 10) {
    return `${Math.ceil(distanceInKM)} km`;
  }

  return `${distanceInKM.toFixed(2)} km`;
};

export const distance = (
  from: GeoPoint,
  to: GeoPoint,
  shouldFormat?: boolean
) => {
  const fromLng = (from.lng * Math.PI) / 180;
  const toLng = (to.lng * Math.PI) / 180;
  const fromLat = (from.lat * Math.PI) / 180;
  const toLat = (to.lat * Math.PI) / 180;

  // Haversine formula
  const dlng = toLng - fromLng;
  const dlat = toLat - fromLat;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(fromLat) * Math.cos(toLat) * Math.pow(Math.sin(dlng / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  if (shouldFormat) {
    return formatDistance(c * r);
  }
  return c * r;
};
