import { Place } from './nominatim.interface';
export const formatAddress = (data: Place) => {
  if (!data?.display_name) {
    return data?.display_name;
  }

  const houseNumber = data?.address?.house_number || '';
  const road = data?.address?.road || '';
  const cityOrVillage = data?.address?.city || data?.address?.village || '';
  const postCode = data?.address?.postcode || '';

  if (!cityOrVillage && !road) {
    return data?.display_name;
  }

  if (!road) {
    return `${houseNumber}, ${cityOrVillage} ${postCode}`;
  }

  return `${road} ${
    houseNumber ? ` ${houseNumber}` : ''
  }, ${cityOrVillage} ${postCode}`;
};
