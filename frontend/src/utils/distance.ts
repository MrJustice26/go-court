type Location = [number, number];

export const distance = (from: Location, to: Location) => {
  const fromLon = (from[0] * Math.PI) / 180;
  const toLon = (to[0] * Math.PI) / 180;
  const fromLat = (from[1] * Math.PI) / 180;
  const toLat = (to[1] * Math.PI) / 180;

  // Haversine formula
  const dlon = toLon - fromLon;
  const dlat = toLat - fromLat;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(fromLat) * Math.cos(toLat) * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  return c * r;
};
