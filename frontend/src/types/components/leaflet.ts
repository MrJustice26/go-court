import { GeoPoint } from "..";

export type LeafletMarker = {
    id: string;
    location: GeoPoint;
    iconName?: string;
}
