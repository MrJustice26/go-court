import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsGeoLocation', async: false })
export class IsGeoLocationConstraint implements ValidatorConstraintInterface {
  validate(value: { lat: number; lon: number }) {
    if (!value?.lat || !value?.lon) {
      return false;
    }

    if (typeof value.lat !== 'number' || typeof value.lon !== 'number') {
      return false;
    }

    if (
      value.lat < -90 ||
      value.lat > 90 ||
      value.lon < -180 ||
      value.lon > 180
    ) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.value?.lat || !args.value?.lon) {
      return `${args.property} should containt lat and lon keys`;
    }

    if (
      typeof args.value.lat !== 'number' ||
      typeof args.value.lon !== 'number'
    ) {
      return `${args.property} property lat and lon should be number type`;
    }

    return `invalid value for ${args.property}: latitude can't be lower than -90 or higher than 90, and longitude can't be lower than -180 or higher than 180.`;
  }
}
