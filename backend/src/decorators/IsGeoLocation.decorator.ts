import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsGeoLocationConstraint } from 'src/validators/IsGeoLocation.constraint';

export function IsGeoLocation(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGeoLocationConstraint,
    });
  };
}
