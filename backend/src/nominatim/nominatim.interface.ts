export type Address = {
  house_number: string;
  road: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  [key: string]: string;
  city?: string;
  village?: string;
};

export type Place = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: Address;
};
