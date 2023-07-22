import {
  GET_COURTS_BY_NAME_URL,
  GET_COURTS_URL,
  GET_COURT_BY_ID,
  GET_LOCATIONS_BY_ADDRESS_QUERY_URL,
  GET_READABLE_ADDRESS_BY_LOCATION_URL,
} from "@/constants/rest-endpoints";
import { useFetch } from "@vueuse/core";
import { CourtFromAPI, GeoPoint } from "@/types";
import { NominatimSearchResult } from "@/types/api";
import { NominatimReadableAddressResult } from "@/types/api/nominatim";

export class FetchService {
  private async fetchHelper<T>(url: string): Promise<T | null> {
    if (url.startsWith("undefined")) {
      console.error("Error with importing url", url);
      return null;
    }

    const { error, data } = await useFetch<string>(url);
    if (error.value || !data.value) {
      console.error("Error: ", error.value);
      return null;
    }

    return JSON.parse(data.value) as T;
  }

  async getCourts() {
    return await this.fetchHelper<CourtFromAPI[]>(GET_COURTS_URL);
  }

  async getCourtsByName(name: string) {
    return await this.fetchHelper<CourtFromAPI[]>(GET_COURTS_BY_NAME_URL(name));
  }

  async getCourtById(id: string) {
    return await this.fetchHelper<CourtFromAPI>(GET_COURT_BY_ID(id));
  }

  async getReadableAddressByLocation(geoPoint: GeoPoint) {
    return await this.fetchHelper<NominatimReadableAddressResult>(
      GET_READABLE_ADDRESS_BY_LOCATION_URL(geoPoint)
    );
  }

  async getLocationsByAddressQuery(query: string) {
    return await this.fetchHelper<NominatimSearchResult[]>(
      GET_LOCATIONS_BY_ADDRESS_QUERY_URL(query)
    );
  }
}

export default new FetchService();
