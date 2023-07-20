const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const GET_COURTS_URL = `${BACKEND_BASE_URL}/courts`;
export const GET_COURTS_BY_NAME_URL = (name: string) =>
  `${BACKEND_BASE_URL}/courts?name=${name}`;

export const GET_COURT_BY_ID = (courtId: string) =>
  `${BACKEND_BASE_URL}/courts/${courtId}`;

export const GET_READABLE_ADDRESS_BY_LOCATION_URL = (
  lat: number,
  lng: number
) => `http://localhost:3000/nominatim/readable-address?lat=${lat}&lng=${lng}`;
export const GET_LOCATIONS_BY_ADDRESS_QUERY_URL = (query: string) =>
  `http://localhost:3000/nominatim/search?q=${query}`;
