import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsGeoLocation', async: false })
export class IsGeoLocationConstraint implements ValidatorConstraintInterface {
  validate(value: any[]) {
    if (!(value instanceof Array)) {
      return false;
    }

    if (value.length !== 2) {
      return false;
    }
    const isEverythingNumber = value.every((item) => {
      return typeof item === 'number';
    });

    if (!isEverythingNumber) return false;

    if (value[0] < -90 || value[0] > 90 || value[1] < -180 || value[1] > 180) {
      console.log('value 3');
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.value) {
      return `${args.property} must not be empty`;
    }
    if (!(args.value instanceof Array)) {
      return `${args.property} must be an array`;
    }

    if (args.value.length !== 2) {
      return `${args.property} must have length 2`;
    }

    if (args.value.every((item) => typeof item !== 'number')) {
      return `${args.property} must be an array with 2 numeric elements representing latitude and longitude, respectively`;
    }

    return `invalid value for ${args.property}: latitude can't be lower than -90 or higher than 90, and longitude can't be lower than -180 or higher than 180.`;
  }
}
