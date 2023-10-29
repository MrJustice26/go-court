export type NominatimSearchResult = {
  address: {
    lat: number;
    lng: number;
  };
  display_name: string;
};

export type NominatimReadableAddressResult = {
  address: string;
};
