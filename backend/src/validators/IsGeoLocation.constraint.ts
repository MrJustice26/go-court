import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsGeoLocation', async: false })
export class IsGeoLocationConstraint implements ValidatorConstraintInterface {
  validate(value: { lat: number; lng: number }) {
    if (!value?.lat || !value?.lng) {
      return false;
    }

    if (typeof value.lat !== 'number' || typeof value.lng !== 'number') {
      return false;
    }

    if (
      value.lat < -90 ||
      value.lat > 90 ||
      value.lng < -180 ||
      value.lng > 180
    ) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.value?.lat || !args.value?.lng) {
      return `${args.property} should containt lat and lng keys`;
    }

    if (
      typeof args.value.lat !== 'number' ||
      typeof args.value.lng !== 'number'
    ) {
      return `${args.property} property lat and lng should be number type`;
    }

    return `invalid value for ${args.property}: latitude can't be lower than -90 or higher than 90, and lnggitude can't be lower than -180 or higher than 180.`;
  }
}
