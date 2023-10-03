import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'skipIfAdmin', async: false })
export class SkipIfAdminConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        // Skip validation if the value is "admin"
        return value !== 'admin';
    }

    defaultMessage(args: ValidationArguments) {
        return 'Validation is skipped for admin';
    }
}

export function SkipIfAdmin(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: SkipIfAdminConstraint,
        });
    };
}