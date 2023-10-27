import { GeoPoint } from "@/types";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const PREPARE_BACKEND_URL = (path: string) =>
  BACKEND_BASE_URL + "/" + path;

export const GET_COURTS_URL = PREPARE_BACKEND_URL("courts");
export const GET_COURTS_BY_NAME_URL = (name: string) =>
  PREPARE_BACKEND_URL(`courts?name=${name}`);

export const GET_COURT_BY_ID = (courtId: string) =>
  PREPARE_BACKEND_URL(`courts/${courtId}`);

export const GET_READABLE_ADDRESS_BY_LOCATION_URL = (geoPoint: GeoPoint) =>
  PREPARE_BACKEND_URL(
    `nominatim/readable-address?lat=${geoPoint.lat}&lng=${geoPoint.lng}`
  );
export const GET_LOCATIONS_BY_ADDRESS_QUERY_URL = (query: string) =>
  PREPARE_BACKEND_URL(`nominatim/search?q=${query}`);
