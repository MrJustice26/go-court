import { GeoPoint } from "@/types"

export const generatePathLink = (from: GeoPoint, to: GeoPoint) => {
    return `https://www.google.com/maps/dir/${from.lat},${from.lng}/${to.lat},${to.lng}`
}