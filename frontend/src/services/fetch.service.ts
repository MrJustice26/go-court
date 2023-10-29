import {
  CREATE_COURT_URL,
  GET_COURTS_BY_NAME_URL,
  GET_COURTS_URL,
  GET_COURT_BY_ID,
  GET_LOCATIONS_BY_ADDRESS_QUERY_URL,
  GET_READABLE_ADDRESS_BY_LOCATION_URL,
} from "@/constants/restEndpoints";
import { UseFetchReturn, useFetch } from "@vueuse/core";
import { CourtFromAPI, CreateCourt, GeoPoint } from "@/types";
import { NominatimSearchResult } from "@/types/apiResponse";
import { NominatimReadableAddressResult } from "@/types/apiResponse/nominatim";

export class FetchService {

  private fetchHelper = async <T>(useFetchCallback: () => UseFetchReturn<T>) => {
    const {data} = await useFetchCallback().json();
    return data.value as T;
  };

  async getCourts() {
    return await this.fetchHelper<CourtFromAPI[]>(() => useFetch(GET_COURTS_URL));
  }

  async getCourtsByName(name: string) {
    return await this.fetchHelper<CourtFromAPI[]>(() => useFetch(GET_COURTS_BY_NAME_URL(name)));
  }

  async getCourtById(id: string) {
    return await this.fetchHelper<CourtFromAPI>(() => useFetch(GET_COURT_BY_ID(id)));
  }

  async getReadableAddressByLocation(geoPoint: GeoPoint) {
    return await this.fetchHelper<NominatimReadableAddressResult>(() => useFetch(GET_READABLE_ADDRESS_BY_LOCATION_URL(geoPoint)));
  }

  async getLocationsByAddressQuery(query: string) {
    return await this.fetchHelper<NominatimSearchResult[]>(() => useFetch(GET_LOCATIONS_BY_ADDRESS_QUERY_URL(query))); 
  }

  async createCourt(courtDto: CreateCourt){
    return await this.fetchHelper<CourtFromAPI>(() => useFetch<CourtFromAPI>(CREATE_COURT_URL).post(courtDto));
  };
}

export default new FetchService();
