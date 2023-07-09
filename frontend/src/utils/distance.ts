type Location = {
  lat: number;
  lng: number;
};

export const distance = (from: Location, to: Location) => {
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

  return c * r;
};
