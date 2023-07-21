type Location = {
    lat: number;
    lng: number;
}

export const generatePathLink = (from: Location, to: Location) => {
    return `https://www.google.com/maps/dir/${from.lat},${from.lng}/${to.lat},${to.lng}`
}