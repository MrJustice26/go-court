export type GeoPoint = {
    lat: number;
    lng: number;
}

export type MappedCourt = {
    id: string;
    name: string;
    description: string;
    location: GeoPoint;
    readableAddress: string;
    courtType: string;
}